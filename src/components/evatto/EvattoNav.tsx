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
    <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden>
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

  const headerRef  = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef   = useRef<HTMLDivElement>(null);
  const sideRef    = useRef<HTMLDivElement>(null);

  // ── Entrance on load ──────────────────────────────────────
  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: -24 },
      { opacity: 1, y: 0, duration: 0.9, delay: 0.4, ease: "power3.out" }
    );
  }, []);

  // ── Scroll-aware background ───────────────────────────────
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({
      start: "top+=80 top",
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
        { x: "0%",   opacity: 1, duration: 0.65, ease: "power4.inOut" }
      );

      // Stagger in nav items
      const items = linksRef.current?.querySelectorAll(".nav-item");
      if (items) {
        gsap.fromTo(items,
          { x: 60, opacity: 0 },
          { x: 0,  opacity: 1, stagger: 0.08, duration: 0.55, ease: "power3.out", delay: 0.28 }
        );
      }

      // Stagger in side elements
      const sideItems = sideRef.current?.querySelectorAll(".side-item");
      if (sideItems) {
        gsap.fromTo(sideItems,
          { y: 16, opacity: 0 },
          { y: 0,  opacity: 1, stagger: 0.06, duration: 0.45, ease: "power3.out", delay: 0.5 }
        );
      }
    } else {
      document.body.style.overflow = "";
      gsap.to(overlay, {
        x: "100%", opacity: 0, duration: 0.5, ease: "power4.inOut",
        onComplete: () => {
          if (overlay) { overlay.style.display = "none"; overlay.style.transform = ""; }
        },
      });
    }
  }, [open]);

  const close = () => { setOpen(false); setActiveIdx(null); };

  return (
    <>
      {/* ── Fixed header ── */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 h-[70px] opacity-0 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(253,251,247,0.96)"
            : "rgba(253,251,247,0.72)",
          backdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(26,26,26,0.10)"
            : "1px solid rgba(26,26,26,0.05)",
          boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.06)" : "none",
        }}
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 shrink-0 group">
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
              <line key={i} x1="11" y1="11"
                x2={11 + 9 * Math.cos((deg * Math.PI) / 180)}
                y2={11 + 9 * Math.sin((deg * Math.PI) / 180)}
                stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
            ))}
            <circle cx="11" cy="11" r="2" fill="#1A1A1A" />
          </svg>
          <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "22px", fontWeight: 600, letterSpacing: "0.04em" }}>
            Evatto
          </span>
        </a>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Search — desktop only */}
          <button
            className="hidden md:flex items-center gap-1.5 text-xs tracking-wider text-black/50 hover:text-black transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
              <path d="M1 14l3.5-3.5M13 5.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Search
          </button>

          {/* Book CTA — desktop */}
          <a
            href="#"
            className="hidden md:inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-medium transition-all hover:bg-black hover:text-white"
            style={{ fontFamily: "var(--font-inter)", borderColor: "rgba(26,26,26,0.22)", letterSpacing: "0.05em" }}
          >
            Book a tour
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
              <path d="M1 9L9 1M9 1H4M9 1v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          {/* Hamburger button */}
          <button
            onClick={() => setOpen(o => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors hover:bg-black/6 active:scale-95"
            style={{ borderColor: "rgba(26,26,26,0.18)" }}
          >
            <HamburgerIcon open={open} />
          </button>
        </div>
      </header>

      {/* ── Full-screen overlay panel ── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[200] flex flex-row"
        style={{ background: "#FDFBF7", display: "none" }}
      >
        {/* Left: large nav links */}
        <div
          ref={linksRef}
          className="flex-1 flex flex-col justify-between px-8 md:px-16 lg:px-24 pt-8 pb-12 overflow-y-auto"
        >
          {/* Overlay header */}
          <div className="flex items-center justify-between h-[62px] shrink-0 mb-4">
            <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "22px", fontWeight: 600 }}>Evatto</span>
            <button
              onClick={close}
              className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-black/6 transition-colors active:scale-95"
              style={{ borderColor: "rgba(26,26,26,0.18)" }}
              aria-label="Close menu"
            >
              <HamburgerIcon open={true} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col flex-1 justify-center gap-0">
            {NAV_LINKS.map((link, i) => (
              <div
                key={link.label}
                className="nav-item opacity-0 border-b group cursor-pointer"
                style={{ borderColor: "rgba(26,26,26,0.07)" }}
                onClick={() => setActiveIdx(activeIdx === i ? null : i)}
              >
                <div className="flex items-center justify-between py-5 md:py-6">
                  {/* Giant link text */}
                  <span
                    className="relative overflow-hidden"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "clamp(2.2rem, 5.5vw, 4.8rem)",
                      fontWeight: 300,
                      lineHeight: 1.05,
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
                        style={{ fontFamily: "var(--font-inter)", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(26,26,26,0.35)" }}
                      >
                        {link.sub.length}
                      </span>
                    )}
                    {link.sub.length > 0 && (
                      <svg
                        width="14" height="14" viewBox="0 0 14 14" fill="none"
                        className="transition-transform duration-300"
                        style={{ transform: activeIdx === i ? "rotate(180deg)" : "rotate(0deg)" }}
                      >
                        <path d="M2 4.5L7 9.5L12 4.5" stroke="#1A1A1A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Sub-links dropdown */}
                <div
                  className="overflow-hidden transition-all duration-400"
                  style={{
                    maxHeight: activeIdx === i ? `${link.sub.length * 40}px` : "0px",
                    transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)",
                  }}
                >
                  <div className="flex flex-wrap gap-x-6 gap-y-2 pb-5">
                    {link.sub.map(s => (
                      <a
                        key={s}
                        href="#"
                        onClick={e => e.stopPropagation()}
                        className="text-xs hover:text-black transition-colors"
                        style={{ fontFamily: "var(--font-inter)", color: "rgba(26,26,26,0.45)", letterSpacing: "0.05em" }}
                      >
                        {s}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Bottom CTAs */}
          <div className="nav-item opacity-0 flex flex-wrap gap-3 pt-8">
            <a href="#" className="btn-pill btn-pill-outline-dark">Book a tour</a>
            <a href="#" className="btn-pill btn-pill-solid">Schedule visit</a>
          </div>
        </div>

        {/* Right: sidebar info — hidden below lg */}
        <div
          ref={sideRef}
          className="hidden lg:flex flex-col justify-between w-[300px] xl:w-[340px] border-l px-10 pt-[90px] pb-12"
          style={{ borderColor: "rgba(26,26,26,0.07)", background: "#F5F2EC" }}
        >
          {/* Location */}
          <div>
            <p className="side-item opacity-0" style={{ fontFamily: "var(--font-inter)", fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(26,26,26,0.4)", marginBottom: "12px" }}>
              Our location
            </p>
            <p className="side-item opacity-0" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.6rem", fontWeight: 300, color: "#1A1A1A", lineHeight: 1.3 }}>
              123 Grand Pavilion<br />New York, NY 10001
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="side-item opacity-0" style={{ fontFamily: "var(--font-inter)", fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(26,26,26,0.4)", marginBottom: "12px" }}>
              Get in touch
            </p>
            <a href="mailto:hello@evatto.com" className="side-item opacity-0 block hover:opacity-70 transition-opacity" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.35rem", fontWeight: 300, color: "#1A1A1A" }}>
              hello@evatto.com
            </a>
            <a href="tel:+12125550100" className="side-item opacity-0 block mt-1 hover:opacity-70 transition-opacity" style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "rgba(26,26,26,0.55)" }}>
              +1 (212) 555-0100
            </a>
          </div>

          {/* Social */}
          <div>
            <p className="side-item opacity-0" style={{ fontFamily: "var(--font-inter)", fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(26,26,26,0.4)", marginBottom: "14px" }}>
              Follow us
            </p>
            <div className="flex flex-col gap-2">
              {SOCIAL.map(s => (
                <a key={s} href="#"
                  className="side-item opacity-0 text-xs hover:opacity-70 transition-opacity w-fit"
                  style={{ fontFamily: "var(--font-inter)", color: "rgba(26,26,26,0.55)", letterSpacing: "0.08em" }}
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
