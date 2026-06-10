"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const cardsData = [
  {
    id: 1,
    label: "Wedding",
    emoji: "💍",
    icon: (
      <svg viewBox="0 0 80 80" className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth="3.5">
        <circle cx="30" cy="42" r="16" />
        <circle cx="50" cy="42" r="16" />
        <text x="22" y="26" fontSize="10" fill="currentColor" stroke="none">♥</text>
        <text x="46" y="62" fontSize="8" fill="currentColor" stroke="none">♥</text>
      </svg>
    ),
    bg: "#e8f5f0",
    description: "Elegant wedding coordination services for your big day",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    alt: "Wedding couple",
  },
  {
    id: 2,
    label: "Graduation",
    emoji: "🎓",
    icon: (
      <svg viewBox="0 0 80 80" className="w-16 h-16" fill="currentColor">
        <polygon points="40,14 70,28 40,42 10,28" />
        <path d="M60,32 L60,52 C60,60 50,66 40,66 C30,66 20,60 20,52 L20,32" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <circle cx="63" cy="33" r="3" />
        <line x1="63" y1="36" x2="63" y2="52" stroke="currentColor" strokeWidth="3" />
        <rect x="28" y="48" width="22" height="15" rx="3" fill="none" stroke="currentColor" strokeWidth="3" />
        <line x1="34" y1="54" x2="46" y2="54" stroke="currentColor" strokeWidth="2" />
        <line x1="34" y1="59" x2="42" y2="59" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    bg: "#f5f0ec",
    description: "Milestones deserve an unforgettable celebration",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80",
    alt: "Graduation ceremony",
  },
  {
    id: 3,
    label: "DJ Parties",
    emoji: "🎉",
    icon: (
      <svg viewBox="0 0 80 80" className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth="3.5">
        <path d="M24,16 L18,42 Q18,52 28,52 Q38,52 38,42 L32,16 Z" />
        <path d="M48,16 L42,42 Q42,52 52,52 Q62,52 62,42 L56,16 Z" />
        <line x1="28" y1="52" x2="28" y2="64" />
        <line x1="52" y1="52" x2="52" y2="64" />
        <line x1="20" y1="64" x2="36" y2="64" />
        <line x1="44" y1="64" x2="60" y2="64" />
        <circle cx="30" cy="30" r="1.5" fill="currentColor" />
        <circle cx="33" cy="24" r="1.5" fill="currentColor" />
        <circle cx="50" cy="28" r="1.5" fill="currentColor" />
        <circle cx="54" cy="22" r="1.5" fill="currentColor" />
        <line x1="36" y1="14" x2="44" y2="14" strokeLinecap="round" />
        <line x1="37" y1="10" x2="43" y2="10" strokeLinecap="round" />
      </svg>
    ),
    bg: "#e8f5f0",
    description: "From cozy small gatherings to large and cool big parties",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80",
    alt: "DJ party",
  },
  {
    id: 4,
    label: "Birthday",
    emoji: "🎂",
    icon: (
      <svg viewBox="0 0 80 80" className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="15" y1="65" x2="65" y2="65" />
        <rect x="22" y="44" width="36" height="21" rx="2" />
        <rect x="30" y="26" width="20" height="18" rx="2" />
        <line x1="36" y1="16" x2="36" y2="26" />
        <line x1="44" y1="16" x2="44" y2="26" />
        <path d="M36,9 Q38,13 36,16 Q34,13 36,9" fill="currentColor" stroke="none" />
        <path d="M44,9 Q46,13 44,16 Q42,13 44,9" fill="currentColor" stroke="none" />
      </svg>
    ),
    bg: "#f5f0ec",
    description: "Celebrate birthdays and showers in style",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80",
    alt: "Birthday party",
  },
];

const STACKED_POSITIONS = [
  { x: -30, rotate: -18 },
  { x: -10, rotate: -6 },
  { x: 10, rotate: 6 },
  { x: 30, rotate: 18 },
];

export default function EvattoEventCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Mobile state
  const [active, setActive] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const touchStartX = useRef(0);

  const goTo = (idx: number) => {
    setActive(idx);
    setFlipped(false);
  };
  const prev = () => goTo((active - 1 + cardsData.length) % cardsData.length);
  const next = () => goTo((active + 1) % cardsData.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      // Initial card stack state (placed high above viewport)
      gsap.set(cards, { y: -300, opacity: 0, scale: 0.6, rotationY: 0 });
      cards.forEach((card, i) => {
        gsap.set(card, {
          x: STACKED_POSITIONS[i].x,
          rotation: STACKED_POSITIONS[i].rotate,
          zIndex: i + 1,
        });
      });

      const mm = gsap.matchMedia();

      // Only run GSAP pinning and timeline animations on Desktop (>= 1024px)
      mm.add("(min-width: 1024px)", () => {
        const finalRot = [0, 0, 0, 0];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=1200",
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.fromTo(titleRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, lazy: true }, 0);

        tl.to(cards, { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.08, force3D: true, lazy: true, ease: "back.out(1.2)" }, 0.1);

        cards.forEach((card, i) => {
          tl.to(card, {
            x: () => {
              const containerWidth = containerRef.current?.clientWidth || window.innerWidth;
              const availableWidth = Math.min(containerWidth - 60, 1360);
              const S = (availableWidth - 280) / 3;
              const positions = [-1.5 * S, -0.5 * S, 0.5 * S, 1.5 * S];
              return positions[i];
            },
            rotation: finalRot[i],
            duration: 0.9,
            force3D: true,
            lazy: true,
            ease: "power2.inOut"
          }, 0.5 + i * 0.05);
        });

        cards.forEach((card, i) => {
          tl.to(card, { rotationY: 180, duration: 0.8, force3D: true, lazy: true, ease: "power2.inOut" }, 0.9 + i * 0.1);
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const card = cardsData[active];

  return (
    <>
      {/* ── Mobile View: Pure CSS display matching mobile layouts ── */}
      <section
        id="events-mobile"
        className="w-full bg-[#FDFBF7] py-16 px-5 flex flex-col items-center lg:hidden"
      >
        <p className="font-inter text-[10px] uppercase tracking-[0.3em] text-black/40 mb-3 font-semibold">
          What we offer
        </p>
        <h2 className="font-cormorant font-light text-4xl text-gray-900 mb-10 tracking-tight text-center">
          Featured Events
        </h2>

        {/* Card */}
        <div
          className="w-full max-w-[340px] mx-auto"
          style={{ perspective: 1000 }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            onClick={() => setFlipped((f) => !f)}
            className="relative w-full cursor-pointer select-none"
            style={{
              height: 420,
              transformStyle: "preserve-3d",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {/* FRONT */}
            <div
              className="absolute inset-0 rounded-3xl flex flex-col p-6 border border-black/5 shadow-xl"
              style={{
                backgroundColor: card.bg,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <span
                className="text-sm uppercase tracking-widest font-bold text-gray-800 flex items-center gap-1.5 mb-2"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {card.label} <span className="text-base">{card.emoji}</span>
              </span>
              <div className="flex-1 flex items-center justify-center text-gray-800">
                {card.icon}
              </div>
              <p
                className="text-center text-[11px] text-black/40 mt-3"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Tap to preview →
              </p>
            </div>

            {/* BACK */}
            <div
              className="absolute inset-0 rounded-3xl flex flex-col overflow-hidden border border-black/5 shadow-xl"
              style={{
                backgroundColor: card.bg,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="px-5 pt-4 pb-2 flex-shrink-0">
                <span
                  className="text-sm uppercase tracking-widest font-bold text-gray-800 flex items-center gap-1.5"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {card.label} <span className="text-base">{card.emoji}</span>
                </span>
              </div>
              <div className="mx-4 rounded-2xl overflow-hidden flex-1">
                <img
                  src={card.image}
                  alt={card.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="px-5 py-4 flex-shrink-0">
                <p
                  className="text-xs text-gray-700 leading-snug"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls row */}
        <div className="flex items-center gap-6 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center text-black/50 hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex gap-2 items-center">
            {cardsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  idx === active
                    ? "w-6 h-2 bg-gray-900"
                    : "w-2 h-2 bg-black/20 hover:bg-black/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center text-black/50 hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* All category pills */}
        <div className="flex flex-wrap gap-2 justify-center mt-6">
          {cardsData.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => goTo(idx)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer border ${
                idx === active
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-transparent text-black/50 border-black/10 hover:border-black/25"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {c.emoji} {c.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Desktop View: GSAP Pinned layout, hidden on mobile ── */}
      <section
        ref={containerRef}
        id="events-desktop"
        className="relative min-h-screen flex-col items-center justify-start pt-24 pb-20 overflow-hidden hidden lg:flex"
        style={{ backgroundColor: "#FDFBF7" }}
      >
        <h2
          ref={titleRef}
          className="font-cormorant font-light text-7xl text-gray-900 mb-28 tracking-tight text-center opacity-0 px-6"
        >
          Featured Event
        </h2>

        <div className="relative flex items-start justify-center w-full" style={{ height: 520 }}>
          {cardsData.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="absolute shadow-lg rounded-3xl group"
              style={{
                width: 280,
                height: 450,
                transformStyle: "preserve-3d",
                perspective: 1200,
                top: 0,
                left: "50%",
                marginLeft: -140,
                willChange: "transform",
              }}
            >
              {/* FRONT */}
              <div
                className="absolute inset-0 rounded-3xl flex flex-col p-6 border border-black/5"
                style={{
                  backgroundColor: card.bg,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(0deg)",
                  zIndex: 2,
                }}
              >
                <span className="text-sm md:text-base uppercase tracking-widest font-bold text-gray-800 flex items-center gap-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                  {card.label} <span className="text-base">{card.emoji}</span>
                </span>
                <div className="flex-1 flex items-center justify-center text-gray-800">
                  {card.icon}
                </div>
              </div>

              {/* BACK */}
              <div
                className="absolute inset-0 rounded-3xl flex flex-col overflow-hidden border border-black/5"
                style={{
                  backgroundColor: card.bg,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  zIndex: 1,
                }}
              >
                <div className="px-5 pt-4 pb-1 flex-shrink-0">
                  <span className="text-sm md:text-base uppercase tracking-widest font-bold text-gray-800 flex items-center gap-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                    {card.label} <span className="text-base">{card.emoji}</span>
                  </span>
                </div>
                <div className="mx-4 my-2.5 rounded-2xl overflow-hidden flex-1 transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:shadow-xl group-hover:-translate-y-1" style={{ maxHeight: 240 }}>
                  <img src={card.image} alt={card.alt} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" loading="lazy" />
                </div>
                <div className="px-5 py-4 flex-shrink-0">
                  <p className="text-sm text-gray-700 leading-snug" style={{ fontFamily: "var(--font-inter)" }}>
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
