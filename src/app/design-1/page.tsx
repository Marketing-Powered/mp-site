'use client';

import { useState } from 'react';
import { siteContent } from '@/lib/content';

/* ------------------------------------------------------------------ */
/*  Design 1 — "Clean Minimal"                                        */
/*  Off-white bg, charcoal text, soft-blue accent, Inter font         */
/* ------------------------------------------------------------------ */

const c = {
  bg: '#FAFAFA',
  bgAlt: '#F0F0F5',
  text: '#1A1A2E',
  textMuted: '#555566',
  accent: '#4A90D9',
  accentHover: '#3A7BC8',
  white: '#FFFFFF',
  border: '#E0E0E8',
  dark: '#1A1A2E',
  darkMuted: '#2A2A3E',
};

const font = "'Inter', sans-serif";

/* ---- reusable inline style helpers ---- */
const section = (alt = false): React.CSSProperties => ({
  padding: '96px 24px',
  backgroundColor: alt ? c.bgAlt : c.bg,
  fontFamily: font,
});

const container: React.CSSProperties = {
  maxWidth: 1120,
  margin: '0 auto',
  width: '100%',
};

const btnPrimary: React.CSSProperties = {
  display: 'inline-block',
  padding: '14px 36px',
  backgroundColor: c.accent,
  color: c.white,
  fontFamily: font,
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: '0.06em',
  borderRadius: 6,
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.25s ease, transform 0.25s ease',
  textDecoration: 'none',
};

/* ---- simple SVG icon map ---- */
function SvgIcon({ name, size = 28, color = c.accent }: { name: string; size?: number; color?: string }) {
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
    case 'lightbulb':
      return <svg {...props}><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg>;
    case 'layers':
      return <svg {...props}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
    case 'cpu':
      return <svg {...props}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>;
    case 'compass':
      return <svg {...props}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>;
    default:
      return <svg {...props}><circle cx="12" cy="12" r="10"/></svg>;
  }
}

const whyIcons = ['lightbulb', 'cpu', 'compass', 'layers'];

/* ================================================================== */
/*  PAGE COMPONENT                                                     */
/* ================================================================== */

export default function Design1Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const d = siteContent;

  return (
    <div style={{ fontFamily: font, color: c.text, backgroundColor: c.bg, overflowX: 'hidden' }}>
      {/* -- global smooth scroll -- */}
      <style>{`
        html { scroll-behavior: smooth; }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* ============================================================ */}
      {/*  NAV                                                          */}
      {/* ============================================================ */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        backgroundColor: 'rgba(250,250,250,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${c.border}`,
        padding: '0 24px',
        fontFamily: font,
      }}>
        <div style={{ ...container, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          {/* logo */}
          <a href="#" style={{ textDecoration: 'none', color: c.text, fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>
            Marketing<span style={{ color: c.accent }}>Powered</span>
          </a>

          {/* desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="nav-links-desktop">
            {d.nav.map((link) => (
              <a key={link} href="#" style={{ textDecoration: 'none', color: c.textMuted, fontSize: 14, fontWeight: 500, transition: 'color 0.2s', letterSpacing: '0.01em' }}
                onMouseEnter={e => (e.currentTarget.style.color = c.accent)}
                onMouseLeave={e => (e.currentTarget.style.color = c.textMuted)}
              >{link}</a>
            ))}
            <a href={`tel:${d.brand.phone}`}
              style={{ ...btnPrimary, padding: '10px 24px', fontSize: 13 }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = c.accentHover; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = c.accent; e.currentTarget.style.transform = 'translateY(0)'; }}
            >{d.brand.phone}</a>
          </div>

          {/* mobile hamburger */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle menu"
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: c.text }}
            className="nav-hamburger"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenu
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        </div>

        {/* mobile dropdown */}
        {mobileMenu && (
          <div style={{ padding: '16px 0 24px', display: 'flex', flexDirection: 'column', gap: 16, borderTop: `1px solid ${c.border}` }} className="nav-mobile-menu">
            {d.nav.map((link) => (
              <a key={link} href="#" style={{ textDecoration: 'none', color: c.textMuted, fontSize: 15, fontWeight: 500, padding: '4px 0' }}>{link}</a>
            ))}
            <a href={`tel:${d.brand.phone}`} style={{ ...btnPrimary, padding: '12px 24px', fontSize: 13, textAlign: 'center' as const }}>{d.brand.phone}</a>
          </div>
        )}

        {/* responsive styles */}
        <style>{`
          @media (max-width: 768px) {
            .nav-links-desktop { display: none !important; }
            .nav-hamburger { display: block !important; }
          }
        `}</style>
      </nav>

      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <section style={{ ...section(), padding: '120px 24px 100px', textAlign: 'center' }}>
        <div style={{ ...container, maxWidth: 780 }}>
          <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', color: c.accent, textTransform: 'uppercase', marginBottom: 20 }}>
            AI Marketing Agency
          </p>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: c.text, marginBottom: 24 }}>
            {d.hero.headline}
          </h1>
          <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', lineHeight: 1.7, color: c.textMuted, maxWidth: 620, margin: '0 auto 40px', fontWeight: 400 }}>
            {d.hero.subheadline}
          </p>
          <a href={d.hero.ctaLink} style={btnPrimary}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = c.accentHover; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = c.accent; e.currentTarget.style.transform = 'translateY(0)'; }}
          >{d.hero.cta}</a>

          {/* hero image */}
          <div style={{ marginTop: 56, borderRadius: 12, overflow: 'hidden', boxShadow: '0 8px 32px rgba(26,26,46,0.08)' }}>
            <img src={d.hero.image} alt={d.hero.imageAlt} style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  GROWTH                                                       */}
      {/* ============================================================ */}
      <section style={{ ...section(true) }}>
        <div style={{ ...container, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="growth-grid">
          {/* text */}
          <div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 24 }}>
              {d.growth.headline}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: c.textMuted, marginBottom: 20 }}>
              {d.growth.body}
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: c.textMuted }}>
              {d.growth.body2}
            </p>
            {d.growth.body3 && (
              <p style={{ fontSize: 15, lineHeight: 1.8, color: c.textMuted, marginTop: 20 }}>
                {d.growth.body3}
              </p>
            )}
          </div>
          {/* key concept image */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={d.growth.image} alt={d.growth.imageAlt} style={{ width: '100%', maxWidth: 480, borderRadius: 12, boxShadow: '0 8px 32px rgba(26,26,46,0.08)' }} />
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .growth-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ============================================================ */}
      {/*  SOCIAL PROOF                                                 */}
      {/* ============================================================ */}
      <section style={{ padding: '48px 24px', backgroundColor: c.bg, borderTop: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}`, textAlign: 'center' }}>
        <div style={container}>
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 500, color: c.textMuted, letterSpacing: '0.01em' }}>
            <span style={{ color: c.accent, fontWeight: 700 }}>{d.socialProof}</span>
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SPECIALIZED MARKETING                                        */}
      {/* ============================================================ */}
      <section style={{ ...section() }}>
        <div style={container}>
          <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 16 }}>
              {d.specializedMarketing.headline}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }} className="specialized-grid">
            <div>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: c.textMuted, marginBottom: 20 }}>
                {d.specializedMarketing.body}
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: c.textMuted, marginBottom: 20 }}>
                {d.specializedMarketing.body2}
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: c.textMuted, marginBottom: 20 }}>
                {d.specializedMarketing.body3}
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: c.textMuted }}>
                {d.specializedMarketing.body4}
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={d.specializedMarketing.image} alt={d.specializedMarketing.imageAlt} style={{ width: '100%', maxWidth: 480, borderRadius: 12, boxShadow: '0 8px 32px rgba(26,26,46,0.08)' }} />
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .specialized-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ============================================================ */}
      {/*  SERVICES                                                     */}
      {/* ============================================================ */}
      <section style={{ ...section(true) }}>
        <div style={container}>
          <div style={{ textAlign: 'center', marginBottom: 64, maxWidth: 600, margin: '0 auto 64px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 16 }}>
              {d.servicesIntro.headline}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: c.textMuted }}>
              {d.servicesIntro.body}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="services-grid">
            {d.services.map((svc, i) => (
              <div key={i}
                style={{
                  padding: 32,
                  border: `1px solid ${c.border}`,
                  borderRadius: 10,
                  backgroundColor: c.white,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(26,26,46,0.06)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ marginBottom: 20 }}>
                  <SvgIcon name={svc.icon} size={32} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, letterSpacing: '-0.01em' }}>
                  {svc.title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: c.textMuted }}>
                  {svc.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 560px) {
            .services-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ============================================================ */}
      {/*  STATS / PROVEN RESULTS                                       */}
      {/* ============================================================ */}
      <section style={{ ...section(true), padding: '72px 24px' }}>
        <div style={container}>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 56 }}>
            Proven Results
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${d.stats.length}, 1fr)`, gap: 32, textAlign: 'center' }} className="stats-grid">
            {d.stats.map((stat, i) => (
              <div key={i} style={{
                padding: '24px 16px',
                borderLeft: i > 0 ? `1px solid ${c.border}` : 'none',
              }} className="stat-item">
                <div style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: c.accent, letterSpacing: '-0.03em', marginBottom: 8 }}>
                  {stat.value}
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: c.textMuted, maxWidth: 200, margin: '0 auto' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .stats-grid { grid-template-columns: repeat(3, 1fr) !important; }
            .stat-item { border-left: none !important; border-bottom: 1px solid ${c.border}; padding-bottom: 32px !important; }
          }
          @media (max-width: 560px) {
            .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
      </section>

      {/* ============================================================ */}
      {/*  WHY CHOOSE                                                   */}
      {/* ============================================================ */}
      <section style={{ ...section() }}>
        <div style={container}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 56px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 16 }}>
              {d.whyChoose.headline}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: c.textMuted }}>
              {d.whyChoose.body}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }} className="why-grid">
            {d.whyChoose.cards.map((card, i) => (
              <div key={i}
                style={{
                  padding: 36,
                  backgroundColor: c.bgAlt,
                  borderRadius: 10,
                  border: `1px solid ${c.border}`,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(26,26,46,0.05)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ marginBottom: 16 }}>
                  <SvgIcon name={whyIcons[i] || 'lightbulb'} size={28} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10, letterSpacing: '-0.01em' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: c.textMuted }}>
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 600px) {
            .why-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ============================================================ */}
      {/*  FAQ                                                          */}
      {/* ============================================================ */}
      <section style={{ ...section(true) }}>
        <div style={{ ...container, maxWidth: 720 }}>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 48 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {d.faq.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{
                  border: `1px solid ${c.border}`,
                  borderRadius: 8,
                  backgroundColor: c.white,
                  overflow: 'hidden',
                  transition: 'box-shadow 0.25s ease',
                  boxShadow: isOpen ? '0 4px 16px rgba(26,26,46,0.04)' : 'none',
                }}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    style={{
                      width: '100%',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '20px 24px',
                      background: 'none', border: 'none',
                      cursor: 'pointer',
                      fontFamily: font,
                      fontSize: 16, fontWeight: 600,
                      color: c.text,
                      textAlign: 'left' as const,
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = c.accent)}
                    onMouseLeave={e => (e.currentTarget.style.color = c.text)}
                  >
                    <span style={{ flex: 1, paddingRight: 16 }}>{item.question}</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c.textMuted} strokeWidth="2" strokeLinecap="round"
                      style={{ flexShrink: 0, transition: 'transform 0.3s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                  <div style={{
                    maxHeight: isOpen ? 300 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.35s ease, padding 0.35s ease',
                    padding: isOpen ? '0 24px 20px' : '0 24px',
                  }}>
                    <p style={{ fontSize: 15, lineHeight: 1.7, color: c.textMuted }}>
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA                                                          */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/*  BOOK AUDIT                                                   */}
      {/* ============================================================ */}
      <section style={{ ...section(), padding: '96px 24px' }}>
        <div style={{ ...container, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }} className="audit-grid">
          <div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 20 }}>
              {d.bookAudit.headline}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: c.textMuted, marginBottom: 20 }}>
              {d.bookAudit.body}
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: c.textMuted }}>
              {d.bookAudit.body2}
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={d.bookAudit.image} alt={d.bookAudit.imageAlt} style={{ width: '100%', maxWidth: 480, borderRadius: 12, boxShadow: '0 8px 32px rgba(26,26,46,0.08)' }} />
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .audit-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ============================================================ */}
      {/*  CTA                                                          */}
      {/* ============================================================ */}
      <section style={{ ...section(true), textAlign: 'center', padding: '100px 24px' }}>
        <div style={{ ...container, maxWidth: 700 }}>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 20 }}>
            {d.cta.headline}
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: c.textMuted, marginBottom: 36 }}>
            {d.cta.body}
          </p>
          <a href={d.cta.ctaLink} style={btnPrimary}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = c.accentHover; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = c.accent; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {d.cta.ctaText}
          </a>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FOOTER                                                       */}
      {/* ============================================================ */}
      <footer style={{ backgroundColor: c.dark, color: c.white, padding: '72px 24px 40px', fontFamily: font }}>
        <div style={{ ...container, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }} className="footer-grid">
          {/* brand */}
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, letterSpacing: '-0.02em' }}>
              Marketing<span style={{ color: c.accent }}>Powered</span>
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', marginBottom: 20 }}>
              {d.footer.tagline}
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(255,255,255,0.4)' }}>
              {d.brand.address}
            </p>
          </div>

          {/* services */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 20 }}>
              Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {d.footer.services.map((svc, i) => (
                <li key={i}>
                  <a href="#" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.6)', fontSize: 14, transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = c.accent)}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                  >{svc}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 20 }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href={`tel:${d.brand.phone}`} style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.6)', fontSize: 14, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = c.accent)}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >{d.brand.phone}</a>
              <a href={`mailto:${d.brand.email}`} style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.6)', fontSize: 14, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = c.accent)}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >{d.brand.email}</a>
            </div>
          </div>
        </div>

        {/* copyright bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: 48, paddingTop: 24, textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
            {d.footer.copyright}
          </p>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .footer-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </footer>
    </div>
  );
}
