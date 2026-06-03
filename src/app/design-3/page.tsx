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
const serifFont = "'Playfair Display', serif";
const sansFont = "'DM Sans', sans-serif";

const colors = {
  cream: '#FAF8F5',
  charcoal: '#2D2A26',
  gold: '#C4962C',
  burgundy: '#8B2252',
  warmGray: '#A39E97',
  lightRule: '#D9D4CD',
  darkBg: '#1E1C19',
  darkSurface: '#2D2A26',
  offWhite: '#F0ECE6',
};

// ── Google Fonts head link (rendered inline via style tag) ──────────────
function FontLoader() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&display=swap');`,
      }}
    />
  );
}

// ── Shared layout wrapper ──────────────────────────────────────────────
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
        maxWidth: 1180,
        margin: '0 auto',
        padding: '0 32px',
        ...style,
      }}
    >
      {children}
    </section>
  );
}

// ── Decorative thin rule ───────────────────────────────────────────────
function HairlineRule({
  width = '100%',
  color = colors.lightRule,
  style,
}: {
  width?: string | number;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        width,
        height: 1,
        backgroundColor: color,
        margin: '0 auto',
        ...style,
      }}
    />
  );
}

// ══════════════════════════════════════════════════════════════════════════
// 1. NAV
// ══════════════════════════════════════════════════════════════════════════
function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: colors.cream,
        borderBottom: `1px solid ${colors.lightRule}`,
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '20px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <span
          style={{
            fontFamily: serifFont,
            fontSize: '1.35rem',
            fontWeight: 700,
            color: colors.charcoal,
            letterSpacing: '0.02em',
          }}
        >
          {brand.name}
        </span>

        {/* Desktop links */}
        <div
          style={{
            display: 'flex',
            gap: 36,
            alignItems: 'center',
          }}
          className="nav-desktop"
        >
          {nav.map((item) => (
            <NavLink key={item} label={item} />
          ))}
          <a
            href={`tel:${brand.phone}`}
            style={{
              fontFamily: sansFont,
              fontSize: '0.85rem',
              color: colors.gold,
              textDecoration: 'none',
              fontWeight: 600,
              letterSpacing: '0.04em',
            }}
          >
            {brand.phone}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          className="nav-mobile-toggle"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
          }}
        >
          <div style={{ width: 24, display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span
              style={{
                display: 'block',
                height: 1.5,
                backgroundColor: colors.charcoal,
                borderRadius: 1,
                transition: 'all 0.3s',
                transform: mobileOpen ? 'rotate(45deg) translateY(6.5px)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                height: 1.5,
                backgroundColor: colors.charcoal,
                borderRadius: 1,
                transition: 'all 0.3s',
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                height: 1.5,
                backgroundColor: colors.charcoal,
                borderRadius: 1,
                transition: 'all 0.3s',
                transform: mobileOpen ? 'rotate(-45deg) translateY(-6.5px)' : 'none',
              }}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="nav-mobile-menu"
          style={{
            padding: '0 32px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            borderBottom: `1px solid ${colors.lightRule}`,
          }}
        >
          {nav.map((item) => (
            <a
              key={item}
              href="#"
              style={{
                fontFamily: sansFont,
                fontSize: '1rem',
                color: colors.charcoal,
                textDecoration: 'none',
              }}
            >
              {item}
            </a>
          ))}
          <a
            href={`tel:${brand.phone}`}
            style={{
              fontFamily: sansFont,
              fontSize: '0.9rem',
              color: colors.gold,
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            {brand.phone}
          </a>
        </div>
      )}
    </nav>
  );
}

function NavLink({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: sansFont,
        fontSize: '0.88rem',
        fontWeight: 500,
        color: colors.charcoal,
        textDecoration: 'none',
        position: 'relative',
        paddingBottom: 2,
        letterSpacing: '0.03em',
        textTransform: 'uppercase' as const,
      }}
    >
      {label}
      <span
        style={{
          position: 'absolute',
          bottom: -2,
          left: 0,
          width: hovered ? '100%' : '0%',
          height: 1,
          backgroundColor: colors.gold,
          transition: 'width 0.35s ease',
        }}
      />
    </a>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// 2. HERO
// ══════════════════════════════════════════════════════════════════════════
function Hero() {
  const [ctaHover, setCtaHover] = useState(false);
  return (
    <section
      style={{
        backgroundColor: colors.cream,
        paddingTop: 80,
        paddingBottom: 80,
      }}
    >
      <Section>
        {/* Top decorative rule */}
        <HairlineRule width={120} color={colors.gold} style={{ marginBottom: 40 }} />

        <h1
          style={{
            fontFamily: serifFont,
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontWeight: 800,
            color: colors.charcoal,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: 32,
            maxWidth: 800,
          }}
        >
          {hero.headline}
        </h1>

        {/* Bottom decorative rule */}
        <HairlineRule width={80} color={colors.lightRule} style={{ marginBottom: 32 }} />

        <p
          style={{
            fontFamily: serifFont,
            fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
            fontStyle: 'italic',
            color: colors.warmGray,
            lineHeight: 1.7,
            maxWidth: 620,
            marginBottom: 48,
          }}
        >
          {hero.subheadline}
        </p>

        <a
          href={hero.ctaLink}
          onMouseEnter={() => setCtaHover(true)}
          onMouseLeave={() => setCtaHover(false)}
          style={{
            display: 'inline-block',
            fontFamily: sansFont,
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
            color: ctaHover ? colors.cream : colors.charcoal,
            backgroundColor: ctaHover ? colors.charcoal : 'transparent',
            border: `1.5px solid ${colors.charcoal}`,
            padding: '16px 40px',
            textDecoration: 'none',
            transition: 'all 0.35s ease',
          }}
        >
          {hero.cta}
        </a>

        {/* Thin gold accent line below CTA */}
        <HairlineRule
          width={40}
          color={colors.gold}
          style={{ marginTop: 60, marginLeft: 0 }}
        />

        {/* Hero image */}
        <div style={{ marginTop: 48 }}>
          <img
            src={hero.image}
            alt={hero.imageAlt}
            style={{
              width: '100%',
              maxWidth: 900,
              height: 'auto',
              display: 'block',
              border: `1px solid ${colors.lightRule}`,
              boxShadow: '0 8px 32px rgba(45,42,38,0.10)',
            }}
          />
        </div>
      </Section>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// 3. GROWTH — Newspaper-style two-column
// ══════════════════════════════════════════════════════════════════════════
function Growth() {
  return (
    <section style={{ backgroundColor: colors.cream, paddingTop: 80, paddingBottom: 80 }}>
      <Section>
        <h2
          style={{
            fontFamily: serifFont,
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700,
            color: colors.charcoal,
            letterSpacing: '-0.01em',
            lineHeight: 1.15,
            marginBottom: 48,
            maxWidth: 560,
          }}
        >
          {growth.headline}
        </h2>

        <HairlineRule style={{ marginBottom: 48 }} />

        <div
          className="growth-columns"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1px 1fr',
            gap: 48,
          }}
        >
          {/* Column 1 with drop cap */}
          <p
            style={{
              fontFamily: sansFont,
              fontSize: '1rem',
              lineHeight: 1.75,
              color: colors.charcoal,
              margin: 0,
            }}
          >
            <span
              style={{
                fontFamily: serifFont,
                fontSize: '4.2rem',
                fontWeight: 700,
                float: 'left',
                lineHeight: 0.8,
                marginRight: 12,
                marginTop: 6,
                color: colors.gold,
              }}
            >
              {growth.body.charAt(0).toUpperCase()}
            </span>
            {/* Start body after "with" — the drop cap is the "w" so skip first char */}
            {growth.body.slice(1)}
          </p>

          {/* Thin vertical divider */}
          <div style={{ backgroundColor: colors.lightRule, width: 1 }} />

          {/* Column 2 */}
          <p
            style={{
              fontFamily: sansFont,
              fontSize: '1rem',
              lineHeight: 1.75,
              color: colors.charcoal,
              margin: 0,
            }}
          >
            {growth.body2}
          </p>
        </div>

        {/* Body 3 */}
        {growth.body3 && (
          <p
            style={{
              fontFamily: sansFont,
              fontSize: '1rem',
              lineHeight: 1.75,
              color: colors.charcoal,
              marginTop: 40,
              maxWidth: 800,
            }}
          >
            {growth.body3}
          </p>
        )}

        {/* Growth image */}
        {growth.image && (
          <div style={{ marginTop: 48 }}>
            <img
              src={growth.image}
              alt={growth.imageAlt}
              style={{
                width: '100%',
                maxWidth: 800,
                height: 'auto',
                display: 'block',
                margin: '0 auto',
                border: `1px solid ${colors.lightRule}`,
                boxShadow: '0 6px 24px rgba(45,42,38,0.08)',
              }}
            />
          </div>
        )}
      </Section>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// 4. SOCIAL PROOF — Pull-quote
// ══════════════════════════════════════════════════════════════════════════
function SocialProof() {
  return (
    <section
      style={{
        backgroundColor: colors.offWhite,
        paddingTop: 80,
        paddingBottom: 80,
      }}
    >
      <Section
        style={{
          textAlign: 'center',
          maxWidth: 800,
          position: 'relative',
        }}
      >
        {/* Decorative quotation mark */}
        <span
          style={{
            fontFamily: serifFont,
            fontSize: '8rem',
            lineHeight: 1,
            color: colors.gold,
            opacity: 0.3,
            display: 'block',
            marginBottom: -40,
          }}
        >
          &ldquo;
        </span>
        <p
          style={{
            fontFamily: serifFont,
            fontSize: 'clamp(1.3rem, 3vw, 2rem)',
            fontWeight: 500,
            fontStyle: 'italic',
            color: colors.charcoal,
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {socialProof}
        </p>
        <span
          style={{
            fontFamily: serifFont,
            fontSize: '8rem',
            lineHeight: 1,
            color: colors.gold,
            opacity: 0.3,
            display: 'block',
            marginTop: -20,
            transform: 'rotate(180deg)',
          }}
        >
          &ldquo;
        </span>
      </Section>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// 4b. SPECIALIZED MARKETING — Editorial feature
// ══════════════════════════════════════════════════════════════════════════
function SpecializedMarketing() {
  return (
    <section style={{ backgroundColor: colors.cream, paddingTop: 80, paddingBottom: 80 }}>
      <Section>
        <HairlineRule width={60} color={colors.gold} style={{ marginBottom: 32, marginLeft: 0 }} />

        <h2
          style={{
            fontFamily: serifFont,
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700,
            color: colors.charcoal,
            letterSpacing: '-0.01em',
            lineHeight: 1.15,
            marginBottom: 40,
            maxWidth: 650,
          }}
        >
          {specializedMarketing.headline}
        </h2>

        <HairlineRule style={{ marginBottom: 40 }} />

        <div
          className="specialized-columns"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 48,
            marginBottom: 48,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: sansFont,
                fontSize: '1rem',
                lineHeight: 1.75,
                color: colors.charcoal,
                marginBottom: 24,
              }}
            >
              {specializedMarketing.body}
            </p>
            <p
              style={{
                fontFamily: sansFont,
                fontSize: '1rem',
                lineHeight: 1.75,
                color: colors.charcoal,
                margin: 0,
              }}
            >
              {specializedMarketing.body2}
            </p>
          </div>

          <div>
            <p
              style={{
                fontFamily: sansFont,
                fontSize: '1rem',
                lineHeight: 1.75,
                color: colors.charcoal,
                marginBottom: 24,
              }}
            >
              {specializedMarketing.body3}
            </p>
            <p
              style={{
                fontFamily: sansFont,
                fontSize: '1rem',
                lineHeight: 1.75,
                color: colors.charcoal,
                margin: 0,
              }}
            >
              {specializedMarketing.body4}
            </p>
          </div>
        </div>

        {/* Specialized Marketing image */}
        {specializedMarketing.image && (
          <div style={{ marginTop: 8 }}>
            <img
              src={specializedMarketing.image}
              alt={specializedMarketing.imageAlt}
              style={{
                width: '100%',
                maxWidth: 800,
                height: 'auto',
                display: 'block',
                margin: '0 auto',
                border: `1px solid ${colors.lightRule}`,
                boxShadow: '0 6px 24px rgba(45,42,38,0.08)',
              }}
            />
          </div>
        )}
      </Section>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// 5. SERVICES — Two-column grid with rules
// ══════════════════════════════════════════════════════════════════════════
function Services() {
  return (
    <section style={{ backgroundColor: colors.cream, paddingTop: 80, paddingBottom: 80 }}>
      <Section>
        {/* Section intro */}
        <div style={{ marginBottom: 56, maxWidth: 600 }}>
          <p
            style={{
              fontFamily: sansFont,
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase' as const,
              color: colors.gold,
              marginBottom: 16,
            }}
          >
            What We Do
          </p>
          <h2
            style={{
              fontFamily: serifFont,
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 700,
              color: colors.charcoal,
              letterSpacing: '-0.01em',
              lineHeight: 1.15,
              marginBottom: 20,
            }}
          >
            {servicesIntro.headline}
          </h2>
          <p
            style={{
              fontFamily: sansFont,
              fontSize: '1rem',
              lineHeight: 1.7,
              color: colors.warmGray,
            }}
          >
            {servicesIntro.body}
          </p>
        </div>

        <HairlineRule style={{ marginBottom: 48 }} />

        <div
          className="services-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 0,
          }}
        >
          {services.map((service, idx) => (
            <ServiceItem key={idx} service={service} idx={idx} />
          ))}
        </div>
      </Section>
    </section>
  );
}

function ServiceItem({
  service,
  idx,
}: {
  service: { title: string; description: string; icon: string };
  idx: number;
}) {
  const [hovered, setHovered] = useState(false);
  const isLeft = idx % 2 === 0;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '40px 32px',
        borderBottom: `1px solid ${colors.lightRule}`,
        borderRight: isLeft ? `1px solid ${colors.lightRule}` : 'none',
        transition: 'background-color 0.3s ease',
        backgroundColor: hovered ? colors.offWhite : 'transparent',
      }}
    >
      {/* Index number */}
      <span
        style={{
          fontFamily: serifFont,
          fontSize: '0.85rem',
          fontWeight: 400,
          color: colors.gold,
          display: 'block',
          marginBottom: 16,
          fontStyle: 'italic',
        }}
      >
        0{idx + 1}
      </span>
      <h3
        style={{
          fontFamily: serifFont,
          fontSize: '1.4rem',
          fontWeight: 600,
          color: colors.charcoal,
          marginBottom: 16,
          lineHeight: 1.3,
        }}
      >
        {service.title}
      </h3>
      <p
        style={{
          fontFamily: sansFont,
          fontSize: '0.92rem',
          lineHeight: 1.7,
          color: colors.warmGray,
          margin: 0,
        }}
      >
        {service.description}
      </p>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// 6. STATS — Large serif numbers, small caps labels
// ══════════════════════════════════════════════════════════════════════════
function Stats() {
  return (
    <section
      style={{
        backgroundColor: colors.charcoal,
        paddingTop: 80,
        paddingBottom: 80,
      }}
    >
      <Section>
        <p
          style={{
            fontFamily: sansFont,
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
            color: colors.gold,
            textAlign: 'center',
            marginBottom: 48,
          }}
        >
          Proven Results
        </p>

        <div
          className="stats-row"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 0,
          }}
        >
          {stats.map((stat, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start' }}>
              {idx > 0 && (
                <div
                  className="stats-divider"
                  style={{
                    width: 1,
                    height: 80,
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    alignSelf: 'center',
                  }}
                />
              )}
              <div
                style={{
                  textAlign: 'center',
                  padding: '0 clamp(16px, 3vw, 40px)',
                  minWidth: 140,
                }}
              >
                <span
                  style={{
                    fontFamily: serifFont,
                    fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                    fontWeight: 700,
                    color: colors.cream,
                    display: 'block',
                    letterSpacing: '-0.02em',
                    marginBottom: 12,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontFamily: sansFont,
                    fontSize: '0.72rem',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase' as const,
                    color: 'rgba(255,255,255,0.55)',
                    lineHeight: 1.5,
                    maxWidth: 180,
                    display: 'block',
                  }}
                >
                  {stat.label.split(' ').slice(0, 6).join(' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// 7. WHY CHOOSE — Magazine feature article
// ══════════════════════════════════════════════════════════════════════════
function WhyChoose() {
  return (
    <section style={{ backgroundColor: colors.cream, paddingTop: 100, paddingBottom: 100 }}>
      <Section>
        {/* Pull-quote headline */}
        <div style={{ marginBottom: 56 }}>
          <HairlineRule width={60} color={colors.gold} style={{ marginBottom: 32, marginLeft: 0 }} />
          <h2
            style={{
              fontFamily: serifFont,
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              fontWeight: 700,
              color: colors.charcoal,
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              marginBottom: 32,
              maxWidth: 650,
            }}
          >
            {whyChoose.headline}
          </h2>

          {/* Body in columns */}
          <div
            className="why-body-columns"
            style={{
              columnCount: 2,
              columnGap: 48,
              columnRule: `1px solid ${colors.lightRule}`,
            }}
          >
            <p
              style={{
                fontFamily: sansFont,
                fontSize: '1rem',
                lineHeight: 1.75,
                color: colors.warmGray,
                margin: 0,
              }}
            >
              {whyChoose.body}
            </p>
          </div>
        </div>

        <HairlineRule style={{ marginBottom: 56 }} />

        {/* Cards */}
        <div
          className="why-cards"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 32,
          }}
        >
          {whyChoose.cards.map((card, idx) => (
            <WhyCard key={idx} card={card} idx={idx} />
          ))}
        </div>
      </Section>
    </section>
  );
}

function WhyCard({
  card,
  idx,
}: {
  card: { title: string; description: string };
  idx: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: 36,
        border: `1px solid ${hovered ? colors.gold : colors.lightRule}`,
        transition: 'all 0.35s ease',
        backgroundColor: hovered ? colors.offWhite : 'transparent',
      }}
    >
      <span
        style={{
          fontFamily: serifFont,
          fontSize: '0.85rem',
          fontStyle: 'italic',
          color: colors.gold,
          display: 'block',
          marginBottom: 16,
        }}
      >
        0{idx + 1}
      </span>
      <h3
        style={{
          fontFamily: serifFont,
          fontSize: '1.3rem',
          fontWeight: 600,
          color: colors.charcoal,
          marginBottom: 14,
          lineHeight: 1.3,
        }}
      >
        {card.title}
      </h3>
      <p
        style={{
          fontFamily: sansFont,
          fontSize: '0.92rem',
          lineHeight: 1.7,
          color: colors.warmGray,
          margin: 0,
        }}
      >
        {card.description}
      </p>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// 8. FAQ — Accordion with serif questions
// ══════════════════════════════════════════════════════════════════════════
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section style={{ backgroundColor: colors.offWhite, paddingTop: 80, paddingBottom: 80 }}>
      <Section style={{ maxWidth: 780 }}>
        <p
          style={{
            fontFamily: sansFont,
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
            color: colors.gold,
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          Frequently Asked
        </p>
        <h2
          style={{
            fontFamily: serifFont,
            fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
            fontWeight: 700,
            color: colors.charcoal,
            textAlign: 'center',
            marginBottom: 48,
            letterSpacing: '-0.01em',
          }}
        >
          Questions &amp; Answers
        </h2>

        <div>
          {faq.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  borderTop: idx === 0 ? `1px solid ${colors.lightRule}` : 'none',
                  borderBottom: `1px solid ${colors.lightRule}`,
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '24px 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: 16,
                  }}
                >
                  <span
                    style={{
                      fontFamily: serifFont,
                      fontSize: '1.1rem',
                      fontWeight: 500,
                      color: isOpen ? colors.gold : colors.charcoal,
                      transition: 'color 0.3s ease',
                      lineHeight: 1.4,
                    }}
                  >
                    {item.question}
                  </span>
                  <span
                    style={{
                      fontFamily: sansFont,
                      fontSize: '1.4rem',
                      fontWeight: 300,
                      color: isOpen ? colors.gold : colors.warmGray,
                      transition: 'color 0.3s ease, transform 0.3s ease',
                      flexShrink: 0,
                      width: 24,
                      textAlign: 'center',
                      lineHeight: 1,
                    }}
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? 500 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease',
                  }}
                >
                  <p
                    style={{
                      fontFamily: sansFont,
                      fontSize: '0.95rem',
                      lineHeight: 1.7,
                      color: colors.warmGray,
                      paddingBottom: 24,
                      margin: 0,
                    }}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// 8b. BOOK AUDIT — Pre-CTA call-to-action
// ══════════════════════════════════════════════════════════════════════════
function BookAudit() {
  const [ctaHover, setCtaHover] = useState(false);
  return (
    <section style={{ backgroundColor: colors.cream, paddingTop: 80, paddingBottom: 80 }}>
      <Section>
        <div
          className="book-audit-layout"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 56,
            alignItems: 'center',
          }}
        >
          <div>
            <HairlineRule width={60} color={colors.gold} style={{ marginBottom: 32, marginLeft: 0 }} />
            <h2
              style={{
                fontFamily: serifFont,
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 700,
                color: colors.charcoal,
                letterSpacing: '-0.01em',
                lineHeight: 1.15,
                marginBottom: 28,
                maxWidth: 500,
              }}
            >
              {bookAudit.headline}
            </h2>

            <p
              style={{
                fontFamily: sansFont,
                fontSize: '1rem',
                lineHeight: 1.75,
                color: colors.warmGray,
                marginBottom: 24,
              }}
            >
              {bookAudit.body}
            </p>
            <p
              style={{
                fontFamily: sansFont,
                fontSize: '1rem',
                lineHeight: 1.75,
                color: colors.warmGray,
                marginBottom: 36,
              }}
            >
              {bookAudit.body2}
            </p>

            <a
              href={cta.ctaLink}
              onMouseEnter={() => setCtaHover(true)}
              onMouseLeave={() => setCtaHover(false)}
              style={{
                display: 'inline-block',
                fontFamily: sansFont,
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase' as const,
                color: ctaHover ? colors.cream : colors.charcoal,
                backgroundColor: ctaHover ? colors.charcoal : 'transparent',
                border: `1.5px solid ${colors.charcoal}`,
                padding: '16px 40px',
                textDecoration: 'none',
                transition: 'all 0.35s ease',
              }}
            >
              {cta.ctaText}
            </a>
          </div>

          {/* Book Audit image */}
          {bookAudit.image && (
            <div>
              <img
                src={bookAudit.image}
                alt={bookAudit.imageAlt}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  border: `1px solid ${colors.lightRule}`,
                  boxShadow: '0 8px 32px rgba(45,42,38,0.10)',
                }}
              />
            </div>
          )}
        </div>
      </Section>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// 9. CTA
// ══════════════════════════════════════════════════════════════════════════
function CTA() {
  const [ctaHover, setCtaHover] = useState(false);
  return (
    <section style={{ backgroundColor: colors.cream, paddingTop: 100, paddingBottom: 100 }}>
      <Section style={{ textAlign: 'center', maxWidth: 680 }}>
        <HairlineRule width={80} color={colors.gold} style={{ marginBottom: 40 }} />

        <h2
          style={{
            fontFamily: serifFont,
            fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
            fontWeight: 700,
            color: colors.charcoal,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: 24,
          }}
        >
          {cta.headline}
        </h2>
        <p
          style={{
            fontFamily: serifFont,
            fontSize: '1.1rem',
            fontStyle: 'italic',
            lineHeight: 1.7,
            color: colors.warmGray,
            marginBottom: 40,
          }}
        >
          {cta.body}
        </p>

        <HairlineRule width={40} color={colors.lightRule} style={{ marginBottom: 40 }} />

        <a
          href={cta.ctaLink}
          onMouseEnter={() => setCtaHover(true)}
          onMouseLeave={() => setCtaHover(false)}
          style={{
            display: 'inline-block',
            fontFamily: sansFont,
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
            color: ctaHover ? colors.cream : colors.charcoal,
            backgroundColor: ctaHover ? colors.charcoal : 'transparent',
            border: `1.5px solid ${colors.charcoal}`,
            padding: '16px 48px',
            textDecoration: 'none',
            transition: 'all 0.35s ease',
          }}
        >
          {cta.ctaText}
        </a>
      </Section>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// 10. FOOTER
// ══════════════════════════════════════════════════════════════════════════
function Footer() {
  return (
    <footer style={{ backgroundColor: colors.darkBg }}>
      {/* Top rule */}
      <div style={{ height: 1, backgroundColor: 'rgba(196,150,44,0.3)' }} />

      <Section style={{ paddingTop: 64, paddingBottom: 48 }}>
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr',
            gap: 48,
            marginBottom: 48,
          }}
        >
          {/* Brand column */}
          <div>
            <span
              style={{
                fontFamily: serifFont,
                fontSize: '1.4rem',
                fontWeight: 700,
                color: colors.cream,
                display: 'block',
                marginBottom: 16,
              }}
            >
              {brand.name}
            </span>
            <p
              style={{
                fontFamily: serifFont,
                fontSize: '1rem',
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.6,
                margin: 0,
                maxWidth: 320,
              }}
            >
              {footer.tagline}
            </p>
          </div>

          {/* Services column */}
          <div>
            <h4
              style={{
                fontFamily: serifFont,
                fontSize: '0.9rem',
                fontWeight: 600,
                color: colors.cream,
                letterSpacing: '0.05em',
                marginBottom: 20,
              }}
            >
              Services
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footer.services.map((s, idx) => (
                <li key={idx} style={{ marginBottom: 10 }}>
                  <a
                    href="#"
                    style={{
                      fontFamily: sansFont,
                      fontSize: '0.85rem',
                      color: 'rgba(255,255,255,0.45)',
                      textDecoration: 'none',
                      lineHeight: 1.5,
                    }}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4
              style={{
                fontFamily: serifFont,
                fontSize: '0.9rem',
                fontWeight: 600,
                color: colors.cream,
                letterSpacing: '0.05em',
                marginBottom: 20,
              }}
            >
              Contact
            </h4>
            <div
              style={{
                fontFamily: sansFont,
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.8,
              }}
            >
              <p style={{ margin: '0 0 4px' }}>{brand.phone}</p>
              <p style={{ margin: '0 0 4px' }}>{brand.email}</p>
              <p style={{ margin: 0 }}>{brand.address}</p>
            </div>
          </div>
        </div>

        <HairlineRule color="rgba(255,255,255,0.1)" style={{ marginBottom: 24 }} />

        <p
          style={{
            fontFamily: sansFont,
            fontSize: '0.78rem',
            color: 'rgba(255,255,255,0.3)',
            textAlign: 'center',
            margin: 0,
            letterSpacing: '0.02em',
          }}
        >
          {footer.copyright}
        </p>
      </Section>
    </footer>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════════════════
export default function Design3Page() {
  return (
    <>
      <FontLoader />

      {/* Responsive overrides */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
            html { scroll-behavior: smooth; }
            body { background: ${colors.cream}; }

            @media (max-width: 768px) {
              .nav-desktop { display: none !important; }
              .nav-mobile-toggle { display: flex !important; }
              .growth-columns {
                grid-template-columns: 1fr !important;
                gap: 32px !important;
              }
              .growth-columns > div:nth-child(2) {
                display: none !important;
              }
              .services-grid {
                grid-template-columns: 1fr !important;
              }
              .services-grid > div {
                border-right: none !important;
              }
              .stats-row {
                flex-direction: column !important;
                align-items: center !important;
                gap: 32px !important;
              }
              .stats-divider {
                display: none !important;
              }
              .why-body-columns {
                column-count: 1 !important;
              }
              .why-cards {
                grid-template-columns: 1fr !important;
              }
              .specialized-columns {
                grid-template-columns: 1fr !important;
                gap: 32px !important;
              }
              .book-audit-layout {
                grid-template-columns: 1fr !important;
                gap: 32px !important;
              }
              .footer-grid {
                grid-template-columns: 1fr !important;
                gap: 32px !important;
              }
            }

            @media (min-width: 769px) {
              .nav-mobile-toggle { display: none !important; }
              .nav-mobile-menu { display: none !important; }
            }
          `,
        }}
      />

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
