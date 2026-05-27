"use client";

import React, { use, useEffect } from "react";
import EvattoNav from "@/components/evatto/EvattoNav";
import EvattoFooter from "@/components/evatto/EvattoFooter";
import EvattoBookTourModal from "@/components/evatto/EvattoBookTourModal";
import { ArrowLeft, Users, Sparkles, MapPin, DollarSign, Lightbulb, Compass, Award } from "lucide-react";
import gsap from "gsap";

const VENUES = [
  { 
    id: 1, 
    name: "The Strategist Hall", 
    capacity: "Up to 90 guests", 
    bestFor: "Board meetings, strategy sessions, corporate negotiations", 
    features: "Interactive displays, soundproofing, high-back leather seating, integrated video conferencing", 
    style: "Sleek, corporate-focused, minimalist", 
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1400", 
    size: "1,200 sq.ft.", 
    price: "From $1,500/day",
    height: "11 feet",
    details: "Engineered specifically for high-stakes executive board meetings, corporate workshops, and deep-focus negotiations. The Strategist Hall integrates dynamic modern lighting control and intelligent soundproofing insulation to guarantee complete privacy and high operational focus."
  },
  { 
    id: 2, 
    name: "The Garden Courtyard", 
    capacity: "Up to 200 guests", 
    bestFor: "Weddings, cocktail receptions, brunch parties", 
    features: "Manicured lawns, floral archways, string bistro lighting, acoustic performance shell", 
    style: "Romantic, nature-inspired", 
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1400", 
    size: "3,500 sq.ft.", 
    price: "From $3,200/day",
    height: "Open air",
    details: "A stunning natural garden oasis situated under custom designer floral arches and warm string lights. The Garden Courtyard provides a romantic, airy setting ideal for high-end luxury weddings, premium cocktail mixers, and sun-drenched brunch gatherings."
  },
  { 
    id: 3, 
    name: "The Forever Pavilion", 
    capacity: "Up to 800 guests", 
    bestFor: "Grand weddings, galas, award dinners, large-scale events", 
    features: "Scenic double-height window glass walls, vaulted ceilings, crystal chandeliers, caterer preparation space", 
    style: "Intimate, boho vibes, monumental luxury", 
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=1400", 
    size: "8,800 sq.ft.", 
    price: "From $6,500/day",
    height: "18 feet",
    details: "Our crown jewel architectural monument. The Forever Pavilion is designed for monumental celebrations. Featuring double-height window panels that flood the room with natural sunset light and look directly onto our gardens, this hall sets the absolute stage of dreams."
  },
  { 
    id: 4, 
    name: "The Executive Hall", 
    capacity: "Up to 120 guests", 
    bestFor: "Conferences, tech product launches, panel discussions", 
    features: "Dual high-definition LED video walls, automated spotlights, modular amphitheater configurations", 
    style: "Modern, professional, technological", 
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1400", 
    size: "2,200 sq.ft.", 
    price: "From $2,400/day",
    height: "14 feet",
    details: "A premium tech-focused keynote auditorium. Custom-engineered for dynamic corporate announcements, panel symposiums, and product launches. Features dual towering LED walls and fully integrated directional speakers to provide complete acoustic immersion."
  },
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function SpaceDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const targetId = parseInt(resolvedParams.id || "1", 10);
  const venue = VENUES.find(v => v.id === targetId) || VENUES[0];

  useEffect(() => {
    // Elegant entrance reveal
    gsap.fromTo(".detail-header-el", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.95, ease: "power3.out", delay: 0.25 }
    );
    
    gsap.fromTo(".spec-grid-el", 
      { opacity: 0, scale: 0.96, y: 20 },
      { opacity: 1, scale: 1, y: 0, stagger: 0.06, duration: 0.8, ease: "power2.out", delay: 0.45 }
    );
  }, [targetId]);

  return (
    <div className="bg-[#FDFBF7] min-h-screen flex flex-col">
      <EvattoNav />

      {/* Main detail content */}
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          
          {/* Back button link */}
          <div className="detail-header-el opacity-0 mb-8" style={{ fontFamily: "var(--font-inter)" }}>
            <a 
              href="/spaces" 
              className="inline-flex items-center gap-2 text-xs font-semibold text-black/45 hover:text-black transition-colors"
            >
              <ArrowLeft size={14} /> Back to all spaces
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Col: Giant Image & Detailed Story */}
            <div className="lg:col-span-7 flex flex-col">
              
              {/* Main space photo */}
              <div className="detail-header-el opacity-0 rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[16/10] mb-8 relative border border-black/5">
                <img 
                  src={venue.image} 
                  alt={venue.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Space Name */}
              <div className="detail-header-el opacity-0 mb-6">
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#D4AF37] font-semibold block mb-2" style={{ fontFamily: "var(--font-inter)" }}>
                  {venue.style}
                </span>
                <h1 className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-light text-black tracking-tight leading-tight">
                  {venue.name}
                </h1>
              </div>

              {/* Story Details */}
              <div className="detail-header-el opacity-0 text-sm text-black/70 space-y-6 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                <p>{venue.details}</p>
                <p>
                  Every detail has been curated in partnership with leading lighting designers, acoustic architects, and spatial planners. The results are spaces that do not simply host your events, but actively elevate the aesthetic experience, leaving your participants utterly inspired.
                </p>
              </div>

            </div>

            {/* Right Col: Specifications Card & Reservation CTA */}
            <div className="lg:col-span-5 flex flex-col justify-start">
              
              {/* Technical Specifications Container */}
              <div className="detail-header-el opacity-0 bg-white border border-black/[0.04] shadow-[0_20px_50px_rgba(0,0,0,0.03)] rounded-[2.5rem] p-8 md:p-10 mb-8">
                
                <h3 className="font-cormorant text-2xl font-medium text-black mb-6">
                  Venue Specifications
                </h3>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-6" style={{ fontFamily: "var(--font-inter)" }}>
                  
                  {/* Size */}
                  <div className="spec-grid-el opacity-0">
                    <p className="text-[10px] uppercase text-black/35 font-semibold flex items-center gap-1.5 mb-1.5"><Compass size={12} /> Dimensions</p>
                    <p className="text-sm font-semibold text-black">{venue.size}</p>
                  </div>

                  {/* Capacity */}
                  <div className="spec-grid-el opacity-0">
                    <p className="text-[10px] uppercase text-black/35 font-semibold flex items-center gap-1.5 mb-1.5"><Users size={12} /> Capacity</p>
                    <p className="text-sm font-semibold text-black">{venue.capacity}</p>
                  </div>

                  {/* Height */}
                  <div className="spec-grid-el opacity-0">
                    <p className="text-[10px] uppercase text-black/35 font-semibold flex items-center gap-1.5 mb-1.5"><Lightbulb size={12} /> Ceiling Height</p>
                    <p className="text-sm font-semibold text-black">{venue.height}</p>
                  </div>

                  {/* Pricing */}
                  <div className="spec-grid-el opacity-0">
                    <p className="text-[10px] uppercase text-black/35 font-semibold flex items-center gap-1.5 mb-1.5"><DollarSign size={12} /> Venue Pricing</p>
                    <p className="text-sm font-semibold text-black">{venue.price}</p>
                  </div>

                  {/* Best For */}
                  <div className="spec-grid-el opacity-0 col-span-2">
                    <p className="text-[10px] uppercase text-black/35 font-semibold flex items-center gap-1.5 mb-1.5"><Award size={12} /> Optimal Utilization</p>
                    <p className="text-xs text-black/75 leading-relaxed">{venue.bestFor}</p>
                  </div>

                  {/* Features */}
                  <div className="spec-grid-el opacity-0 col-span-2 border-t border-black/[0.05] pt-5">
                    <p className="text-[10px] uppercase text-black/35 font-semibold flex items-center gap-1.5 mb-1.5"><MapPin size={12} /> Key Features Included</p>
                    <p className="text-xs text-black/75 leading-relaxed">{venue.features}</p>
                  </div>

                </div>

                {/* Book Private showing button */}
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("open-book-tour"))}
                  className="w-full mt-8 py-4 bg-black hover:bg-black/85 text-[#FDFBF7] font-semibold text-sm rounded-2xl transition-all duration-300 hover:shadow-lg flex items-center justify-center cursor-pointer"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Schedule Private Showing
                </button>

              </div>

            </div>

          </div>

        </div>
      </main>

      <EvattoFooter />
      <EvattoBookTourModal />
    </div>
  );
}
