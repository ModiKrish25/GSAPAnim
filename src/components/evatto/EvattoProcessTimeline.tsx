"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const STAGES = [
  {
    num: "01",
    title: "Consultation",
    desc: "We begin by understanding your vision, preferences, guest count, budget, and event expectations. Our team works closely with you to create a personalized wedding experience.",
  },
  {
    num: "02",
    title: "Planning & Venue Selection",
    desc: "We shortlist the perfect venues, create event timelines, coordinate vendors, and design a complete wedding roadmap tailored to your celebration.",
  },
  {
    num: "03",
    title: "Decoration & Styling",
    desc: "Our creative team designs stunning décor concepts, floral arrangements, stage setups, lighting, and themed experiences that reflect your unique story.",
  },
  {
    num: "04",
    title: "Catering & Hospitality",
    desc: "We curate exceptional menus and hospitality services to ensure every guest enjoys a memorable dining experience throughout the celebration.",
  },
  {
    num: "05",
    title: "Photography & Entertainment",
    desc: "Professional photographers, videographers, DJs, and entertainers are coordinated to capture every special moment and keep the celebration alive.",
  },
  {
    num: "06",
    title: "Event Day Execution",
    desc: "Our planners manage every detail on-site, ensuring smooth coordination, timely execution, and a stress-free experience for you and your family.",
  },
];

export default function EvattoProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ── 1. Set all initial hidden states ──────────────────────────────
      gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top center" });
      dotRefs.current.forEach((dot) => gsap.set(dot, { scale: 0, opacity: 0 }));
      cardRefs.current.forEach((card) => gsap.set(card, { opacity: 0, x: 50 }));

      // ── 2. Header: one-time reveal (not scroll-synced) ─────────────────
      gsap.fromTo(
        headerRef.current?.querySelectorAll(".proc-h") ?? [],
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.14,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );

      // ── 3. Single master timeline — line + all cards share one ST ──────
      //
      // HOW SYNC WORKS:
      //   • Timeline total duration = 1 (set by the line tween).
      //   • The line scaleY goes from 0 → 1 linearly (ease:"none") over
      //     the full timeline (t=0 … t=1).
      //   • Dot i sits at vertical fraction (i+0.5)/N of the line height.
      //   • We insert dot i's reveal at exactly that same t-position in the
      //     timeline, so the line and dot are driven by the same progress
      //     counter — perfect sync, no guessing, naturally reversible.
      //
      const N = STAGES.length; // 6

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",       // section top enters at 75% from top of vp
          end: "bottom 25%",      // section bottom reaches 25% from top of vp
          scrub: 1.5,             // smooth lag; bidirectional (reverse = hide)
        },
      });

      // Line grows across the full timeline duration
      tl.to(
        lineRef.current,
        { scaleY: 1, ease: "none", duration: 1 },
        0           // starts at t=0
      );

      // Each dot + card inserted at the exact timeline position where
      // the line's scaleY equals the dot's fractional height
      STAGES.forEach((_, i) => {
        const atT = (i + 0.5) / N; // 0.083, 0.25, 0.417, 0.583, 0.75, 0.917

        // Dot: short snap (duration 0.04 so it's crisp, not smeared)
        tl.fromTo(
          dotRefs.current[i],
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.04, ease: "back.out(3)" },
          atT                       // insert at the line's matching progress
        );

        // Card: slides in immediately after the dot pops
        tl.fromTo(
          cardRefs.current[i],
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.08, ease: "power2.out" },
          atT + 0.015               // tiny offset so dot fires first
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 md:py-32"
      style={{ background: "#0D0F12" }}
    >
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-16">
        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 items-start">

          {/* ── Left: sticky heading panel ── */}
          <div
            ref={headerRef}
            className="lg:w-[36%] shrink-0 flex flex-col gap-6 lg:sticky lg:top-28"
          >
            {/* Label */}
            <div className="proc-h opacity-0 flex items-center gap-2.5">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#C5A880" }}
              />
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "10px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "#C5A880",
                  fontWeight: 600,
                }}
              >
                Our Process
              </span>
            </div>

            {/* Main heading */}
            <h2
              className="proc-h opacity-0"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                fontWeight: 300,
                color: "#FDFBF7",
                lineHeight: 1.1,
              }}
            >
              From Dream to{" "}
              <span style={{ color: "#C5A880", fontStyle: "italic" }}>
                Celebration
              </span>
            </h2>

            {/* Sub-title */}
            <p
              className="proc-h opacity-0"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.15rem, 2vw, 1.5rem)",
                fontWeight: 300,
                color: "rgba(253,251,247,0.5)",
                lineHeight: 1.35,
                fontStyle: "italic",
              }}
            >
              How We Create Unforgettable Celebrations
            </p>

            {/* Body */}
            <p
              className="proc-h opacity-0"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "12.5px",
                color: "rgba(253,251,247,0.42)",
                lineHeight: 1.8,
                maxWidth: "360px",
              }}
            >
              Our thoughtfully structured process guarantees flawless
              coordination, precise execution, and a stress-free journey from
              the first conversation to the final applause.
            </p>
          </div>

          {/* ── Right: Timeline column ── */}
          <div className="lg:w-[64%] flex flex-row">

            {/* Vertical line + dots ── */}
            <div
              className="relative shrink-0 flex flex-col items-center"
              style={{ width: "32px", marginRight: "28px" }}
            >
              {/* Faint track background */}
              <div
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2"
                style={{ width: "1px", background: "rgba(197,168,128,0.1)" }}
              />

              {/* Animated golden line — scaleY driven by scroll */}
              <div
                ref={lineRef}
                className="absolute top-0 left-1/2 -translate-x-1/2"
                style={{
                  width: "1.5px",
                  height: "100%",
                  background:
                    "linear-gradient(to bottom, #C5A880 0%, rgba(197,168,128,0.25) 100%)",
                  transformOrigin: "top center",
                }}
              />

              {/* Dots — flex-distributed to align with each card ── */}
              {STAGES.map((_, i) => (
                <div
                  key={i}
                  ref={(el) => { dotRefs.current[i] = el; }}
                  className="relative z-10 flex items-center justify-center"
                  style={{ flex: 1 }}
                >
                  {/* Outer glow ring */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: "20px",
                      height: "20px",
                      background: "rgba(197,168,128,0.14)",
                      border: "1px solid rgba(197,168,128,0.35)",
                    }}
                  />
                  {/* Inner dot */}
                  <div
                    className="relative rounded-full"
                    style={{
                      width: "9px",
                      height: "9px",
                      background: "#C5A880",
                      boxShadow: "0 0 8px 3px rgba(197,168,128,0.45)",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Stage cards ── */}
            <div className="flex flex-col gap-5 flex-1">
              {STAGES.map((stage, i) => (
                <div
                  key={i}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className="group rounded-2xl px-6 py-5 transition-colors duration-500 cursor-default"
                  style={{
                    background: "rgba(253,251,247,0.04)",
                    border: "1px solid rgba(253,251,247,0.07)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background =
                      "rgba(197,168,128,0.07)";
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "rgba(197,168,128,0.28)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background =
                      "rgba(253,251,247,0.04)";
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "rgba(253,251,247,0.07)";
                  }}
                >
                  {/* Stage label */}
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "8.5px",
                      letterSpacing: "0.26em",
                      textTransform: "uppercase",
                      color: "#C5A880",
                      fontWeight: 700,
                      marginBottom: "6px",
                    }}
                  >
                    Stage {stage.num}
                  </p>

                  {/* Stage title */}
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "clamp(1.25rem, 2vw, 1.65rem)",
                      fontWeight: 300,
                      color: "#FDFBF7",
                      lineHeight: 1.2,
                      marginBottom: "6px",
                    }}
                  >
                    {stage.title}
                  </h3>

                  {/* Stage description */}
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "12px",
                      color: "rgba(253,251,247,0.48)",
                      lineHeight: 1.65,
                    }}
                  >
                    {stage.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
