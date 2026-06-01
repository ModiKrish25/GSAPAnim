"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight, MessageCircle } from "lucide-react";

const POSTS = [
  { cat: "Planning tips",       title: "Service hub highlights: Stylists, planners, artists & more", date: "June 20, 2025",  comments: 1, img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=900" },
  { cat: "Venue showcase",      title: "Location spotlight: Handpicked picks for every occasion",    date: "April 29, 2025", comments: 2, img: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=900" },
  { cat: "Event stories",       title: "Party chronicles: Birthdays, anniversaries & more",          date: "June 12, 2025",  comments: 3, img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=900" },
];

const LOGOS = ["Weddings Co.", "GardenFirst", "LuxePhoto", "BloomDecor", "SoundWaves", "CateringPro", "ArtisanBake", "GoldenLight"];

export default function EvattoBlog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current?.querySelectorAll(".h-el") ?? [],
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 82%", once: true },
        }
      );

      gsap.fromTo(cardsRef.current?.querySelectorAll(".blog-card") ?? [],
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger: 0.14, duration: 1.0, ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 85%", once: true },
        }
      );

      // GPU-accelerated marquee
      const track = sectionRef.current?.querySelector(".marquee-track");
      if (track) {
        gsap.to(track, {
          xPercent: -50,
          ease: "none",
          duration: 20,
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="blog" style={{ background: "#FDFBF7" }} className="py-20 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="h-el opacity-0" style={{ fontFamily: "var(--font-inter)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.35em", color: "rgba(26,26,26,0.4)", marginBottom: "12px" }}>Our blog</p>
            <h2 className="h-el opacity-0" style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.2rem, 5vw, 5rem)", fontWeight: 300, color: "#1A1A1A" }}>Your event, our insights</h2>
          </div>
          <Link href="/gallery" className="h-el btn-pill btn-pill-outline-dark self-start opacity-0 cursor-pointer">
            View all <ArrowUpRight size={13} />
          </Link>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
          {POSTS.map((p, i) => (
            <article key={i} className="blog-card group opacity-0 cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl mb-5 aspect-[4/3]">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <span
                  className="absolute top-4 left-4 rounded-full px-3 py-1.5 backdrop-blur-md"
                  style={{ fontFamily: "var(--font-inter)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.15em", background: "rgba(253,251,247,0.88)", color: "#1A1A1A" }}
                >
                  {p.cat}
                </span>
              </div>
              <h3 className="group-hover:opacity-75 transition-opacity" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.45rem", fontWeight: 500, color: "#1A1A1A", lineHeight: 1.3, marginBottom: "12px" }}>{p.title}</h3>
              <div className="flex items-center justify-between">
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(26,26,26,0.4)" }}>{p.date}</span>
                <span className="flex items-center gap-1" style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(26,26,26,0.4)" }}>
                  <MessageCircle size={11} strokeWidth={1.5} />{p.comments}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Partners marquee */}
      <div className="mt-24 overflow-hidden" style={{ borderTop: "1px solid rgba(26,26,26,0.07)", paddingTop: "40px" }}>
        <p className="text-center mb-8" style={{ fontFamily: "var(--font-inter)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.38em", color: "rgba(26,26,26,0.3)" }}>Trusted partners who chose us</p>
        <div className="relative w-full overflow-hidden whitespace-nowrap">
          <div className="marquee-track inline-block whitespace-nowrap">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <span key={i} className="inline-flex items-center whitespace-nowrap mx-10" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.6rem", fontWeight: 300, color: "rgba(26,26,26,0.25)" }}>
                {logo}
                <span className="mx-8 text-base" style={{ color: "rgba(26,26,26,0.12)" }}>✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
