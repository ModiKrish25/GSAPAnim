"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const SCENES = [
  {
    num: "01",
    category: "Weddings & Ceremonies",
    title: "Where\nLove Begins",
    image: "/showreel-wedding.jpg",
    accent: "#D4AF37",
    origin: "50% 45%",
  },
  {
    num: "02",
    category: "Corporate Galas",
    title: "Power Meets\nPrestige",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=85&w=1920",
    accent: "#8ecfd4",
    origin: "25% 65%",
  },
  {
    num: "03",
    category: "Grand Celebrations",
    title: "Every Moment\nUnforgettable",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=85&w=1920",
    accent: "#cf9ecf",
    origin: "75% 35%",
  },
];

export default function EvattoShowreel() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const progressRef  = useRef<HTMLDivElement>(null);
  const layerRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs     = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const layers = layerRefs.current.filter(Boolean) as HTMLDivElement[];
      const imgs   = imgRefs.current.filter(Boolean) as HTMLDivElement[];
      const texts  = textRefs.current.filter(Boolean) as HTMLDivElement[];

      /* ── Initial states ── */
      gsap.set(layers[0], { clipPath: "circle(150% at 50% 50%)", zIndex: 1 });
      gsap.set(layers[1], { clipPath: `circle(0% at ${SCENES[1].origin})`, zIndex: 2 });
      gsap.set(layers[2], { clipPath: `circle(0% at ${SCENES[2].origin})`, zIndex: 3 });

      gsap.set(imgs, { scale: 1.12 });

      texts.forEach((t, i) => {
        const lines = t.querySelectorAll(".reel-line");
        if (i === 0) gsap.set(lines, { y: 0, opacity: 1 });
        else         gsap.set(lines, { y: 70, opacity: 0 });
      });

      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left center" });

      const isMobile = window.innerWidth < 768;

      /* ── Master pinned scrub timeline ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: isMobile ? "+=1600" : "+=3000",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      /* Progress bar fills across full duration */
      tl.to(progressRef.current, { scaleX: 1, ease: "none", duration: 4, force3D: true }, 0);

      /* Scene 0 image slow Ken Burns throughout */
      tl.to(imgs[0], { scale: 1.0, ease: "none", duration: 4, force3D: true }, 0);

      /* ──── SCENE 0 → 1 ──── */
      tl.to(texts[0].querySelectorAll(".reel-line"), {
        y: -60, opacity: 0, stagger: 0.06, duration: 0.28, ease: "power2.in", force3D: true
      }, 0.05);

      tl.to(layers[1], {
        clipPath: `circle(150% at ${SCENES[1].origin})`,
        duration: 0.75, ease: "power2.inOut", force3D: true
      }, 0.25);

      tl.to(imgs[1], { scale: 1.0, duration: 0.75, ease: "power2.out", force3D: true }, 0.25);

      tl.to(texts[1].querySelectorAll(".reel-line"), {
        y: 0, opacity: 1, stagger: 0.08, duration: 0.45, ease: "power3.out", force3D: true
      }, 0.85);

      /* ──── SCENE 1 → 2 ──── */
      tl.to(texts[1].querySelectorAll(".reel-line"), {
        y: -60, opacity: 0, stagger: 0.06, duration: 0.28, ease: "power2.in", force3D: true
      }, 1.9);

      tl.to(layers[2], {
        clipPath: `circle(150% at ${SCENES[2].origin})`,
        duration: 0.75, ease: "power2.inOut", force3D: true
      }, 2.1);

      tl.to(imgs[2], { scale: 1.0, duration: 0.75, ease: "power2.out", force3D: true }, 2.1);

      tl.to(texts[2].querySelectorAll(".reel-line"), {
        y: 0, opacity: 1, stagger: 0.08, duration: 0.45, ease: "power3.out", force3D: true
      }, 2.75);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100dvh" }}
    >
      {/* Scene layers */}
      {SCENES.map((scene, i) => (
        <div
          key={i}
          ref={el => { layerRefs.current[i] = el; }}
          className="absolute inset-0"
        >
          {/* Background image */}
          <div
            ref={el => { imgRefs.current[i] = el; }}
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{
              backgroundImage: `url(${scene.image})`,
              filter: "brightness(0.38)",
              transformOrigin: "center center",
            }}
          />

          {/* Radial + bottom vignette */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.55) 100%)" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Text content */}
          <div
            ref={el => { textRefs.current[i] = el; }}
            className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 sm:px-8 md:px-6"
          >
            {/* Scene badge */}
            <p
              className="reel-line mb-6"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "10px",
                letterSpacing: "0.45em",
                textTransform: "uppercase",
                color: scene.accent,
              }}
            >
              {scene.num} &mdash; {scene.category}
            </p>

            {/* Giant headline */}
            {scene.title.split("\n").map((line, li) => (
              <div
                key={li}
                className="reel-line overflow-hidden"
                style={{ lineHeight: 0.92 }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(4.5rem, 11vw, 10.5rem)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    display: "block",
                    color: "#FDFBF7",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {line}
                </span>
              </div>
            ))}

            {/* Accent divider */}
            <div
              className="reel-line mt-10 w-12 h-px"
              style={{ backgroundColor: scene.accent, opacity: 0.8 }}
            />
          </div>
        </div>
      ))}

      {/* Scene counter bottom-left */}
      <div className="absolute bottom-10 left-8 md:left-14 z-50 text-white">
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
          Scroll to explore
        </p>
      </div>

      {/* Progress bar — fills across full scroll */}
      <div
        className="absolute bottom-0 left-0 right-0 z-50"
        style={{ height: "2px", backgroundColor: "rgba(255,255,255,0.08)" }}
      >
        <div
          ref={progressRef}
          className="h-full"
          style={{ backgroundColor: "rgba(255,255,255,0.6)", willChange: "transform" }}
        />
      </div>

      {/* Scene dots */}
      <div className="absolute bottom-8 right-8 md:right-14 z-50 flex flex-col gap-2">
        {SCENES.map((scene, i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: scene.accent, opacity: 0.7 }}
          />
        ))}
      </div>
    </section>
  );
}
