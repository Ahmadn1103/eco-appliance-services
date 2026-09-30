import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "Eco Appliance Services - Appliance repair & installation in DC, MD & VA";

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #064e3b 0%, #059669 100%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 700, opacity: 0.85 }}>Eco Appliance Services</div>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.1, marginTop: 24 }}>
          Appliance Repair &amp; Installation
        </div>
        <div style={{ fontSize: 38, marginTop: 32, opacity: 0.9 }}>
          Washington DC · Maryland · Northern Virginia
        </div>
        <div style={{ fontSize: 34, marginTop: 48, fontWeight: 700 }}>(571) 462-1813</div>
      </div>
    ),
    ogSize,
  );
}
