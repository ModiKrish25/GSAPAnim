"use client";

import React, { useState, useEffect } from "react";
import EvattoNav from "@/components/evatto/EvattoNav";
import EvattoFooter from "@/components/evatto/EvattoFooter";
import EvattoBookTourModal from "@/components/evatto/EvattoBookTourModal";
import { MessageCircle, ArrowUpRight, Search } from "lucide-react";
import gsap from "gsap";

const ALL_POSTS = [
  { id: 1, cat: "Planning tips",  title: "Service hub highlights: Stylists, planners, artists & more", date: "June 20, 2025", comments: 1, img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=900", desc: "Unlock the secrets behind seamless vendor coordination, premium layout arrangements, and selecting the right artistic stylists to make your event a high-end masterpiece." },
  { id: 2, cat: "Venue showcase", title: "Location spotlight: Handpicked picks for every luxury occasion", date: "April 29, 2025", comments: 2, img: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=900", desc: "Discover our handpicked architectural venues. From romantic manicured courtyard settings to sleek corporate auditoriums, find the absolute backdrop of your dream." },
  { id: 3, cat: "Event stories",  title: "Party chronicles: Unforgettable birthdays, anniversaries & gala celebrations", date: "June 12, 2025", comments: 3, img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=900", desc: "An exclusive dive into real milestone celebrations hosted at Evatto. Hear the stories, see the custom setups, and feel the luxury energy of unforgettable celebrations." },
  { id: 4, cat: "Planning tips",  title: "The art of seating: Designing layouts that elevate conversations", date: "May 15, 2025", comments: 0, img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=900", desc: "A structural breakdown of modern seating design layout patterns that optimize guest experience, direct sight lines, and create intimate, premium social pockets." },
  { id: 5, cat: "Venue showcase", title: "Sunset settings: Outdoor cocktail venues for dusk soirées", date: "March 08, 2025", comments: 4, img: "https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?auto=format&fit=crop&q=80&w=900", desc: "Dusk is the golden hour of corporate reception networking. These outdoor lawns and open terrace venues capture breathtaking skylines and warm ambient lights." },
  { id: 6, cat: "Event stories",  title: "Summits & symposiums: Leading corporations choosing Evatto spaces", date: "January 14, 2025", comments: 1, img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=900", desc: "A summary showcasing key keynote speakers, modular corporate conference stages, high-speed interactive screens, and premium business styling spaces." },
];

const CATEGORIES = ["All", "Planning tips", "Venue showcase", "Event stories"];

export default function BlogHubPage() {
  const [selectedCat, setSelectedCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Reveal animation
    gsap.fromTo(".blog-hub-header", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
    );

    gsap.fromTo(".blog-hub-card", 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.85, ease: "power3.out", delay: 0.4 }
    );
  }, [selectedCat, searchQuery]);

  const filteredPosts = ALL_POSTS.filter(post => {
    const matchesCat = selectedCat === "All" || post.cat === selectedCat;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-[#FDFBF7] min-h-screen flex flex-col">
      <EvattoNav />

      {/* Main Content Area */}
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          
          {/* Header */}
          <div className="blog-hub-header text-center mb-16 max-w-2xl mx-auto">
            <span className="text-[10px] tracking-[0.4em] uppercase text-black/45 block mb-3 font-semibold" style={{ fontFamily: "var(--font-inter)" }}>
              The Evatto Journal
            </span>
            <h1 className="font-cormorant text-5xl sm:text-6xl font-light text-black tracking-tight mb-5 leading-tight">
              Curated thoughts on timeless celebration
            </h1>
            <p className="text-sm text-black/55" style={{ fontFamily: "var(--font-inter)" }}>
              Insightful planning guides, location spotlight breakdowns, and chronicles of unforgettable moments compiled by our design experts.
            </p>
          </div>

          {/* Filters and Search controls */}
          <div className="blog-hub-header flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-black/[0.08] mb-12">
            
            {/* Category pills */}
            <div className="flex flex-wrap gap-2 justify-center" style={{ fontFamily: "var(--font-inter)" }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                    selectedCat === cat 
                      ? "bg-black text-[#FDFBF7] shadow-md scale-105" 
                      : "bg-black/[0.03] text-black/60 border border-black/5 hover:bg-black/5 hover:text-black"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Elegant Search Bar */}
            <div className="relative w-full md:w-80" style={{ fontFamily: "var(--font-inter)" }}>
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black/35">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-black/[0.03] border border-black/5 focus:border-black focus:bg-white text-xs text-black placeholder-black/35 outline-none transition-all duration-300"
              />
            </div>
          </div>

          {/* Cards Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {filteredPosts.map((post) => (
                <article key={post.id} className="blog-hub-card group cursor-pointer flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-black/[0.04] shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-xl hover:border-black/[0.08] transition-all duration-500">
                  {/* Image container */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img 
                      src={post.img} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                      loading="lazy" 
                    />
                    <span 
                      className="absolute top-4 left-4 rounded-full px-3 py-1.5 backdrop-blur-md shadow-sm font-semibold" 
                      style={{ 
                        fontFamily: "var(--font-inter)", 
                        fontSize: "9px", 
                        textTransform: "uppercase", 
                        letterSpacing: "0.15em", 
                        background: "rgba(253,251,247,0.92)", 
                        color: "#1A1A1A" 
                      }}
                    >
                      {post.cat}
                    </span>
                  </div>

                  {/* Body info */}
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <h3 className="font-cormorant text-2xl font-medium text-black leading-snug group-hover:opacity-75 transition-opacity mb-4">
                      {post.title}
                    </h3>
                    <p className="text-xs text-black/50 leading-relaxed mb-6 flex-1" style={{ fontFamily: "var(--font-inter)" }}>
                      {post.desc}
                    </p>

                    {/* Footer specs */}
                    <div className="flex items-center justify-between border-t border-black/[0.05] pt-5" style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(26,26,26,0.4)" }}>
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1">
                        <MessageCircle size={12} strokeWidth={1.5} />{post.comments}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 max-w-sm mx-auto" style={{ fontFamily: "var(--font-inter)" }}>
              <p className="text-base text-black/45 mb-4">No insights found matching your filters.</p>
              <button 
                onClick={() => { setSelectedCat("All"); setSearchQuery(""); }} 
                className="text-xs font-semibold text-black underline underline-offset-4 hover:opacity-75 cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}

        </div>
      </main>

      <EvattoFooter />
      <EvattoBookTourModal />
    </div>
  );
}
