"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const cardsData = [
  {
    id: 1,
    label: "Wedding",
    emoji: "💍",
    icon: (
      <svg viewBox="0 0 80 80" className="w-20 h-20" fill="none" stroke="currentColor" strokeWidth="3.5">
        <circle cx="30" cy="42" r="16" />
        <circle cx="50" cy="42" r="16" />
        <text x="22" y="26" fontSize="10" fill="currentColor" stroke="none">♥</text>
        <text x="46" y="62" fontSize="8" fill="currentColor" stroke="none">♥</text>
      </svg>
    ),
    bg: "#e8f5f0",
    description: "Elegant wedding coordination services for your big day",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80",
    alt: "Wedding couple",
  },
  {
    id: 2,
    label: "Graduation",
    emoji: "🎓",
    icon: (
      <svg viewBox="0 0 80 80" className="w-20 h-20" fill="currentColor">
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
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80",
    alt: "Graduation ceremony",
  },
  {
    id: 3,
    label: "DJ parties",
    emoji: "🎉",
    icon: (
      <svg viewBox="0 0 80 80" className="w-20 h-20" fill="none" stroke="currentColor" strokeWidth="3.5">
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
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80",
    alt: "DJ party",
  },
  {
    id: 4,
    label: "Birthday party",
    emoji: "🎂",
    icon: (
      <svg viewBox="0 0 80 80" className="w-20 h-20" fill="currentColor">
        <rect x="12" y="30" width="56" height="38" rx="5" />
        <path d="M28,30 L28,22 Q28,16 35,16 L45,16 Q52,16 52,22 L52,30" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <line x1="12" y1="48" x2="68" y2="48" stroke="white" strokeWidth="3" />
        <rect x="34" y="44" width="12" height="8" rx="2" fill="white" />
      </svg>
    ),
    bg: "#f5f0ec",
    description: "Celebrate birthdays and showers in style",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80",
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      // Initial card stack state (placed high above viewport)
      gsap.set(cards, {
        y: -300,
        opacity: 0,
        scale: 0.6,
        rotationY: 0,
      });

      cards.forEach((card, i) => {
        gsap.set(card, {
          x: STACKED_POSITIONS[i].x,
          rotation: STACKED_POSITIONS[i].rotate,
          zIndex: i + 1,
        });
      });

      const mm = gsap.matchMedia();

      // Desktop layout: cards fully scrub-reversible (drop → spread → flip)
      mm.add("(min-width: 1024px)", () => {
        const finalX = [-450, -150, 150, 450];
        const finalRot = [-2, -1, 1, 2];

        // Pinned scroll-scrub timeline: locks container in place so all cards drop, spread, and flip in the center
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",      // start pinning when top of section hits top of screen
            end: "+=1200",         // scroll distance for the animations to complete
            scrub: 1.2,            // smooth tracking
            pin: true,             // pin the section!
            anticipatePin: 1,
          },
        });

        // 1. Title fade (fast, right at start of pin)
        tl.fromTo(titleRef.current, 
          { y: -20, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.3 },
          0
        );

        // 2. Drop & stack in center (takes 0.0 to 0.4 on scroll-scrub)
        tl.to(cards, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "back.out(1.2)",
        }, 0.1);

        // 3. Spread out (takes 0.4 to 0.8 on scroll-scrub)
        cards.forEach((card, i) => {
          tl.to(card, {
            x: finalX[i],
            rotation: finalRot[i],
            duration: 0.9,
            ease: "power2.inOut",
          }, 0.5 + i * 0.05);
        });

        // 4. Staggered 3D Y-axis flip (takes 0.8 to 1.3 on scroll-scrub)
        cards.forEach((card, i) => {
          tl.to(card, {
            rotationY: 180, // rotate Y axis from 0 to 180
            duration: 0.8,
            ease: "power2.inOut",
          }, 0.9 + i * 0.1);
        });
      });

      // Mobile/Tablet responsive layout: also pinned and centered
      mm.add("(max-width: 1023px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=1000",
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.fromTo(titleRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, 0);

        tl.to(cards, {
          y: 0,
          opacity: 1,
          scale: 1,
          x: 0,
          rotation: 0,
          duration: 0.8,
          stagger: 0.08,
        }, 0.1);

        tl.to(cards, {
          rotationY: 180,
          duration: 0.8,
          stagger: 0.08,
          ease: "power2.inOut",
        }, 0.6);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-start pt-24 pb-20 overflow-hidden"
      style={{ backgroundColor: "#FDFBF7" }}
    >
      {/* Heading */}
      <h2
        ref={titleRef}
        className="font-cormorant font-light text-5xl md:text-7xl text-gray-900 mb-28 tracking-tight text-center opacity-0"
      >
        Featured Event
      </h2>

      {/* Cards container */}
      <div className="relative flex items-start justify-center w-full" style={{ height: 420 }}>
        {cardsData.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="absolute shadow-lg rounded-3xl"
            style={{
              width: 260,
              height: 360,
              transformStyle: "preserve-3d", // standard 3D context
              perspective: 1200,
              top: 0,
              left: "50%",
              marginLeft: -130,
              willChange: "transform",
            }}
          >
            {/* FRONT: Icon card */}
            <div
              className="absolute inset-0 rounded-3xl flex flex-col p-6 border border-black/5"
              style={{
                backgroundColor: card.bg,
                backfaceVisibility: "hidden", // hides front when flipped
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(0deg)", // normal orientation
                zIndex: 2,
              }}
            >
              <span
                className="text-xs uppercase tracking-wider font-semibold text-gray-600 flex items-center gap-1.5"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {card.label}{" "}
                <span className="text-base">{card.emoji}</span>
              </span>
              <div className="flex-1 flex items-center justify-center text-gray-800">
                {card.icon}
              </div>
            </div>

            {/* BACK: Photo card */}
            <div
              className="absolute inset-0 rounded-3xl flex flex-col overflow-hidden border border-black/5"
              style={{
                backgroundColor: card.bg,
                backfaceVisibility: "hidden", // hides back when front is facing user
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)", // facing backward natively inside 3D transform space
                zIndex: 1,
              }}
            >
              {/* Label */}
              <div className="px-5 pt-4 pb-2 flex-shrink-0">
                <span
                  className="text-xs uppercase tracking-wider font-semibold text-gray-600 flex items-center gap-1.5"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {card.label}{" "}
                  <span className="text-base">{card.emoji}</span>
                </span>
              </div>
              {/* Photo */}
              <div className="mx-4 rounded-2xl overflow-hidden flex-1" style={{ maxHeight: 200 }}>
                <img
                  src={card.image}
                  alt={card.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Description */}
              <div className="px-5 py-4 flex-shrink-0">
                <p
                  className="text-xs md:text-sm text-gray-700 leading-snug"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
