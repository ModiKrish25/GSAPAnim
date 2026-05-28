"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

/**
 * Overlapping scattered mosaic with merge animation.
 *
 * All 6 images are absolutely positioned in their FINAL overlapping state.
 * On scroll:
 *   TOP group (images 0,1,2) → starts y: -600  →  slides DOWN  (reverses on scroll-up)
 *   BOT group (images 3,4,5) → starts y: +600  →  slides UP    (reverses on scroll-up)
 *
 * Images overlap each other via z-index, creating the collage look shown in the screenshot.
 */

// Each image: final absolute position as % of container, slight rotation for organic feel
const TOP_GROUP = [
  {
    // Large portrait — woman in reeds, top-left anchor
    src: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&q=80&w=800",
    alt: "Woman in scenic field",
    style: { top: "0%", left: "1%", width: "26%", aspectRatio: "3/4" },
    rotate: -2,
    zIndex: 3,
  },
  {
    // Aerial pool — overlaps bottom-right of woman image
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
    alt: "Aerial view of tropical pool",
    style: { top: "22%", left: "19%", width: "22%", aspectRatio: "4/3" },
    rotate: 3,
    zIndex: 4,
  },
  {
    // Beach arch — overlaps bottom of pool image
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
    alt: "Beach wedding ceremony",
    style: { top: "54%", left: "8%", width: "22%", aspectRatio: "4/3" },
    rotate: -1.5,
    zIndex: 2,
  },
];

const BOT_GROUP = [
  {
    // Large dome/gazebo — center-right hero image
    src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=800",
    alt: "White dome wedding gazebo",
    style: { top: "3%", left: "43%", width: "28%", aspectRatio: "3/4" },
    rotate: 0.5,
    zIndex: 3,
  },
  {
    // Beach chairs ceremony — right, overlaps dome at edge
    src: "https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?auto=format&fit=crop&q=80&w=800",
    alt: "Beach chair ceremony setup",
    style: { top: "40%", left: "62%", width: "22%", aspectRatio: "3/4" },
    rotate: 2,
    zIndex: 2,
  },
  {
    // Festival celebration — top-right corner
    src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800",
    alt: "Colorful festival celebration",
    style: { top: "0%", left: "79%", width: "20%", aspectRatio: "3/4" },
    rotate: -2.5,
    zIndex: 4,
  },
];

const STATS = [
  { end: 800, decimals: 0, suffix: "+", label: "Events hosted" },
  { end: 50,  decimals: 0, suffix: "+", label: "Expert vendors" },
  { end: 4.9, decimals: 1, suffix: "",  label: "Average rating" },
  { end: 15,  decimals: 0, suffix: "+", label: "Years of excellence" },
];

export default function EvattoIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLDivElement>(null);
  const topRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const botRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef   = useRef<HTMLDivElement>(null);
  const numRefs    = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      /* ── Initial positions (off-screen) ──────────────────── */
      gsap.set(topRefs.current.filter(Boolean), { y: -620, opacity: 0 });
      gsap.set(botRefs.current.filter(Boolean), { y:  620, opacity: 0 });

      /* ── Scrubbed merge — fully reversible ───────────────── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: canvasRef.current,
          start: "top 90%",
          end:   "bottom 55%",
          scrub: 0.5,
        },
      });

      // TOP group slides DOWN into position
      tl.to(
        topRefs.current.filter(Boolean),
        { y: 0, opacity: 1, stagger: 0.08, duration: 1, ease: "power2.out" },
        0
      );

      // BOT group slides UP into position — simultaneous
      tl.to(
        botRefs.current.filter(Boolean),
        { y: 0, opacity: 1, stagger: 0.08, duration: 1, ease: "power2.out" },
        0
      );

      /* ── Stats entrance + count-up ───────────────────────── */
      gsap.fromTo(
        statsRef.current?.querySelectorAll(".stat-item") ?? [],
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 85%", once: true },
        }
      );

      STATS.forEach((stat, i) => {
        const el = numRefs.current[i];
        if (!el) return;
        const counter = { val: 0 };
        gsap.to(counter, {
          val: stat.end, duration: 2.2, ease: "power2.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 82%", once: true },
          onUpdate() {
            el.textContent = (stat.decimals > 0
              ? counter.val.toFixed(stat.decimals)
              : Math.floor(counter.val).toString()
            ) + stat.suffix;
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ background: "#FDFBF7", overflow: "hidden" }}
      className="w-full"
    >
      {/* ── Mobile image grid (hidden on md+) ──────────────── */}
      <div className="block md:hidden px-6 pt-10 pb-4">
        <div className="grid grid-cols-2 gap-3">
          {[...TOP_GROUP, ...BOT_GROUP].slice(0, 4).map((img, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden"
              style={{ aspectRatio: "3/4" }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Desktop absolute-positioned overlapping mosaic canvas (hidden on mobile) ───── */}
      <div
        ref={canvasRef}
        className="hidden md:block"
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(520px, 75vw, 860px)",
          overflow: "visible",
        }}
      >
        {/* TOP GROUP */}
        {TOP_GROUP.map((img, i) => (
          <div
            key={`top-${i}`}
            ref={el => { topRefs.current[i] = el; }}
            style={{
              position: "absolute",
              ...img.style as React.CSSProperties,
              zIndex: img.zIndex,
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 12px 40px rgba(0,0,0,0.14)",
              transform: `rotate(${img.rotate}deg)`,
              willChange: "transform",
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              loading="lazy"
            />
          </div>
        ))}

        {/* BOT GROUP */}
        {BOT_GROUP.map((img, i) => (
          <div
            key={`bot-${i}`}
            ref={el => { botRefs.current[i] = el; }}
            style={{
              position: "absolute",
              ...img.style as React.CSSProperties,
              zIndex: img.zIndex,
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 12px 40px rgba(0,0,0,0.14)",
              transform: `rotate(${img.rotate}deg)`,
              willChange: "transform",
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* ── Stats row with count-up ──────────────────────────── */}
      <div
        ref={statsRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 px-6 md:px-14 py-12 md:py-20"
        style={{
          maxWidth: "1380px",
          margin: "0 auto",
          borderTop: "1px solid rgba(26,26,26,0.1)",
          marginTop: "32px",
        }}
      >
        {STATS.map((s, i) => (
          <div key={i} className="stat-item opacity-0">
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.4rem,5vw,4.5rem)", fontWeight: 300, color: "#1A1A1A", lineHeight: 1 }}>
              <span ref={el => { numRefs.current[i] = el; }}>0{s.suffix}</span>
            </p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(26,26,26,0.45)", marginTop: "8px" }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
