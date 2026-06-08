"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  { label: "Home",        sub: [] },
  { label: "Gallery",     sub: [] },
  { label: "Services",    sub: [] },
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
  const router = useRouter();
  const [open,      setOpen]      = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const headerRef   = useRef<HTMLElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const linksRef    = useRef<HTMLDivElement>(null);
  const sideRef     = useRef<HTMLDivElement>(null);
  const hoverPillRef = useRef<HTMLDivElement>(null);
  const progressRef  = useRef<HTMLDivElement>(null);

  // ── High-performance Scroll Progress Bar ──────────────────
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const totalHeight = docHeight - winHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      if (progressRef.current) {
        progressRef.current.style.width = `${progress}%`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
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
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY) * -1);
      }

      gsap.to(overlay, {
        x: "100%", opacity: 0, duration: 0.55, ease: "power4.inOut",
        onComplete: () => {
          if (overlay) { overlay.style.display = "none"; overlay.style.transform = ""; }
        },
      });
    }
  }, [open]);

  // ── Desktop hover sliding pill indicator ────────────────
  const pathname = usePathname();

  const getActiveLinkIndex = () => {
    if (pathname === "/") return 0;
    if (pathname.startsWith("/gallery")) return 1;
    if (pathname.startsWith("/services")) return 2;
    if (pathname.startsWith("/contact")) return 3;
    return -1;
  };

  useEffect(() => {
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) return;
    const positionPill = () => {
      const navLinks = document.querySelectorAll(".nav-desktop-link");
      const activeIndex = getActiveLinkIndex();
      const pill = hoverPillRef.current;
      if (!pill) return;

      if (activeIndex === -1) {
        gsap.to(pill, { opacity: 0, duration: 0.3, overwrite: "auto" });
      } else {
        const activeLink = navLinks[activeIndex] as HTMLAnchorElement;
        if (activeLink) {
          gsap.to(pill, {
            left: activeLink.offsetLeft,
            width: activeLink.offsetWidth,
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      }
    };

    // Position immediately & after short delays to ensure font/layout stability
    positionPill();
    const t1 = setTimeout(positionPill, 100);
    const t2 = setTimeout(positionPill, 400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  const handleLinkEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) return;
    const target = e.currentTarget;
    const pill = hoverPillRef.current;
    if (!pill) return;

    gsap.to(pill, {
      left: target.offsetLeft,
      width: target.offsetWidth,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleNavMouseLeave = () => {
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) return;
    const navLinks = document.querySelectorAll(".nav-desktop-link");
    const activeIndex = getActiveLinkIndex();
    const pill = hoverPillRef.current;
    if (!pill) return;

    if (activeIndex === -1) {
      gsap.to(pill, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    } else {
      const activeLink = navLinks[activeIndex] as HTMLAnchorElement;
      if (activeLink) {
        gsap.to(pill, {
          left: activeLink.offsetLeft,
          width: activeLink.offsetWidth,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    }
  };

  const close = () => { setOpen(false); setActiveIdx(null); };

  const handleNavClick = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    if (typeof window === "undefined") return;

    const targetIdMap: Record<string, string> = {
      blog: "blog",
    };

    const targetId = targetIdMap[label.toLowerCase()];

    if (label.toLowerCase() === "services") {
      router.push("/services");
    } else if (label.toLowerCase() === "gallery") {
      router.push("/gallery");
    } else if (label.toLowerCase() === "contact") {
      router.push("/contact");
    } else if (pathname !== "/") {
      if (label.toLowerCase() === "home") {
        router.push("/");
      } else if (targetId) {
        router.push(`/#${targetId}`);
      }
    } else {
      if (label.toLowerCase() === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (targetId) {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <>
      {/* ── High-performance Scroll Progress Bar above Navbar ── */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#1A1A1A] to-[#C5A880] z-[100] pointer-events-none transition-all duration-75 ease-out"
        style={{ width: "0%" }}
      />

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
          {/* Left column: Symmetrically-sized Logo container */}
          <div className="flex items-center lg:w-[180px] shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden rounded-md transition-transform duration-500 group-hover:scale-105">
                <img src="/logo.png" alt="Keshav Logo" className="w-full h-full object-contain" />
              </div>
            </Link>
          </div>

          {/* Center: Premium desktop navigation links with magnetic hover capsule */}
          <nav 
            className="hidden lg:flex items-center gap-1.5 relative px-2 py-1 rounded-full border border-black/[0.04]"
            style={{ background: "rgba(26, 26, 26, 0.03)" }}
            onMouseLeave={handleNavMouseLeave}
          >
            {/* The sliding hover capsule background */}
            <div 
              ref={hoverPillRef} 
              className="absolute top-1 bottom-1 left-0 rounded-full bg-white opacity-0 pointer-events-none" 
              style={{
                boxShadow: "0 2px 8px -2px rgba(26, 26, 26, 0.08), 0 1px 3px -1px rgba(26, 26, 26, 0.04)"
              }}
            />
            
            {NAV_LINKS.map((link, idx) => {
              const isActive = getActiveLinkIndex() === idx;
              return (
                <a 
                  href="#" 
                  key={link.label}
                  onClick={e => handleNavClick(e, link.label)}
                  onMouseEnter={handleLinkEnter}
                  className={`nav-desktop-link px-5 py-2 rounded-full text-sm font-semibold relative z-10 tracking-wide cursor-pointer transition-colors duration-300 ${isActive ? "text-black" : "text-black/60 hover:text-black"}`}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right column: Balanced layout container containing mobile Hamburger Menu */}
          <div className="flex items-center justify-end lg:w-[180px] shrink-0">
            <button
              onClick={() => setOpen(o => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="lg:hidden group flex items-center gap-2 h-9 pl-3.5 pr-2.5 rounded-full border border-black/10 hover:border-black/20 hover:bg-black/[0.02] active:scale-95 transition-all duration-300 cursor-pointer pointer-events-auto"
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
            <Link href="/" className="flex items-center gap-2 group" onClick={close}>
              <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden rounded-md transition-transform duration-500 group-hover:scale-105">
                <img src="/logo.png" alt="Keshav Logo" className="w-full h-full object-contain" />
              </div>
            </Link>
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
                 onClick={(e) => {
                   if (link.sub.length > 0) {
                     setActiveIdx(activeIdx === i ? null : i);
                   } else {
                     close();
                     handleNavClick(e, link.label);
                   }
                 }}
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
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          close();
                          if (s === "Schedule visit") {
                            window.dispatchEvent(new CustomEvent("open-book-tour"));
                          } else if (s === "About us" || s === "Event" || s === "Gallery" || s === "Pricing") {
                            document.getElementById("events")?.scrollIntoView({ behavior: "smooth", block: "start" });
                          } else if (["Executive Hall", "Garden Courtyard", "Forever Pavilion", "Garden Veranda"].includes(s)) {
                            document.getElementById("venues")?.scrollIntoView({ behavior: "smooth", block: "start" });
                          } else if (s === "All posts" || s === "Blog detail") {
                            document.getElementById("blog")?.scrollIntoView({ behavior: "smooth", block: "start" });
                          }
                        }}
                        className="flex items-center justify-between px-4 py-2.5 rounded-xl border border-black/[0.04] bg-black/[0.01] hover:bg-black/5 hover:border-black/10 transition-all duration-300 text-[11px] font-medium text-black/60 hover:text-black tracking-wide cursor-pointer"
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
            <button 
              onClick={() => { close(); window.dispatchEvent(new CustomEvent("open-book-tour")); }}
              className="btn-pill btn-pill-outline-dark text-xs py-2.5 px-6 cursor-pointer"
            >
              Book a tour
            </button>
            <button 
              onClick={() => { close(); window.dispatchEvent(new CustomEvent("open-book-tour")); }}
              className="btn-pill btn-pill-solid text-xs py-2.5 px-6 cursor-pointer"
            >
              Schedule visit
            </button>
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
