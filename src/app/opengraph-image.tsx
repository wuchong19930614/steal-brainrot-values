import { ImageResponse } from "next/og";
import { siteName } from "@/lib/seo";

export const alt = siteName;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: 80,
          background: "#172026",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 16,
            background: "#2c68c9",
            fontSize: 34,
            fontWeight: 800,
            marginBottom: 40,
          }}
        >
          SBV
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 800, lineHeight: 1.1 }}>
          Steal a Brainrot Values
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 32,
            color: "#9fb0b8",
          }}
        >
          Value list, calculator & tier list
        </div>
      </div>
    ),
    { ...size },
  );
}
