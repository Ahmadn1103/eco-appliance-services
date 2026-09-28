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

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

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
  if (!data.address) {
    return Response.json({ error: "A service address is required." }, { status: 400 });
  }

  let finalEmail = data.email;
  if (!finalEmail) {
    const cleanDigits = data.phone.replace(/\D/g, "") || "booking";
    finalEmail = `sms-${cleanDigits}@ecoapplianceservices.com`;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(finalEmail)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const ticketId = `ECO-DMV-${Math.floor(1000 + Math.random() * 9000)}`;

  const rows: [string, string][] = [
    ["Ticket", ticketId],
    ["Source", data.source],
    ["Name", data.name],
    ["Phone", data.phone],
    ["Email", data.email || "(Provided phone for SMS/Call)"],
    ["Service / Appliance", data.service],
    ["Symptom", data.issue],
    ["Billing", data.billing],
    ["Address", [data.address, data.zip].filter(Boolean).join(", ")],
    ["Preferred date", data.preferredDate],
    ["Preferred window", data.preferredTime],
    ["Diagnostic fee", "$89 (credited toward approved repair)"],
    ["Notes", data.notes],
  ];
  const filled = rows.filter(([, v]) => v);

  const html = `<table cellpadding="8" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${filled
    .map(
      ([k, v]) =>
        `<tr><td style="font-weight:bold;color:#475569;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td>${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("")}</table>`;
  const text = filled.map(([k, v]) => `${k}: ${v}`).join("\n");

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
    html,
    text,
    ...(data.email && { reply_to: data.email }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return Response.json({ error: "Could not send your request. Please call us." }, { status: 502 });
  }

  // Customer confirmation. The business alert already went out, so a failure here is logged, not surfaced.
  const details = filled.filter(([k]) => ["Ticket", "Service / Appliance", "Symptom", "Address", "Preferred date", "Preferred window", "Diagnostic fee"].includes(k));
  const customerHtml = `<div style="font-family:Arial,sans-serif;font-size:14px;color:#0f172a;max-width:520px">
    <h2 style="margin:0 0 8px">We received your service request</h2>
    <p>Hi ${escapeHtml(data.name)}, thanks for contacting Eco Appliance Services. A dispatch coordinator will call or text <strong>${escapeHtml(data.phone)}</strong> shortly to confirm your technician arrival window.</p>
    <table cellpadding="6" style="border-collapse:collapse;font-size:14px">${details
      .map(([k, v]) => `<tr><td style="font-weight:bold;color:#475569;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`)
      .join("")}</table>
    <p style="color:#475569">Reply to this email if anything needs to change.</p>
  </div>`;
  const customerText = `Hi ${data.name}, we received your service request (${ticketId}). A dispatch coordinator will contact you at ${data.phone} shortly to confirm your arrival window.\n\n${details.map(([k, v]) => `${k}: ${v}`).join("\n")}`;

  if (data.email) {
    try {
      const customerRes = await send({
        from,
        to: [data.email],
        subject: `We received your service request (${ticketId})`,
        html: customerHtml,
        text: customerText,
        reply_to: to,
      });
      if (!customerRes.ok) console.error("Customer confirmation failed", customerRes.status, await customerRes.text());
    } catch (err) {
      console.error("Customer confirmation failed", err);
    }
  }

  return Response.json({ ticketId });
}
