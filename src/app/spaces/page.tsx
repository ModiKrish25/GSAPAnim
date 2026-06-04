"use client";

import React, { useState, useEffect } from "react";
import EvattoNav from "@/components/evatto/EvattoNav";
import EvattoFooter from "@/components/evatto/EvattoFooter";
import EvattoBookTourModal from "@/components/evatto/EvattoBookTourModal";
import { ArrowUpRight, Users, Sparkles, SlidersHorizontal, MapPin } from "lucide-react";
import gsap from "gsap";
import ScrollReveal from "@/components/evatto/ScrollReveal";

const VENUES = [
  { id: 1, name: "The Strategist Hall",   capacity: "Up to 90 guests",  bestFor: "Board meetings, strategy sessions, corporate", features: "Interactive displays, soundproofing", style: "Sleek, corporate-focused, minimalist", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1400", size: "1,200 sq.ft.", price: "From $1,500/day" },
  { id: 2, name: "The Garden Courtyard",  capacity: "Up to 200 guests", bestFor: "Weddings, parties, and brunch parties",          features: "Manicured lawns, floral archways",    style: "Romantic, nature-inspired",            image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1400", size: "3,500 sq.ft.", price: "From $3,200/day" },
  { id: 3, name: "The Forever Pavilion",  capacity: "Up to 800 guests", bestFor: "Private weddings, pre-wedding functions",        features: "Garden view, custom floral",          style: "Intimate, boho vibes",                 image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=1400", size: "8,800 sq.ft.", price: "From $6,500/day" },
  { id: 4, name: "The Executive Hall",    capacity: "Up to 120 guests", bestFor: "Conferences, launches, private events",          features: "LED screens, modular seating",        style: "Modern, professional",                 image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1400", size: "2,200 sq.ft.", price: "From $2,400/day" },
];

export default function SpacesPage() {
  const [capacityFilter, setCapacityFilter] = useState("All");

  useEffect(() => {
    gsap.fromTo(".spaces-header", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
    );

    gsap.fromTo(".venue-showcase-card", 
      { opacity: 0, y: 45 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.9, ease: "power3.out", delay: 0.35 }
    );
  }, [capacityFilter]);

  const filteredVenues = VENUES.filter(v => {
    if (capacityFilter === "All") return true;
    if (capacityFilter === "under150") return parseInt(v.capacity.match(/\d+/)?.[0] || "0") <= 150;
    if (capacityFilter === "over150") return parseInt(v.capacity.match(/\d+/)?.[0] || "0") > 150;
    return true;
  });

  return (
    <div className="bg-[#FDFBF7] min-h-screen flex flex-col">
      <EvattoNav />

      {/* Main Spaces Area */}
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          
          {/* Header */}
          <div className="spaces-header text-center mb-16 max-w-2xl mx-auto">
            <span className="text-[10px] tracking-[0.4em] uppercase text-black/45 block mb-3 font-semibold" style={{ fontFamily: "var(--font-inter)" }}>
              Timeless Spaces
            </span>
            <ScrollReveal
              as="h1"
              type="words"
              className="font-cormorant text-5xl sm:text-6xl font-light text-black tracking-tight mb-5 leading-tight"
            >
              Settings for extraordinary moments
            </ScrollReveal>
            <p className="text-sm text-black/55 animate-fade-in" style={{ fontFamily: "var(--font-inter)" }}>
              Explore our architectural masterpieces tailored to inspire. Each hall boasts advanced features, high-end layouts, and absolute premium service.
            </p>
          </div>

          {/* Filters controls */}
          <div className="spaces-header flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-black/[0.08] mb-12" style={{ fontFamily: "var(--font-inter)" }}>
            <div className="flex items-center gap-2 text-black/45">
              <SlidersHorizontal size={14} />
              <span className="text-xs font-semibold uppercase tracking-wider">Filter Venues</span>
            </div>

            {/* Capacity filter pills */}
            <div className="flex gap-2.5">
              {[
                { label: "All Spaces", val: "All" },
                { label: "Intimate (≤ 150)", val: "under150" },
                { label: "Grand (> 150)", val: "over150" },
              ].map(opt => (
                <button
                  key={opt.val}
                  onClick={() => setCapacityFilter(opt.val)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                    capacityFilter === opt.val
                      ? "bg-black text-[#FDFBF7] shadow-md scale-105"
                      : "bg-black/[0.03] text-black/60 border border-black/5 hover:bg-black/5 hover:text-black"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Venues Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {filteredVenues.map((v) => (
              <div
                key={v.id}
                className="venue-showcase-card group bg-white border border-black/[0.04] shadow-[0_10px_35px_rgba(0,0,0,0.02)] hover:shadow-2xl rounded-[2.5rem] overflow-hidden flex flex-col h-full transition-all duration-500 hover:border-black/[0.08]"
              >
                {/* Image */}
                <div className="relative h-[280px] sm:h-[340px] overflow-hidden">
                  <img src={v.image} alt={v.name} className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)" }} />
                  
                  {/* Floating Style pill */}
                  <span
                    className="absolute top-6 left-6 rounded-full px-3 py-1.5 backdrop-blur-md shadow-sm font-semibold"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "9px",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      background: "rgba(253,251,247,0.92)",
                      color: "#1A1A1A"
                    }}
                  >
                    {v.style}
                  </span>

                  {/* Floating Price label */}
                  <span
                    className="absolute bottom-6 right-6 rounded-full px-3.5 py-1.5 backdrop-blur-md font-semibold text-xs tracking-wider"
                    style={{
                      fontFamily: "var(--font-inter)",
                      background: "rgba(10,8,6,0.72)",
                      color: "#FDFBF7"
                    }}
                  >
                    {v.price}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="font-cormorant text-3xl font-light text-black mb-3 group-hover:opacity-75 transition-opacity">
                    {v.name}
                  </h3>
                  
                  <p className="text-xs text-black/55 mb-6" style={{ fontFamily: "var(--font-inter)", lineHeight: 1.6 }}>
                    Ideal space for <strong className="text-black font-semibold">{v.bestFor}</strong>. High-end custom interior styles equipped with {v.features}.
                  </p>

                  {/* Key Stats */}
                  <div className="grid grid-cols-3 gap-4 p-5 rounded-2xl bg-black/[0.02] border border-black/5 mb-8" style={{ fontFamily: "var(--font-inter)", fontSize: "11px" }}>
                    <div>
                      <p className="text-black/35 mb-1 font-semibold flex items-center gap-1"><Users size={12} /> Capacity</p>
                      <p className="text-black font-medium">{v.capacity}</p>
                    </div>
                    <div>
                      <p className="text-black/35 mb-1 font-semibold flex items-center gap-1"><Sparkles size={12} /> Dimensions</p>
                      <p className="text-black font-medium">{v.size}</p>
                    </div>
                    <div>
                      <p className="text-black/35 mb-1 font-semibold flex items-center gap-1"><MapPin size={12} /> Location</p>
                      <p className="text-black font-medium">Main level</p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-3 mt-auto pt-2" style={{ fontFamily: "var(--font-inter)" }}>
                    <a
                      href={`/spaces/${v.id}`}
                      className="flex-1 py-3.5 border border-black/10 hover:border-black rounded-2xl flex items-center justify-center gap-2 text-xs font-semibold text-black transition-all duration-300 active:scale-95 cursor-pointer"
                    >
                      View specifications
                      <ArrowUpRight size={14} />
                    </a>
                    
                    <button
                      onClick={() => window.dispatchEvent(new CustomEvent("open-book-tour"))}
                      className="flex-1 py-3.5 bg-black hover:bg-black/85 text-[#FDFBF7] rounded-2xl flex items-center justify-center text-xs font-semibold transition-all duration-300 active:scale-95 cursor-pointer"
                    >
                      Book private showing
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </main>

      <EvattoFooter />
      <EvattoBookTourModal />
    </div>
  );
}
