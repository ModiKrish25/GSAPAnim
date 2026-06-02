"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

const VENUES = [
  { id: 1, name: "The Strategist Hall",   capacity: "Up to 90 guests",  bestFor: "Board meetings, strategy sessions, corporate", features: "Interactive displays, soundproofing", style: "Sleek, corporate-focused, minimalist", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1400" },
  { id: 2, name: "The Garden Courtyard",  capacity: "Up to 200 guests", bestFor: "Weddings, parties, and brunch parties",          features: "Manicured lawns, floral archways",    style: "Romantic, nature-inspired",            image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1400" },
  { id: 3, name: "The Forever Pavilion",  capacity: "Up to 800 guests", bestFor: "Private weddings, pre-wedding functions",        features: "Garden view, custom floral",          style: "Intimate, boho vibes",                 image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=1400" },
  { id: 4, name: "The Executive Hall",    capacity: "Up to 120 guests", bestFor: "Conferences, launches, private events",          features: "LED screens, modular seating",        style: "Modern, professional",                 image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1400" },
];

export default function EvattoVenues() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const hlines = headerRef.current?.querySelectorAll(".h-line");
      if (hlines) {
        gsap.fromTo(hlines, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 82%", once: true },
        });
      }

      const track = trackRef.current;
      if (!track) return;

      // Delayed start to ensure correct DOM width calculations
      const startMarquee = () => {
        const totalW = track.scrollWidth;
        const halfW = totalW / 2;

        const loop = gsap.fromTo(track,
          { x: -halfW },
          {
            x: 0,
            duration: 35, // Adjust speed (smaller is faster, larger is slower)
            ease: "none",
            repeat: -1,
          }
        );

        // Smooth play/pause timeScale transition
        const onEnter = () => {
          gsap.to(loop, { timeScale: 0, duration: 0.6, ease: "power2.out" });
        };
        const onLeave = () => {
          gsap.to(loop, { timeScale: 1, duration: 0.6, ease: "power2.out" });
        };

        track.addEventListener("mouseenter", onEnter);
        track.addEventListener("mouseleave", onLeave);
        track.addEventListener("touchstart", onEnter, { passive: true });
        track.addEventListener("touchend", onLeave, { passive: true });

        return () => {
          loop.kill();
          track.removeEventListener("mouseenter", onEnter);
          track.removeEventListener("mouseleave", onLeave);
          track.removeEventListener("touchstart", onEnter);
          track.removeEventListener("touchend", onLeave);
        };
      };

      const cleanupMarquee = startMarquee();
      return () => {
        cleanupMarquee?.();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="venues"
      className="overflow-hidden flex flex-col justify-center"
      style={{ background: "#0e0f11" }}
    >
      <style>{`
        @media (min-width: 768px) { 
          #venues { height: 100vh; } 
          .venue-card { width: 420px !important; height: 480px !important; }
        }
        @media (max-width: 767px) {
          #venues { min-height: 85svh; padding-bottom: 3rem; }
          .venue-card { width: 300px !important; height: 380px !important; }
        }
      `}</style>

      <div className="w-full flex-1 flex flex-col justify-center py-6">
        <div ref={headerRef} className="px-6 md:px-14 pb-8 shrink-0">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="h-line opacity-0" style={{ fontFamily: "var(--font-inter)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.35em", color: "rgba(253,251,247,0.35)", marginBottom: "12px" }}>Our spaces</p>
              <h2 className="h-line opacity-0" style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 5vw, 4.5rem)", fontWeight: 300, color: "#FDFBF7", maxWidth: "520px", lineHeight: 1.1 }}>Explore our event spaces</h2>
            </div>
            <Link href="/gallery" className="h-line btn-pill btn-pill-outline-light self-start opacity-0 cursor-pointer">
              View all spaces <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex flex-row gap-5 px-6 md:px-14 w-max items-center"
          style={{ willChange: "transform" }}
        >
          {[...VENUES, ...VENUES].map((v, i) => (
            <div
              key={`${v.id}-${i}`}
              className="venue-card shrink-0 rounded-3xl overflow-hidden relative group cursor-pointer"
              style={{ width: "100%", height: "420px", minWidth: "300px", maxWidth: "100%" }}
            >
              <img src={v.image} alt={v.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(14,15,17,0.95) 0%, rgba(14,15,17,0.35) 55%, transparent 100%)" }} />
              <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(253,251,247,0.4)", marginBottom: "8px" }}>{v.style}</p>
                <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.75rem", fontWeight: 300, color: "#FDFBF7", marginBottom: "12px" }}>{v.name}</h3>
                <div className="rounded-2xl p-4 mb-4" style={{ background: "rgba(253,251,247,0.06)", border: "1px solid rgba(253,251,247,0.1)", backdropFilter: "blur(8px)" }}>
                  <div className="grid grid-cols-2 gap-3" style={{ fontFamily: "var(--font-inter)", fontSize: "11px" }}>
                    <div><p style={{ color: "rgba(253,251,247,0.35)", marginBottom: "3px" }}>Capacity</p><p style={{ color: "rgba(253,251,247,0.85)" }}>{v.capacity}</p></div>
                    <div><p style={{ color: "rgba(253,251,247,0.35)", marginBottom: "3px" }}>Best for</p><p style={{ color: "rgba(253,251,247,0.85)" }}>{v.bestFor}</p></div>
                    <div className="col-span-2"><p style={{ color: "rgba(253,251,247,0.35)", marginBottom: "3px" }}>Features</p><p style={{ color: "rgba(253,251,247,0.85)" }}>{v.features}</p></div>
                  </div>
                </div>
                <Link href={`/spaces/${v.id}`} className="flex items-center gap-2 group/btn w-fit cursor-pointer">
                  <span className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors group-hover/btn:bg-white" style={{ borderColor: "rgba(253,251,247,0.3)" }}>
                    <ArrowUpRight size={14} className="text-white group-hover/btn:text-black transition-colors" />
                  </span>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(253,251,247,0.6)" }}>View details</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
