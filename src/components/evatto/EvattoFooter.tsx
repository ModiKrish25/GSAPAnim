"use client";

import React, { useRef } from "react";
import gsap from "gsap";

// Per-letter hover utility
function LetterHover({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  const onEnter = () => {
    gsap.to(ref.current?.querySelectorAll(".ltr") ?? [], {
      y: -5, duration: 0.25, stagger: 0.025, ease: "power2.out", overwrite: "auto",
    });
  };
  const onLeave = () => {
    gsap.to(ref.current?.querySelectorAll(".ltr") ?? [], {
      y: 0, duration: 0.3, stagger: 0.02, ease: "power2.out", overwrite: "auto",
    });
  };

  return (
    <span ref={ref} className={`inline-flex cursor-pointer ${className}`} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {text.split("").map((ch, i) => (
        <span key={i} className="ltr inline-block" style={{ whiteSpace: ch === " " ? "pre" : undefined }}>
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About us", href: "#" },
  { label: "Venue space", href: "#" },
  { label: "Gallery", href: "#" },
  { label: "Contact us", href: "#" },
];

const utilityLinks = [
  ["Password protected", "404 not found", "Changelog", "Style guide", "Licenses"],
  ["Privacy policy", "Terms of use"],
];

const socials = ["Instagram", "Behance", "Dribbble", "Facebook", "Twitter"];

export default function EvattoFooter() {
  return (
    <footer className="bg-[#0e0f11] text-[#FDFBF7] overflow-hidden">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 md:px-14 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">

          {/* Left: Logo + tagline + nav pills */}
          <div className="md:col-span-6">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-6">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="2.5" fill="#FDFBF7" />
                {[0, 45, 90, 135].map((deg, i) => (
                  <line key={i} x1="14" y1="14"
                    x2={14 + 11 * Math.cos((deg * Math.PI) / 180)}
                    y2={14 + 11 * Math.sin((deg * Math.PI) / 180)}
                    stroke="#FDFBF7" strokeWidth="1.5" strokeLinecap="round" />
                ))}
                {[0, 45, 90, 135].map((deg, i) => (
                  <line key={i + 4} x1="14" y1="14"
                    x2={14 - 11 * Math.cos((deg * Math.PI) / 180)}
                    y2={14 - 11 * Math.sin((deg * Math.PI) / 180)}
                    stroke="#FDFBF7" strokeWidth="1.5" strokeLinecap="round" />
                ))}
              </svg>
              <span className="font-cormorant text-2xl font-semibold text-[#FDFBF7]">Evatto</span>
            </div>

            <p className="font-inter text-sm text-[#FDFBF7]/45 max-w-sm leading-relaxed mb-10">
              A modern, sustainable venue management solution built for efficiency — enhancing experiences, optimizing operations, and supporting greener, smarter events.
            </p>

            {/* Pill nav links */}
            <div className="flex flex-wrap gap-2">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-inter text-xs text-[#FDFBF7]/60 border border-[#FDFBF7]/15 rounded-full px-4 py-2 hover:bg-[#FDFBF7]/10 hover:text-[#FDFBF7] transition-colors"
                >
                  <LetterHover text={link.label} />
                </a>
              ))}
            </div>
          </div>

          {/* Right: utility links + contact + social */}
          <div className="md:col-span-6 grid grid-cols-2 gap-8">
            {/* Utility col 1 */}
            <div>
              <p className="font-inter text-[9px] uppercase tracking-[0.3em] text-[#FDFBF7]/30 mb-5">Pages</p>
              <ul className="space-y-3">
                {utilityLinks[0].map((l) => (
                  <li key={l}>
                    <a href="#" className="font-inter text-sm text-[#FDFBF7]/50 hover:text-[#FDFBF7] transition-colors">
                      <LetterHover text={l} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact + social */}
            <div>
              <p className="font-inter text-[9px] uppercase tracking-[0.3em] text-[#FDFBF7]/30 mb-5">Contact</p>
              <div className="space-y-2 mb-8">
                <a href="tel:+011234567890" className="block font-inter text-sm text-[#FDFBF7]/55 hover:text-[#FDFBF7] transition-colors">
                  +01 123 456 7890
                </a>
                <a href="mailto:venue.support@gmail.com" className="block font-inter text-sm text-[#FDFBF7]/55 hover:text-[#FDFBF7] transition-colors">
                  venue.support@gmail.com
                </a>
              </div>

              <p className="font-inter text-[9px] uppercase tracking-[0.3em] text-[#FDFBF7]/30 mb-4">Follow</p>
              <ul className="space-y-2">
                {socials.map((s) => (
                  <li key={s}>
                    <a href="#" className="font-inter text-sm text-[#FDFBF7]/50 hover:text-[#FDFBF7] transition-colors">
                      <LetterHover text={s} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#FDFBF7]/8 mt-16 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-inter text-[11px] text-[#FDFBF7]/25">
            © 2025 Evatto. All rights reserved.
          </p>
          <div className="flex gap-5">
            {utilityLinks[1].map((l) => (
              <a key={l} href="#" className="font-inter text-[11px] text-[#FDFBF7]/25 hover:text-[#FDFBF7]/60 transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Giant outlined marquee text */}
      <div className="relative overflow-hidden py-6 border-t border-[#FDFBF7]/5">
        <div className="whitespace-nowrap">
          <span
            className="font-cormorant font-light select-none"
            style={{
              fontSize: "clamp(4rem, 14vw, 14rem)",
              lineHeight: 1,
              color: "transparent",
              WebkitTextStroke: "1px rgba(253,251,247,0.08)",
              letterSpacing: "-0.02em",
            }}
          >
            THE STAGE OF DREAMS &nbsp;&nbsp;&nbsp; THE STAGE OF DREAMS &nbsp;&nbsp;&nbsp;
          </span>
        </div>
      </div>
    </footer>
  );
}
