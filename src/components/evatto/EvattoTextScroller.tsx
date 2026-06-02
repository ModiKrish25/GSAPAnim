"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const PHRASE_1 = "IMAGINE • DESIGN • CELEBRATE • INSPIRE • CREATE • ";
const PHRASE_2 = "ELEGANCE • GRANDEUR • BEAUTY • MOMENTS • FOREVER • ";

export default function EvattoTextScroller() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const parent = sectionRef.current;
      if (!parent) return;

      // Master scroll-scrub for 3D sliding text rows
      // Moves rows in opposite horizontal directions as you scroll past
      gsap.fromTo(row1Ref.current,
        { xPercent: -20 },
        {
          xPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: parent,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          }
        }
      );

      gsap.fromTo(row2Ref.current,
        { xPercent: 10 },
        {
          xPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: parent,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          }
        }
      );

      // NOTE: No infinite rotation tween on the parent — the static 3D perspective
      // is handled purely via CSS @media query to avoid style conflicts and layout cost.

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-16 md:py-32 flex flex-col justify-center gap-4 md:gap-10 select-none evatto-text-scroller"
      style={{
        background: "#0e0f11",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      {/* Apply 3D perspective only on md+ — avoid clipping on mobile */}
      <style>{`
        @media (min-width: 768px) {
          .evatto-text-scroller {
            perspective: 1200px;
            transform-style: preserve-3d;
            transform: rotateX(15deg) rotateY(-5deg) rotateZ(-3deg);
          }
        }
      `}</style>
      {/* Background soft ambient spot */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 60%)"
        }}
      />

      {/* Row 1: Left-to-Right */}
      <div 
        ref={row1Ref}
        className="flex whitespace-nowrap will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="text-white/10 font-bold uppercase tracking-widest text-[5rem] sm:text-[8rem] md:text-[10rem] leading-none transition-colors duration-500 hover:text-[#D4AF37] cursor-default"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              letterSpacing: "0.02em",
              textShadow: "0 0 1px rgba(255,255,255,0.05)",
            }}
          >
            {PHRASE_1}
          </span>
        ))}
      </div>

      {/* Row 2: Right-to-Left */}
      <div 
        ref={row2Ref}
        className="flex whitespace-nowrap will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="text-white/15 font-bold uppercase tracking-widest text-[5rem] sm:text-[8rem] md:text-[10rem] leading-none transition-colors duration-500 hover:text-white/60 cursor-default"
            style={{
              fontFamily: "var(--font-inter)",
              letterSpacing: "0.05em",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.05)",
            }}
          >
            {PHRASE_2}
          </span>
        ))}
      </div>
    </section>
  );
}
