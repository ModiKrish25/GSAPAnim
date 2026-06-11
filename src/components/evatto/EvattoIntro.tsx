"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const SHOWCASE_ITEMS = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
    category: "Altars & Mandaps",
    title: "Grand Floral Archway",
    desc: "Lush botanical arrangements crafting the absolute dream ceremony backdrop.",
    aspect: "aspect-[3/4]",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=800",
    category: "Walkways & Entrances",
    title: "Enchanted Aisle",
    desc: "A soft, romantic pathway illuminated by golden candles and fresh pastel petals.",
    aspect: "aspect-[4/3]",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
    category: "Ceiling & Lighting",
    title: "Imperial Wisteria Canopy",
    desc: "Extravagant hanging floral installations coupled with glowing fairy lights.",
    aspect: "aspect-[4/3]",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80&w=800",
    category: "Table Styling",
    title: "Candlelit Banquet",
    desc: "Intimate dining tables set with fine glass, brass, and warm candle arrays.",
    aspect: "aspect-[3/4]",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
    category: "Banquet Halls",
    title: "Golden Royal Stage",
    desc: "A majestic reception lounge dressed in signature ivory and champagne tones.",
    aspect: "aspect-[3/4]",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=800",
    category: "Floral Centerpieces",
    title: "Blossom Sphere Design",
    desc: "Breathtaking tall floral structures that elevate conversation and dining drama.",
    aspect: "aspect-[4/3]",
  },
];

const STATS = [
  { end: 800, decimals: 0, suffix: "+", label: "Events hosted" },
  { end: 50,  decimals: 0, suffix: "+", label: "Expert vendors" },
  { end: 4.9, decimals: 1, suffix: "",  label: "Average rating" },
  { end: 15,  decimals: 0, suffix: "+", label: "Years of excellence" },
];

function ShowcaseCard({ item }: { item: typeof SHOWCASE_ITEMS[0] }) {
  return (
    <div className="showcase-card group relative bg-white p-3.5 rounded-[22px] border border-black/[0.04] shadow-[0_12px_45px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_65px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden cursor-pointer">
      {/* Image container */}
      <div className={`w-full ${item.aspect} rounded-[16px] overflow-hidden relative`}>
        {/* Soft elegant shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        
        <img
          src={item.src}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
          loading="lazy"
        />
      </div>

      {/* Meta details */}
      <div className="mt-4 px-1 flex items-start justify-between gap-4">
        <div className="flex-1">
          <span 
            className="text-[9px] font-bold tracking-[0.2em] uppercase text-black/35"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {item.category}
          </span>
          <h4 
            className="font-serif text-[1.25rem] text-black/90 group-hover:text-black transition-colors font-medium mt-0.5"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {item.title}
          </h4>
          <p 
            className="text-xs text-black/50 font-normal mt-1 leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {item.desc}
          </p>
        </div>

        {/* Elegant Gold Arrow Button */}
        <div className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-black/60 group-hover:bg-[#C5A880] group-hover:text-white group-hover:border-[#C5A880] transition-all duration-500 shrink-0 mt-1">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function EvattoIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const numRefs    = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const cards = gridRef.current?.querySelectorAll(".showcase-card") ?? [];

    const ctx = gsap.context(() => {
      // Smooth staggered entrance for cards
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1.2,
          ease: "power4.out",
          force3D: true,
          lazy: true,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 82%",
            once: true,
          }
        }
      );

      /* Stats entrance + count-up */
      gsap.fromTo(
        statsRef.current?.querySelectorAll(".stat-item") ?? [],
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.75, ease: "power3.out", force3D: true, lazy: true,
          scrollTrigger: { trigger: statsRef.current, start: "top 85%", once: true },
        }
      );

      STATS.forEach((stat, i) => {
        const el = numRefs.current[i];
        if (!el) return;
        el.textContent = "0" + stat.suffix;
        const counter = { val: 0 };
        gsap.to(counter, {
          val: stat.end, duration: 2.2, ease: "power2.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 82%", once: true },
          onUpdate() {
            el.textContent = (stat.decimals > 0
              ? counter.val.toFixed(stat.decimals)
              : Math.floor(counter.val).toString()
            ) + stat.suffix;
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ background: "#FDFBF7", overflow: "hidden" }}
      className="w-full pt-16 md:pt-32"
    >
      {/* 3-Column Luxury Staggered Masonry Grid */}
      <div
        ref={gridRef}
        className="max-w-[1380px] mx-auto px-6 md:px-14 grid intro-masonry grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14"
      >
        {/* Column 1: Staggered Up */}
        <div className="flex flex-col gap-10 lg:gap-14 md:-translate-y-8">
          {[SHOWCASE_ITEMS[0], SHOWCASE_ITEMS[1]].map((item) => (
            <ShowcaseCard key={item.id} item={item} />
          ))}
        </div>

        {/* Column 2: Centered */}
        <div className="flex flex-col gap-10 lg:gap-14 md:translate-y-0">
          {[SHOWCASE_ITEMS[2], SHOWCASE_ITEMS[3]].map((item) => (
            <ShowcaseCard key={item.id} item={item} />
          ))}
        </div>

        {/* Column 3: Staggered Down */}
        <div className="flex flex-col gap-10 lg:gap-14 md:translate-y-8">
          {[SHOWCASE_ITEMS[4], SHOWCASE_ITEMS[5]].map((item) => (
            <ShowcaseCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div
        ref={statsRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 px-6 md:px-14 py-12 md:py-20"
        style={{
          maxWidth: "1380px",
          margin: "0 auto",
          borderTop: "1px solid rgba(26,26,26,0.1)",
          marginTop: "clamp(120px, 15vw, 180px)",
        }}
      >
        {STATS.map((s, i) => (
          <div key={i} className="stat-item opacity-0">
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.4rem,5vw,4.5rem)", fontWeight: 300, color: "#1A1A1A", lineHeight: 1, fontVariantNumeric: "lining-nums" }}>
              <span ref={el => { numRefs.current[i] = el; }} />
            </p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(26,26,26,0.45)", marginTop: "8px" }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
