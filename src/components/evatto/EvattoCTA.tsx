"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const CORNERS = [
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=700", pos: "top-10 left-10 md:top-16 md:left-16", from: { x: -80, y: -60 }, w: "w-48 md:w-64", ratio: "aspect-[3/4]" },
  { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=700", pos: "top-10 right-10 md:top-16 md:right-16", from: { x: 80, y: -60 }, w: "w-36 md:w-52", ratio: "aspect-square" },
  { src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=700", pos: "bottom-10 left-10 md:bottom-16 md:left-16", from: { x: -80, y: 60 }, w: "w-44 md:w-56", ratio: "aspect-[4/3]" },
  { src: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&q=80&w=700", pos: "bottom-10 right-10 md:bottom-16 md:right-16", from: { x: 80, y: 60 }, w: "w-36 md:w-44", ratio: "aspect-square" },
];

export default function EvattoCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Corner images fly in from their respective corners
      imgRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, x: CORNERS[i].from.x, y: CORNERS[i].from.y, scale: 0.88 },
          {
            opacity: 1, x: 0, y: 0, scale: 1,
            duration: 1.1, ease: "power3.out", delay: i * 0.08,
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
          }
        );
      });

      // Central text
      const tlines = textRef.current?.querySelectorAll(".t-line");
      if (tlines) {
        gsap.fromTo(tlines, { opacity: 0, y: 22 }, {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} style={{ background: "#D4DEC9", position: "relative", overflow: "hidden", minHeight: "640px" }} className="flex items-center justify-center">
      {/* Corner images */}
      {CORNERS.map((c, i) => (
        <div
          key={i}
          ref={el => { imgRefs.current[i] = el; }}
          className={`absolute ${c.pos} ${c.w} ${c.ratio} rounded-2xl overflow-hidden shadow-xl opacity-0 z-10`}
        >
          <img src={c.src} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
      ))}

      {/* Central content */}
      <div ref={textRef} className="relative z-20 text-center px-8 py-40 md:py-52 flex flex-col items-center">
        <p className="t-line opacity-0" style={{ fontFamily: "var(--font-inter)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.35em", color: "rgba(26,26,26,0.45)", marginBottom: "18px" }}>Get started</p>
        <h2 className="t-line opacity-0" style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(3rem, 8vw, 7.5rem)", fontWeight: 300, color: "#1A1A1A", lineHeight: 1.0, maxWidth: "700px" }}>
          Ready to host with us?
        </h2>
        <p className="t-line opacity-0 mt-5" style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "rgba(26,26,26,0.55)", maxWidth: "380px", lineHeight: 1.65 }}>
          Create your unforgettable events with us. From intimate gatherings to grand celebrations, we have the perfect space.
        </p>
        <a href="#" className="t-line btn-pill btn-pill-solid mt-9 opacity-0">
          Let&apos;s get started
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.5 11.5L11.5 1.5M11.5 1.5H5.5M11.5 1.5V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </div>
    </div>
  );
}
