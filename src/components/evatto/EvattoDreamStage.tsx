"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Sparkles, Calendar, Heart, ShieldCheck } from "lucide-react";

// Themes for the interactive 3D mood customizer
const MOODS = [
  {
    id: "golden",
    title: "Golden Hour Celebration",
    description: "Warm, amber lighting with fairy lights, golden curtains, and acoustic music. Perfect for intimate weddings and romantic socials.",
    bgGradient: "linear-gradient(135deg, #16120b 0%, #302112 100%)",
    accentColor: "#D4AF37",
    tag: "Romantic & Warm",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800",
    particleColor: "#f1c40f",
  },
  {
    id: "emerald",
    title: "Emerald Elegance",
    description: "Enchanting garden aesthetics with deep green foliage, white floral arches, and sophisticated glass tableware. Ideal for upscale garden banquets.",
    bgGradient: "linear-gradient(135deg, #091a12 0%, #153826 100%)",
    accentColor: "#52b788",
    tag: "Nature & Fresh",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=800",
    particleColor: "#2ecc71",
  },
  {
    id: "midnight",
    title: "Midnight Mystique",
    description: "Deep violet, navy accents with starry neon projections, premium soundscapes, and smoke machines. Tailored for corporate galas and energetic DJ parties.",
    bgGradient: "linear-gradient(135deg, #090b14 0%, #171d3d 100%)",
    accentColor: "#9b5de5",
    tag: "Vibrant & Corporate",
    icon: Calendar,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800",
    particleColor: "#a855f7",
  },
];

export default function EvattoDreamStage() {
  const [activeMood, setActiveMood] = useState(MOODS[0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const liquidCursorRef = useRef<HTMLDivElement>(null);

  // Mouse move parallax for the cards container (3D tilt effect)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = container.getBoundingClientRect();
      
      // Calculate normalized coordinates (-1 to 1)
      const x = ((clientX - left) / width) * 2 - 1;
      const y = ((clientY - top) / height) * 2 - 1;

      // 3D rotation based on mouse coordinates
      gsap.to(cardsContainerRef.current, {
        rotateY: x * 15, // tilt left-right
        rotateX: -y * 15, // tilt up-down
        duration: 0.8,
        ease: "power2.out",
        transformPerspective: 1000,
      });

      // Liquid cursor follow
      if (liquidCursorRef.current) {
        gsap.to(liquidCursorRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.2,
          ease: "power1.out",
        });
      }
    };

    const handleMouseEnter = () => {
      if (liquidCursorRef.current) {
        gsap.to(liquidCursorRef.current, { opacity: 1, scale: 1, duration: 0.3 });
      }
    };

    const handleMouseLeave = () => {
      if (liquidCursorRef.current) {
        gsap.to(liquidCursorRef.current, { opacity: 0, scale: 0.1, duration: 0.3 });
      }
      // Reset 3D tilt
      gsap.to(cardsContainerRef.current, {
        rotateY: 0,
        rotateX: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Starry/confetti background canvas physics
  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      color: string;
    }> = [];

    // Create stable points
    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < 70; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 3 + 1,
          speedY: -(Math.random() * 0.8 + 0.2),
          speedX: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.7 + 0.3,
          color: activeMood.particleColor,
        });
      }
    };

    initParticles();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw dynamic stars/particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        // Move upwards (floating drift)
        p.y += p.speedY;
        p.x += p.speedX;

        // Wrap around screen
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0 || p.x > width) {
          p.x = Math.random() * width;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeMood]);

  // Transition backgrounds and active card animations
  const switchMood = (mood: typeof MOODS[0]) => {
    if (mood.id === activeMood.id) return;
    
    // Animate current active components out briefly, then in
    const tl = gsap.timeline();

    tl.to(".mood-title, .mood-desc, .mood-icon", {
      opacity: 0,
      y: -20,
      stagger: 0.05,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setActiveMood(mood);
      }
    });

    // Animate new mood details in
    tl.fromTo(".mood-title, .mood-desc, .mood-icon", 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: "power3.out" }
    );

    // Liquid flash color burst overlay in bg
    gsap.fromTo(backgroundRef.current,
      { opacity: 0.3, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
    );
  };

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        background: activeMood.bgGradient,
        transition: "background 1.2s cubic-bezier(0.25, 0.8, 0.25, 1)",
        overflow: "hidden",
      }}
      className="py-24 md:py-36 min-h-[100vh] flex flex-col justify-center items-center text-white"
    >
      {/* 🔮 Interactive Liquid SVG Filter Portal for Cursor */}
      <div
        ref={liquidCursorRef}
        style={{
          position: "fixed",
          top: -50,
          left: -50,
          width: 100,
          height: 100,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "screen",
          filter: "url(#liquid-goo)",
          opacity: 0,
          transform: "scale(0.1)",
          background: `radial-gradient(circle, ${activeMood.accentColor}dd 0%, transparent 70%)`,
        }}
        className="hidden md:block"
      />

      <svg className="hidden">
        <defs>
          <filter id="liquid-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Floating Canvas particles */}
      <canvas
        ref={particlesRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Radial spotlight effect behind content */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 pointer-events-none mix-blend-color-dodge"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${activeMood.accentColor}25 0%, transparent 60%)`,
        }}
      />

      <div className="max-w-[1380px] w-full px-6 md:px-14 flex flex-col gap-16 relative z-10">
        
        {/* Title */}
        <div className="text-center md:text-left">
          <p
            className="text-xs uppercase tracking-[0.4em] mb-4"
            style={{ color: activeMood.accentColor, transition: "color 0.8s" }}
          >
            Immersive Event Customizer
          </p>
          <h2
            className="font-cormorant text-5xl md:text-7xl font-extralight tracking-tight"
            style={{ lineHeight: 1.1 }}
          >
            Visualize Your <span className="italic" style={{ color: activeMood.accentColor, transition: "color 0.8s" }}>Dream Atmosphere</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl text-sm md:text-base">
            Move your mouse across the scene to tilt the spatial workspace in 3D. Click on a mood style below to instantly project a new virtual theme.
          </p>
        </div>

        {/* 3D Scene */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Active mood details */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-6">
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-800"
                style={{ borderColor: activeMood.accentColor, backgroundColor: `${activeMood.accentColor}10` }}
              >
                <activeMood.icon className="w-6 h-6 transition-all duration-800" style={{ color: activeMood.accentColor }} />
              </div>
              <span className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: activeMood.accentColor, transition: "color 0.8s" }}>
                {activeMood.tag}
              </span>
            </div>

            <h3 className="mood-title font-cormorant text-4xl font-light tracking-wide text-white">
              {activeMood.title}
            </h3>

            <p className="mood-desc text-gray-300 text-sm md:text-base leading-relaxed max-w-md">
              {activeMood.description}
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <button 
                className="btn-pill hover:scale-105 active:scale-95 transition-transform"
                style={{ backgroundColor: activeMood.accentColor, color: "#111", border: `1px solid ${activeMood.accentColor}` }}
              >
                Book This Theme
              </button>
              <button 
                className="btn-pill hover:scale-105 active:scale-95 transition-transform"
                style={{ backgroundColor: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                See Moodboard
              </button>
            </div>
          </div>

          {/* Dynamic 3D Spatial Deck */}
          <div className="lg:col-span-7 flex justify-center items-center py-8">
            <div 
              ref={cardsContainerRef}
              style={{
                transformStyle: "preserve-3d",
                perspective: 1000,
              }}
              className="flex justify-center items-center gap-6 md:gap-8 w-full max-w-[580px]"
            >
              {MOODS.map((mood, idx) => {
                const isActive = mood.id === activeMood.id;
                return (
                  <div
                    key={mood.id}
                    ref={el => { cardRefs.current[idx] = el; }}
                    onClick={() => switchMood(mood)}
                    className="relative cursor-pointer transition-all duration-500 rounded-3xl overflow-hidden flex-1 group"
                    style={{
                      height: isActive ? "380px" : "320px",
                      transform: `translateZ(${isActive ? "60px" : "0px"})`,
                      boxShadow: isActive 
                        ? `0 25px 50px -12px ${activeMood.accentColor}30` 
                        : "0 20px 25px -5px rgba(0, 0, 0, 0.4)",
                      border: isActive ? `2px solid ${activeMood.accentColor}` : "1px solid rgba(255,255,255,0.1)",
                      willChange: "transform, height",
                    }}
                  >
                    {/* Image backdrop */}
                    <img 
                      src={mood.image} 
                      alt={mood.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ filter: isActive ? "brightness(0.85)" : "brightness(0.4)" }}
                    />
                    
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />

                    {/* Content inside card */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end items-center text-center">
                      <span 
                        className="text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full mb-3"
                        style={{ 
                          backgroundColor: isActive ? activeMood.accentColor : "rgba(255,255,255,0.1)", 
                          color: isActive ? "#000" : "#fff",
                          transition: "all 0.5s"
                        }}
                      >
                        {mood.id.toUpperCase()}
                      </span>
                      <h4 className="font-cormorant text-xl font-light text-white leading-tight">
                        {mood.title.split(" ")[0]}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Feature points */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-white/10 mt-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5" style={{ color: activeMood.accentColor }} />
            <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">100% Configurable Spacing</span>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5" style={{ color: activeMood.accentColor }} />
            <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">L-Acoustics Sound System</span>
          </div>
          <div className="flex items-center gap-3 col-span-2 md:col-span-1">
            <Calendar className="w-5 h-5" style={{ color: activeMood.accentColor }} />
            <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">Interactive Projection Mapping</span>
          </div>
        </div>

      </div>
    </section>
  );
}
