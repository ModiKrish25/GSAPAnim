"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import EvattoNav from "@/components/evatto/EvattoNav";
import EvattoFooter from "@/components/evatto/EvattoFooter";
import EvattoBookTourModal from "@/components/evatto/EvattoBookTourModal";

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Split layout animation (staggered fade-up)
      const elements = containerRef.current?.querySelectorAll(".animate-up");
      if (elements) {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.2 }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#FDFBF7] min-h-screen flex flex-col">
      <EvattoNav />

      <main className="flex-grow pt-32 md:pt-48 pb-20 relative">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-[80vh] bg-[#F5F2EC] rounded-bl-[120px] pointer-events-none -z-10" />

        <div ref={containerRef} className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Contact Details */}
          <div className="w-full lg:w-5/12 flex flex-col">
            <p className="animate-up font-inter text-[11px] uppercase tracking-[0.3em] text-black/40 mb-6 font-semibold">
              Get In Touch
            </p>
            <h1 className="animate-up font-cormorant text-5xl md:text-7xl font-light text-[#1A1A1A] leading-tight mb-8">
              Let&apos;s Plan Your <br /> Masterpiece
            </h1>
            <p className="animate-up font-inter text-[13px] md:text-sm text-black/60 leading-relaxed mb-16 max-w-sm">
              Whether you are planning a grand wedding or an intimate corporate retreat, our experts are here to bring your vision to life.
            </p>

            <div className="flex flex-col gap-8">
              <div className="animate-up">
                <p className="font-inter text-[10px] uppercase tracking-[0.25em] text-black/40 mb-2 font-bold">Email Us</p>
                <a href="mailto:hello@evatto.com" className="font-cormorant text-2xl md:text-3xl font-light text-[#1A1A1A] hover:text-[#D4AF37] transition-colors">
                  hello@evatto.com
                </a>
              </div>
              <div className="animate-up">
                <p className="font-inter text-[10px] uppercase tracking-[0.25em] text-black/40 mb-2 font-bold">Call Us</p>
                <a href="tel:+12125550100" className="font-cormorant text-2xl md:text-3xl font-light text-[#1A1A1A] hover:text-[#D4AF37] transition-colors">
                  +1 (212) 555-0100
                </a>
              </div>
              <div className="animate-up">
                <p className="font-inter text-[10px] uppercase tracking-[0.25em] text-black/40 mb-2 font-bold">Visit Us</p>
                <p className="font-inter text-sm text-[#1A1A1A]/80 leading-relaxed max-w-[200px]">
                  123 Grand Pavilion,<br />New York, NY 10001
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="w-full lg:w-7/12 animate-up">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/[0.03]">
              <h3 className="font-cormorant text-3xl mb-8 text-[#1A1A1A] font-light">Send an Inquiry</h3>
              <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-inter text-xs text-black/60 uppercase tracking-widest font-semibold">Name</label>
                    <input type="text" className="border-b border-black/10 py-2 bg-transparent focus:outline-none focus:border-black transition-colors text-sm font-inter" placeholder="Your full name" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-inter text-xs text-black/60 uppercase tracking-widest font-semibold">Email</label>
                    <input type="email" className="border-b border-black/10 py-2 bg-transparent focus:outline-none focus:border-black transition-colors text-sm font-inter" placeholder="you@example.com" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-inter text-xs text-black/60 uppercase tracking-widest font-semibold">Phone</label>
                    <input type="tel" className="border-b border-black/10 py-2 bg-transparent focus:outline-none focus:border-black transition-colors text-sm font-inter" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-inter text-xs text-black/60 uppercase tracking-widest font-semibold">Event Type</label>
                    <select className="border-b border-black/10 py-2 bg-transparent focus:outline-none focus:border-black transition-colors text-sm font-inter cursor-pointer appearance-none text-black/80">
                      <option>Wedding</option>
                      <option>Corporate Gala</option>
                      <option>Private Party</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  <label className="font-inter text-xs text-black/60 uppercase tracking-widest font-semibold">Message</label>
                  <textarea rows={4} className="border-b border-black/10 py-2 bg-transparent focus:outline-none focus:border-black transition-colors text-sm font-inter resize-none" placeholder="Tell us about your dream event..." />
                </div>

                <button type="submit" className="mt-8 bg-[#1A1A1A] text-white font-inter text-xs tracking-[0.1em] uppercase py-4 rounded-full hover:bg-black/80 transition-colors">
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>

        </div>
      </main>

      <EvattoFooter />
      <EvattoBookTourModal />
    </div>
  );
}
