import { ImageResponse } from "next/og";

export const alt = "AbdurRahman Mahmood — Business & Creative Strategist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          padding: "64px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            color: "#d0d0d0",
            textTransform: "uppercase",
          }}
        >
          Business &amp; Creative Strategist
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 128,
            fontWeight: 800,
            lineHeight: 1,
            color: "#dbff00",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex" }}>AbdurRahman</div>
          <div style={{ display: "flex", color: "#ffffff" }}>Mahmood</div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#ffffff",
          }}
        >
          Strategy · Branding · AI &amp; Automation · Growth
        </div>
      </div>
    ),
    size
  );
}
