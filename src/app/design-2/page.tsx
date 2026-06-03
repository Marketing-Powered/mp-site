'use client';

import { useState, useEffect } from 'react';
import { siteContent } from '@/lib/content';

/* ------------------------------------------------------------------ */
/*  Design 2 — "Bold Agency"                                           */
/*  Dark bg, neon cyan/magenta accents, Space Grotesk, dramatic        */
/* ------------------------------------------------------------------ */

const c = {
  bg: '#0A0A0A',
  bgCard: '#111111',
  bgFooter: '#060606',
  text: '#E8E8E8',
  textMuted: '#888899',
  cyan: '#00F0FF',
  magenta: '#FF2D6B',
  white: '#FFFFFF',
  border: '#1A1A2A',
  gradientCyan: 'linear-gradient(135deg, #00F0FF 0%, #00A8FF 100%)',
  gradientMagenta: 'linear-gradient(135deg, #FF2D6B 0%, #FF6B9D 100%)',
  gradientHero: 'linear-gradient(135deg, #00F0FF 0%, #FF2D6B 100%)',
  gradientCta: 'linear-gradient(180deg, #0A0A0A 0%, #141428 50%, #0A0A0A 100%)',
};

const font = "'Space Grotesk', sans-serif";

/* ---- reusable style helpers ---- */
const sectionStyle = (overrides?: React.CSSProperties): React.CSSProperties => ({
  padding: '100px 24px',
  backgroundColor: c.bg,
  fontFamily: font,
  position: 'relative',
  ...overrides,
});

const container: React.CSSProperties = {
  maxWidth: 1200,
  margin: '0 auto',
  width: '100%',
};

const glowBtn = (color = c.cyan): React.CSSProperties => ({
  display: 'inline-block',
  padding: '16px 40px',
  background: 'transparent',
  color: color,
  fontFamily: font,
  fontSize: 14,
  fontWeight: 700,
  letterSpacing: '0.1em',
  border: `2px solid ${color}`,
  cursor: 'pointer',
  textDecoration: 'none',
  textTransform: 'uppercase' as const,
  boxShadow: `0 0 20px ${color}44, 0 0 40px ${color}22, inset 0 0 20px ${color}11`,
  transition: 'all 0.3s ease',
  position: 'relative' as const,
});

/* ---- SVG icon map ---- */
function SvgIcon({ name, size = 32, color = c.cyan }: { name: string; size?: number; color?: string }) {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (name) {
    case 'target':
      return <svg {...props}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
    case 'search':
      return <svg {...props}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
    case 'chart':
      return <svg {...props}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
    case 'code':
      return <svg {...props}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
    case 'shield':
      return <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
    case 'zap':
      return <svg {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill={color} stroke={color}/></svg>;
    default:
      return <svg {...props}><circle cx="12" cy="12" r="10"/></svg>;
  }
}

/* ================================================================== */
/*  PAGE COMPONENT                                                     */
/* ================================================================== */

export default function Design2Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const d = siteContent;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ fontFamily: font, color: c.text, backgroundColor: c.bg, overflowX: 'hidden' }}>
      {/* ---- Global styles & animations ---- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #00F0FF33; color: #fff; }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px #00F0FF44, 0 0 40px #00F0FF22; }
          50% { box-shadow: 0 0 30px #00F0FF66, 0 0 60px #00F0FF33, 0 0 80px #00F0FF11; }
        }
        @keyframes glow-text {
          0%, 100% { text-shadow: 0 0 20px #00F0FF44, 0 0 40px #00F0FF22; }
          50% { text-shadow: 0 0 30px #00F0FF66, 0 0 60px #00F0FF33; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes border-glow {
          0%, 100% { border-color: #00F0FF; box-shadow: 0 0 15px #00F0FF33; }
          50% { border-color: #FF2D6B; box-shadow: 0 0 15px #FF2D6B33; }
        }

        .nav-link { color: #888899; text-decoration: none; font-size: 14px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; transition: color 0.3s; font-family: 'Space Grotesk', sans-serif; }
        .nav-link:hover { color: #00F0FF; }

        .service-card { transition: transform 0.3s, box-shadow 0.3s; }
        .service-card:hover { transform: translateY(-6px); }

        .faq-item { transition: all 0.3s ease; }
        .faq-item:hover { border-color: #00F0FF !important; }

        .glow-btn:hover {
          background: #00F0FF !important;
          color: #0A0A0A !important;
          box-shadow: 0 0 30px #00F0FF66, 0 0 60px #00F0FF33, 0 0 90px #00F0FF11 !important;
        }
        .glow-btn-magenta:hover {
          background: #FF2D6B !important;
          color: #0A0A0A !important;
          box-shadow: 0 0 30px #FF2D6B66, 0 0 60px #FF2D6B33, 0 0 90px #FF2D6B11 !important;
        }

        .why-card { transition: transform 0.3s, border-color 0.3s; }
        .why-card:hover { transform: translateX(8px); border-color: #00F0FF !important; }

        .stat-item { transition: transform 0.3s; }
        .stat-item:hover { transform: scale(1.05); }

        @media (max-width: 768px) {
          .hero-headline { font-size: 3rem !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr !important; }
          .why-card-inner { flex-direction: column !important; }
          .why-number { font-size: 4rem !important; min-width: auto !important; }
          .nav-links-desktop { display: none !important; }
          .mobile-toggle { display: flex !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
          .cta-headline { font-size: 2.5rem !important; }
          .growth-text { font-size: 1.3rem !important; }
        }

        @media (max-width: 480px) {
          .hero-headline { font-size: 2.2rem !important; line-height: 1.15 !important; }
          .cta-headline { font-size: 1.8rem !important; }
        }
      `}</style>

      {/* ================================================================ */}
      {/*  1. NAV                                                          */}
      {/* ================================================================ */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '0 24px',
        height: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid ${c.border}` : '1px solid transparent',
        transition: 'all 0.4s ease',
        fontFamily: font,
      }}>
        <div style={{ ...container, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 36,
              height: 36,
              background: c.gradientHero,
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ color: c.bg, fontWeight: 700, fontSize: 14 }}>MP</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: 18, color: c.white, letterSpacing: '-0.02em' }}>
              {d.brand.name}
            </span>
          </div>

          {/* Desktop Links */}
          <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {d.nav.map((link) => (
              <a key={link} href="#" className="nav-link">{link}</a>
            ))}
            <a href={`tel:${d.brand.phone}`} style={{
              ...glowBtn(c.cyan),
              padding: '10px 24px',
              fontSize: 12,
              animation: 'border-glow 3s ease-in-out infinite',
            }} className="glow-btn">
              {d.brand.phone}
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenu(!mobileMenu)}
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              background: 'transparent',
              border: `1px solid ${c.border}`,
              cursor: 'pointer',
              flexDirection: 'column',
              gap: 5,
            }}
          >
            <span style={{ width: 22, height: 2, background: c.cyan, transition: 'all 0.3s', transform: mobileMenu ? 'rotate(45deg) translateY(7px)' : 'none' }} />
            <span style={{ width: 22, height: 2, background: c.cyan, opacity: mobileMenu ? 0 : 1, transition: 'all 0.3s' }} />
            <span style={{ width: 22, height: 2, background: c.cyan, transition: 'all 0.3s', transform: mobileMenu ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div style={{
            position: 'absolute',
            top: 72,
            left: 0,
            right: 0,
            background: 'rgba(10,10,10,0.98)',
            backdropFilter: 'blur(20px)',
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            borderBottom: `1px solid ${c.border}`,
          }}>
            {d.nav.map((link) => (
              <a key={link} href="#" className="nav-link" style={{ fontSize: 18 }} onClick={() => setMobileMenu(false)}>{link}</a>
            ))}
            <a href={`tel:${d.brand.phone}`} style={{ ...glowBtn(c.cyan), textAlign: 'center', fontSize: 14 }} className="glow-btn">
              {d.brand.phone}
            </a>
          </div>
        )}
      </nav>

      {/* ================================================================ */}
      {/*  2. HERO                                                         */}
      {/* ================================================================ */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: c.bg,
        fontFamily: font,
        padding: '120px 24px 80px',
      }}>
        {/* Grid overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />
        {/* Radial glow */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        {/* Corner geometric accent */}
        <div style={{
          position: 'absolute',
          top: 80,
          right: -60,
          width: 200,
          height: 200,
          border: `1px solid ${c.cyan}22`,
          transform: 'rotate(45deg)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: 120,
          left: -40,
          width: 140,
          height: 140,
          border: `1px solid ${c.magenta}22`,
          transform: 'rotate(30deg)',
          pointerEvents: 'none',
        }} />

        <div style={{ ...container, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {/* Overline */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 32,
            padding: '8px 20px',
            border: `1px solid ${c.border}`,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: c.cyan,
          }}>
            <span style={{ width: 8, height: 8, backgroundColor: c.cyan, boxShadow: `0 0 10px ${c.cyan}`, display: 'inline-block' }} />
            AI Marketing Agency
          </div>

          {/* Headline */}
          <h1 className="hero-headline" style={{
            fontSize: '6.5rem',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: c.white,
            marginBottom: 28,
          }}>
            <span style={{
              background: c.gradientHero,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 30px rgba(0,240,255,0.3))',
            }}>
              {d.hero.headline}
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 18,
            lineHeight: 1.7,
            color: c.textMuted,
            maxWidth: 680,
            margin: '0 auto 48px',
          }}>
            {d.hero.subheadline}
          </p>

          {/* CTA */}
          <a
            href={d.hero.ctaLink}
            style={{
              ...glowBtn(c.cyan),
              fontSize: 16,
              padding: '18px 48px',
              animation: 'glow-pulse 2s ease-in-out infinite',
            }}
            className="glow-btn"
          >
            {d.hero.cta}
          </a>

          {/* Hero image */}
          <div style={{ marginTop: 64, position: 'relative' }}>
            <div style={{
              position: 'absolute',
              inset: -2,
              background: `linear-gradient(135deg, ${c.cyan}33, ${c.magenta}33)`,
              borderRadius: 16,
              filter: 'blur(20px)',
              pointerEvents: 'none',
            }} />
            <img
              src={d.hero.image}
              alt={d.hero.imageAlt}
              style={{
                width: '100%',
                maxWidth: 900,
                borderRadius: 12,
                border: `1px solid ${c.border}`,
                position: 'relative',
                display: 'block',
                margin: '0 auto',
              }}
            />
          </div>

          {/* Scroll indicator */}
          <div style={{
            marginTop: 80,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            color: c.textMuted,
            fontSize: 11,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            <span>Scroll</span>
            <div style={{
              width: 1,
              height: 40,
              background: `linear-gradient(to bottom, ${c.cyan}, transparent)`,
            }} />
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  3. GROWTH                                                       */}
      {/* ================================================================ */}
      <section style={sectionStyle({ padding: '120px 24px' })}>
        <div style={container}>
          <div style={{
            borderLeft: `4px solid ${c.cyan}`,
            paddingLeft: 40,
            maxWidth: 900,
            boxShadow: `-4px 0 30px ${c.cyan}22`,
          }}>
            <h2 className="growth-text" style={{
              fontSize: '1.8rem',
              fontWeight: 300,
              lineHeight: 1.7,
              color: c.text,
            }}>
              <span style={{ fontWeight: 700, color: c.white, fontSize: '2rem' }}>
                {d.growth.headline}
              </span>{' '}
              {d.growth.body}
            </h2>
          </div>
          <div style={{
            marginTop: 48,
            paddingLeft: 44,
            maxWidth: 900,
          }}>
            <p style={{
              fontSize: 16,
              lineHeight: 1.8,
              color: c.textMuted,
            }}>
              {d.growth.body2}
            </p>
            {d.growth.body3 && (
              <p style={{
                fontSize: 16,
                lineHeight: 1.8,
                color: c.textMuted,
                marginTop: 24,
              }}>
                {d.growth.body3}
              </p>
            )}
          </div>

          {/* Growth image */}
          {d.growth.image && (
            <div style={{ marginTop: 56, display: 'flex', justifyContent: 'center' }}>
              <img
                src={d.growth.image}
                alt={d.growth.imageAlt}
                style={{
                  width: '100%',
                  maxWidth: 480,
                  borderRadius: 12,
                  border: `1px solid ${c.border}`,
                }}
              />
            </div>
          )}
        </div>
      </section>

      {/* Geometric divider */}
      <div style={{
        height: 1,
        background: `linear-gradient(90deg, transparent, ${c.cyan}44, ${c.magenta}44, transparent)`,
        margin: '0 24px',
        maxWidth: 1200,
        marginLeft: 'auto',
        marginRight: 'auto',
      }} />

      {/* ================================================================ */}
      {/*  4. SOCIAL PROOF MARQUEE                                         */}
      {/* ================================================================ */}
      <section style={sectionStyle({ padding: '60px 0', overflow: 'hidden' })}>
        <div style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          animation: 'marquee 25s linear infinite',
        }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} style={{
              fontSize: '3.5rem',
              fontWeight: 700,
              color: i % 2 === 0 ? c.white : 'transparent',
              WebkitTextStroke: i % 2 === 0 ? 'none' : `1px ${c.textMuted}`,
              letterSpacing: '-0.02em',
              marginRight: 80,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 24,
            }}>
              <span style={{
                width: 12,
                height: 12,
                backgroundColor: i % 2 === 0 ? c.cyan : c.magenta,
                boxShadow: `0 0 10px ${i % 2 === 0 ? c.cyan : c.magenta}`,
                display: 'inline-block',
                flexShrink: 0,
              }} />
              {d.socialProof}
            </span>
          ))}
        </div>
      </section>

      {/* ================================================================ */}
      {/*  4b. SPECIALIZED MARKETING                                       */}
      {/* ================================================================ */}
      <section style={sectionStyle({ padding: '120px 24px' })}>
        <div style={container}>
          <div style={{ marginBottom: 48, maxWidth: 800 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 20,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: c.magenta,
            }}>
              <span style={{ width: 30, height: 1, backgroundColor: c.magenta, display: 'inline-block' }} />
              Specialized Expertise
            </div>
            <h2 style={{
              fontSize: '3rem',
              fontWeight: 700,
              lineHeight: 1.1,
              color: c.white,
              letterSpacing: '-0.02em',
              marginBottom: 28,
            }}>
              {d.specializedMarketing.headline}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 900 }}>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: c.textMuted }}>
              {d.specializedMarketing.body}
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: c.textMuted }}>
              {d.specializedMarketing.body2}
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: c.textMuted }}>
              {d.specializedMarketing.body3}
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: c.textMuted }}>
              {d.specializedMarketing.body4}
            </p>
          </div>

          {d.specializedMarketing.image && (
            <div style={{ marginTop: 56, display: 'flex', justifyContent: 'center' }}>
              <img
                src={d.specializedMarketing.image}
                alt={d.specializedMarketing.imageAlt}
                style={{
                  width: '100%',
                  maxWidth: 560,
                  borderRadius: 12,
                  border: `1px solid ${c.border}`,
                }}
              />
            </div>
          )}
        </div>
      </section>

      {/* Geometric divider */}
      <div style={{
        height: 1,
        background: `linear-gradient(90deg, transparent, ${c.magenta}44, ${c.cyan}44, transparent)`,
        margin: '0 24px',
        maxWidth: 1200,
        marginLeft: 'auto',
        marginRight: 'auto',
      }} />

      {/* ================================================================ */}
      {/*  5. SERVICES                                                     */}
      {/* ================================================================ */}
      <section style={sectionStyle()}>
        <div style={container}>
          {/* Section header */}
          <div style={{ marginBottom: 72, maxWidth: 700 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 20,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: c.cyan,
            }}>
              <span style={{ width: 30, height: 1, backgroundColor: c.cyan, display: 'inline-block' }} />
              What We Do
            </div>
            <h2 style={{
              fontSize: '3.5rem',
              fontWeight: 700,
              lineHeight: 1.1,
              color: c.white,
              letterSpacing: '-0.02em',
              marginBottom: 20,
            }}>
              {d.servicesIntro.headline}
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: c.textMuted }}>
              {d.servicesIntro.body}
            </p>
          </div>

          {/* Cards grid */}
          <div className="services-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}>
            {d.services.map((s, i) => {
              const accent = i % 2 === 0 ? c.cyan : c.magenta;
              return (
                <div key={i} className="service-card" style={{
                  backgroundColor: c.bgCard,
                  border: `1px solid ${c.border}`,
                  borderTop: `3px solid ${accent}`,
                  padding: '40px 32px',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Glow on hover via pseudo-element simulation */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: `linear-gradient(90deg, transparent, ${accent}66, transparent)`,
                    boxShadow: `0 0 30px ${accent}22`,
                  }} />
                  <div style={{ marginBottom: 24 }}>
                    <SvgIcon name={s.icon} size={36} color={accent} />
                  </div>
                  <h3 style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: c.white,
                    marginBottom: 16,
                    letterSpacing: '-0.01em',
                  }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: c.textMuted }}>
                    {s.description}
                  </p>
                  {/* Bottom accent line */}
                  <div style={{
                    marginTop: 28,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    color: accent,
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}>
                    Learn More
                    <span style={{ fontSize: 18 }}>&rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  6. STATS / PROVEN RESULTS                                       */}
      {/* ================================================================ */}
      <section style={sectionStyle({ padding: '100px 24px', position: 'relative' })}>
        {/* Background geometric */}
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '5%',
          width: 300,
          height: 300,
          border: `1px solid ${c.cyan}0D`,
          transform: 'translateY(-50%) rotate(45deg)',
          pointerEvents: 'none',
        }} />
        <div style={container}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 20,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: c.magenta,
            }}>
              <span style={{ width: 30, height: 1, backgroundColor: c.magenta, display: 'inline-block' }} />
              Proven Results
              <span style={{ width: 30, height: 1, backgroundColor: c.magenta, display: 'inline-block' }} />
            </div>
            <h2 style={{
              fontSize: '3.5rem',
              fontWeight: 700,
              color: c.white,
              letterSpacing: '-0.02em',
            }}>
              Numbers That{' '}
              <span style={{
                background: c.gradientHero,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Speak</span>
            </h2>
          </div>

          <div className="stats-grid" style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${d.stats.length}, 1fr)`,
            gap: 0,
          }}>
            {d.stats.map((stat, i) => (
              <div key={i} className="stat-item" style={{
                textAlign: 'center',
                padding: '40px 24px',
                borderRight: i < d.stats.length - 1 ? `1px solid ${c.border}` : 'none',
                position: 'relative',
              }}>
                <div style={{
                  fontSize: '3.5rem',
                  fontWeight: 700,
                  color: i % 2 === 0 ? c.cyan : c.magenta,
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  marginBottom: 16,
                  textShadow: `0 0 30px ${i % 2 === 0 ? c.cyan : c.magenta}44`,
                  animation: 'glow-text 3s ease-in-out infinite',
                }}>
                  {stat.value}
                </div>
                <p style={{
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: c.textMuted,
                  maxWidth: 200,
                  margin: '0 auto',
                }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Geometric divider */}
      <div style={{
        height: 1,
        background: `linear-gradient(90deg, transparent, ${c.magenta}44, ${c.cyan}44, transparent)`,
        margin: '0 24px',
        maxWidth: 1200,
        marginLeft: 'auto',
        marginRight: 'auto',
      }} />

      {/* ================================================================ */}
      {/*  7. WHY CHOOSE                                                   */}
      {/* ================================================================ */}
      <section style={sectionStyle()}>
        <div style={container}>
          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 20,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: c.cyan,
            }}>
              <span style={{ width: 30, height: 1, backgroundColor: c.cyan, display: 'inline-block' }} />
              Why Us
              <span style={{ width: 30, height: 1, backgroundColor: c.cyan, display: 'inline-block' }} />
            </div>
            <h2 style={{
              fontSize: '3.5rem',
              fontWeight: 700,
              color: c.white,
              letterSpacing: '-0.02em',
              marginBottom: 20,
            }}>
              {d.whyChoose.headline}
            </h2>
            <p style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: c.textMuted,
              maxWidth: 700,
              margin: '0 auto',
            }}>
              {d.whyChoose.body}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {d.whyChoose.cards.map((card, i) => {
              const isEven = i % 2 === 0;
              const accent = isEven ? c.cyan : c.magenta;
              return (
                <div key={i} className="why-card" style={{
                  backgroundColor: c.bgCard,
                  border: `1px solid ${c.border}`,
                  borderLeft: `3px solid ${accent}`,
                  padding: '48px 40px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s',
                }}>
                  <div className="why-card-inner" style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 40,
                    flexDirection: isEven ? 'row' : 'row-reverse',
                  }}>
                    {/* Big number */}
                    <div className="why-number" style={{
                      fontSize: '6rem',
                      fontWeight: 700,
                      lineHeight: 1,
                      color: 'transparent',
                      WebkitTextStroke: `1.5px ${accent}33`,
                      minWidth: 140,
                      textAlign: 'center',
                      flexShrink: 0,
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    {/* Content */}
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: 24,
                        fontWeight: 700,
                        color: c.white,
                        marginBottom: 16,
                        letterSpacing: '-0.01em',
                      }}>
                        {card.title}
                      </h3>
                      <p style={{ fontSize: 15, lineHeight: 1.7, color: c.textMuted }}>
                        {card.description}
                      </p>
                    </div>
                  </div>
                  {/* Subtle glow corner */}
                  <div style={{
                    position: 'absolute',
                    top: -40,
                    right: isEven ? -40 : 'auto',
                    left: isEven ? 'auto' : -40,
                    width: 120,
                    height: 120,
                    background: `radial-gradient(circle, ${accent}0A 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  }} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  8. FAQ                                                          */}
      {/* ================================================================ */}
      <section style={sectionStyle()}>
        <div style={{ ...container, maxWidth: 800 }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 20,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: c.magenta,
            }}>
              <span style={{ width: 30, height: 1, backgroundColor: c.magenta, display: 'inline-block' }} />
              FAQ
              <span style={{ width: 30, height: 1, backgroundColor: c.magenta, display: 'inline-block' }} />
            </div>
            <h2 style={{
              fontSize: '3rem',
              fontWeight: 700,
              color: c.white,
              letterSpacing: '-0.02em',
            }}>
              Got Questions?
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {d.faq.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="faq-item" style={{
                  backgroundColor: c.bgCard,
                  border: `1px solid ${isOpen ? c.cyan : c.border}`,
                  borderLeft: `3px solid ${isOpen ? c.cyan : c.border}`,
                  overflow: 'hidden',
                  transition: 'all 0.3s',
                  boxShadow: isOpen ? `0 0 20px ${c.cyan}11` : 'none',
                }}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    style={{
                      width: '100%',
                      padding: '24px 32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: font,
                      textAlign: 'left',
                    }}
                  >
                    <span style={{
                      fontSize: 17,
                      fontWeight: 600,
                      color: isOpen ? c.cyan : c.white,
                      transition: 'color 0.3s',
                      paddingRight: 16,
                    }}>
                      {item.question}
                    </span>
                    <span style={{
                      fontSize: 24,
                      color: isOpen ? c.cyan : c.textMuted,
                      transition: 'transform 0.3s, color 0.3s',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      flexShrink: 0,
                      width: 28,
                      height: 28,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${isOpen ? c.cyan + '44' : c.border}`,
                    }}>
                      +
                    </span>
                  </button>
                  <div style={{
                    maxHeight: isOpen ? 500 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease',
                  }}>
                    <p style={{
                      padding: '0 32px 24px',
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: c.textMuted,
                    }}>
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  8b. BOOK AUDIT                                                  */}
      {/* ================================================================ */}
      <section style={sectionStyle({ padding: '120px 24px' })}>
        <div style={container}>
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 20,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: c.cyan,
            }}>
              <span style={{ width: 30, height: 1, backgroundColor: c.cyan, display: 'inline-block' }} />
              Get Started
              <span style={{ width: 30, height: 1, backgroundColor: c.cyan, display: 'inline-block' }} />
            </div>
            <h2 style={{
              fontSize: '3rem',
              fontWeight: 700,
              lineHeight: 1.1,
              color: c.white,
              letterSpacing: '-0.02em',
              marginBottom: 32,
            }}>
              {d.bookAudit.headline}
            </h2>
            <p style={{
              fontSize: 16,
              lineHeight: 1.8,
              color: c.textMuted,
              marginBottom: 24,
              textAlign: 'left',
            }}>
              {d.bookAudit.body}
            </p>
            <p style={{
              fontSize: 16,
              lineHeight: 1.8,
              color: c.textMuted,
              textAlign: 'left',
            }}>
              {d.bookAudit.body2}
            </p>

            {d.bookAudit.image && (
              <div style={{ marginTop: 56, display: 'flex', justifyContent: 'center' }}>
                <img
                  src={d.bookAudit.image}
                  alt={d.bookAudit.imageAlt}
                  style={{
                    width: '100%',
                    maxWidth: 560,
                    borderRadius: 12,
                    border: `1px solid ${c.border}`,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Geometric divider */}
      <div style={{
        height: 1,
        background: `linear-gradient(90deg, transparent, ${c.cyan}44, ${c.magenta}44, transparent)`,
        margin: '0 24px',
        maxWidth: 1200,
        marginLeft: 'auto',
        marginRight: 'auto',
      }} />

      {/* ================================================================ */}
      {/*  9. CTA                                                          */}
      {/* ================================================================ */}
      <section style={{
        padding: '140px 24px',
        background: c.gradientCta,
        fontFamily: font,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Grid overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,240,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,240,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }} />
        {/* Radial glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(0,240,255,0.05) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div style={{ ...container, position: 'relative', zIndex: 1 }}>
          <h2 className="cta-headline" style={{
            fontSize: '4.5rem',
            fontWeight: 700,
            lineHeight: 1.1,
            color: c.white,
            letterSpacing: '-0.03em',
            marginBottom: 24,
          }}>
            {d.cta.headline.split('?')[0]}
            <span style={{
              background: c.gradientHero,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>?</span>
          </h2>
          <p style={{
            fontSize: 18,
            lineHeight: 1.7,
            color: c.textMuted,
            maxWidth: 600,
            margin: '0 auto 48px',
          }}>
            {d.cta.body}
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={d.cta.ctaLink}
              style={{
                ...glowBtn(c.cyan),
                fontSize: 16,
                padding: '18px 48px',
                animation: 'glow-pulse 2s ease-in-out infinite',
              }}
              className="glow-btn"
            >
              {d.cta.ctaText}
            </a>
            <a
              href={`tel:${d.brand.phone}`}
              style={{
                ...glowBtn(c.magenta),
                fontSize: 16,
                padding: '18px 48px',
              }}
              className="glow-btn-magenta"
            >
              CONTACT US
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  10. FOOTER                                                      */}
      {/* ================================================================ */}
      <footer style={{
        backgroundColor: c.bgFooter,
        padding: '80px 24px 40px',
        fontFamily: font,
        borderTop: `1px solid ${c.border}`,
      }}>
        <div style={container}>
          <div className="footer-grid" style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr',
            gap: 60,
            marginBottom: 60,
          }}>
            {/* Brand col */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{
                  width: 32,
                  height: 32,
                  background: c.gradientHero,
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }} />
                <span style={{ fontWeight: 700, fontSize: 18, color: c.white }}>
                  {d.brand.name}
                </span>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: c.textMuted, marginBottom: 24, maxWidth: 360 }}>
                {d.footer.tagline}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <a href={`tel:${d.brand.phone}`} style={{
                  color: c.cyan,
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: 500,
                  transition: 'color 0.3s',
                }}>
                  {d.brand.phone}
                </a>
                <a href={`mailto:${d.brand.email}`} style={{
                  color: c.textMuted,
                  textDecoration: 'none',
                  fontSize: 14,
                  transition: 'color 0.3s',
                }}>
                  {d.brand.email}
                </a>
              </div>
            </div>

            {/* Services col */}
            <div>
              <h4 style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: c.cyan,
                marginBottom: 24,
              }}>
                Services
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {d.footer.services.map((svc, i) => (
                  <a key={i} href="#" style={{
                    color: c.textMuted,
                    textDecoration: 'none',
                    fontSize: 14,
                    transition: 'color 0.3s',
                  }}
                    onMouseOver={(e) => (e.currentTarget.style.color = c.cyan)}
                    onMouseOut={(e) => (e.currentTarget.style.color = c.textMuted)}
                  >
                    {svc}
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation col */}
            <div>
              <h4 style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: c.magenta,
                marginBottom: 24,
              }}>
                Navigation
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {d.nav.map((link) => (
                  <a key={link} href="#" style={{
                    color: c.textMuted,
                    textDecoration: 'none',
                    fontSize: 14,
                    transition: 'color 0.3s',
                  }}
                    onMouseOver={(e) => (e.currentTarget.style.color = c.magenta)}
                    onMouseOut={(e) => (e.currentTarget.style.color = c.textMuted)}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: `1px solid ${c.border}`,
            paddingTop: 32,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          }}>
            <p style={{ fontSize: 13, color: c.textMuted }}>
              {d.footer.copyright}
            </p>
            <div style={{ display: 'flex', gap: 24 }}>
              <a href="#" style={{ color: c.textMuted, textDecoration: 'none', fontSize: 13 }}>Privacy</a>
              <a href="#" style={{ color: c.textMuted, textDecoration: 'none', fontSize: 13 }}>Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
