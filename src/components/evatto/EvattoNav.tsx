"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X } from "lucide-react";

// Per-letter hover component used in nav overlay and footer
export function LetterHover({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  const onEnter = () => {
    const ltrs = ref.current?.querySelectorAll(".ltr");
    if (!ltrs) return;
    gsap.killTweensOf(ltrs);
    gsap.fromTo(ltrs, { y: 0 }, {
      y: -6, duration: 0.22, stagger: 0.025, ease: "power2.out", overwrite: true,
    });
    gsap.to(ltrs, { y: 0, duration: 0.3, stagger: 0.02, ease: "power2.out", delay: 0.18 });
  };

  return (
    <span ref={ref} className={`inline-flex ${className}`} onMouseEnter={onEnter}>
      {text.split("").map((ch, i) => (
        <span key={i} className="ltr inline-block" style={{ whiteSpace: ch === " " ? "pre" : undefined }}>
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

const NAV_LINKS = [
  { label: "Home", sub: ["Home 1", "Home 2"] },
  { label: "Pages", sub: ["About us", "Event", "Gallery", "Pricing", "Schedule visit"] },
  { label: "Venue space", sub: ["Executive Hall", "Garden Courtyard", "Forever Pavilion", "Garden Veranda"] },
  { label: "Blog", sub: ["All posts", "Blog detail"] },
  { label: "Contact", sub: [] },
];

export default function EvattoNav() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Nav bar entrance on load
  useEffect(() => {
    gsap.fromTo(headerRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power3.out" });
  }, []);

  // Overlay open/close
  useEffect(() => {
    if (!overlayRef.current) return;
    if (open) {
      document.body.style.overflow = "hidden";
      gsap.set(overlayRef.current, { display: "flex" });
      gsap.fromTo(overlayRef.current,
        { clipPath: "circle(0% at calc(50%) 40px)" },
        { clipPath: "circle(160% at calc(50%) 40px)", duration: 0.7, ease: "power3.inOut" }
      );
      const items = linksRef.current?.querySelectorAll(".nav-item");
      if (items) gsap.fromTo(items, { opacity: 0, y: 24 }, { opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: "power3.out", delay: 0.25 });
    } else {
      document.body.style.overflow = "";
      gsap.to(overlayRef.current, {
        clipPath: "circle(0% at calc(50%) 40px)", duration: 0.55, ease: "power3.inOut",
        onComplete: () => { if (overlayRef.current) overlayRef.current.style.display = "none"; }
      });
    }
  }, [open]);

  return (
    <>
      {/* Sticky header */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-10 h-[72px] opacity-0"
        style={{ background: "rgba(253,251,247,0.82)", backdropFilter: "blur(18px)", borderBottom: "1px solid rgba(26,26,26,0.06)" }}
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          {/* Asterisk/floral mark */}
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
              <line key={i}
                x1="11" y1="11"
                x2={11 + 9 * Math.cos((deg * Math.PI) / 180)}
                y2={11 + 9 * Math.sin((deg * Math.PI) / 180)}
                stroke="#1A1A1A" strokeWidth="1.4" strokeLinecap="round"
              />
            ))}
            <circle cx="11" cy="11" r="2" fill="#1A1A1A" />
          </svg>
          <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "22px", fontWeight: 600, letterSpacing: "0.03em" }}>
            Evatto
          </span>
        </a>

        {/* Center — hamburger */}
        <button
          onClick={() => setOpen(true)}
          className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors hover:bg-black/5"
          style={{ borderColor: "rgba(26,26,26,0.18)" }}
          aria-label="Open menu"
        >
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <line y1="1" x2="16" y2="1" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
            <line y1="6" x2="16" y2="6" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
            <line y1="11" x2="16" y2="11" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Right */}
        <div className="flex items-center gap-5">
          <button className="flex items-center gap-1.5 text-sm text-black/60 hover:text-black transition-colors" style={{ fontFamily: "var(--font-inter)" }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M1 14l3.5-3.5M13 5.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
            <span className="hidden md:inline">Search</span>
          </button>
          <a href="#" className="hidden md:inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-medium transition-all hover:bg-black hover:text-white" style={{ fontFamily: "var(--font-inter)", borderColor: "rgba(26,26,26,0.22)" }}>
            Book a tour
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 9L9 1M9 1H4M9 1v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>
      </header>

      {/* Fullscreen overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[200] flex flex-col"
        style={{ background: "#FDFBF7", display: "none", clipPath: "circle(0% at 50% 40px)" }}
      >
        {/* Close */}
        <div className="flex justify-between items-center px-6 md:px-10 h-[72px] shrink-0" style={{ borderBottom: "1px solid rgba(26,26,26,0.08)" }}>
          <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "22px", fontWeight: 600 }}>Evatto</span>
          <button
            onClick={() => setOpen(false)}
            className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-black/5 transition-colors"
            style={{ borderColor: "rgba(26,26,26,0.18)" }}
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* Nav links */}
        <div ref={linksRef} className="flex-1 overflow-y-auto px-6 md:px-16 py-10 flex flex-col justify-center">
          {NAV_LINKS.map((link) => (
            <div key={link.label} className="nav-item border-b py-6 opacity-0" style={{ borderColor: "rgba(26,26,26,0.08)" }}>
              <div className="flex items-end justify-between">
                <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 300, lineHeight: 1.1, color: "#1A1A1A", cursor: "pointer" }}>
                  <LetterHover text={link.label} />
                </span>
                {link.sub.length > 0 && (
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "10px", color: "rgba(26,26,26,0.35)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                    {link.sub.length} pages
                  </span>
                )}
              </div>
              {link.sub.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-3">
                  {link.sub.map((s) => (
                    <a key={s} href="#" className="transition-colors" style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "rgba(26,26,26,0.45)" }}>
                      {s}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="nav-item flex flex-wrap gap-3 mt-8 opacity-0">
            <a href="#" className="btn-pill btn-pill-outline-dark text-sm">Book a tour</a>
            <a href="#" className="btn-pill btn-pill-solid text-sm">Schedule visit</a>
          </div>
        </div>
      </div>
    </>
  );
}
