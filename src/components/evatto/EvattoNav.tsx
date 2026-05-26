"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// ── Reusable per-letter bounce hover ──────────────────────────
export function LetterHover({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const onEnter = () => {
    const ltrs = ref.current?.querySelectorAll(".ltr");
    if (!ltrs) return;
    gsap.killTweensOf(ltrs);
    gsap.fromTo(ltrs, { y: 0 }, { y: -7, duration: 0.22, stagger: 0.028, ease: "power2.out", overwrite: true });
    gsap.to(ltrs, { y: 0, duration: 0.32, stagger: 0.022, ease: "power2.out", delay: 0.18 });
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
  { label: "Home",        sub: ["Home 1", "Home 2"] },
  { label: "Pages",       sub: ["About us", "Event", "Gallery", "Pricing", "Schedule visit"] },
  { label: "Venue space", sub: ["Executive Hall", "Garden Courtyard", "Forever Pavilion", "Garden Veranda"] },
  { label: "Blog",        sub: ["All posts", "Blog detail"] },
  { label: "Contact",     sub: [] },
];

const SOCIAL = ["Instagram", "Facebook", "LinkedIn", "Pinterest"];

// ── Animated hamburger / X icon ───────────────────────────────
function HamburgerIcon({ open }: { open: boolean }) {
  const topRef    = useRef<SVGLineElement>(null);
  const midRef    = useRef<SVGLineElement>(null);
  const botRef    = useRef<SVGLineElement>(null);
  const prevOpen  = useRef(false);

  useEffect(() => {
    if (prevOpen.current === open) return;
    prevOpen.current = open;

    const top = topRef.current;
    const mid = midRef.current;
    const bot = botRef.current;
    if (!top || !mid || !bot) return;

    if (open) {
      // Morph to X
      gsap.to(mid, { opacity: 0, duration: 0.18, ease: "power2.out" });
      gsap.to(top, { attr: { y1: 6, y2: 6 }, duration: 0.25, ease: "power2.inOut" });
      gsap.to(bot, { attr: { y1: 6, y2: 6 }, duration: 0.25, ease: "power2.inOut" });
      gsap.to(top, { rotation: 45,  transformOrigin: "50% 50%", duration: 0.28, ease: "power3.inOut", delay: 0.15 });
      gsap.to(bot, { rotation: -45, transformOrigin: "50% 50%", duration: 0.28, ease: "power3.inOut", delay: 0.15 });
    } else {
      // Morph back to hamburger
      gsap.to(top, { rotation: 0, duration: 0.25, ease: "power3.inOut" });
      gsap.to(bot, { rotation: 0, duration: 0.25, ease: "power3.inOut" });
      gsap.to(top, { attr: { y1: 2, y2: 2 }, duration: 0.25, ease: "power2.inOut", delay: 0.14 });
      gsap.to(bot, { attr: { y1: 10, y2: 10 }, duration: 0.25, ease: "power2.inOut", delay: 0.14 });
      gsap.to(mid, { opacity: 1, duration: 0.2, delay: 0.22, ease: "power2.out" });
    }
  }, [open]);

  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden className="transition-transform duration-300 group-hover:scale-110">
      <line ref={topRef} x1="0" y1="2"  x2="18" y2="2"  stroke="#1A1A1A" strokeWidth="1.6" strokeLinecap="round" />
      <line ref={midRef} x1="0" y1="6"  x2="18" y2="6"  stroke="#1A1A1A" strokeWidth="1.6" strokeLinecap="round" />
      <line ref={botRef} x1="0" y1="10" x2="18" y2="10" stroke="#1A1A1A" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// ── Main Navbar ───────────────────────────────────────────────
export default function EvattoNav() {
  const [open,      setOpen]      = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const headerRef   = useRef<HTMLElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const linksRef    = useRef<HTMLDivElement>(null);
  const sideRef     = useRef<HTMLDivElement>(null);
  const hoverPillRef = useRef<HTMLDivElement>(null);

  // ── Entrance on load ──────────────────────────────────────
  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: -40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.1, delay: 0.4, ease: "power4.out" }
    );
  }, []);

  // ── Scroll-aware background ───────────────────────────────
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({
      start: "top+=50 top",
      onEnter:      () => setScrolled(true),
      onLeaveBack:  () => setScrolled(false),
    });
    return () => st.kill();
  }, []);

  // ── Overlay open / close ──────────────────────────────────
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (open) {
      document.body.style.overflow = "hidden";
      gsap.set(overlay, { display: "flex" });

      // Panel slides in from the right
      gsap.fromTo(overlay,
        { x: "100%", opacity: 0 },
        { x: "0%",   opacity: 1, duration: 0.7, ease: "power4.inOut" }
      );

      // Stagger in nav items
      const items = linksRef.current?.querySelectorAll(".nav-item");
      if (items) {
        gsap.fromTo(items,
          { x: 80, opacity: 0 },
          { x: 0,  opacity: 1, stagger: 0.08, duration: 0.6, ease: "power3.out", delay: 0.3 }
        );
      }

      // Stagger in side elements
      const sideItems = sideRef.current?.querySelectorAll(".side-item");
      if (sideItems) {
        gsap.fromTo(sideItems,
          { y: 20, opacity: 0 },
          { y: 0,  opacity: 1, stagger: 0.06, duration: 0.5, ease: "power3.out", delay: 0.5 }
        );
      }
    } else {
      document.body.style.overflow = "";
      gsap.to(overlay, {
        x: "100%", opacity: 0, duration: 0.55, ease: "power4.inOut",
        onComplete: () => {
          if (overlay) { overlay.style.display = "none"; overlay.style.transform = ""; }
        },
      });
    }
  }, [open]);

  // ── Desktop hover sliding pill indicator ────────────────
  const handleLinkEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    const pill = hoverPillRef.current;
    if (!pill) return;

    const offsetLeft = target.offsetLeft;
    const offsetWidth = target.offsetWidth;

    gsap.to(pill, {
      left: offsetLeft,
      width: offsetWidth,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleLinkLeave = () => {
    const pill = hoverPillRef.current;
    if (!pill) return;
    gsap.to(pill, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.inOut",
    });
  };

  const close = () => { setOpen(false); setActiveIdx(null); };

  return (
    <>
      {/* ── Fixed floating glass header capsule ── */}
      <div className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 pointer-events-none">
        <header
          ref={headerRef}
          className="max-w-7xl mx-auto w-full h-[64px] flex items-center justify-between px-6 md:px-8 rounded-full pointer-events-auto transition-all duration-500 ease-out"
          style={{
            background: scrolled
              ? "rgba(253, 251, 247, 0.88)"
              : "rgba(253, 251, 247, 0.65)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: scrolled
              ? "1px solid rgba(26, 26, 26, 0.12)"
              : "1px solid rgba(26, 26, 26, 0.06)",
            boxShadow: scrolled 
              ? "0 12px 32px -10px rgba(26, 26, 26, 0.08), 0 4px 12px -5px rgba(26, 26, 26, 0.03)" 
              : "0 4px 20px -10px rgba(0, 0, 0, 0.02)",
            transform: scrolled ? "translateY(2px)" : "translateY(0)",
          }}
        >
          {/* Logo with star rotate */}
          <a href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative w-5 h-5 flex items-center justify-center">
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 22 22" 
                fill="none"
                className="transition-transform duration-700 ease-out group-hover:rotate-180"
              >
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                  <line key={i} x1="11" y1="11"
                    x2={11 + 9 * Math.cos((deg * Math.PI) / 180)}
                    y2={11 + 9 * Math.sin((deg * Math.PI) / 180)}
                    stroke="#1A1A1A" strokeWidth="1.6" strokeLinecap="round" />
                ))}
                <circle cx="11" cy="11" r="2" fill="#1A1A1A" />
              </svg>
            </div>
            <span 
              className="text-[#1A1A1A] tracking-wider" 
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "21px", fontWeight: 600, letterSpacing: "0.03em" }}
            >
              Evatto
            </span>
          </a>

          {/* Center: Premium desktop navigation links with magnetic hover capsule */}
          <nav 
            className="hidden lg:flex items-center gap-1.5 relative px-2 py-1 rounded-full border border-black/[0.04]"
            style={{ background: "rgba(26, 26, 26, 0.03)" }}
          >
            {/* The sliding hover capsule background */}
            <div 
              ref={hoverPillRef} 
              className="absolute top-1 bottom-1 left-0 rounded-full bg-white opacity-0 pointer-events-none" 
              style={{
                boxShadow: "0 2px 8px -2px rgba(26, 26, 26, 0.08), 0 1px 3px -1px rgba(26, 26, 26, 0.04)"
              }}
            />
            
            {NAV_LINKS.map((link) => (
              <a 
                href="#" 
                key={link.label}
                onMouseEnter={handleLinkEnter}
                onMouseLeave={handleLinkLeave}
                className="nav-desktop-link px-4 py-1.5 rounded-full text-xs font-semibold text-black/70 hover:text-black transition-colors relative z-10 tracking-wide"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side: Search, CTA and Hamburger */}
          <div className="flex items-center gap-3">
            {/* Search — desktop only */}
            <button
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full hover:bg-black/5 transition-colors text-black/60 hover:text-black"
              aria-label="Search"
            >
              <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
                <path d="M1 14l3.5-3.5M13 5.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>

            {/* Book CTA — desktop */}
            <a
              href="#"
              className="hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold transition-all bg-black text-white hover:bg-black/85 active:scale-95 shadow-sm"
              style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.05em" }}
            >
              Book a tour
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                <path d="M1 9L9 1M9 1H4M9 1v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* Hamburger button with custom layout */}
            <button
              onClick={() => setOpen(o => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="group flex items-center gap-2 h-9 pl-3.5 pr-2.5 rounded-full border border-black/10 hover:border-black/20 hover:bg-black/[0.02] active:scale-95 transition-all duration-300"
            >
              <span 
                className="text-[10px] font-bold tracking-[0.18em] uppercase text-black/70 group-hover:text-black hidden sm:inline"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Menu
              </span>
              <HamburgerIcon open={open} />
            </button>
          </div>
        </header>
      </div>

      {/* ── Full-screen overlay panel ── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[200] flex flex-col md:flex-row"
        style={{ background: "#FDFBF7", display: "none" }}
      >
        {/* Left/Main Side: Nav Links (Scrollable Container) */}
        <div
          ref={linksRef}
          className="flex-1 flex flex-col h-full overflow-y-auto px-6 sm:px-12 md:px-20 lg:px-28 py-6 justify-between"
        >
          {/* Overlay Header */}
          <div className="flex items-center justify-between h-[64px] shrink-0 border-b border-black/[0.06] mb-8">
            <a href="/" className="flex items-center gap-2 group" onClick={close}>
              <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "22px", fontWeight: 600 }}>Evatto</span>
            </a>
            <button
              onClick={close}
              className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/6 transition-all active:scale-90 duration-300"
              aria-label="Close menu"
            >
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 14 14" 
                fill="none" 
                className="transition-transform duration-500 hover:rotate-180"
              >
                <path d="M1 1L13 13M1 13L13 1" stroke="#1A1A1A" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Nav links block */}
          <nav className="flex flex-col gap-2 my-auto py-8">
            {NAV_LINKS.map((link, i) => (
              <div
                key={link.label}
                className="nav-item opacity-0 border-b border-black/[0.04] group cursor-pointer"
                onClick={() => setActiveIdx(activeIdx === i ? null : i)}
              >
                <div className="flex items-center justify-between py-4 md:py-5">
                  {/* Giant link text */}
                  <span
                    className="relative overflow-hidden"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "clamp(1.8rem, 4.5vw, 3.8rem)",
                      fontWeight: 300,
                      lineHeight: 1.1,
                      color: "#1A1A1A",
                    }}
                  >
                    {/* Underline sweep on hover */}
                    <span className="relative inline-block">
                      <LetterHover text={link.label} />
                      <span
                        className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                        style={{ backgroundColor: "#1A1A1A", transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)" }}
                      />
                    </span>
                  </span>

                  {/* Right: sub-count + chevron */}
                  <div className="flex items-center gap-3">
                    {link.sub.length > 0 && (
                      <span
                        style={{ fontFamily: "var(--font-inter)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,26,26,0.35)", fontWeight: 600 }}
                      >
                        {link.sub.length}
                      </span>
                    )}
                    {link.sub.length > 0 && (
                      <svg
                        width="12" height="12" viewBox="0 0 14 14" fill="none"
                        className="transition-transform duration-300"
                        style={{ transform: activeIdx === i ? "rotate(180deg)" : "rotate(0deg)" }}
                      >
                        <path d="M2 4.5L7 9.5L12 4.5" stroke="#1A1A1A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Sub-links dropdown — styled as clean premium pills */}
                <div
                  className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
                  style={{
                    maxHeight: activeIdx === i ? `${Math.ceil(link.sub.length / 2) * 56}px` : "0px",
                  }}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pb-6 pt-2">
                    {link.sub.map(s => (
                      <a
                        key={s}
                        href="#"
                        onClick={e => e.stopPropagation()}
                        className="flex items-center justify-between px-4 py-2.5 rounded-xl border border-black/[0.04] bg-black/[0.01] hover:bg-black/5 hover:border-black/10 transition-all duration-300 text-[11px] font-medium text-black/60 hover:text-black tracking-wide"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {s}
                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <path d="M1 9L9 1M9 1H4M9 1v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Bottom CTAs */}
          <div className="nav-item opacity-0 flex flex-wrap gap-3 pt-6 mt-4 border-t border-black/[0.06] shrink-0">
            <a href="#" className="btn-pill btn-pill-outline-dark text-xs py-2.5 px-6">Book a tour</a>
            <a href="#" className="btn-pill btn-pill-solid text-xs py-2.5 px-6">Schedule visit</a>
          </div>
        </div>

        {/* Right Side: Sidebar Info (Fixed Width, hidden below lg) */}
        <div
          ref={sideRef}
          className="hidden lg:flex flex-col justify-between w-[320px] xl:w-[360px] border-l px-12 pt-[90px] pb-12 shrink-0"
          style={{ borderColor: "rgba(26,26,26,0.06)", background: "#F5F2EC" }}
        >
          {/* Location */}
          <div>
            <p className="side-item opacity-0" style={{ fontFamily: "var(--font-inter)", fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(26,26,26,0.4)", marginBottom: "12px", fontWeight: 700 }}>
              Our location
            </p>
            <p className="side-item opacity-0" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.5rem", fontWeight: 300, color: "#1A1A1A", lineHeight: 1.35 }}>
              123 Grand Pavilion<br />New York, NY 10001
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="side-item opacity-0" style={{ fontFamily: "var(--font-inter)", fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(26,26,26,0.4)", marginBottom: "12px", fontWeight: 700 }}>
              Get in touch
            </p>
            <a href="mailto:hello@evatto.com" className="side-item opacity-0 block hover:opacity-70 transition-opacity" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.35rem", fontWeight: 300, color: "#1A1A1A" }}>
              hello@evatto.com
            </a>
            <a href="tel:+12125550100" className="side-item opacity-0 block mt-2.5 hover:opacity-70 transition-opacity" style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "rgba(26,26,26,0.55)" }}>
              +1 (212) 555-0100
            </a>
          </div>

          {/* Social */}
          <div>
            <p className="side-item opacity-0" style={{ fontFamily: "var(--font-inter)", fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(26,26,26,0.4)", marginBottom: "14px", fontWeight: 700 }}>
              Follow us
            </p>
            <div className="flex flex-col gap-2.5">
              {SOCIAL.map(s => (
                <a key={s} href="#"
                  className="side-item opacity-0 text-xs hover:opacity-70 transition-opacity w-fit tracking-wide"
                  style={{ fontFamily: "var(--font-inter)", color: "rgba(26,26,26,0.55)", letterSpacing: "0.05em" }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
