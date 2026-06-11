"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   SLIDE DATA
───────────────────────────────────────────────────────────── */
export interface SlideData {
  id: number;
  letter: string;
  badgeTop: string;
  badgeBottom: string;
  bedrooms: number | string;
  title: string;
  description: string;
  ctaLabel: string;
  imageUrl: string;
  imageAlt: string;
  bgTint: string;
}

export const slides: SlideData[] = [
  {
    id: 0,
    letter: "F",
    badgeTop: "FLORAL ARTISTRY",
    badgeBottom: "DESIGNS",
    bedrooms: "01",
    title: "FLORAL SCULPTURES",
    description:
      "Bespoke floral installations crafted with fresh, premium blooms to transform your venue into a botanical wonderland.",
    ctaLabel: "EXPLORE DESIGNS",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Luxury wedding floral decorations",
    bgTint: "#fcfaf7",
  },
  {
    id: 1,
    letter: "S",
    badgeTop: "ROYAL STAGES",
    badgeBottom: "PAVILIONS",
    bedrooms: "02",
    title: "GRAND PAVILIONS",
    description:
      "Imposing stage designs, exquisite drapery, and architectural backdrops that command presence and define luxury.",
    ctaLabel: "VIEW GALLERY",
    imageUrl:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Grand ballroom reception stage setup",
    bgTint: "#f6f2eb",
  },
  {
    id: 2,
    letter: "T",
    badgeTop: "TABLE STYLING",
    badgeBottom: "TABLESCAPES",
    bedrooms: "03",
    title: "LUXURY TABLESCAPES",
    description:
      "Meticulously curated tableware, candle arrangements, and floral runners that create an intimate, elegant dining experience.",
    ctaLabel: "DISCOVER DETAILS",
    imageUrl:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Candlelight luxury dining table setting",
    bgTint: "#f2ede5",
  },
  {
    id: 3,
    letter: "L",
    badgeTop: "LIGHTING DESIGN",
    badgeBottom: "AMBIENCE",
    bedrooms: "04",
    title: "AMBIENT LIGHTING",
    description:
      "Dazzling crystal chandeliers, string light curtains, and custom projection mapping engineered for a cinematic glow.",
    ctaLabel: "INQUIRE NOW",
    // Replaced with a verified chandelier/lighting image
    imageUrl:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Crystal chandeliers ambient event lighting",
    bgTint: "#ebe5db",
  },
];

/* ─────────────────────────────────────────────────────────────
   BADGE
───────────────────────────────────────────────────────────── */
interface BadgeProps {
  letter: string;
  badgeTop: string;
  badgeBottom: string;
  bedroomNum: number | string;
  animKey: number;
}

function DecorBadge({ letter, badgeTop, badgeBottom, bedroomNum, animKey }: BadgeProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    svg.style.animation = "none";
    svg.getBoundingClientRect();
    svg.style.animation = "";
  }, [animKey]);

  return (
    <div className="evatto-badge" style={{ width: 140, height: 140 }}>
      <svg
        ref={svgRef}
        viewBox="0 0 130 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
      >
        {/* outer rings */}
        <circle cx="65" cy="65" r="60" stroke="#C5A880" strokeWidth="0.8" fill="none" opacity="0.8" />
        <circle cx="65" cy="65" r="54" stroke="#C5A880" strokeWidth="0.5" fill="none" opacity="0.5" />

        {/* tick marks — precision-fixed for hydration */}
        {Array.from({ length: 24 }).map((_, i) => {
          const rad = ((i * 360) / 24) * (Math.PI / 180);
          const cx = (65 + 57 * Math.cos(rad)).toFixed(3);
          const cy = (65 + 57 * Math.sin(rad)).toFixed(3);
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={i % 3 === 0 ? 1.4 : 0.8}
              fill="#C5A880"
              opacity={i % 3 === 0 ? 0.85 : 0.5}
            />
          );
        })}

        <defs>
          <path id={`ta-${animKey}`} d="M 16,65 A 49,49 0 0,1 114,65" />
          <path id={`ba-${animKey}`} d="M 114,65 A 49,49 0 0,1 16,65" />
        </defs>

        <text fontSize="8" letterSpacing="2" fill="#2c4a4a" fontFamily="var(--font-inter),system-ui" fontWeight="600">
          <textPath href={`#ta-${animKey}`} startOffset="50%" textAnchor="middle">
            {badgeTop.toUpperCase()}
          </textPath>
        </text>
        <text fontSize="8" letterSpacing="2" fill="#2c4a4a" fontFamily="var(--font-inter),system-ui" fontWeight="600">
          <textPath href={`#ba-${animKey}`} startOffset="50%" textAnchor="middle">
            {badgeBottom.toUpperCase()}
          </textPath>
        </text>

        {/* bedroom / number label */}
        <text x="65" y="52" textAnchor="middle" fontSize="9" fill="#C5A880"
              fontFamily="var(--font-inter),system-ui" fontWeight="600" letterSpacing="1">
          {bedroomNum}
        </text>

        {/* big letter */}
        <text x="65" y="80" textAnchor="middle" fontSize="35" fill="#2c4a4a"
              fontFamily="var(--font-inter),system-ui,serif" fontWeight="700" letterSpacing="-1">
          {letter}
        </text>

        {/* decorative side lines */}
        <line x1="38" y1="67" x2="48" y2="67" stroke="#C5A880" strokeWidth="0.8" opacity="0.6" />
        <line x1="82" y1="67" x2="92" y2="67" stroke="#C5A880" strokeWidth="0.8" opacity="0.6" />

        {/* star */}
        <polygon
          points="65,6 66.2,9.6 70,9.6 67,11.8 68.2,15.4 65,13.2 61.8,15.4 63,11.8 60,9.6 63.8,9.6"
          fill="#C5A880" opacity="0.8" transform="scale(0.8) translate(16.25,1)"
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SLIDE IMAGE  — vertical curtain transition
   "next" slides IN from bottom when going forward, top when going back.
───────────────────────────────────────────────────────────── */
interface SlideImageProps {
  currentSrc: string;
  currentAlt: string;
  nextSrc: string | null;
  nextAlt: string;
  isTransitioning: boolean;
  /** "forward" = higher index; "back" = lower index */
  direction: "forward" | "back";
  onTransitionComplete: () => void;
}

function SlideImage({
  currentSrc,
  currentAlt,
  nextSrc,
  nextAlt,
  isTransitioning,
  direction,
  onTransitionComplete,
}: SlideImageProps) {
  const [phase, setPhase] = useState<"idle" | "running">("idle");

  // next image enters from bottom when going forward, from top when going back
  const nextEnterFrom = direction === "forward" ? "100%"  : "-100%";
  const currExitTo   = direction === "forward" ? "-100%" : "100%";

  useEffect(() => {
    if (!isTransitioning || !nextSrc) return;
    setPhase("running");
    const t = setTimeout(() => {
      setPhase("idle");
      onTransitionComplete();
    }, 760);
    return () => clearTimeout(t);
  }, [isTransitioning, nextSrc, onTransitionComplete]);

  const running = phase === "running";

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: 4 }}>
      {/* Current — slides out */}
      <div
        className="absolute inset-0"
        style={{
          transform: running ? `translateY(${currExitTo})` : "translateY(0)",
          transition: running ? "transform 0.76s cubic-bezier(0.76,0,0.24,1)" : "none",
          willChange: "transform",
          zIndex: 1,
        }}
      >
        <img src={currentSrc} alt={currentAlt} className="w-full h-full object-cover" />
        {/* subtle vignette at bottom edge */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
             style={{ background: "linear-gradient(to top,rgba(0,0,0,0.18) 0%,transparent 100%)" }} />
      </div>

      {/* Next — slides in */}
      {running && nextSrc && (
        <div
          className="absolute inset-0"
          style={{
            transform: "translateY(0)",
            animation: `evSlideIn 0.76s cubic-bezier(0.76,0,0.24,1) forwards`,
            /* CSS variable passed via inline style so keyframe can read it */
            ["--enter-from" as string]: nextEnterFrom,
            willChange: "transform",
            zIndex: 2,
          }}
        >
          <img src={nextSrc} alt={nextAlt} className="w-full h-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
               style={{ background: "linear-gradient(to top,rgba(0,0,0,0.18) 0%,transparent 100%)" }} />
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SLIDE CONTENT
───────────────────────────────────────────────────────────── */
interface SlideContentProps {
  slide: SlideData;
  animKey: number;
  direction: "forward" | "back";
}

function SlideContent({ slide, animKey, direction }: SlideContentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [animKey]);

  // text enters from below when going forward, above when going back
  const enterY = direction === "forward" ? "24px" : "-24px";

  const fadeStyle = (delay: string) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : `translateY(${enterY})`,
    transition: `opacity 0.52s cubic-bezier(0.16,1,0.3,1) ${delay},
                 transform 0.52s cubic-bezier(0.16,1,0.3,1) ${delay}`,
  });

  return (
    <div className="flex flex-col items-center justify-center gap-8 md:gap-12 h-full select-none py-10 px-8">
      {/* Badge at top */}
      <div style={fadeStyle("0s")}>
        <DecorBadge
          letter={slide.letter}
          badgeTop={slide.badgeTop}
          badgeBottom={slide.badgeBottom}
          bedroomNum={slide.bedrooms}
          animKey={animKey}
        />
      </div>

      {/* Title + Description + CTA centred */}
      <div className="flex flex-col items-center text-center gap-5 w-full max-w-xs">
        <h2
          className="font-sans font-bold tracking-widest text-xl md:text-2xl"
          style={{ color: "#2c4a4a", letterSpacing: "0.18em", ...fadeStyle("0.06s") }}
        >
          {slide.title}
        </h2>

        <p
          className="text-sm leading-relaxed"
          style={{ color: "#5a5248", ...fadeStyle("0.13s") }}
        >
          {slide.description}
        </p>

        <div style={fadeStyle("0.2s")}>
          <button
            className="evatto-pill-btn"
            style={{
              border: "1.5px solid #2c4a4a",
              borderRadius: 9999,
              padding: "11px 32px",
              background: "transparent",
              cursor: "pointer",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <span
              className="evatto-pill-bg"
              style={{
                position: "absolute",
                inset: 0,
                background: "#2c4a4a",
                borderRadius: 9999,
                transform: "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
              }}
              aria-hidden
            />
            <span
              className="evatto-pill-label"
              style={{
                position: "relative",
                zIndex: 1,
                fontFamily: "var(--font-inter),system-ui",
                fontWeight: 600,
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                color: "#2c4a4a",
                transition: "color 0.4s",
              }}
            >
              {slide.ctaLabel}
            </span>
          </button>
        </div>
      </div>

      {/* spacer */}
      <div />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROGRESS DOTS
───────────────────────────────────────────────────────────── */
function ProgressDots({
  total,
  current,
  onDotClick,
}: {
  total: number;
  current: number;
  onDotClick: (i: number) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          aria-label={`Go to slide ${i + 1}`}
          style={{ width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer" }}
        >
          <span
            style={{
              display: "block",
              width:  i === current ? 8 : 5,
              height: i === current ? 8 : 5,
              borderRadius: "50%",
              background: i === current ? "#2c4a4a" : "rgba(44,74,74,0.3)",
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
export default function EvattoScrollSlider() {
  const rootRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex]     = useState(0);
  const [nextIndex,    setNextIndex]         = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection]           = useState<"forward" | "back">("forward");
  const [animKey, setAnimKey]               = useState(0);
  const [displayIndex, setDisplayIndex]     = useState(0);

  // keep a ref so event handlers are never stale
  const stateRef = useRef({ currentIndex, isTransitioning });
  stateRef.current = { currentIndex, isTransitioning };

  const lockRef      = useRef(false);
  const wheelAccRef  = useRef(0);
  const wheelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((targetIndex: number) => {
    const { currentIndex: ci } = stateRef.current;
    if (lockRef.current) return;
    if (targetIndex === ci) return;
    if (targetIndex < 0 || targetIndex >= slides.length) return;

    lockRef.current = true;
    setDirection(targetIndex > ci ? "forward" : "back");
    setNextIndex(targetIndex);
    setIsTransitioning(true);
  }, []);

  const handleTransitionComplete = useCallback(() => {
    setNextIndex((ni) => {
      if (ni === null) return null;
      setCurrentIndex(ni);
      setDisplayIndex(ni);
      setAnimKey((k) => k + 1);
      return null;
    });
    setIsTransitioning(false);
    setTimeout(() => { lockRef.current = false; }, 200);
  }, []);

  /* ── WHEEL: scoped to the slider element only ── */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const { currentIndex: ci } = stateRef.current;
      const goingDown = e.deltaY > 0;

      // Release scroll to page when we've hit a boundary
      if (goingDown && ci >= slides.length - 1) return;
      if (!goingDown && ci <= 0) return;

      // Still inside slider range — capture scroll
      e.preventDefault();
      e.stopPropagation();

      if (lockRef.current) return;

      wheelAccRef.current += e.deltaY;
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = setTimeout(() => { wheelAccRef.current = 0; }, 300);

      if (Math.abs(wheelAccRef.current) >= 40) {
        const dir = wheelAccRef.current > 0 ? 1 : -1;
        wheelAccRef.current = 0;
        goTo(ci + dir);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [goTo]);

  /* ── KEYBOARD ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const { currentIndex: ci } = stateRef.current;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        if (ci < slides.length - 1) { e.preventDefault(); goTo(ci + 1); }
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        if (ci > 0) { e.preventDefault(); goTo(ci - 1); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo]);

  /* ── TOUCH ── */
  const touchStartY = useRef(0);
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
    const onTouchEnd   = (e: TouchEvent) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      const { currentIndex: ci } = stateRef.current;
      if (Math.abs(delta) > 50) goTo(ci + (delta > 0 ? 1 : -1));
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend",   onTouchEnd,   { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend",   onTouchEnd);
    };
  }, [goTo]);

  const current = slides[displayIndex];
  const next    = nextIndex !== null ? slides[nextIndex] : null;

  return (
    <div
      ref={rootRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ background: current.bgTint, transition: "background 0.76s ease" }}
    >
      {/* Global keyframe + badge animation + pill button hover */}
      <style>{`
        @keyframes evSlideIn {
          from { transform: translateY(var(--enter-from, 100%)); }
          to   { transform: translateY(0); }
        }
        @keyframes evBadgeIn {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
        .evatto-badge {
          animation: evBadgeIn 0.72s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .evatto-pill-btn:hover .evatto-pill-bg  { transform: scaleX(1) !important; }
        .evatto-pill-btn:hover .evatto-pill-label { color: #fff !important; }
      `}</style>

      {/* Subtle inner border */}
      <div
        className="absolute pointer-events-none"
        style={{ inset: 12, border: "1px solid rgba(0,0,0,0.07)", borderRadius: 6, zIndex: 10 }}
      />

      {/* ── Main two-column layout ── */}
      <div className="absolute flex flex-col md:flex-row items-stretch evatto-slider-layout" style={{ inset: 12 }}>
        {/* LEFT — image */}
        <div className="relative flex-shrink-0 w-full h-[240px] md:h-full md:w-[56%] evatto-slider-image-panel">
          <SlideImage
            currentSrc={current.imageUrl}
            currentAlt={current.imageAlt}
            nextSrc={next?.imageUrl ?? null}
            nextAlt={next?.imageAlt ?? ""}
            isTransitioning={isTransitioning}
            direction={direction}
            onTransitionComplete={handleTransitionComplete}
          />
        </div>

        {/* RIGHT — content */}
        <div
          className="flex-grow md:flex-1 flex flex-col items-center justify-center evatto-slider-content-panel"
          style={{ paddingLeft: "3%", paddingRight: "3%" }}
        >
          <SlideContent
            key={animKey}
            slide={current}
            animKey={animKey}
            direction={direction}
          />
        </div>
      </div>

      {/* Progress dots — right edge, desktop only */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block" style={{ zIndex: 20 }}>
        <ProgressDots total={slides.length} current={displayIndex} onDotClick={goTo} />
      </div>

      {/* Slide counter pill — bottom left */}
      <div
        className="absolute bottom-4 left-4 flex items-center gap-3 px-3 py-1.5 rounded-full backdrop-blur-md"
        style={{ background: "rgba(253,251,247,0.82)", zIndex: 20 }}
      >
        <span style={{ fontFamily: "var(--font-inter),system-ui", fontWeight: 600, fontSize: "0.7rem", color: "#2c4a4a", letterSpacing: "0.08em" }}>
          {String(displayIndex + 1).padStart(2, "0")}
        </span>
        <div style={{ width: 36, height: 1, background: "rgba(44,74,74,0.2)", position: "relative", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute", top: 0, left: 0, height: "100%",
              background: "#2c4a4a",
              width: `${((displayIndex + 1) / slides.length) * 100}%`,
              transition: "width 0.6s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </div>
        <span style={{ fontFamily: "var(--font-inter),system-ui", fontSize: "0.7rem", color: "rgba(44,74,74,0.4)", letterSpacing: "0.08em" }}>
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Scroll hint — bottom right, only on first slide */}
      <div
        className="absolute bottom-0 right-0 flex items-center gap-2 pointer-events-none"
        style={{ padding: "20px 28px", zIndex: 20, opacity: displayIndex === 0 && !isTransitioning ? 1 : 0, transition: "opacity 0.5s ease" }}
      >
        <span style={{ fontFamily: "var(--font-inter),system-ui", fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(44,74,74,0.45)" }}>
          SCROLL
        </span>
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" style={{ opacity: 0.45 }}>
          <path d="M7 2v10M3 8l4 4 4-4" stroke="#2c4a4a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
