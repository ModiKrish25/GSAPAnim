"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import EvattoNav from "@/components/evatto/EvattoNav";
import EvattoFooter from "@/components/evatto/EvattoFooter";
import EvattoBookTourModal from "@/components/evatto/EvattoBookTourModal";
import ScrollReveal from "@/components/evatto/ScrollReveal";
import EvattoScrollSlider from "@/components/evatto/EvattoScrollSlider";

const GALLERY_IMAGES = [
  { src: "/gallery_1_floral_1780045656399.png", alt: "Floral Centerpiece", desc: "Intimate Botanical Setting" },
  { src: "/gallery_2_hall_1780045685719.png", alt: "Luxury Reception Hall", desc: "Grand Pavilion Gala" },
  { src: "/gallery_3_couple_1780045702302.png", alt: "Golden Hour Couple", desc: "Sunset Romance" },
  { src: "/gallery_4_catering_1780045719633.png", alt: "Gourmet Catering", desc: "Exquisite Culinary Experience" },
  { src: "/gallery_5_table_1780045741166.png", alt: "Candlelight Table", desc: "Elegant Tablescapes" },
  { src: "/gallery_6_stage_1780045757710.png", alt: "Outdoor Entertainment", desc: "Lively Concert Atmosphere" },
];

export default function GalleryPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const masonryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.2 }
      );

      // Masonry Items Staggered Reveal
      const items = masonryRef.current?.querySelectorAll(".masonry-item");
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: masonryRef.current,
              start: "top 85%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#FDFBF7] min-h-screen flex flex-col">
      <EvattoNav />

      {/* Hero Interactive Showcase Slider (Full Screen) */}
      <EvattoScrollSlider />

      <main className="flex-grow pt-24 pb-24">
        {/* Masonry Grid Section */}
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="font-inter text-[11px] uppercase tracking-[0.3em] text-[#C5A880] mb-4 font-bold">
              Project Gallery
            </p>
            <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A1A] tracking-wide">
              Moments We've Crafted
            </h2>
          </div>
          
          <div ref={masonryRef} className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {GALLERY_IMAGES.map((img, idx) => (
              <div 
                key={idx} 
                className="masonry-item break-inside-avoid relative group overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-500 cursor-pointer"
              >
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-auto object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <p className="font-cormorant text-white text-3xl font-light transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {img.alt}
                  </p>
                  <p className="font-inter text-white/70 text-xs tracking-widest uppercase mt-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {img.desc}
                  </p>
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
