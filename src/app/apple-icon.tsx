import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#172026",
          color: "#ffffff",
          fontFamily: "sans-serif",
          fontSize: 64,
          fontWeight: 800,
        }}
      >
        SBV
      </div>
    ),
    { ...size },
  );
}
