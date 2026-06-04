"use client";
import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Sliders } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function EvattoBeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  return (
    <section className="py-20 md:py-32 bg-[#FDFBF7] border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        {/* Section Title */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="font-inter text-[11px] uppercase tracking-[0.3em] text-black/40 mb-4 font-semibold">
            Visual Proof
          </p>
          <ScrollReveal
            as="h2"
            type="words"
            className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A1A] leading-tight mb-6"
          >
            The Art of Transformation
          </ScrollReveal>
          <p className="font-inter text-sm md:text-base text-black/60 leading-relaxed">
            Drag the slider to see how our luxury design team turns bare, empty shells into bespoke, editorial event stages styled with grand floral installations, custom warm lights, and refined textures.
          </p>
        </div>

        {/* Interactive Comparison Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full aspect-[16/10] md:aspect-[21/9] rounded-[24px] md:rounded-[36px] overflow-hidden select-none shadow-2xl border border-black/10 cursor-ew-resize"
          style={{ touchAction: "none" }}
        >
          {/* Before: Raw Loft space */}
          <div className="absolute inset-0 w-full h-full bg-[#1A1A1A]">
            <img
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1600"
              alt="Raw space before decoration"
              className="w-full h-full object-cover pointer-events-none filter brightness-90 grayscale-[20%]"
            />
            {/* Label */}
            <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-none">
              <span className="font-inter text-[10px] md:text-xs text-white uppercase tracking-widest font-semibold">
                Before: Raw Space
              </span>
            </div>
          </div>

          {/* After: Fully Styled Reception */}
          <div
            className="absolute inset-0 h-full overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            {/* We force the image inside to stay full-width to prevent squishing */}
            <div className="absolute inset-0 w-full h-full" style={{ width: containerRef.current?.getBoundingClientRect().width || "100%" }}>
              <img
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1600"
                alt="Transformed decorated venue"
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
            {/* Label */}
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-[#C5A880] px-4 py-2 rounded-full shadow-lg pointer-events-none flex items-center gap-1.5 whitespace-nowrap">
              <Sparkles size={12} className="text-white" />
              <span className="font-inter text-[10px] md:text-xs text-white uppercase tracking-widest font-semibold">
                After: Keshav Decor
              </span>
            </div>
          </div>

          {/* Slider line & handle */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-[#C5A880] z-20"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Handle button */}
            <div
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white text-[#1A1A1A] border-2 border-[#C5A880] flex items-center justify-center shadow-xl cursor-ew-resize active:scale-95 transition-transform select-none z-30"
            >
              <Sliders size={16} className="text-[#C5A880]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
