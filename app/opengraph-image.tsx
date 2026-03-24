import { ImageResponse } from "next/og";

export const alt = "Winmore Creations - bespoke carpentry, interiors, and flooring in Victoria Falls";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background:
            "linear-gradient(135deg, #f6efe6 0%, #ead9c2 36%, #2c1a0e 100%)",
          color: "#2c1a0e",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "56px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background:
              "repeating-linear-gradient(90deg, rgba(196,149,106,0.18) 0px, rgba(196,149,106,0.18) 1px, transparent 1px, transparent 40px)",
            inset: 0,
            position: "absolute",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
            width: "100%",
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              gap: 18,
            }}
          >
            <div
              style={{
                alignItems: "center",
                background: "linear-gradient(135deg, #2c1a0e 0%, #8f5f39 100%)",
                borderRadius: 24,
                color: "#f8f0e6",
                display: "flex",
                fontFamily: "Georgia",
                fontSize: 36,
                height: 88,
                justifyContent: "center",
                width: 88,
              }}
            >
              WM
            </div>
            <div
              style={{
                color: "#8f5f39",
              display: "flex",
              fontSize: 28,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Victoria Falls · Zimbabwe
          </div>
          </div>
          <div
            style={{
              border: "1px solid rgba(44,26,14,0.2)",
              borderRadius: 999,
              color: "#2c1a0e",
              display: "flex",
              fontSize: 26,
              padding: "14px 24px",
            }}
          >
            Since 2016
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            maxWidth: 920,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 30,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Winmore Creations
          </div>
          <div
            style={{
              color: "#2c1a0e",
              display: "flex",
              fontFamily: "Georgia",
              fontSize: 88,
              lineHeight: 1,
            }}
          >
            Craft that defines a space.
          </div>
          <div
            style={{
              color: "rgba(44,26,14,0.72)",
              display: "flex",
              fontSize: 34,
              lineHeight: 1.35,
              maxWidth: 820,
            }}
          >
            Bespoke carpentry, interior design, epoxy flooring, and wooden floors for
            homes, lodges, and brands ready to stand out.
          </div>
        </div>

        <div
          style={{
            alignItems: "flex-end",
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
            width: "100%",
          }}
        >
          <div
            style={{
              color: "rgba(44,26,14,0.7)",
              display: "flex",
              fontSize: 26,
              maxWidth: 680,
            }}
          >
            Bespoke Furniture · Interior Design · Epoxy Flooring · Hardwood Floors
          </div>
          <div
            style={{
              borderLeft: "2px solid #c4956a",
              color: "#f8f0e6",
              display: "flex",
              fontFamily: "Georgia",
              fontSize: 34,
              fontStyle: "italic",
              marginLeft: 32,
              paddingLeft: 24,
            }}
          >
            Every grain tells a story.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
