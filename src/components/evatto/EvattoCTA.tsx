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

    let positionCardsHandler: () => void = () => {};

    const ctx = gsap.context(() => {
      const parent = sectionRef.current;
      if (!parent) return;

      const imgs = imgRefs.current.filter(Boolean) as HTMLDivElement[];

      // Centering calculations: dynamically offsets each corner card from its natural CSS position
      // so it is mathematically centered inside the viewport space at starting scroll
      positionCardsHandler = () => {
        const parentRect = parent.getBoundingClientRect();
        const pCenterX = parentRect.width / 2;
        const pCenterY = parentRect.height / 2;

        imgs.forEach((el, i) => {
          const elRect = el.getBoundingClientRect();
          const elCenterX = el.offsetLeft + elRect.width / 2;
          const elCenterY = el.offsetTop + elRect.height / 2;

          const deltaX = pCenterX - elCenterX;
          const deltaY = pCenterY - elCenterY;

          // Set starting position at the exact center, completely overlapping
          gsap.set(el, {
            x: deltaX,
            y: deltaY,
            scale: 0.15,
            opacity: 0,
            transformOrigin: "center center",
          });
        });
      };

      // Set initial coordinates
      positionCardsHandler();

      // Master scrub timeline: as you scroll, cards fly outward from the center to their corners!
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parent,
          start: "top 95%",    // begins as section enters from bottom
          end: "bottom 30%",   // ends when bottom of section reaches 30% of screen height
          scrub: 1.5,          // elastic smooth scroll scrub tracking
        }
      });

      // Staggered card release
      imgs.forEach((el, i) => {
        tl.to(el, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        }, i * 0.05); // slightly stagger the launch for organic flare
      });

      // Central text rise
      const tlines = textRef.current?.querySelectorAll(".t-line");
      if (tlines) {
        gsap.fromTo(tlines, 
          { opacity: 0, y: 30 }, 
          {
            opacity: 1, 
            y: 0, 
            stagger: 0.08, 
            duration: 0.75, 
            ease: "power2.out",
            scrollTrigger: { trigger: parent, start: "top 75%", once: true },
          }
        );
      }
    }, sectionRef);

    window.addEventListener("resize", positionCardsHandler);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", positionCardsHandler);
    };
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
