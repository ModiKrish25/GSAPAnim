"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

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

const NAV_LINKS = [
  { label: "Home",    href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "Services",href: "/services" },
  { label: "Contact", href: "/contact" },
];

const socials = ["Instagram", "Facebook", "Twitter", "Pinterest"];

export default function EvattoFooter() {
  return (
    <footer id="footer" className="bg-[#0e0f11] text-[#FDFBF7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-14 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">

          {/* Left: Logo + tagline */}
          <div className="md:col-span-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden rounded-md bg-white/10">
                <img src="/logo.png" alt="Keshar Logo" className="w-full h-full object-contain" />
              </div>
              <span className="logo" style={{ color: "#FDFBF7" }}>Keshar Events & Decor</span>
            </div>

            <p className="font-inter text-sm text-[#FDFBF7]/45 max-w-sm leading-relaxed mb-10">
              A luxury event management company dedicated to crafting unforgettable celebrations with precision and elegance.
            </p>

            {/* Footer nav links */}
            <div className="flex flex-wrap gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-inter text-xs text-[#FDFBF7]/60 border border-[#FDFBF7]/15 rounded-full px-4 py-2 hover:bg-[#FDFBF7]/10 hover:text-[#FDFBF7] transition-colors"
                >
                  <LetterHover text={link.label} />
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Contact + social */}
          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <p className="font-inter text-[9px] uppercase tracking-[0.3em] text-[#FDFBF7]/30 mb-5">Contact</p>
              <div className="space-y-3 mb-8">
                <Link href="tel:+011234567890" className="block font-inter text-sm text-[#FDFBF7]/55 hover:text-[#FDFBF7] transition-colors">
                  +01 123 456 7890
                </Link>
                <Link href="mailto:info@kesharevents.com" className="block font-inter text-sm text-[#FDFBF7]/55 hover:text-[#FDFBF7] transition-colors">
                  info@kesharevents.com
                </Link>
              </div>
              <p className="font-inter text-[9px] uppercase tracking-[0.3em] text-[#FDFBF7]/30 mb-2">Address</p>
              <p className="font-inter text-sm text-[#FDFBF7]/45 leading-relaxed">
                123 Grand Pavilion,<br />New York, NY 10001
              </p>
            </div>

            <div>
              <p className="font-inter text-[9px] uppercase tracking-[0.3em] text-[#FDFBF7]/30 mb-5">Follow</p>
              <ul className="space-y-2">
                {socials.map((s) => (
                  <li key={s}>
                    <Link href="#" className="font-inter text-sm text-[#FDFBF7]/50 hover:text-[#FDFBF7] transition-colors">
                      <LetterHover text={s} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#FDFBF7]/8 mt-16 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-inter text-[11px] text-[#FDFBF7]/25">
            © 2025 Keshar Events & Decor. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="#" className="font-inter text-[11px] text-[#FDFBF7]/25 hover:text-[#FDFBF7]/60 transition-colors">Privacy policy</Link>
            <Link href="#" className="font-inter text-[11px] text-[#FDFBF7]/25 hover:text-[#FDFBF7]/60 transition-colors">Terms of use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
