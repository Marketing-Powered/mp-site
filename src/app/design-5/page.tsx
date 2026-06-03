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
const font = "'Inter', sans-serif";

const c = {
  navy: '#0B1A3B',
  navyLight: '#122450',
  navyDark: '#060E20',
  gold: '#D4A843',
  goldLight: '#E2C06A',
  goldDark: '#B8922F',
  white: '#FFFFFF',
  lightGray: '#F4F5F7',
  gray: '#8A93A6',
  textBody: '#4A5568',
  border: '#E2E4E9',
};

// ── Google Fonts ──────────────────────────────────────────────────────
function FontLoader() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');`,
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
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes subtleFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          @keyframes rotateSlow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html { scroll-behavior: smooth; }
          body { overflow-x: hidden; }
        `,
      }}
    />
  );
}

// ── Icon Components ──────────────────────────────────────────────────
function ServiceIcon({ icon, size = 32 }: { icon: string; size?: number }) {
  const s: React.CSSProperties = { width: size, height: size };
  switch (icon) {
    case 'target':
      return (
        <svg style={s} viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="12" stroke={c.gold} strokeWidth="2" />
          <circle cx="16" cy="16" r="7" stroke={c.gold} strokeWidth="2" />
          <circle cx="16" cy="16" r="2.5" fill={c.gold} />
        </svg>
      );
    case 'search':
      return (
        <svg style={s} viewBox="0 0 32 32" fill="none">
          <circle cx="14" cy="14" r="8" stroke={c.gold} strokeWidth="2" />
          <line x1="20" y1="20" x2="27" y2="27" stroke={c.gold} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'chart':
      return (
        <svg style={s} viewBox="0 0 32 32" fill="none">
          <rect x="4" y="18" width="5" height="10" rx="1" fill={c.gold} />
          <rect x="13" y="10" width="5" height="18" rx="1" fill={c.gold} />
          <rect x="22" y="4" width="5" height="24" rx="1" fill={c.gold} />
        </svg>
      );
    case 'code':
      return (
        <svg style={s} viewBox="0 0 32 32" fill="none">
          <polyline points="10,8 3,16 10,24" stroke={c.gold} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="22,8 29,16 22,24" stroke={c.gold} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="18" y1="5" x2="14" y2="27" stroke={c.gold} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'shield':
      return (
        <svg style={s} viewBox="0 0 32 32" fill="none">
          <path d="M16 3L4 8v8c0 7.2 5.1 13.2 12 15 6.9-1.8 12-7.8 12-15V8L16 3z" stroke={c.gold} strokeWidth="2" fill="none" />
          <polyline points="11,16 14.5,19.5 21,12" stroke={c.gold} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'zap':
      return (
        <svg style={s} viewBox="0 0 32 32" fill="none">
          <polygon points="18,2 7,18 15,18 13,30 25,14 17,14" fill={c.gold} />
        </svg>
      );
    default:
      return (
        <svg style={s} viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="12" stroke={c.gold} strokeWidth="2" />
        </svg>
      );
  }
}

// ── Shared Styles ────────────────────────────────────────────────────
const section = (bg: string, extra?: React.CSSProperties): React.CSSProperties => ({
  width: '100%',
  background: bg,
  fontFamily: font,
  ...extra,
});

const container: React.CSSProperties = {
  maxWidth: 1200,
  margin: '0 auto',
  padding: '0 24px',
  width: '100%',
};

const heading = (size: number, color: string, weight = 700): React.CSSProperties => ({
  fontFamily: font,
  fontSize: size,
  fontWeight: weight,
  color,
  lineHeight: 1.2,
  letterSpacing: '-0.02em',
});

// ═══════════════════════════════════════════════════════════════════════
// ── NAVIGATION ───────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════
function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav
      style={{
        ...section(c.navy),
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: `1px solid rgba(212,168,67,0.15)`,
      }}
    >
      <div
        style={{
          ...container,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 72,
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              background: `linear-gradient(135deg, ${c.gold}, ${c.goldLight})`,
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: c.navy, fontWeight: 900, fontSize: 18, fontFamily: font }}>
              M
            </span>
          </div>
          <span style={{ color: c.white, fontWeight: 700, fontSize: 18, fontFamily: font, letterSpacing: '-0.01em' }}>
            {brand.name.split(' ')[0]}{' '}
            <span style={{ color: c.gold }}>{brand.name.split(' ')[1]}</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 36,
          }}
          className="desktop-nav"
        >
          {nav.map((item) => (
            <a
              key={item}
              href="#"
              style={{
                color: c.white,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 500,
                fontFamily: font,
                letterSpacing: '0.02em',
                transition: 'color 0.2s',
                opacity: 0.85,
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = c.gold;
                (e.target as HTMLElement).style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = c.white;
                (e.target as HTMLElement).style.opacity = '0.85';
              }}
            >
              {item}
            </a>
          ))}
          <a
            href="#"
            style={{
              color: c.gold,
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: 600,
              fontFamily: font,
              letterSpacing: '0.08em',
              border: `2px solid ${c.gold}`,
              padding: '9px 24px',
              borderRadius: 4,
              transition: 'all 0.3s',
              textTransform: 'uppercase' as const,
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = c.gold;
              (e.target as HTMLElement).style.color = c.navy;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = 'transparent';
              (e.target as HTMLElement).style.color = c.gold;
            }}
          >
            {hero.cta}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="mobile-menu-btn"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
          }}
        >
          <div style={{ width: 24, height: 2, background: c.gold, marginBottom: 6, transition: 'all 0.3s', transform: mobileOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
          <div style={{ width: 24, height: 2, background: c.gold, marginBottom: 6, opacity: mobileOpen ? 0 : 1, transition: 'all 0.3s' }} />
          <div style={{ width: 24, height: 2, background: c.gold, transition: 'all 0.3s', transform: mobileOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            background: c.navy,
            borderTop: `1px solid rgba(212,168,67,0.15)`,
            padding: '24px',
          }}
          className="mobile-nav"
        >
          {nav.map((item) => (
            <a
              key={item}
              href="#"
              style={{
                display: 'block',
                color: c.white,
                textDecoration: 'none',
                fontSize: 16,
                fontWeight: 500,
                fontFamily: font,
                padding: '12px 0',
                borderBottom: `1px solid rgba(255,255,255,0.08)`,
              }}
            >
              {item}
            </a>
          ))}
          <a
            href="#"
            style={{
              display: 'inline-block',
              color: c.gold,
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 600,
              fontFamily: font,
              letterSpacing: '0.08em',
              border: `2px solid ${c.gold}`,
              padding: '12px 28px',
              borderRadius: 4,
              marginTop: 16,
              textTransform: 'uppercase' as const,
            }}
          >
            {hero.cta}
          </a>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 768px) {
              .desktop-nav { display: none !important; }
              .mobile-menu-btn { display: block !important; }
            }
          `,
        }}
      />
    </nav>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ── HERO ─────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════
function Hero() {
  return (
    <section
      style={{
        ...section(c.navy),
        position: 'relative',
        overflow: 'hidden',
        minHeight: 600,
      }}
    >
      {/* Diagonal stripe pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            rgba(212,168,67,0.03) 40px,
            rgba(212,168,67,0.03) 42px
          )`,
          zIndex: 0,
        }}
      />
      {/* Subtle radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '60%',
          height: '140%',
          background: 'radial-gradient(ellipse, rgba(212,168,67,0.06) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      <div
        style={{
          ...container,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 60,
          minHeight: 600,
          position: 'relative',
          zIndex: 1,
          flexWrap: 'wrap',
          padding: '80px 24px',
        }}
      >
        {/* Left — Text */}
        <div style={{ flex: '1 1 480px', maxWidth: 580 }}>
          <div
            style={{
              display: 'inline-block',
              background: `rgba(212,168,67,0.12)`,
              border: `1px solid rgba(212,168,67,0.25)`,
              borderRadius: 4,
              padding: '6px 16px',
              marginBottom: 28,
            }}
          >
            <span
              style={{
                color: c.gold,
                fontSize: 12,
                fontWeight: 600,
                fontFamily: font,
                letterSpacing: '0.12em',
                textTransform: 'uppercase' as const,
              }}
            >
              AI Marketing Agency
            </span>
          </div>

          <h1
            style={{
              ...heading(52, c.white, 800),
              marginBottom: 24,
              lineHeight: 1.1,
            }}
          >
            {hero.headline.split(' ').map((word, i) =>
              word.toLowerCase() === 'powered?' ? (
                <span key={i} style={{ color: c.gold }}>
                  {word}{' '}
                </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h1>

          <p
            style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: 17,
              lineHeight: 1.7,
              fontFamily: font,
              fontWeight: 400,
              marginBottom: 40,
              maxWidth: 500,
            }}
          >
            {hero.subheadline}
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href={hero.ctaLink}
              style={{
                display: 'inline-block',
                background: c.gold,
                color: c.navy,
                fontSize: 13,
                fontWeight: 700,
                fontFamily: font,
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                padding: '15px 36px',
                borderRadius: 4,
                textDecoration: 'none',
                transition: 'all 0.3s',
                boxShadow: `0 4px 20px rgba(212,168,67,0.3)`,
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = c.goldLight;
                (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                (e.target as HTMLElement).style.boxShadow = `0 6px 28px rgba(212,168,67,0.4)`;
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = c.gold;
                (e.target as HTMLElement).style.transform = 'translateY(0)';
                (e.target as HTMLElement).style.boxShadow = `0 4px 20px rgba(212,168,67,0.3)`;
              }}
            >
              {hero.cta}
            </a>
            <a
              href="#"
              style={{
                color: c.white,
                fontSize: 14,
                fontWeight: 500,
                fontFamily: font,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                opacity: 0.8,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = '0.8';
              }}
            >
              Learn More
              <span style={{ fontSize: 18 }}>&rarr;</span>
            </a>
          </div>
        </div>

        {/* Right — Hero Image */}
        <div
          style={{
            flex: '1 1 400px',
            maxWidth: 480,
            position: 'relative',
          }}
          className="hero-geo"
        >
          <div
            style={{
              position: 'relative',
              borderRadius: 8,
              overflow: 'hidden',
              boxShadow: `0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(212,168,67,0.2)`,
            }}
          >
            <img
              src={hero.image}
              alt={hero.imageAlt}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
            {/* Gold accent border bottom */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 3,
                background: `linear-gradient(90deg, ${c.gold}, ${c.goldLight})`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom border line */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent 0%, ${c.gold} 50%, transparent 100%)`,
          opacity: 0.4,
        }}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 900px) {
              .hero-geo { display: none !important; }
            }
          `,
        }}
      />
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ── GROWTH ───────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════
function Growth() {
  return (
    <section style={{ ...section(c.white), padding: '100px 0' }}>
      <div
        style={{
          ...container,
          display: 'flex',
          gap: 60,
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        {/* Left column */}
        <div style={{ flex: '1 1 340px', maxWidth: 440 }}>
          <div style={{ display: 'flex', alignItems: 'stretch', gap: 20 }}>
            <div
              style={{
                width: 4,
                background: `linear-gradient(to bottom, ${c.gold}, ${c.goldLight})`,
                borderRadius: 2,
                flexShrink: 0,
              }}
            />
            <div>
              <h2 style={{ ...heading(38, c.navy, 800), marginBottom: 16 }}>
                {growth.headline.split(' ').slice(0, 1).join(' ')}{' '}
                <span style={{ color: c.gold }}>
                  {growth.headline.split(' ').slice(1).join(' ')}
                </span>
              </h2>
              <p
                style={{
                  color: c.textBody,
                  fontSize: 15,
                  lineHeight: 1.7,
                  fontFamily: font,
                }}
              >
                {growth.body}
              </p>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ flex: '1 1 340px', maxWidth: 580 }}>
          <p
            style={{
              color: c.textBody,
              fontSize: 15,
              lineHeight: 1.8,
              fontFamily: font,
              marginBottom: 24,
            }}
          >
            {growth.body2}
          </p>
          {growth.body3 && (
            <p
              style={{
                color: c.textBody,
                fontSize: 15,
                lineHeight: 1.8,
                fontFamily: font,
                marginBottom: 32,
              }}
            >
              {growth.body3}
            </p>
          )}
          <div style={{ display: 'flex', gap: 32, marginBottom: 32 }}>
            {[
              { num: '10+', label: 'Years Experience' },
              { num: '500+', label: 'Clients Served' },
            ].map((item) => (
              <div key={item.label}>
                <div
                  style={{
                    ...heading(32, c.gold, 800),
                    marginBottom: 4,
                  }}
                >
                  {item.num}
                </div>
                <div
                  style={{
                    color: c.gray,
                    fontSize: 13,
                    fontWeight: 500,
                    fontFamily: font,
                    letterSpacing: '0.02em',
                  }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
          {growth.image && (
            <div
              style={{
                borderRadius: 6,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: `1px solid ${c.border}`,
              }}
            >
              <img
                src={growth.image}
                alt={growth.imageAlt}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ── SOCIAL PROOF ─────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════
function SocialProof() {
  return (
    <section
      style={{
        ...section(c.navy),
        padding: '48px 0',
        borderTop: `1px solid rgba(212,168,67,0.15)`,
        borderBottom: `1px solid rgba(212,168,67,0.15)`,
      }}
    >
      <div style={{ ...container, textAlign: 'center' }}>
        <p
          style={{
            color: c.white,
            fontSize: 20,
            fontWeight: 500,
            fontFamily: font,
            letterSpacing: '-0.01em',
          }}
        >
          {socialProof.split('$50M+').map((part, i) =>
            i === 0 ? (
              <span key={i}>
                {part}
                <span
                  style={{
                    color: c.gold,
                    fontWeight: 800,
                    fontSize: 24,
                  }}
                >
                  $50M+
                </span>
              </span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ── SPECIALIZED MARKETING ───────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════
function SpecializedMarketing() {
  return (
    <section style={{ ...section(c.white), padding: '100px 0' }}>
      <div style={container}>
        <div style={{ textAlign: 'center', marginBottom: 56, maxWidth: 720, margin: '0 auto 56px' }}>
          <div
            style={{
              width: 48,
              height: 3,
              background: c.gold,
              margin: '0 auto 20px',
              borderRadius: 2,
            }}
          />
          <h2 style={{ ...heading(36, c.navy, 800), marginBottom: 16 }}>
            {specializedMarketing.headline}
          </h2>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 60,
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}
        >
          {/* Left — Text content */}
          <div style={{ flex: '1 1 400px', maxWidth: 600 }}>
            <p
              style={{
                color: c.textBody,
                fontSize: 15,
                lineHeight: 1.8,
                fontFamily: font,
                marginBottom: 20,
              }}
            >
              {specializedMarketing.body}
            </p>
            <p
              style={{
                color: c.textBody,
                fontSize: 15,
                lineHeight: 1.8,
                fontFamily: font,
                marginBottom: 20,
              }}
            >
              {specializedMarketing.body2}
            </p>
            <p
              style={{
                color: c.textBody,
                fontSize: 15,
                lineHeight: 1.8,
                fontFamily: font,
                marginBottom: 20,
              }}
            >
              {specializedMarketing.body3}
            </p>
            <p
              style={{
                color: c.textBody,
                fontSize: 15,
                lineHeight: 1.8,
                fontFamily: font,
              }}
            >
              {specializedMarketing.body4}
            </p>
          </div>

          {/* Right — Image */}
          <div style={{ flex: '1 1 300px', maxWidth: 440 }}>
            <div
              style={{
                borderRadius: 6,
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(11,26,59,0.1)',
                border: `1px solid ${c.border}`,
              }}
            >
              <img
                src={specializedMarketing.image}
                alt={specializedMarketing.imageAlt}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ── SERVICES ─────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════
function Services() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section style={{ ...section(c.lightGray), padding: '100px 0' }}>
      <div style={container}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 64, maxWidth: 640, margin: '0 auto 64px' }}>
          <div
            style={{
              width: 48,
              height: 3,
              background: c.gold,
              margin: '0 auto 20px',
              borderRadius: 2,
            }}
          />
          <h2 style={{ ...heading(36, c.navy, 800), marginBottom: 16 }}>
            {servicesIntro.headline}
          </h2>
          <p
            style={{
              color: c.textBody,
              fontSize: 16,
              lineHeight: 1.7,
              fontFamily: font,
            }}
          >
            {servicesIntro.body}
          </p>
        </div>

        {/* 3x2 Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340, 1fr))',
            gap: 24,
          }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `
                .services-grid {
                  display: grid;
                  grid-template-columns: repeat(3, 1fr);
                  gap: 24px;
                }
                @media (max-width: 1024px) {
                  .services-grid { grid-template-columns: repeat(2, 1fr); }
                }
                @media (max-width: 640px) {
                  .services-grid { grid-template-columns: 1fr; }
                }
              `,
            }}
          />
          <div className="services-grid">
            {services.map((svc, i) => (
              <div
                key={svc.title}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: hovered === i ? c.navy : c.white,
                  borderRadius: 6,
                  padding: '36px 32px 40px',
                  borderBottom: `3px solid ${c.gold}`,
                  transition: 'all 0.35s ease',
                  cursor: 'default',
                  boxShadow: hovered === i
                    ? '0 12px 40px rgba(11,26,59,0.2)'
                    : '0 2px 12px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 8,
                      background: hovered === i ? 'rgba(212,168,67,0.15)' : `rgba(11,26,59,0.06)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background 0.35s',
                    }}
                  >
                    <ServiceIcon icon={svc.icon} size={28} />
                  </div>
                </div>
                <h3
                  style={{
                    ...heading(18, hovered === i ? c.white : c.navy, 700),
                    marginBottom: 12,
                    transition: 'color 0.35s',
                  }}
                >
                  {svc.title}
                </h3>
                <p
                  style={{
                    color: hovered === i ? 'rgba(255,255,255,0.7)' : c.textBody,
                    fontSize: 14,
                    lineHeight: 1.7,
                    fontFamily: font,
                    transition: 'color 0.35s',
                  }}
                >
                  {svc.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ── STATS / PROVEN RESULTS ───────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════
function Stats() {
  return (
    <section
      style={{
        ...section(c.navy),
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 80px,
            rgba(212,168,67,0.03) 80px,
            rgba(212,168,67,0.03) 81px
          )`,
        }}
      />
      <div style={{ ...container, position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 style={{ ...heading(36, c.white, 800), marginBottom: 12 }}>
            Proven <span style={{ color: c.gold }}>Results</span>
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: 16,
              fontFamily: font,
              maxWidth: 500,
              margin: '0 auto',
            }}
          >
            Data-driven outcomes that demonstrate measurable impact across every engagement.
          </p>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              .stats-grid {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                gap: 0;
              }
              @media (max-width: 900px) {
                .stats-grid {
                  grid-template-columns: repeat(3, 1fr);
                }
              }
              @media (max-width: 600px) {
                .stats-grid {
                  grid-template-columns: repeat(2, 1fr);
                }
              }
            `,
          }}
        />
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                padding: '36px 24px',
                textAlign: 'center',
                borderRight: i < stats.length - 1 ? `1px solid rgba(212,168,67,0.15)` : 'none',
              }}
            >
              <div
                style={{
                  ...heading(40, c.gold, 800),
                  marginBottom: 12,
                  letterSpacing: '-0.02em',
                }}
              >
                {stat.value}
              </div>
              <p
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: 13,
                  lineHeight: 1.6,
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
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ── WHY CHOOSE ───────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════
function WhyChoose() {
  return (
    <section style={{ ...section(c.lightGray), padding: '100px 0' }}>
      <div style={container}>
        <div style={{ textAlign: 'center', marginBottom: 60, maxWidth: 680, margin: '0 auto 60px' }}>
          <div
            style={{
              width: 48,
              height: 3,
              background: c.gold,
              margin: '0 auto 20px',
              borderRadius: 2,
            }}
          />
          <h2 style={{ ...heading(36, c.navy, 800), marginBottom: 16 }}>
            {whyChoose.headline}
          </h2>
          <p
            style={{
              color: c.textBody,
              fontSize: 16,
              lineHeight: 1.7,
              fontFamily: font,
            }}
          >
            {whyChoose.body}
          </p>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              .why-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 24px;
              }
              @media (max-width: 700px) {
                .why-grid { grid-template-columns: 1fr; }
              }
            `,
          }}
        />
        <div className="why-grid">
          {whyChoose.cards.map((card, i) => (
            <div
              key={card.title}
              style={{
                background: c.white,
                borderRadius: 6,
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                transition: 'box-shadow 0.3s, transform 0.3s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(11,26,59,0.1)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              {/* Navy header stripe */}
              <div
                style={{
                  background: c.navy,
                  padding: '20px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                {/* Gold icon circle */}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: `rgba(212,168,67,0.15)`,
                    border: `1.5px solid rgba(212,168,67,0.4)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ color: c.gold, fontSize: 16, fontWeight: 700, fontFamily: font }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3
                  style={{
                    color: c.white,
                    fontSize: 16,
                    fontWeight: 700,
                    fontFamily: font,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {card.title}
                </h3>
              </div>
              {/* Body */}
              <div style={{ padding: '28px 32px 32px' }}>
                <p
                  style={{
                    color: c.textBody,
                    fontSize: 14,
                    lineHeight: 1.7,
                    fontFamily: font,
                  }}
                >
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ── FAQ ──────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section style={{ ...section(c.white), padding: '100px 0' }}>
      <div style={{ ...container, maxWidth: 800 }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div
            style={{
              width: 48,
              height: 3,
              background: c.gold,
              margin: '0 auto 20px',
              borderRadius: 2,
            }}
          />
          <h2 style={{ ...heading(36, c.navy, 800) }}>
            Frequently Asked <span style={{ color: c.gold }}>Questions</span>
          </h2>
        </div>

        <div>
          {faq.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  borderBottom: `1px solid ${c.navy}`,
                  borderTop: i === 0 ? `1px solid ${c.navy}` : 'none',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '22px 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    gap: 16,
                    fontFamily: font,
                  }}
                >
                  <span
                    style={{
                      color: c.navy,
                      fontSize: 16,
                      fontWeight: 600,
                      textAlign: 'left',
                      lineHeight: 1.4,
                    }}
                  >
                    {item.question}
                  </span>
                  <span
                    style={{
                      color: c.gold,
                      fontSize: 24,
                      fontWeight: 300,
                      lineHeight: 1,
                      flexShrink: 0,
                      transition: 'transform 0.3s',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? 500 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.35s ease, opacity 0.3s ease',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p
                    style={{
                      color: c.textBody,
                      fontSize: 15,
                      lineHeight: 1.7,
                      fontFamily: font,
                      paddingBottom: 24,
                      paddingRight: 40,
                    }}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ── BOOK AUDIT ──────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════
function BookAudit() {
  return (
    <section
      style={{
        ...section(c.lightGray),
        padding: '100px 0',
      }}
    >
      <div style={container}>
        <div
          style={{
            display: 'flex',
            gap: 60,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {/* Left — Image */}
          <div style={{ flex: '1 1 340px', maxWidth: 480 }}>
            <div
              style={{
                borderRadius: 6,
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(11,26,59,0.1)',
                border: `1px solid ${c.border}`,
              }}
            >
              <img
                src={bookAudit.image}
                alt={bookAudit.imageAlt}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </div>
          </div>

          {/* Right — Text */}
          <div style={{ flex: '1 1 400px', maxWidth: 560 }}>
            <div
              style={{
                width: 48,
                height: 3,
                background: c.gold,
                marginBottom: 20,
                borderRadius: 2,
              }}
            />
            <h2 style={{ ...heading(36, c.navy, 800), marginBottom: 20 }}>
              {bookAudit.headline}
            </h2>
            <p
              style={{
                color: c.textBody,
                fontSize: 15,
                lineHeight: 1.8,
                fontFamily: font,
                marginBottom: 20,
              }}
            >
              {bookAudit.body}
            </p>
            <p
              style={{
                color: c.textBody,
                fontSize: 15,
                lineHeight: 1.8,
                fontFamily: font,
              }}
            >
              {bookAudit.body2}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ── CTA ──────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════
function CTA() {
  return (
    <section
      style={{
        ...section(c.navy),
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle geometric pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 60px,
              rgba(212,168,67,0.03) 60px,
              rgba(212,168,67,0.03) 62px
            )
          `,
        }}
      />
      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '80%',
          background: 'radial-gradient(ellipse, rgba(212,168,67,0.06) 0%, transparent 70%)',
        }}
      />

      <div
        style={{
          ...container,
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          maxWidth: 700,
        }}
      >
        <h2
          style={{
            ...heading(42, c.gold, 800),
            marginBottom: 20,
          }}
        >
          {cta.headline}
        </h2>
        <p
          style={{
            color: 'rgba(255,255,255,0.75)',
            fontSize: 17,
            lineHeight: 1.7,
            fontFamily: font,
            marginBottom: 40,
            maxWidth: 520,
            margin: '0 auto 40px',
          }}
        >
          {cta.body}
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href={cta.ctaLink}
            style={{
              display: 'inline-block',
              background: c.gold,
              color: c.navy,
              fontSize: 13,
              fontWeight: 700,
              fontFamily: font,
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              padding: '16px 40px',
              borderRadius: 4,
              textDecoration: 'none',
              transition: 'all 0.3s',
              boxShadow: `0 4px 20px rgba(212,168,67,0.3)`,
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = c.goldLight;
              (e.target as HTMLElement).style.transform = 'translateY(-2px)';
              (e.target as HTMLElement).style.boxShadow = `0 6px 28px rgba(212,168,67,0.4)`;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = c.gold;
              (e.target as HTMLElement).style.transform = 'translateY(0)';
              (e.target as HTMLElement).style.boxShadow = `0 4px 20px rgba(212,168,67,0.3)`;
            }}
          >
            {cta.ctaText}
          </a>
          <a
            href={`tel:${brand.phone}`}
            style={{
              display: 'inline-block',
              color: c.white,
              fontSize: 13,
              fontWeight: 600,
              fontFamily: font,
              letterSpacing: '0.06em',
              border: `2px solid rgba(255,255,255,0.3)`,
              padding: '14px 32px',
              borderRadius: 4,
              textDecoration: 'none',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = c.white;
              (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)';
              (e.target as HTMLElement).style.background = 'transparent';
            }}
          >
            {brand.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ── FOOTER ───────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════
function Footer() {
  return (
    <footer style={{ ...section(c.navyDark), padding: '72px 0 0' }}>
      <div style={container}>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .footer-grid {
                display: grid;
                grid-template-columns: 1.4fr 1fr 1fr;
                gap: 48px;
              }
              @media (max-width: 700px) {
                .footer-grid { grid-template-columns: 1fr; gap: 36px; }
              }
            `,
          }}
        />
        <div className="footer-grid">
          {/* Company info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: `linear-gradient(135deg, ${c.gold}, ${c.goldLight})`,
                  borderRadius: 5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ color: c.navy, fontWeight: 900, fontSize: 15, fontFamily: font }}>
                  M
                </span>
              </div>
              <span style={{ color: c.white, fontWeight: 700, fontSize: 16, fontFamily: font }}>
                {brand.name}
              </span>
            </div>
            <p
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: 14,
                lineHeight: 1.7,
                fontFamily: font,
                marginBottom: 24,
                maxWidth: 320,
              }}
            >
              {footer.tagline}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, fontFamily: font }}>
                {brand.email}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, fontFamily: font }}>
                {brand.phone}
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4
              style={{
                color: c.gold,
                fontSize: 13,
                fontWeight: 700,
                fontFamily: font,
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                marginBottom: 24,
              }}
            >
              Services
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {footer.services.map((svc) => (
                <a
                  key={svc}
                  href="#"
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 14,
                    fontFamily: font,
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = c.gold;
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                  }}
                >
                  {svc}
                </a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div>
            <h4
              style={{
                color: c.gold,
                fontSize: 13,
                fontWeight: 700,
                fontFamily: font,
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                marginBottom: 24,
              }}
            >
              Company
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['About Us', 'Case Studies', 'Blog', 'Careers', 'Contact'].map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 14,
                    fontFamily: font,
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = c.gold;
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: `1px solid rgba(255,255,255,0.08)`,
            marginTop: 56,
            padding: '24px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p
            style={{
              color: 'rgba(255,255,255,0.3)',
              fontSize: 13,
              fontFamily: font,
            }}
          >
            {footer.copyright}
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service'].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  color: 'rgba(255,255,255,0.3)',
                  fontSize: 13,
                  fontFamily: font,
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.3)';
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ── PAGE ─────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════
export default function Design5() {
  return (
    <>
      <FontLoader />
      <Animations />
      <Nav />
      <Hero />
      <Growth />
      <SocialProof />
      <SpecializedMarketing />
      <Services />
      <Stats />
      <WhyChoose />
      <FAQ />
      <BookAudit />
      <CTA />
      <Footer />
    </>
  );
}
