"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import EvattoNav from "@/components/evatto/EvattoNav";
import EvattoFooter from "@/components/evatto/EvattoFooter";
import EvattoBookTourModal from "@/components/evatto/EvattoBookTourModal";
import EvattoProcessTimeline from "@/components/evatto/EvattoProcessTimeline";

const SERVICES = [
  {
    title: "Venue Planning",
    desc: "We curate the perfect canvas for your event, ensuring every location offers breathtaking aesthetics and flawless logistics.",
    img: "/service_venue_planning_new_1780032090163.png",
  },
  {
    title: "Decoration",
    desc: "From lavish floral canopies to elegant tablescapes, our design team transforms spaces into unforgettable visual experiences.",
    img: "/service_decoration_new_1780032110650.png",
  },
  {
    title: "Catering",
    desc: "An exquisite culinary journey tailored to your taste, featuring gourmet menus, fine wines, and impeccable silver service.",
    img: "/service_catering_new_1780032126917.png",
  },
  {
    title: "Photography",
    desc: "Capturing every fleeting moment with cinematic brilliance. Our elite photographers ensure your memories are immortalized.",
    img: "/service_photography_new_1780032143384.png",
  },
  {
    title: "Entertainment",
    desc: "From live string quartets to high-energy DJs, we provide world-class performers to captivate your guests.",
    img: "/service_entertainment_new_1780032161977.png",
  },
];

export default function ServicesPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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

      // Services List Animation (Staggered reveal)
      const serviceItems = listRef.current?.querySelectorAll(".service-row");
      if (serviceItems) {
        serviceItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
              },
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#FDFBF7] min-h-screen flex flex-col">
      <EvattoNav />

      <main className="flex-grow pt-32 md:pt-48 pb-20">
        {/* Page Header */}
        <div ref={headerRef} className="max-w-7xl mx-auto px-6 md:px-12 mb-20 md:mb-32 text-center">
          <p className="font-inter text-[11px] uppercase tracking-[0.3em] text-black/40 mb-6 font-semibold">
            Our Expertise
          </p>
          <h1 className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-light text-[#1A1A1A] leading-tight mb-8">
            Tailored Luxury <br /> Services
          </h1>
          <p className="font-inter text-sm md:text-base text-black/60 max-w-2xl mx-auto leading-relaxed">
            Every event is a unique story. Our comprehensive suite of services ensures that from conception to execution, your vision is realized with uncompromising quality and elegance.
          </p>
        </div>

        {/* Services List */}
        <div ref={listRef} className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col gap-16 md:gap-32">
          {SERVICES.map((srv, idx) => (
            <div 
              key={idx} 
              className={`service-row flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16 opacity-0`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-xl aspect-[4/3] group relative">
                <img 
                  src={srv.img} 
                  alt={srv.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Text */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-black/30 mb-4 block font-bold">
                  0{idx + 1}
                </span>
                <h2 className="font-cormorant text-4xl md:text-5xl font-light text-[#1A1A1A] mb-6">
                  {srv.title}
                </h2>
                <p className="font-inter text-[13px] md:text-sm text-black/60 leading-relaxed max-w-md">
                  {srv.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <EvattoProcessTimeline />

      <EvattoFooter />
      <EvattoBookTourModal />
    </div>
  );
}
