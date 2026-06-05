"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight, ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";

const GOLD = "#C5A880";
const BG   = "#0D0F12";

const EVENT_TYPES = [
  { value: "wedding",  label: "Wedding",        icon: "♡", desc: "Intimate to grand nuptials",         base: 8000  },
  { value: "gala",     label: "Corporate Gala", icon: "◈", desc: "Awards, launches & black-tie galas", base: 12000 },
  { value: "soiree",   label: "Private Soiree", icon: "✦", desc: "Celebrations & exclusive gatherings", base: 5000  },
] as const;

const GUEST_COUNTS = [
  { value: "intimate", label: "Intimate", sublabel: "Under 100 guests",  multiplier: 1.0 },
  { value: "classic",  label: "Classic",  sublabel: "100 – 250 guests",  multiplier: 1.6 },
  { value: "grand",    label: "Grand",    sublabel: "250 – 500+ guests", multiplier: 2.8 },
] as const;

const DECOR_STYLES = [
  { value: "minimalist", label: "Minimalist Editorial", icon: "□", desc: "Clean lines & curated simplicity", add: 2000 },
  { value: "floral",     label: "Lavish Floral",        icon: "✿", desc: "Lush blooms & romantic canopies",  add: 5000 },
  { value: "industrial", label: "Modern Industrial",    icon: "⬡", desc: "Steel, concrete & dramatic light", add: 3000 },
] as const;

const SERVICE_TIERS = [
  { value: "catering",    label: "Gourmet Catering",         desc: "5-course menu & sommelier service",     add: 4000 },
  { value: "photography", label: "Professional Photography", desc: "Full-day coverage & cinematic video",   add: 2500 },
  { value: "sound",       label: "Sound & Lighting",         desc: "L-Acoustics rig & RGBW wash lighting", add: 3000 },
] as const;

type EventVal   = typeof EVENT_TYPES[number]["value"];
type GuestVal   = typeof GUEST_COUNTS[number]["value"];
type DecorVal   = typeof DECOR_STYLES[number]["value"];
type ServiceVal = typeof SERVICE_TIERS[number]["value"];

const fmt = (n: number) => `₹${n.toLocaleString()}`;

export default function EvattoEstimator() {
  const [step,        setStep]        = useState(0);
  const [eventType,   setEventType]   = useState<EventVal | null>(null);
  const [guestCount,  setGuestCount]  = useState<GuestVal | null>(null);
  const [decorStyle,  setDecorStyle]  = useState<DecorVal | null>(null);
  const [services,    setServices]    = useState<Set<ServiceVal>>(new Set());
  const [busy,        setBusy]        = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Animate panel in on step change
  useEffect(() => {
    gsap.fromTo(panelRef.current,
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.42, ease: "power3.out" }
    );
  }, [step]);

  const canProceed = () => {
    if (step === 0) return eventType !== null;
    if (step === 1) return guestCount !== null;
    if (step === 2) return decorStyle !== null;
    return true;
  };

  const navigate = (dir: "next" | "back") => {
    if (busy) return;
    if (dir === "next" && !canProceed()) return;
    setBusy(true);
    gsap.to(panelRef.current, {
      opacity: 0, y: dir === "next" ? -16 : 16, duration: 0.22, ease: "power2.in",
      onComplete: () => {
        setStep(s => dir === "next" ? s + 1 : Math.max(0, s - 1));
        setBusy(false);
      },
    });
  };

  const toggleService = (val: ServiceVal) =>
    setServices(prev => { const n = new Set(prev); n.has(val) ? n.delete(val) : n.add(val); return n; });

  const calculate = () => {
    const base  = EVENT_TYPES.find(e => e.value === eventType)?.base ?? 0;
    const mult  = GUEST_COUNTS.find(g => g.value === guestCount)?.multiplier ?? 1;
    const decor = DECOR_STYLES.find(d => d.value === decorStyle)?.add ?? 0;
    const svc   = SERVICE_TIERS.reduce((a, s) => services.has(s.value) ? a + s.add : a, 0);
    const mid   = Math.round(base * mult + decor + svc);
    return { low: Math.round(mid * 0.88), high: Math.round(mid * 1.15), mid };
  };

  const STEP_LABELS = ["Event Type", "Guest Count", "Décor Style", "Services"];

  const cardBase: React.CSSProperties = {
    background: "rgba(253,251,247,0.04)",
    borderWidth: "1.5px",
    borderStyle: "solid",
    borderColor: "rgba(253,251,247,0.08)",
    borderRadius: "16px",
    padding: "24px 20px",
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.3s",
    width: "100%",
  };

  const cardActive: React.CSSProperties = {
    ...cardBase,
    background: "rgba(197,168,128,0.12)",
    borderColor: GOLD,
  };

  return (
    <section className="w-full py-24 md:py-32" style={{ background: BG }}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles size={11} style={{ color: GOLD }} />
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "9.5px", letterSpacing: "0.28em", textTransform: "uppercase", color: GOLD, fontWeight: 600 }}>
              Package Estimator
            </span>
          </div>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem,5vw,3.4rem)", fontWeight: 300, color: "#FDFBF7", lineHeight: 1.1, marginBottom: "12px" }}>
            Build Your <span style={{ color: GOLD, fontStyle: "italic" }}>Dream Event</span>
          </h2>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "rgba(253,251,247,0.42)", maxWidth: "440px", margin: "0 auto", lineHeight: 1.75 }}>
            Select your preferences and receive an instant personalised cost estimate — no commitment required.
          </p>
        </div>

        {/* Step bar */}
        {step < 4 && (
          <div className="flex items-center justify-center mb-10 px-2">
            {STEP_LABELS.map((label, i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center gap-1.5">
                  <div style={{
                    width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-inter)", fontSize: "11px", fontWeight: 700,
                    background: i < step ? GOLD : i === step ? "rgba(197,168,128,0.18)" : "rgba(255,255,255,0.05)",
                    color: i < step ? BG : i === step ? GOLD : "rgba(255,255,255,0.25)",
                    border: `1.5px solid ${i <= step ? GOLD : "rgba(255,255,255,0.08)"}`,
                    transition: "all 0.4s",
                  }}>
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span className="hidden sm:block" style={{ fontFamily: "var(--font-inter)", fontSize: "8.5px", letterSpacing: "0.08em", textTransform: "uppercase", color: i <= step ? "rgba(253,251,247,0.55)" : "rgba(253,251,247,0.2)" }}>
                    {label}
                  </span>
                </div>
                {i < STEP_LABELS.length - 1 && (
                  <div style={{ flex: 1, maxWidth: 40, height: 1, margin: "0 4px", marginBottom: 20, background: i < step ? GOLD : "rgba(255,255,255,0.08)", transition: "background 0.4s" }} />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Panel */}
        <div ref={panelRef}>

          {/* ── Step 0: Event Type ─────────────────────────────────────── */}
          {step === 0 && (
            <div>
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.2rem,3vw,1.65rem)", color: "rgba(253,251,247,0.6)", textAlign: "center", fontStyle: "italic", marginBottom: 28 }}>
                What are you celebrating?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {EVENT_TYPES.map(opt => (
                  <button key={opt.value} onClick={() => setEventType(opt.value)} style={eventType === opt.value ? cardActive : cardBase}
                    onMouseEnter={e => { if (eventType !== opt.value) (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(197,168,128,0.35)"; }}
                    onMouseLeave={e => { if (eventType !== opt.value) (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(253,251,247,0.08)"; }}
                  >
                    <div style={{ fontSize: "1.8rem", marginBottom: 10, color: GOLD }}>{opt.icon}</div>
                    <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", fontWeight: 300, color: "#FDFBF7", marginBottom: 6 }}>{opt.label}</p>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "11.5px", color: "rgba(253,251,247,0.45)", lineHeight: 1.6 }}>{opt.desc}</p>
                    {eventType === opt.value && <CheckCircle2 size={14} style={{ color: GOLD, marginTop: 10 }} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 1: Guest Count ────────────────────────────────────── */}
          {step === 1 && (
            <div>
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.2rem,3vw,1.65rem)", color: "rgba(253,251,247,0.6)", textAlign: "center", fontStyle: "italic", marginBottom: 28 }}>
                How many guests are you expecting?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {GUEST_COUNTS.map(opt => (
                  <button key={opt.value} onClick={() => setGuestCount(opt.value)} style={guestCount === opt.value ? cardActive : cardBase}
                    onMouseEnter={e => { if (guestCount !== opt.value) (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(197,168,128,0.35)"; }}
                    onMouseLeave={e => { if (guestCount !== opt.value) (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(253,251,247,0.08)"; }}
                  >
                    <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.6rem", fontWeight: 300, color: GOLD, marginBottom: 4 }}>{opt.label}</p>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "rgba(253,251,247,0.5)" }}>{opt.sublabel}</p>
                    {guestCount === opt.value && <CheckCircle2 size={14} style={{ color: GOLD, marginTop: 10 }} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 2: Décor Style ───────────────────────────────────── */}
          {step === 2 && (
            <div>
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.2rem,3vw,1.65rem)", color: "rgba(253,251,247,0.6)", textAlign: "center", fontStyle: "italic", marginBottom: 28 }}>
                Choose your aesthetic direction.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {DECOR_STYLES.map(opt => (
                  <button key={opt.value} onClick={() => setDecorStyle(opt.value)} style={decorStyle === opt.value ? cardActive : cardBase}
                    onMouseEnter={e => { if (decorStyle !== opt.value) (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(197,168,128,0.35)"; }}
                    onMouseLeave={e => { if (decorStyle !== opt.value) (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(253,251,247,0.08)"; }}
                  >
                    <div style={{ fontSize: "1.6rem", marginBottom: 10, color: GOLD }}>{opt.icon}</div>
                    <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.25rem", fontWeight: 300, color: "#FDFBF7", marginBottom: 6 }}>{opt.label}</p>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "11.5px", color: "rgba(253,251,247,0.45)", lineHeight: 1.6 }}>{opt.desc}</p>
                    {decorStyle === opt.value && <CheckCircle2 size={14} style={{ color: GOLD, marginTop: 10 }} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 3: Services (multi-select) ───────────────────────── */}
          {step === 3 && (
            <div>
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.2rem,3vw,1.65rem)", color: "rgba(253,251,247,0.6)", textAlign: "center", fontStyle: "italic", marginBottom: 8 }}>
                Select additional service tiers.
              </p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "11.5px", color: "rgba(253,251,247,0.35)", textAlign: "center", marginBottom: 28 }}>Optional — select any combination</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SERVICE_TIERS.map(opt => {
                  const isOn = services.has(opt.value);
                  return (
                    <button key={opt.value} onClick={() => toggleService(opt.value)} style={isOn ? cardActive : cardBase}
                      onMouseEnter={e => { if (!isOn) (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(197,168,128,0.35)"; }}
                      onMouseLeave={e => { if (!isOn) (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(253,251,247,0.08)"; }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.25rem", fontWeight: 300, color: "#FDFBF7", marginBottom: 6 }}>{opt.label}</p>
                        {isOn && <CheckCircle2 size={16} style={{ color: GOLD, flexShrink: 0 }} />}
                      </div>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "11.5px", color: "rgba(253,251,247,0.45)", lineHeight: 1.6, marginBottom: 10 }}>{opt.desc}</p>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: GOLD, fontWeight: 600 }}>+{fmt(opt.add)}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Step 4: Results ────────────────────────────────────────── */}
          {step === 4 && (() => {
            const { low, high, mid } = calculate();
            const breakdown = [
              { label: "Event Base", val: fmt(Math.round((EVENT_TYPES.find(e=>e.value===eventType)?.base??0) * (GUEST_COUNTS.find(g=>g.value===guestCount)?.multiplier??1))) },
              { label: "Décor & Styling", val: fmt(DECOR_STYLES.find(d=>d.value===decorStyle)?.add??0) },
              ...SERVICE_TIERS.filter(s => services.has(s.value)).map(s => ({ label: s.label, val: fmt(s.add) })),
            ];
            return (
              <div className="max-w-2xl mx-auto">
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.2rem,3vw,1.65rem)", color: "rgba(253,251,247,0.6)", textAlign: "center", fontStyle: "italic", marginBottom: 32 }}>
                  Your Estimated Investment
                </p>
                {/* Range display */}
                <div style={{ background: "rgba(197,168,128,0.08)", border: `1.5px solid ${GOLD}`, borderRadius: 20, padding: "32px 28px", marginBottom: 20, textAlign: "center" }}>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD, marginBottom: 12 }}>Estimated Range</p>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem,7vw,4rem)", fontWeight: 300, color: "#FDFBF7", lineHeight: 1 }}>
                    {fmt(low)} <span style={{ fontSize: "0.5em", color: "rgba(253,251,247,0.4)" }}>—</span> {fmt(high)}
                  </p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(253,251,247,0.35)", marginTop: 10 }}>
                    Estimate based on your selections · ±15% variance depending on specific requirements
                  </p>
                </div>
                {/* Breakdown */}
                <div style={{ background: "rgba(253,251,247,0.03)", border: "1px solid rgba(253,251,247,0.07)", borderRadius: 16, padding: "20px 24px", marginBottom: 24 }}>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "9.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(253,251,247,0.4)", marginBottom: 14 }}>Cost Breakdown</p>
                  {breakdown.map((row, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < breakdown.length-1 ? "1px solid rgba(253,251,247,0.06)" : "none" }}>
                      <span style={{ fontFamily: "var(--font-inter)", fontSize: "12.5px", color: "rgba(253,251,247,0.55)" }}>{row.label}</span>
                      <span style={{ fontFamily: "var(--font-inter)", fontSize: "12.5px", color: "#FDFBF7", fontWeight: 600 }}>{row.val}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 14, marginTop: 4 }}>
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: GOLD, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Estimated Total</span>
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: GOLD, fontWeight: 700 }}>{fmt(mid)}</span>
                  </div>
                </div>
                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="/contact" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 24px", background: GOLD, borderRadius: 50, fontFamily: "var(--font-inter)", fontSize: "12px", fontWeight: 700, color: BG, letterSpacing: "0.06em", textDecoration: "none", textTransform: "uppercase" }}>
                    Discuss Your Package <ArrowRight size={14} />
                  </a>
                  <button onClick={() => { setStep(0); setEventType(null); setGuestCount(null); setDecorStyle(null); setServices(new Set()); }}
                    style={{ flex: 1, padding: "14px 24px", background: "rgba(253,251,247,0.05)", border: "1px solid rgba(253,251,247,0.1)", borderRadius: 50, fontFamily: "var(--font-inter)", fontSize: "12px", color: "rgba(253,251,247,0.6)", cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    Start Over
                  </button>
                </div>
              </div>
            );
          })()}
        </div>

        {/* ── Navigation ────────────────────────────────────────────────── */}
        {step < 4 && (
          <div className="flex items-center justify-between mt-10">
            {step > 0 ? (
              <button onClick={() => navigate("back")} style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", background: "transparent", border: "1px solid rgba(253,251,247,0.12)", borderRadius: 50, fontFamily: "var(--font-inter)", fontSize: "12px", color: "rgba(253,251,247,0.55)", cursor: "pointer" }}>
                <ArrowLeft size={13} /> Back
              </button>
            ) : <div />}

            <button
              onClick={() => navigate("next")}
              disabled={!canProceed() || busy}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 28px", background: canProceed() ? GOLD : "rgba(197,168,128,0.2)", border: "none", borderRadius: 50, fontFamily: "var(--font-inter)", fontSize: "12px", fontWeight: 700, color: canProceed() ? BG : "rgba(197,168,128,0.4)", cursor: canProceed() ? "pointer" : "not-allowed", transition: "all 0.3s", letterSpacing: "0.06em", textTransform: "uppercase" }}
            >
              {step === 3 ? "Calculate Estimate" : "Continue"} <ArrowRight size={13} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
