"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { X, Calendar, Users, Home, Mail, User, Phone } from "lucide-react";

export default function EvattoBookTourModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOpen = () => {
      setIsOpen(true);
      setSuccess(false);
    };

    window.addEventListener("open-book-tour", handleOpen);

    // Auto open if url contains book=true
    const params = new URLSearchParams(window.location.search);
    if (params.get("book") === "true") {
      handleOpen();
      // Clean up parameter without reloading
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }

    return () => window.removeEventListener("open-book-tour", handleOpen);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    // Premium entrance animation
    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      );

      gsap.fromTo(modalRef.current,
        { y: 50, scale: 0.95, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.65, ease: "back.out(1.1)", delay: 0.1 }
      );

      const fields = formRef.current?.querySelectorAll(".form-field");
      if (fields) {
        gsap.fromTo(fields,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, stagger: 0.06, duration: 0.5, ease: "power2.out", delay: 0.3 }
        );
      }
    });

    return () => ctx.revert();
  }, [isOpen]);

  const handleClose = () => {
    // Elegant exit animation
    gsap.to(modalRef.current, {
      y: 30,
      scale: 0.95,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => setIsOpen(false),
        });
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate premium private booking submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      
      // Auto close after 2 seconds
      setTimeout(() => {
        handleClose();
      }, 2500);
    }, 1800);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-8"
      style={{
        background: "rgba(10, 8, 6, 0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      {/* Absolute click-outside listener */}
      <div className="absolute inset-0 cursor-default" onClick={handleClose} />

      {/* Modal Container */}
      <div
        ref={modalRef}
        className="relative w-full max-w-xl bg-[#FDFBF7] rounded-[2.5rem] border border-black/5 shadow-[0_30px_70px_rgba(0,0,0,0.35)] overflow-hidden z-10"
        style={{
          fontFamily: "var(--font-inter)",
        }}
      >
        {/* Soft Decorative Ambient Spot */}
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none opacity-20 filter blur-3xl"
          style={{
            background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)"
          }}
        />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full border border-black/5 hover:border-black/20 flex items-center justify-center text-black/60 hover:text-black transition-all duration-300 hover:scale-105 z-20"
        >
          <X size={18} />
        </button>

        {/* Form Content */}
        <div className="px-6 sm:px-12 py-10 sm:py-14">
          {!success ? (
            <>
              {/* Header */}
              <div className="text-center mb-10">
                <span className="text-[10px] tracking-[0.4em] uppercase text-black/45 block mb-2 font-semibold">
                  Private Tour
                </span>
                <h3 className="font-cormorant text-3xl sm:text-4xl font-light text-black tracking-wide">
                  Book Your Viewing
                </h3>
                <div className="w-8 h-px bg-black/20 mx-auto mt-4" />
              </div>

              {/* Form */}
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div className="form-field relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black/35">
                    <User size={16} />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/[0.02] border border-black/10 focus:border-[#D4AF37] focus:bg-white text-sm text-black placeholder-black/35 outline-none transition-all duration-300"
                  />
                </div>

                {/* Email */}
                <div className="form-field relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black/35">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/[0.02] border border-black/10 focus:border-[#D4AF37] focus:bg-white text-sm text-black placeholder-black/35 outline-none transition-all duration-300"
                  />
                </div>

                {/* Phone */}
                <div className="form-field relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black/35">
                    <Phone size={16} />
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/[0.02] border border-black/10 focus:border-[#D4AF37] focus:bg-white text-sm text-black placeholder-black/35 outline-none transition-all duration-300"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Date */}
                  <div className="form-field relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black/35">
                      <Calendar size={16} />
                    </span>
                    <input
                      type="date"
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/[0.02] border border-black/10 focus:border-[#D4AF37] focus:bg-white text-sm text-black outline-none transition-all duration-300 cursor-pointer"
                    />
                  </div>

                  {/* Guests */}
                  <div className="form-field relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black/35">
                      <Users size={16} />
                    </span>
                    <select
                      required
                      defaultValue=""
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/[0.02] border border-black/10 focus:border-[#D4AF37] focus:bg-white text-sm text-black/75 outline-none transition-all duration-300 cursor-pointer appearance-none"
                    >
                      <option value="" disabled>Guest Capacity</option>
                      <option value="under50">Under 50 guests</option>
                      <option value="50-150">50 - 150 guests</option>
                      <option value="150-300">150 - 300 guests</option>
                      <option value="300plus">300+ guests</option>
                    </select>
                  </div>
                </div>

                {/* Space Type */}
                <div className="form-field relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black/35">
                    <Home size={16} />
                  </span>
                  <select
                    required
                    defaultValue=""
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/[0.02] border border-black/10 focus:border-[#D4AF37] focus:bg-white text-sm text-black/75 outline-none transition-all duration-300 cursor-pointer appearance-none"
                  >
                    <option value="" disabled>Preferred Venue Space</option>
                    <option value="strategist">The Strategist Hall</option>
                    <option value="garden">The Garden Courtyard</option>
                    <option value="pavilion">The Forever Pavilion</option>
                    <option value="executive">The Executive Hall</option>
                  </select>
                </div>

                {/* Submit button */}
                <div className="form-field pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#1e1e1e] hover:bg-[#000] text-[#FDFBF7] font-semibold text-sm rounded-2xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:bg-black/40 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-white/35 border-t-white animate-spin" />
                        Scheduling Private Tour...
                      </span>
                    ) : (
                      "Request Private Showing"
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              {/* Success Checkmark Circle */}
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-cormorant text-3xl font-light text-black mb-3">
                Viewing Scheduled
              </h3>
              <p className="text-xs text-black/45 max-w-sm mx-auto leading-relaxed">
                Thank you. A dedicated event coordinator will reach out shortly to finalize your private walkthrough details.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
