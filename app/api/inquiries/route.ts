import { customerEmail, ownerEmail } from "@/lib/email-templates";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

type InquiryBody = {
  source?: string;
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  issue?: string;
  billing?: string;
  address?: string;
  zip?: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
};

const clean = (value: unknown, max = 500) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.BOOKING_FROM_EMAIL;
  const to = process.env.BOOKING_TO_EMAIL;

  if (!apiKey || !from || !to) {
    console.error("Inquiry email is not configured: check RESEND_API_KEY, BOOKING_FROM_EMAIL, BOOKING_TO_EMAIL");
    return Response.json({ error: "Service is not configured." }, { status: 500 });
  }

  let raw: InquiryBody;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const data = {
    source: clean(raw.source, 40) || "Website",
    name: clean(raw.name, 120),
    phone: clean(raw.phone, 40),
    email: clean(raw.email, 200),
    service: clean(raw.service, 120),
    issue: clean(raw.issue, 200),
    billing: clean(raw.billing, 200),
    address: clean(raw.address, 200),
    zip: clean(raw.zip, 10),
    preferredDate: clean(raw.preferredDate, 20),
    preferredTime: clean(raw.preferredTime, 80),
    notes: clean(raw.notes, 2000),
  };

  if (!data.name || !data.phone) {
    return Response.json({ error: "Name and phone number are required." }, { status: 400 });
  }
  // The quick booking modal collects only a ZIP; dispatch confirms the street address by phone.
  const zipOnlyOk = data.source === "Instant Booking Modal" && /^\d{5}$/.test(data.zip);
  if (!data.address && !zipOnlyOk) {
    return Response.json({ error: "A service address is required." }, { status: 400 });
  }

  let finalEmail = data.email;
  if (!finalEmail) {
    const cleanDigits = data.phone.replace(/\D/g, "") || "booking";
    finalEmail = `sms-${cleanDigits}@eco-applianceservices.com`;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(finalEmail)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const ticketId = `ECO-DMV-${Math.floor(1000 + Math.random() * 9000)}`;

  const owner = ownerEmail(data, ticketId);

  const send = (payload: object) =>
    fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

  const res = await send({
    from,
    to: [to],
    subject: `New ${data.source}: ${data.service || "Service request"} – ${data.name} (${ticketId})`,
    html: owner.html,
    text: owner.text,
    ...(data.email && { reply_to: data.email }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return Response.json({ error: "Could not send your request. Please call us." }, { status: 502 });
  }

  // Customer confirmation. The business alert already went out, so a failure here is logged, not surfaced.
  const customer = customerEmail(data, ticketId);

  if (data.email) {
    try {
      const customerRes = await send({
        from,
        to: [data.email],
        subject: `We received your service request (${ticketId})`,
        html: customer.html,
        text: customer.text,
        reply_to: to,
      });
      if (!customerRes.ok) console.error("Customer confirmation failed", customerRes.status, await customerRes.text());
    } catch (err) {
      console.error("Customer confirmation failed", err);
    }
  }

  return Response.json({ ticketId });
}
