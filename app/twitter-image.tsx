import { ImageResponse } from "next/og";
import { BUSINESS } from "@/content/business";

export const alt = `${BUSINESS.brandName} — Licensed Cross-Border Taxi, Bahrain to Saudi Arabia`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#0d0d0d",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              width: 14,
              height: 56,
              backgroundColor: "#4285f4",
              borderRadius: 4,
            }}
          />
          <div style={{ fontSize: 30, fontWeight: 700, color: "#669df6", letterSpacing: -0.5 }}>
            King Fahd Causeway
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 66,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.1,
            letterSpacing: -1.5,
            maxWidth: 980,
          }}
        >
          {BUSINESS.brandName}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#a3a3a3",
            marginTop: 28,
            maxWidth: 900,
          }}
        >
          Licensed cross-border taxi &amp; chauffeur — Bahrain to Saudi Arabia
        </div>
        <div
          style={{
            display: "flex",
            gap: 28,
            marginTop: 48,
            fontSize: 26,
            color: "#4285f4",
            fontWeight: 600,
          }}
        >
          <div style={{ display: "flex" }}>Fixed Fares</div>
          <div style={{ display: "flex" }}>·</div>
          <div style={{ display: "flex" }}>Licensed Drivers</div>
          <div style={{ display: "flex" }}>·</div>
          <div style={{ display: "flex" }}>24/7 Booking</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
