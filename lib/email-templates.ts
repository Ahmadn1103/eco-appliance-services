import { PHONE_DISPLAY, PHONE_HREF, SITE_NAME, SITE_URL } from "@/lib/site";

// Email-safe HTML: tables, inline styles and bgcolor fallbacks only, because mail clients ignore most CSS.
const C = {
  primary: "#209378",
  primaryStrong: "#19715c",
  tint: "#eef8f5",
  ink: "#0f172a",
  soft: "#475569",
  muted: "#94a3b8",
  line: "#e2e8f0",
  page: "#f1f5f4",
};
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";

export type InquiryData = {
  source: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  issue: string;
  billing: string;
  address: string;
  zip: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
};

const esc = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const multiline = (value: string) => esc(value).replace(/\n/g, "<br>");

const button = (href: string, label: string, solid = true) =>
  `<a href="${esc(href)}" style="display:inline-block;margin:0 8px 8px 0;padding:12px 22px;border-radius:999px;font-family:${FONT};font-size:14px;font-weight:700;text-decoration:none;${
    solid ? `background:${C.primary};color:#ffffff;` : `background:#ffffff;color:${C.primaryStrong};border:2px solid ${C.primary};padding:10px 20px;`
  }">${esc(label)}</a>`;

/** Small uppercase heading above a group of rows. */
const sectionTitle = (label: string) =>
  `<tr><td style="padding:22px 0 8px;font-family:${FONT};font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:${C.primaryStrong}">${esc(label)}</td></tr>`;

/** One label/value line. `html` is pre-escaped markup (a link, for example) and wins over `value`. */
const row = (label: string, value: string, html?: string) =>
  value || html
    ? `<tr><td style="padding:9px 0;border-bottom:1px solid ${C.line}"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
        <td width="130" valign="top" style="font-family:${FONT};font-size:13px;color:${C.soft}">${esc(label)}</td>
        <td valign="top" style="font-family:${FONT};font-size:14px;font-weight:600;color:${C.ink}">${html ?? multiline(value)}</td>
      </tr></table></td></tr>`
    : "";

const link = (href: string, text: string) => `<a href="${esc(href)}" style="color:${C.primaryStrong};text-decoration:none">${esc(text)}</a>`;

const mapsUrl = (address: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

const fullAddress = (d: InquiryData) => [d.address, d.zip].filter(Boolean).join(", ");

/** Shared shell: preheader, branded header, white card, footer. */
function layout(opts: { preheader: string; badge: string; title: string; body: string }) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(opts.title)}</title></head>
<body style="margin:0;padding:0;background:${C.page}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${esc(opts.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${C.page}" style="background:${C.page}"><tr><td align="center" style="padding:24px 12px">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;border-radius:20px;overflow:hidden;background:#ffffff;box-shadow:0 8px 30px rgba(15,23,42,.08)">
    <tr><td bgcolor="${C.primary}" style="background:${C.primary};background-image:linear-gradient(135deg,${C.primaryStrong},${C.primary});padding:28px 32px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
        <td valign="middle" width="68"><img src="${SITE_URL}/logo-emblem.png" width="56" alt="" style="display:block;border:0;border-radius:12px;background:#ffffff;padding:6px"></td>
        <td valign="middle" style="padding-left:14px;font-family:${FONT};color:#ffffff">
          <div style="font-size:18px;font-weight:800;line-height:1.2">${esc(SITE_NAME)}</div>
          <div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;opacity:.85;margin-top:2px">Appliance &amp; duct services</div>
        </td>
      </tr></table>
      <div style="margin-top:22px;font-family:${FONT}">
        <span style="display:inline-block;padding:4px 12px;border-radius:999px;background:rgba(255,255,255,.18);color:#ffffff;font-size:12px;font-weight:700;letter-spacing:.5px">${esc(opts.badge)}</span>
        <div style="margin-top:12px;font-size:26px;line-height:1.25;font-weight:800;color:#ffffff">${esc(opts.title)}</div>
      </div>
    </td></tr>
    <tr><td style="padding:8px 32px 28px">${opts.body}</td></tr>
    <tr><td bgcolor="${C.tint}" style="background:${C.tint};padding:20px 32px;font-family:${FONT};font-size:12px;line-height:1.6;color:${C.soft};text-align:center">
      <strong style="color:${C.ink}">${esc(SITE_NAME)}</strong><br>
      ${link(PHONE_HREF, PHONE_DISPLAY)} &nbsp;•&nbsp; Mon–Sat 8:00 AM – 7:00 PM &nbsp;•&nbsp; Serving VA, DC &amp; MD<br>
      ${link(SITE_URL, SITE_URL.replace(/^https?:\/\//, ""))}
    </td></tr>
  </table>
</td></tr></table>
</body></html>`;
}

/** Alert for the business owner: who, what, where and when, with one-tap call, reply and map buttons. */
export function ownerEmail(d: InquiryData, ticketId: string) {
  const address = fullAddress(d);
  const phoneDigits = d.phone.replace(/[^\d+]/g, "");

  const buttons = [
    button(`tel:${phoneDigits}`, `Call ${d.name.split(" ")[0] || "customer"}`),
    d.email ? button(`mailto:${d.email}`, "Reply by email", false) : "",
    address ? button(mapsUrl(address), "Open in Maps", false) : "",
  ].join("");

  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:22px 0 4px;font-family:${FONT};font-size:14px;color:${C.soft}">
        Ticket <strong style="color:${C.ink};font-family:'SFMono-Regular',Consolas,monospace">${esc(ticketId)}</strong> &nbsp;•&nbsp; via ${esc(d.source)}
      </td></tr>
      <tr><td style="padding-top:10px">${buttons}</td></tr>
      ${sectionTitle("Customer")}
      ${row("Name", d.name)}
      ${row("Phone", d.phone, link(`tel:${phoneDigits}`, d.phone))}
      ${row("Email", d.email, d.email ? link(`mailto:${d.email}`, d.email) : undefined)}
      ${sectionTitle("Service")}
      ${row("Appliance", d.service)}
      ${row("Symptom", d.issue)}
      ${row("Billing", d.billing)}
      ${row("Diagnostic fee", "$89, credited toward an approved repair")}
      ${address ? sectionTitle("Location") : ""}
      ${row("Address", address, address ? link(mapsUrl(address), address) : undefined)}
      ${d.preferredDate || d.preferredTime ? sectionTitle("Schedule") : ""}
      ${row("Preferred date", d.preferredDate)}
      ${row("Preferred window", d.preferredTime)}
      ${d.notes ? sectionTitle("Notes") : ""}
      ${d.notes ? `<tr><td style="padding:12px 14px;background:${C.tint};border-radius:12px;font-family:${FONT};font-size:14px;line-height:1.6;color:${C.ink}">${multiline(d.notes)}</td></tr>` : ""}
    </table>`;

  const rows: [string, string][] = [
    ["Ticket", ticketId],
    ["Source", d.source],
    ["Name", d.name],
    ["Phone", d.phone],
    ["Email", d.email || "(Provided phone for SMS/Call)"],
    ["Service / Appliance", d.service],
    ["Symptom", d.issue],
    ["Billing", d.billing],
    ["Address", address],
    ["Preferred date", d.preferredDate],
    ["Preferred window", d.preferredTime],
    ["Diagnostic fee", "$89 (credited toward approved repair)"],
    ["Notes", d.notes],
  ];

  return {
    html: layout({
      preheader: `${d.name} · ${d.phone} · ${d.service || "Service request"}`,
      badge: "New service request",
      title: d.service ? `${d.service} for ${d.name}` : `New request from ${d.name}`,
      body,
    }),
    text: rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n"),
  };
}

/** Confirmation for the customer: a summary of what they sent and what happens next. */
export function customerEmail(d: InquiryData, ticketId: string) {
  const address = fullAddress(d);
  const firstName = d.name.split(" ")[0] || d.name;

  const steps: [string, string][] = [
    ["We review your request", "A dispatch coordinator looks at your appliance and location."],
    ["We call or text you", `We contact you at ${d.phone} to confirm your technician's arrival window.`],
    ["Your technician arrives", "Honest diagnosis and a clear quote before any work begins. The $89 diagnostic fee is credited toward an approved repair."],
  ];

  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:24px 0 6px;font-family:${FONT};font-size:16px;line-height:1.6;color:${C.ink}">
        Hi ${esc(firstName)}, thanks for contacting ${esc(SITE_NAME)}. Your request is in and a dispatch coordinator will reach out shortly.
      </td></tr>
      <tr><td style="padding:8px 0 4px">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr><td bgcolor="${C.tint}" style="background:${C.tint};border:1px solid ${C.line};border-radius:12px;padding:10px 16px;font-family:${FONT};font-size:12px;color:${C.soft}">
          Your ticket number<br><strong style="font-size:18px;color:${C.primaryStrong};font-family:'SFMono-Regular',Consolas,monospace">${esc(ticketId)}</strong>
        </td></tr></table>
      </td></tr>
      ${sectionTitle("Your request")}
      ${row("Appliance", d.service)}
      ${row("Symptom", d.issue)}
      ${row("Address", address)}
      ${row("Preferred date", d.preferredDate)}
      ${row("Preferred window", d.preferredTime)}
      ${sectionTitle("What happens next")}
      ${steps
        .map(
          ([title, text], i) => `<tr><td style="padding:8px 0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td width="40" valign="top"><div style="width:28px;height:28px;line-height:28px;border-radius:50%;background:${C.primary};color:#ffffff;text-align:center;font-family:${FONT};font-size:13px;font-weight:800">${i + 1}</div></td>
            <td valign="top" style="font-family:${FONT};font-size:14px;line-height:1.5;color:${C.soft}"><strong style="color:${C.ink}">${esc(title)}</strong><br>${esc(text)}</td>
          </tr></table></td></tr>`,
        )
        .join("")}
      <tr><td style="padding:22px 0 0">
        ${button(PHONE_HREF, `Call ${PHONE_DISPLAY}`)}
        <div style="font-family:${FONT};font-size:13px;color:${C.soft};margin-top:6px">Need to change something? Just reply to this email.</div>
      </td></tr>
    </table>`;

  const details: [string, string][] = [
    ["Ticket", ticketId],
    ["Service / Appliance", d.service],
    ["Symptom", d.issue],
    ["Address", address],
    ["Preferred date", d.preferredDate],
    ["Preferred window", d.preferredTime],
    ["Diagnostic fee", "$89 (credited toward approved repair)"],
  ];

  return {
    html: layout({
      preheader: `Ticket ${ticketId}: a dispatch coordinator will contact you shortly.`,
      badge: "Request received",
      title: "We received your service request",
      body,
    }),
    text: `Hi ${d.name}, we received your service request (${ticketId}). A dispatch coordinator will contact you at ${d.phone} shortly to confirm your arrival window.\n\n${details
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n")}`,
  };
}
