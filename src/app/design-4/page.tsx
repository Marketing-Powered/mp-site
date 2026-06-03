'use client';

import { useState } from 'react';
import { siteContent } from '@/lib/content';

const {
  brand,
  nav,
  hero,
  growth,
  socialProof,
  specializedMarketing,
  servicesIntro,
  services,
  stats,
  whyChoose,
  bookAudit,
  faq,
  cta,
  footer,
} = siteContent;

// ── Typography & Color Tokens ──────────────────────────────────────────
const font = "'Sora', sans-serif";

const colors = {
  bg: '#F8F9FF',
  white: '#FFFFFF',
  text: '#1A1A2E',
  textMuted: '#6B7094',
  purpleStart: '#7B2FF7',
  purpleEnd: '#2196F3',
  pinkStart: '#FF6B6B',
  pinkEnd: '#FFA726',
  darkStart: '#1A1A2E',
  darkEnd: '#2D1B69',
  glass: 'rgba(255,255,255,0.15)',
  glassBorder: 'rgba(255,255,255,0.25)',
  glassCard: 'rgba(255,255,255,0.7)',
  glassCardBorder: 'rgba(255,255,255,0.5)',
};

const gradients = {
  primary: `linear-gradient(135deg, ${colors.purpleStart}, ${colors.purpleEnd})`,
  secondary: `linear-gradient(135deg, ${colors.pinkStart}, ${colors.pinkEnd})`,
  dark: `linear-gradient(135deg, ${colors.darkStart}, ${colors.darkEnd})`,
  hero: `linear-gradient(135deg, #7B2FF7 0%, #2196F3 50%, #00BCD4 100%)`,
  purpleSubtle: `linear-gradient(135deg, rgba(123,47,247,0.08), rgba(33,150,243,0.08))`,
};

// ── Google Fonts ──────────────────────────────────────────────────────
function FontLoader() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');`,
      }}
    />
  );
}

// ── Keyframe Animations ──────────────────────────────────────────────
function Animations() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          @keyframes floatOrb1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(60px, -40px) scale(1.1); }
            66% { transform: translate(-30px, 30px) scale(0.95); }
          }
          @keyframes floatOrb2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(-50px, 50px) scale(1.05); }
            66% { transform: translate(40px, -20px) scale(0.9); }
          }
          @keyframes floatOrb3 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(30px, -60px) scale(1.08); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
          @keyframes spinSlow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          html { scroll-behavior: smooth; }
          body { overflow-x: hidden; }
        `,
      }}
    />
  );
}

// ── Section wrapper ──────────────────────────────────────────────────
function Section({
  children,
  style,
  id,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  id?: string;
}) {
  return (
    <section
      id={id}
      style={{
        padding: '100px 24px',
        maxWidth: 1200,
        margin: '0 auto',
        fontFamily: font,
        ...style,
      }}
    >
      {children}
    </section>
  );
}

// ── Service Icon Component ───────────────────────────────────────────
function ServiceIcon({ icon }: { icon: string }) {
  const iconMap: Record<string, string> = {
    target: '🎯',
    search: '🔍',
    chart: '📊',
    code: '💻',
    shield: '🛡️',
    zap: '⚡',
  };

  return (
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: 16,
        background: gradients.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 24,
        marginBottom: 20,
        flexShrink: 0,
      }}
    >
      {iconMap[icon] || '✦'}
    </div>
  );
}

// ── Gradient Text Helper ─────────────────────────────────────────────
function GradientText({
  children,
  style,
  gradient,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  gradient?: string;
}) {
  return (
    <span
      style={{
        background: gradient || gradients.primary,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        ...style,
      }}
    >
      {children}
    </span>
  );
}

// ── Chevron SVG ──────────────────────────────────────────────────────
function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={{
        transition: 'transform 0.3s ease',
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        flexShrink: 0,
      }}
    >
      <defs>
        <linearGradient id="chevronGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.purpleStart} />
          <stop offset="100%" stopColor={colors.purpleEnd} />
        </linearGradient>
      </defs>
      <path
        d="M6 9l6 6 6-6"
        stroke="url(#chevronGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ══════════════════════════════════════════════════════════════════════
// ██ MAIN PAGE COMPONENT
// ══════════════════════════════════════════════════════════════════════
export default function Design4Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div
      style={{
        fontFamily: font,
        background: colors.bg,
        color: colors.text,
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      <FontLoader />
      <Animations />

      {/* ── 1. FLOATING GLASS NAV ─────────────────────────────────── */}
      <nav
        style={{
          position: 'fixed',
          top: 16,
          left: 16,
          right: 16,
          zIndex: 1000,
          background: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.5)',
          boxShadow: '0 8px 32px rgba(123,47,247,0.08), 0 2px 8px rgba(0,0,0,0.04)',
          padding: '14px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 800,
            fontFamily: font,
            letterSpacing: '-0.5px',
          }}
        >
          <GradientText>{brand.name}</GradientText>
        </div>

        {/* Desktop nav links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 32,
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 28,
              alignItems: 'center',
            }}
            className="nav-links-desktop"
          >
            {nav.map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  textDecoration: 'none',
                  color: colors.text,
                  fontSize: 14,
                  fontWeight: 500,
                  fontFamily: font,
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = colors.purpleStart)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = colors.text)
                }
              >
                {item}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            style={{
              background: gradients.primary,
              color: '#fff',
              padding: '10px 24px',
              borderRadius: 50,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: font,
              textDecoration: 'none',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 15px rgba(123,47,247,0.3)',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow =
                '0 6px 20px rgba(123,47,247,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow =
                '0 4px 15px rgba(123,47,247,0.3)';
            }}
            className="nav-cta-desktop"
          >
            {hero.cta}
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
            }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            <div
              style={{
                width: 24,
                height: 2,
                background: colors.purpleStart,
                borderRadius: 2,
                marginBottom: 6,
                transition: 'transform 0.3s',
                transform: mobileMenu ? 'rotate(45deg) translate(4px, 4px)' : 'none',
              }}
            />
            <div
              style={{
                width: 24,
                height: 2,
                background: colors.purpleStart,
                borderRadius: 2,
                marginBottom: 6,
                opacity: mobileMenu ? 0 : 1,
                transition: 'opacity 0.3s',
              }}
            />
            <div
              style={{
                width: 24,
                height: 2,
                background: colors.purpleStart,
                borderRadius: 2,
                transition: 'transform 0.3s',
                transform: mobileMenu ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
              }}
            />
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenu && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: 8,
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: 16,
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255,255,255,0.5)',
            }}
          >
            {nav.map((item) => (
              <a
                key={item}
                href="#"
                onClick={() => setMobileMenu(false)}
                style={{
                  textDecoration: 'none',
                  color: colors.text,
                  fontSize: 16,
                  fontWeight: 500,
                  fontFamily: font,
                  padding: '4px 0',
                }}
              >
                {item}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenu(false)}
              style={{
                background: gradients.primary,
                color: '#fff',
                padding: '12px 24px',
                borderRadius: 50,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: font,
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              {hero.cta}
            </a>
          </div>
        )}
      </nav>

      {/* Responsive styles injected */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 768px) {
              .nav-links-desktop { display: none !important; }
              .nav-cta-desktop { display: none !important; }
              .mobile-menu-btn { display: block !important; }
              .hero-grid { flex-direction: column !important; text-align: center !important; }
              .hero-heading { font-size: 40px !important; }
              .services-grid { grid-template-columns: 1fr !important; }
              .stats-grid { grid-template-columns: 1fr 1fr !important; }
              .why-card { flex-direction: column !important; }
              .footer-grid { grid-template-columns: 1fr !important; text-align: center !important; }
              .growth-inner { flex-direction: column !important; }
            }
            @media (min-width: 769px) {
              .mobile-menu-btn { display: none !important; }
            }
            @media (max-width: 480px) {
              .stats-grid { grid-template-columns: 1fr !important; }
              .hero-heading { font-size: 32px !important; }
            }
          `,
        }}
      />

      {/* ── 2. HERO SECTION ───────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '140px 24px 100px',
          overflow: 'hidden',
          background: colors.bg,
        }}
      >
        {/* Animated gradient orbs */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '-5%',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(123,47,247,0.15) 0%, transparent 70%)',
            animation: 'floatOrb1 12s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '5%',
            right: '-8%',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(33,150,243,0.12) 0%, transparent 70%)',
            animation: 'floatOrb2 15s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '60%',
            width: 350,
            height: 350,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,107,107,0.1) 0%, transparent 70%)',
            animation: 'floatOrb3 10s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />

        {/* Decorative floating glass cards */}
        <div
          style={{
            position: 'absolute',
            top: '18%',
            right: '8%',
            width: 140,
            height: 90,
            borderRadius: 16,
            background: 'rgba(255,255,255,0.4)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.5)',
            animation: 'floatOrb1 8s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '5%',
            width: 100,
            height: 100,
            borderRadius: 20,
            background: 'rgba(123,47,247,0.08)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(123,47,247,0.1)',
            animation: 'floatOrb2 11s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '60%',
            right: '15%',
            width: 80,
            height: 60,
            borderRadius: 14,
            background: 'rgba(33,150,243,0.08)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            border: '1px solid rgba(33,150,243,0.1)',
            animation: 'floatOrb3 9s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: 800,
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <h1
            className="hero-heading"
            style={{
              fontSize: 64,
              fontWeight: 800,
              fontFamily: font,
              lineHeight: 1.1,
              marginBottom: 24,
              letterSpacing: '-2px',
            }}
          >
            <GradientText gradient={gradients.hero}>{hero.headline}</GradientText>
          </h1>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.7,
              color: colors.textMuted,
              maxWidth: 600,
              margin: '0 auto 40px',
              fontFamily: font,
              fontWeight: 400,
            }}
          >
            {hero.subheadline}
          </p>
          <a
            href={hero.ctaLink}
            style={{
              display: 'inline-block',
              background: gradients.primary,
              color: '#fff',
              padding: '16px 40px',
              borderRadius: 50,
              fontSize: 16,
              fontWeight: 700,
              fontFamily: font,
              textDecoration: 'none',
              boxShadow: '0 8px 30px rgba(123,47,247,0.35)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              letterSpacing: '0.5px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.08)';
              e.currentTarget.style.boxShadow =
                '0 12px 40px rgba(123,47,247,0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow =
                '0 8px 30px rgba(123,47,247,0.35)';
            }}
          >
            {hero.cta}
          </a>

          {/* Hero Image */}
          {hero.image && (
            <div
              style={{
                marginTop: 60,
                borderRadius: 24,
                padding: 3,
                background: gradients.hero,
                display: 'inline-block',
                boxShadow: '0 20px 60px rgba(123,47,247,0.2)',
              }}
            >
              <img
                src={hero.image}
                alt={hero.imageAlt}
                style={{
                  display: 'block',
                  width: '100%',
                  maxWidth: 700,
                  borderRadius: 22,
                  objectFit: 'cover',
                }}
              />
            </div>
          )}
        </div>
      </section>

      {/* ── 3. GROWTH SECTION ─────────────────────────────────────── */}
      <section
        style={{
          padding: '0 24px 100px',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            borderRadius: 24,
            background: gradients.primary,
            padding: 3,
          }}
        >
          <div
            style={{
              borderRadius: 22,
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              padding: '60px',
            }}
          >
            <div
              className="growth-inner"
              style={{
                display: 'flex',
                gap: 48,
                alignItems: 'flex-start',
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    width: 60,
                    height: 4,
                    borderRadius: 2,
                    background: gradients.primary,
                    marginBottom: 24,
                  }}
                />
                <h2
                  style={{
                    fontSize: 36,
                    fontWeight: 800,
                    fontFamily: font,
                    lineHeight: 1.2,
                    marginBottom: 20,
                    letterSpacing: '-1px',
                  }}
                >
                  <GradientText>{growth.headline}</GradientText>
                </h2>
                <p
                  style={{
                    fontSize: 16,
                    lineHeight: 1.8,
                    color: colors.textMuted,
                    fontFamily: font,
                  }}
                >
                  {growth.body}
                </p>
              </div>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: 16,
                    lineHeight: 1.8,
                    color: colors.textMuted,
                    fontFamily: font,
                  }}
                >
                  {growth.body2}
                </p>
                {growth.body3 && (
                  <p
                    style={{
                      fontSize: 16,
                      lineHeight: 1.8,
                      color: colors.textMuted,
                      fontFamily: font,
                      marginTop: 16,
                    }}
                  >
                    {growth.body3}
                  </p>
                )}
              </div>
            </div>

            {/* Growth Image */}
            {growth.image && (
              <div
                style={{
                  marginTop: 40,
                  borderRadius: 20,
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(123,47,247,0.1)',
                }}
              >
                <img
                  src={growth.image}
                  alt={growth.imageAlt}
                  style={{
                    display: 'block',
                    width: '100%',
                    borderRadius: 20,
                    objectFit: 'cover',
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 4. SOCIAL PROOF ───────────────────────────────────────── */}
      <section
        style={{
          padding: '40px 24px 80px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            padding: '14px 36px',
            borderRadius: 50,
            background: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '2px solid transparent',
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), ${gradients.primary}`,
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            boxShadow: '0 4px 20px rgba(123,47,247,0.1)',
          }}
        >
          <span
            style={{
              fontSize: 16,
              fontWeight: 600,
              fontFamily: font,
            }}
          >
            <GradientText>{socialProof}</GradientText>
          </span>
        </div>
      </section>

      {/* ── 4b. SPECIALIZED MARKETING ─────────────────────────────── */}
      <Section>
        <div
          style={{
            display: 'flex',
            gap: 48,
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}
          className="growth-inner"
        >
          <div style={{ flex: 1, minWidth: 300 }}>
            <h2
              style={{
                fontSize: 42,
                fontWeight: 800,
                fontFamily: font,
                marginBottom: 24,
                letterSpacing: '-1.5px',
              }}
            >
              <GradientText>{specializedMarketing.headline}</GradientText>
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.8,
                color: colors.textMuted,
                fontFamily: font,
                marginBottom: 16,
              }}
            >
              {specializedMarketing.body}
            </p>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.8,
                color: colors.textMuted,
                fontFamily: font,
                marginBottom: 16,
              }}
            >
              {specializedMarketing.body2}
            </p>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.8,
                color: colors.textMuted,
                fontFamily: font,
                marginBottom: 16,
              }}
            >
              {specializedMarketing.body3}
            </p>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.8,
                color: colors.textMuted,
                fontFamily: font,
              }}
            >
              {specializedMarketing.body4}
            </p>
          </div>
          {specializedMarketing.image && (
            <div style={{ flex: 1, minWidth: 300 }}>
              <div
                style={{
                  borderRadius: 24,
                  padding: 3,
                  background: gradients.secondary,
                  boxShadow: '0 16px 48px rgba(255,107,107,0.12)',
                }}
              >
                <img
                  src={specializedMarketing.image}
                  alt={specializedMarketing.imageAlt}
                  style={{
                    display: 'block',
                    width: '100%',
                    borderRadius: 22,
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* ── 5. SERVICES ───────────────────────────────────────────── */}
      <Section id="services">
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2
            style={{
              fontSize: 42,
              fontWeight: 800,
              fontFamily: font,
              marginBottom: 16,
              letterSpacing: '-1.5px',
            }}
          >
            <GradientText>{servicesIntro.headline}</GradientText>
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: colors.textMuted,
              maxWidth: 600,
              margin: '0 auto',
              fontFamily: font,
            }}
          >
            {servicesIntro.body}
          </p>
        </div>

        <div
          className="services-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}
        >
          {services.map((service, i) => (
            <div
              key={i}
              style={{
                background: colors.glassCard,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.6)',
                borderRadius: 20,
                padding: 32,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'default',
                boxShadow: '0 4px 24px rgba(123,47,247,0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow =
                  '0 16px 48px rgba(123,47,247,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 4px 24px rgba(123,47,247,0.06)';
              }}
            >
              <ServiceIcon icon={service.icon} />
              <h3
                style={{
                  fontSize: 19,
                  fontWeight: 700,
                  fontFamily: font,
                  marginBottom: 12,
                  color: colors.text,
                  letterSpacing: '-0.3px',
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: colors.textMuted,
                  fontFamily: font,
                }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 6. STATS / PROVEN RESULTS ─────────────────────────────── */}
      <section
        style={{
          background: gradients.primary,
          padding: '100px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decorative orbs */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            animation: 'floatOrb1 14s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-15%',
            left: '-5%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
            animation: 'floatOrb2 12s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <h2
            style={{
              fontSize: 42,
              fontWeight: 800,
              fontFamily: font,
              textAlign: 'center',
              color: '#fff',
              marginBottom: 60,
              letterSpacing: '-1.5px',
            }}
          >
            Proven Results
          </h2>

          <div
            className="stats-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
              gap: 20,
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: 20,
                  padding: 28,
                  textAlign: 'center',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  style={{
                    fontSize: 40,
                    fontWeight: 800,
                    fontFamily: font,
                    color: '#fff',
                    marginBottom: 8,
                    letterSpacing: '-1px',
                  }}
                >
                  {stat.value}
                </div>
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: 'rgba(255,255,255,0.8)',
                    fontFamily: font,
                    fontWeight: 400,
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. WHY CHOOSE ─────────────────────────────────────────── */}
      <Section id="why">
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2
            style={{
              fontSize: 42,
              fontWeight: 800,
              fontFamily: font,
              marginBottom: 16,
              letterSpacing: '-1.5px',
            }}
          >
            <GradientText>{whyChoose.headline}</GradientText>
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: colors.textMuted,
              maxWidth: 700,
              margin: '0 auto',
              fontFamily: font,
            }}
          >
            {whyChoose.body}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          {whyChoose.cards.map((card, i) => (
            <div
              key={i}
              className="why-card"
              style={{
                display: 'flex',
                alignItems: 'stretch',
                gap: 0,
                borderRadius: 20,
                overflow: 'hidden',
                background: colors.glassCard,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.6)',
                boxShadow: '0 4px 24px rgba(123,47,247,0.06)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow =
                  '0 12px 40px rgba(123,47,247,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 4px 24px rgba(123,47,247,0.06)';
              }}
            >
              {/* Gradient left border accent */}
              <div
                style={{
                  width: 6,
                  flexShrink: 0,
                  background: i % 2 === 0 ? gradients.primary : gradients.secondary,
                  borderRadius: '20px 0 0 20px',
                }}
              />
              <div style={{ padding: '32px 36px', flex: 1 }}>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    fontFamily: font,
                    marginBottom: 10,
                    color: colors.text,
                    letterSpacing: '-0.5px',
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.8,
                    color: colors.textMuted,
                    fontFamily: font,
                  }}
                >
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 8. FAQ ────────────────────────────────────────────────── */}
      <Section id="faq">
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2
            style={{
              fontSize: 42,
              fontWeight: 800,
              fontFamily: font,
              marginBottom: 16,
              letterSpacing: '-1.5px',
            }}
          >
            <GradientText>Frequently Asked Questions</GradientText>
          </h2>
        </div>

        <div
          style={{
            maxWidth: 800,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {faq.map((item, i) => (
            <div
              key={i}
              style={{
                background: colors.glassCard,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.6)',
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(123,47,247,0.05)',
                transition: 'box-shadow 0.3s ease',
              }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  padding: '24px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  fontFamily: font,
                  fontSize: 17,
                  fontWeight: 600,
                  color: colors.text,
                  textAlign: 'left',
                  gap: 16,
                }}
              >
                <span>{item.question}</span>
                <Chevron open={openFaq === i} />
              </button>
              <div
                style={{
                  maxHeight: openFaq === i ? 500 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.4s ease',
                }}
              >
                <p
                  style={{
                    padding: '0 28px 24px',
                    fontSize: 15,
                    lineHeight: 1.8,
                    color: colors.textMuted,
                    fontFamily: font,
                  }}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 8b. BOOK AUDIT ──────────────────────────────────────── */}
      <section
        style={{
          padding: '0 24px 100px',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            borderRadius: 24,
            background: gradients.secondary,
            padding: 3,
          }}
        >
          <div
            style={{
              borderRadius: 22,
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              padding: '60px',
            }}
          >
            <div
              className="growth-inner"
              style={{
                display: 'flex',
                gap: 48,
                alignItems: 'flex-start',
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    width: 60,
                    height: 4,
                    borderRadius: 2,
                    background: gradients.secondary,
                    marginBottom: 24,
                  }}
                />
                <h2
                  style={{
                    fontSize: 36,
                    fontWeight: 800,
                    fontFamily: font,
                    lineHeight: 1.2,
                    marginBottom: 20,
                    letterSpacing: '-1px',
                  }}
                >
                  <GradientText gradient={gradients.secondary}>
                    {bookAudit.headline}
                  </GradientText>
                </h2>
                <p
                  style={{
                    fontSize: 16,
                    lineHeight: 1.8,
                    color: colors.textMuted,
                    fontFamily: font,
                    marginBottom: 16,
                  }}
                >
                  {bookAudit.body}
                </p>
                <p
                  style={{
                    fontSize: 16,
                    lineHeight: 1.8,
                    color: colors.textMuted,
                    fontFamily: font,
                  }}
                >
                  {bookAudit.body2}
                </p>
              </div>
              {bookAudit.image && (
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      borderRadius: 20,
                      overflow: 'hidden',
                      boxShadow: '0 8px 32px rgba(255,107,107,0.12)',
                    }}
                  >
                    <img
                      src={bookAudit.image}
                      alt={bookAudit.imageAlt}
                      style={{
                        display: 'block',
                        width: '100%',
                        borderRadius: 20,
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. CTA ────────────────────────────────────────────────── */}
      <section
        id="contact"
        style={{
          background: gradients.primary,
          padding: '100px 24px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative orbs */}
        <div
          style={{
            position: 'absolute',
            top: '-30%',
            left: '20%',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            animation: 'floatOrb1 16s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-20%',
            right: '10%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
            animation: 'floatOrb2 13s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: 700,
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <h2
            style={{
              fontSize: 48,
              fontWeight: 800,
              fontFamily: font,
              color: '#fff',
              marginBottom: 20,
              letterSpacing: '-1.5px',
            }}
          >
            {cta.headline}
          </h2>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.85)',
              marginBottom: 40,
              fontFamily: font,
            }}
          >
            {cta.body}
          </p>
          <a
            href={cta.ctaLink}
            style={{
              display: 'inline-block',
              background: '#fff',
              color: colors.purpleStart,
              padding: '16px 44px',
              borderRadius: 50,
              fontSize: 16,
              fontWeight: 700,
              fontFamily: font,
              textDecoration: 'none',
              boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              letterSpacing: '0.5px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.08)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
            }}
          >
            {cta.ctaText}
          </a>
        </div>
      </section>

      {/* ── 10. FOOTER ────────────────────────────────────────────── */}
      <footer
        style={{
          background: gradients.dark,
          padding: '80px 24px 40px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle gradient orb accent */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(123,47,247,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          className="footer-grid"
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr',
            gap: 48,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Brand column */}
          <div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 800,
                fontFamily: font,
                marginBottom: 16,
              }}
            >
              <GradientText
                gradient="linear-gradient(135deg, #A78BFA, #60A5FA)"
              >
                {brand.name}
              </GradientText>
            </div>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.6)',
                fontFamily: font,
                marginBottom: 24,
                maxWidth: 350,
              }}
            >
              {footer.tagline}
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.5)',
                  fontFamily: font,
                }}
              >
                {brand.phone}
              </span>
              <span
                style={{
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.5)',
                  fontFamily: font,
                }}
              >
                {brand.email}
              </span>
            </div>
          </div>

          {/* Services column */}
          <div>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 700,
                fontFamily: font,
                color: 'rgba(255,255,255,0.9)',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: 20,
              }}
            >
              Services
            </h4>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {footer.services.map((service, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.5)',
                    textDecoration: 'none',
                    fontFamily: font,
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')
                  }
                >
                  {service}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 700,
                fontFamily: font,
                color: 'rgba(255,255,255,0.9)',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: 20,
              }}
            >
              Quick Links
            </h4>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {nav.map((item, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.5)',
                    textDecoration: 'none',
                    fontFamily: font,
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')
                  }
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            maxWidth: 1200,
            margin: '48px auto 0',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: 24,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <p
            style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.35)',
              fontFamily: font,
              textAlign: 'center',
            }}
          >
            {footer.copyright}
          </p>
        </div>
      </footer>
    </div>
  );
}
