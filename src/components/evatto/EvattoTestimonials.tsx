"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const TESTIMONIALS = [
  {
    quote: "Evatto transformed our vision into an absolute masterpiece. Every detail was executed with flawless precision and elegance.",
    name: "Eleanor & James",
    event: "Wedding Reception",
  },
  {
    quote: "The team’s dedication to luxury and perfection is unmatched. Our corporate gala was the talk of the industry.",
    name: "Michael Sterling",
    event: "Corporate Gala",
  },
  {
    quote: "From the breathtaking floral arrangements to the exquisite catering, everything exceeded our wildest dreams.",
    name: "Sophia Laurent",
    event: "Private Anniversary",
  },
];

export default function EvattoTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Reveal on scroll
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle crossfade animation
  useEffect(() => {
    if (!quoteRef.current || !authorRef.current) return;

    const tl = gsap.timeline();
    
    // Fade out current
    tl.to([quoteRef.current, authorRef.current], {
      opacity: 0,
      y: -10,
      duration: 0.4,
      ease: "power2.in",
    });

    // We swap the text natively in the React render cycle via activeIndex,
    // but we use GSAP to animate it back in slightly after the state updates.
    // To synchronize smoothly, we fade in after a brief delay.
    tl.to([quoteRef.current, authorRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.1,
    });
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-40 bg-[#0e0f11] text-[#FDFBF7] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle at center, rgba(212,175,55,0.15) 0%, transparent 70%)" }} />
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-12 font-inter font-semibold">
          Client Experiences
        </p>
        
        <div className="min-h-[220px] md:min-h-[280px] flex flex-col justify-center">
          <p 
            ref={quoteRef}
            className="font-cormorant font-light text-3xl md:text-5xl lg:text-6xl leading-tight mb-10"
            style={{ textWrap: "balance" }}
          >
            &quot;{TESTIMONIALS[activeIndex].quote}&quot;
          </p>
          
          <div ref={authorRef}>
            <p className="font-inter font-semibold text-sm tracking-wider text-white/90">
              {TESTIMONIALS[activeIndex].name}
            </p>
            <p className="font-inter text-xs tracking-widest uppercase text-white/40 mt-2">
              {TESTIMONIALS[activeIndex].event}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
            aria-label="Previous testimonial"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? "bg-white scale-110" : "bg-white/20 hover:bg-white/40"}`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
            aria-label="Next testimonial"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
