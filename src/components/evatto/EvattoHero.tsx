"use client";

import React, { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const HEADLINE = "Your unforgettable story starts here";

// Pre-split at module level — stable across renders
const WORDS = HEADLINE.split(" ");

export default function EvattoHero() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const bgRef       = useRef<HTMLDivElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const eyebrowRef  = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  // One stable ref array per char — using HTMLSpanElement | null for correct React standard typing
  const charRefs = useMemo<React.RefObject<HTMLSpanElement | null>[]>(() =>
    HEADLINE.replace(/ /g, "").split("").map(() => React.createRef<HTMLSpanElement>()),
  []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const chars = charRefs.map(r => r.current).filter(Boolean) as HTMLSpanElement[];

    const tl = gsap.timeline({ delay: 0.4 });

    // Ken Burns on bg
    tl.fromTo(bgRef.current, { scale: 1.1 }, { scale: 1, duration: 2.8, ease: "power2.out" }, 0);

    // Overlay fade
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 1.6, ease: "power2.inOut" }, 0);

    // Eyebrow
    tl.fromTo(eyebrowRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" },
      0.55
    );

    // Chars slide up
    if (chars.length) {
      tl.to(chars, { y: "0%", duration: 1.1, stagger: 0.018, ease: "power4.out" }, 0.8);
    }

    // CTAs
    tl.fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 1.65);

    // Scroll indicator
    tl.fromTo(indicatorRef.current, { opacity: 0 }, { opacity: 0.65, duration: 0.6 }, 2.1);

    // Bg parallax
    gsap.to(bgRef.current, {
      yPercent: 18, 
      ease: "none",
      force3D: true,
      scrollTrigger: { 
        trigger: sectionRef.current, 
        start: "top top", 
        end: "bottom top", 
        scrub: 0.4,
      },
    });

    return () => { ScrollTrigger.getAll().forEach(s => s.kill()); };
  }, [charRefs]);

  // Build words→chars mapping with stable index
  let globalIdx = 0;

  return (
    <section ref={sectionRef} className="relative w-full flex flex-col justify-end overflow-hidden"
      style={{ height: "100svh", minHeight: "640px" }}>

      {/* Background — Indian wedding floral chandelier */}
      <div ref={bgRef} className="absolute inset-0 bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: `url('/hero-bg.jpg')`, willChange: "transform" }} />

      {/* Gradient overlay — neutral dark tint to complement elegant table setting */}
      <div ref={overlayRef} className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(10,8,6,0.95) 0%, rgba(10,8,6,0.45) 50%, rgba(10,8,6,0.15) 100%)", opacity: 0 }} />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-14 pb-14 md:pb-20 w-full" style={{ maxWidth: "1380px", margin: "0 auto" }}>
        {/* Eyebrow */}
        <p ref={eyebrowRef} className="mb-6 opacity-0"
          style={{ fontFamily: "var(--font-inter)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.28em", color: "rgba(253,251,247,0.72)" }}>
          Host Unforgettable Events in Timeless Spaces
        </p>

        {/* Headline — chars split in JSX, refs stable via useMemo */}
        <h1 className="mb-10"
          style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.8rem,7.5vw,7.2rem)", fontWeight: 300, lineHeight: 1.0, color: "#FDFBF7", letterSpacing: "-0.01em", maxWidth: "950px" }}>
          {WORDS.map((word, wi) => {
            const wordChars = word.split("").map((ch) => {
              const ref = charRefs[globalIdx++];
              return (
                <span key={ch + globalIdx} ref={ref}
                  style={{ display: "inline-block", transform: "translateY(110%)" }}>
                  {ch}
                </span>
              );
            });
            return (
              <span key={wi} style={{ display: "inline-block", marginRight: "0.28em", overflow: "hidden" }}>
                {wordChars}
              </span>
            );
          })}
        </h1>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap gap-3 opacity-0">
          <button 
            onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("open-book-tour")); }}
            className="btn-pill btn-pill-outline-light"
          >
            Book a tour
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.5 11.5L11.5 1.5M11.5 1.5H5.5M11.5 1.5V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <a href="#" className="btn-pill btn-pill-outline-light">
            Explore the venue
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.5 11.5L11.5 1.5M11.5 1.5H5.5M11.5 1.5V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={indicatorRef} className="absolute right-8 md:right-14 bottom-10 z-10 flex flex-col items-center gap-2 opacity-0">
        <div className="w-px h-14 overflow-hidden" style={{ background: "rgba(253,251,247,0.15)" }}>
          <div className="w-full" style={{ height: "50%", background: "rgba(253,251,247,0.8)", animation: "scrollLine 1.8s ease-in-out infinite" }} />
        </div>
      </div>
    </section>
  );
}
