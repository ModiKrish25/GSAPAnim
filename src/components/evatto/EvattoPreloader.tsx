"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function EvattoPreloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable scrolling during load
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        // Slide up preloader overlay
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.1,
          ease: "power4.inOut",
          onComplete: () => {
            setIsLoaded(true);
            document.body.style.overflow = "";
            // Dispatch event to trigger animations on the page
            window.dispatchEvent(new CustomEvent("page-loaded"));
          },
        });
      },
    });

    // Animate progress number from 0 to 100
    const counterObj = { value: 0 };
    tl.to(
      counterObj,
      {
        value: 100,
        duration: 2.2,
        ease: "power2.out",
        onUpdate: () => {
          setProgress(Math.floor(counterObj.value));
        },
      },
      0
    );

    // Animate the line width
    tl.fromTo(
      lineRef.current,
      { width: "0%" },
      { width: "100%", duration: 2.2, ease: "power2.out" },
      0
    );

    // Stagger reveal the letters of the brand name
    const chars = textRef.current?.querySelectorAll(".preloader-char");
    if (chars && chars.length > 0) {
      tl.fromTo(
        chars,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.03, duration: 1.0, ease: "power3.out" },
        0.2
      );
    }

    // Fade out text elements slightly before slide up
    tl.to([numberRef.current, textRef.current, lineRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.inOut",
      stagger: 0.05,
    }, "-=0.4");

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (isLoaded) return null;

  const brandName = "KESHAV EVENTS";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0b0c0e] text-[#FDFBF7]"
      style={{ willChange: "transform" }}
    >
      <div className="w-full max-w-sm px-6 flex flex-col items-center">
        {/* Brand name with staggered letter animations */}
        <div
          ref={textRef}
          className="font-cormorant text-xl md:text-2xl tracking-[0.3em] font-light text-center mb-6 uppercase flex select-none"
        >
          {brandName.split("").map((char, index) => (
            <span
              key={index}
              className="preloader-char inline-block"
              style={{ marginRight: char === " " ? "0.4em" : "0px" }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Minimalist loading track & indicator line */}
        <div className="w-full h-[1px] bg-white/10 relative mb-4">
          <div
            ref={lineRef}
            className="absolute left-0 top-0 h-full bg-[#C5A880]"
            style={{ width: "0%" }}
          />
        </div>

        {/* Elegant percentage counter */}
        <div
          ref={numberRef}
          className="font-inter text-xs tracking-[0.2em] text-[#C5A880] font-medium select-none"
        >
          {progress.toString().padStart(3, "0")}%
        </div>
      </div>
    </div>
  );
}
