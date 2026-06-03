"use client";

import Link from "next/link";

const designs = [
  {
    id: 1,
    name: "Clean Minimal",
    description:
      "Lots of whitespace, thin sans-serif typography, subtle animations, and a muted palette. Understated elegance for a refined brand feel.",
    colors: ["#FAFAFA", "#1A1A2E", "#4A90D9", "#F0F0F5"],
    font: "Inter",
    mood: "Minimal / Elegant / Airy",
  },
  {
    id: 2,
    name: "Bold Agency",
    description:
      "Dark background, oversized type, neon cyan and magenta accents, glowing effects, and full-bleed sections. Dramatic and cutting-edge.",
    colors: ["#0A0A0A", "#00F0FF", "#FF2D6B", "#111111"],
    font: "Space Grotesk",
    mood: "Bold / Dramatic / Neon",
  },
  {
    id: 3,
    name: "Editorial / Magazine",
    description:
      "Serif headings, column layouts, refined spacing, and warm neutrals. Print-inspired design that feels like a luxury publication.",
    colors: ["#FAF8F5", "#2D2A26", "#C4962C", "#8B2252"],
    font: "Playfair Display + DM Sans",
    mood: "Editorial / Refined / Warm",
  },
  {
    id: 4,
    name: "Gradient Modern",
    description:
      "Vibrant gradient backgrounds, glassmorphism cards, rounded corners, and animated floating elements. Modern SaaS aesthetic.",
    colors: ["#F8F9FF", "#7B2FF7", "#2196F3", "#FF6B6B"],
    font: "Sora",
    mood: "Vibrant / Playful / Modern",
  },
  {
    id: 5,
    name: "Corporate Premium",
    description:
      "Navy and gold palette, structured grids, trust signals prominent. Polished and institutional — like a Fortune 500 brand.",
    colors: ["#0B1A3B", "#D4A843", "#FFFFFF", "#F4F5F7"],
    font: "Inter",
    mood: "Premium / Trustworthy / Structured",
  },
];

export default function DesignGallery() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0F0F12",
        color: "#FFFFFF",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: "60px 24px 40px",
          maxWidth: 1200,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "6px 16px",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 100,
            fontSize: 13,
            color: "rgba(255,255,255,0.6)",
            marginBottom: 24,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Homepage Design Concepts
        </div>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: 16,
            background: "linear-gradient(135deg, #FFFFFF, #7B8BA8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Marketing Powered
        </h1>
        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "rgba(255,255,255,0.5)",
            maxWidth: 600,
            margin: "0 auto 16px",
            lineHeight: 1.6,
          }}
        >
          5 unique homepage directions — same content, completely different
          visual treatments. Click any design to preview it full-screen.
        </p>
      </header>

      {/* Design Grid */}
      <main
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px 80px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: 24,
        }}
      >
        {designs.map((design) => (
          <Link
            key={design.id}
            href={`/design-${design.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <article
              style={{
                background: "#1A1A20",
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                e.currentTarget.style.boxShadow =
                  "0 20px 60px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Color Preview Bar */}
              <div
                style={{
                  height: 120,
                  display: "flex",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {design.colors.map((color, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      background: color,
                      position: "relative",
                    }}
                  />
                ))}
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    left: 16,
                    background: "rgba(0,0,0,0.6)",
                    backdropFilter: "blur(8px)",
                    padding: "4px 12px",
                    borderRadius: 100,
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                  }}
                >
                  Design {design.id}
                </div>
              </div>

              {/* Card Content */}
              <div style={{ padding: "20px 24px 24px" }}>
                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: 8,
                    lineHeight: 1.3,
                  }}
                >
                  {design.name}
                </h2>

                <p
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.6,
                    marginBottom: 16,
                  }}
                >
                  {design.description}
                </p>

                {/* Meta */}
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    flexWrap: "wrap",
                    marginBottom: 16,
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.35)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Font
                    </span>
                    <div style={{ fontSize: 13, marginTop: 2 }}>
                      {design.font}
                    </div>
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.35)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Mood
                    </span>
                    <div style={{ fontSize: 13, marginTop: 2 }}>
                      {design.mood}
                    </div>
                  </div>
                </div>

                {/* Color Swatches */}
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginBottom: 20,
                  }}
                >
                  {design.colors.map((color, i) => (
                    <div
                      key={i}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: color,
                        border:
                          color === "#FFFFFF" ||
                          color === "#FAFAFA" ||
                          color === "#FAF8F5" ||
                          color === "#F8F9FF" ||
                          color === "#F4F5F7" ||
                          color === "#F0F0F5"
                            ? "1px solid rgba(255,255,255,0.2)"
                            : "1px solid transparent",
                      }}
                      title={color}
                    />
                  ))}
                </div>

                {/* View Button */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#7B8BA8",
                    transition: "color 0.2s",
                  }}
                >
                  View Design
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    style={{ transition: "transform 0.2s" }}
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "24px",
          textAlign: "center",
          color: "rgba(255,255,255,0.3)",
          fontSize: 13,
        }}
      >
        Marketing Powered — Homepage Design Concepts
      </footer>
    </div>
  );
}
