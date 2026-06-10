"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function EvattoLiquidPortal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const blob = blobRef.current;
      const overlay = overlayRef.current;
      if (!container || !blob) return;

      // 1. BUTTERY INFINITE FLOATING MORPH — force3D keeps element on GPU layer
      const morphTl = gsap.timeline({ repeat: -1, yoyo: true });
      morphTl.to(blob, {
        borderRadius: "42% 58% 70% 30% / 45% 45% 55% 55%",
        duration: 3,
        ease: "sine.inOut",
        force3D: true,
      })
        .to(blob, {
          borderRadius: "70% 30% 52% 48% / 60% 40% 60% 40%",
          duration: 3.5,
          ease: "sine.inOut",
          force3D: true,
        });

      const calculateScale = () => {
        const winW = window.innerWidth;
        const winH = window.innerHeight;
        const blobW = window.innerWidth < 640 ? 280 : 360;
        const screenDiagonal = Math.sqrt(winW * winW + winH * winH);
        return (screenDiagonal / blobW) * 1.05;
      };

      const isMobile = window.innerWidth < 768;

      // 2. SCROLL PORTAL EXPANSION
      // Tightened scrub to 0.8 for smooth response, and pause looping tweens when inactive
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: isMobile ? "+=800" : "+=1200",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onEnter: () => morphTl.resume(),
          onLeave: () => morphTl.pause(),
          onEnterBack: () => morphTl.resume(),
          onLeaveBack: () => morphTl.pause(),
        }
      });

      tl.to(textRef.current, {
        opacity: 0,
        y: -40,
        duration: 0.3,
        lazy: true
      }, 0);

      // Morph blob to standard rectangle (0% border-radius) and scale to full screen
      tl.to(blob, {
        scale: () => calculateScale(),
        borderRadius: "0%",
        duration: 1,
        force3D: true,
        lazy: true,
        ease: "power2.inOut",
      }, 0.1);

      // Soft vignette adjustment
      tl.to(overlay, {
        opacity: 0.1,
        duration: 0.8,
        force3D: true,
        lazy: true,
      }, 0.2);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden flex flex-col items-center justify-center"
      style={{ height: "100dvh", background: "#FDFBF7" }}
    >
      {/* Background Soft Glow */}
      <div
        className="absolute inset-0 z-0 opacity-80"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 60%)"
        }}
      />

      {/* Central Floating Header */}
      <div
        ref={textRef}
        className="absolute top-20 text-center px-6 z-20 pointer-events-none"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-black/40 block mb-3 font-semibold">
          Step Inside
        </span>
        <h2 className="font-cormorant text-4xl sm:text-5xl font-light text-black tracking-wide">
          The Experience Portal
        </h2>
        <div className="w-8 h-px bg-black/20 mx-auto mt-4" />
      </div>

      {/* 🔮 The Liquid Portal Blob */}
      <div
        ref={blobRef}
        className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-10 select-none will-change-transform"
        style={{
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          background: "#000",
          transformOrigin: "center center",
        }}
      >
        {/* Portal preview media — no CSS transition, GSAP owns all transforms */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=85&w=1300')",
            filter: "brightness(0.72)",
            transform: "scale(1.05)",
            willChange: "transform",
          }}
        />

        {/* Ambient Overlay inside the lens */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"
        />

        {/* Lens reflection highlight */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)"
          }}
        />
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-10 text-center pointer-events-none z-20">
        <p className="text-[9px] uppercase tracking-[0.3em] text-black/35 font-semibold">
          Scroll to immerse
        </p>
      </div>
    </div>
  );
}
