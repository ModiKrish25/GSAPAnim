"use client";

import React from "react";
import Link from "next/link";

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
  </svg>
);

export default function EvattoFooter() {
  return (
    <footer id="footer" className="bg-[#0b0c0e] text-[#FDFBF7] border-t border-[#FDFBF7]/8 w-full select-none overflow-hidden">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 border-b border-[#FDFBF7]/8 w-full">
        {/* Left Column: Brand Identity Logo */}
        <div className="md:col-span-5 flex flex-col justify-center p-10 md:p-16 lg:p-20 border-b md:border-b-0 md:border-r border-[#FDFBF7]/8">
          <div className="flex items-center gap-2 mb-6">
            <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden rounded-md bg-white/10">
              <img src="/logo.png" alt="Keshav Logo" className="w-full h-full object-contain" />
            </div>
            <span className="logo text-lg md:text-xl font-semibold text-[#FDFBF7]" style={{ color: "#FDFBF7" }}>
              Keshav Events & Decor
            </span>
          </div>
          <p className="font-inter text-sm text-[#FDFBF7]/45 max-w-sm leading-relaxed">
            A luxury event management company dedicated to crafting unforgettable celebrations with precision and elegance.
          </p>
        </div>

        {/* Right Column: Detailed Event Stage SVG Sketch */}
        <div className="md:col-span-7 flex items-center justify-center p-8 md:p-12 lg:p-16 bg-[#090a0c]/40 relative overflow-hidden min-h-[300px]">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#FDFBF7 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          
          <div className="w-full max-w-[650px] aspect-[16/9] relative z-10 flex items-center justify-center">
            <svg viewBox="0 0 800 450" className="w-full h-full text-[#FDFBF7]/80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              {/* Outer Ornate Frame / Archway */}
              <path d="M 80 400 L 80 180 C 80 80, 200 40, 400 40 C 600 40, 720 80, 720 180 L 720 400" strokeWidth="3" opacity="0.95" />
              <path d="M 100 400 L 100 190 C 100 100, 210 60, 400 60 C 590 60, 700 100, 700 190 L 700 400" strokeWidth="1.8" strokeDasharray="6,5" opacity="0.7" />

              {/* Background Ornate Jali (Lattice) Panel */}
              <rect x="250" y="120" width="300" height="280" rx="15" strokeWidth="2" opacity="0.6" />
              <path d="M 250 160 L 550 160 M 250 200 L 550 200 M 250 240 L 550 240 M 250 280 L 550 280 M 250 320 L 550 320 M 250 360 L 550 360" strokeWidth="1.2" opacity="0.5" />
              <path d="M 300 120 L 300 400 M 350 120 L 350 400 M 400 120 L 400 400 M 450 120 L 450 400 M 500 120 L 500 400" strokeWidth="1.2" opacity="0.5" />
              <path d="M 250 120 L 530 400 M 300 120 L 550 370 M 350 120 L 550 320 M 400 120 L 550 270 M 450 120 L 550 220 M 500 120 L 550 170" strokeWidth="0.9" opacity="0.4" />
              <path d="M 550 120 L 270 400 M 500 120 L 250 370 M 450 120 L 250 320 M 400 120 L 250 270 M 350 120 L 250 220 M 300 120 L 250 170" strokeWidth="0.9" opacity="0.4" />

              {/* Left and Right Grand Floral Pillars */}
              <rect x="180" y="160" width="30" height="240" rx="3" strokeWidth="2.5" opacity="0.9" />
              <path d="M 180 180 Q 160 140 175 120 Q 190 100 185 80" strokeWidth="2" opacity="0.95" />
              <path d="M 195 240 Q 215 200 200 170 Q 210 130 195 100" strokeWidth="2" opacity="0.95" />
              <path d="M 175 120 C 170 115, 175 110, 180 115 Z" fill="currentColor" opacity="0.8" />
              <path d="M 200 170 C 205 165, 200 160, 195 165 Z" fill="currentColor" opacity="0.8" />
              <path d="M 185 80 C 190 75, 185 70, 180 75 Z" fill="currentColor" opacity="0.8" />

              <rect x="590" y="160" width="30" height="240" rx="3" strokeWidth="2.5" opacity="0.9" />
              <path d="M 620 180 Q 640 140 625 120 Q 610 100 615 80" strokeWidth="2" opacity="0.95" />
              <path d="M 605 240 Q 585 200 600 170 Q 590 130 605 100" strokeWidth="2" opacity="0.95" />
              <path d="M 625 120 C 630 115, 625 110, 620 115 Z" fill="currentColor" opacity="0.8" />
              <path d="M 600 170 C 595 165, 600 160, 605 165 Z" fill="currentColor" opacity="0.8" />
              <path d="M 615 80 C 610 75, 615 70, 620 75 Z" fill="currentColor" opacity="0.8" />

              {/* Hanging Wisteria Florals */}
              <path d="M 300 60 C 295 90, 305 110, 300 130" strokeWidth="2" opacity="0.9" />
              <circle cx="300" cy="80" r="3" fill="currentColor" opacity="0.9" />
              <circle cx="298" cy="95" r="4" fill="currentColor" opacity="0.9" />
              <circle cx="302" cy="110" r="5" fill="currentColor" opacity="0.9" />
              <circle cx="300" cy="125" r="3.5" fill="currentColor" opacity="0.9" />

              <path d="M 500 60 C 505 90, 495 110, 500 130" strokeWidth="2" opacity="0.9" />
              <circle cx="500" cy="80" r="3" fill="currentColor" opacity="0.9" />
              <circle cx="502" cy="95" r="4" fill="currentColor" opacity="0.9" />
              <circle cx="498" cy="110" r="5" fill="currentColor" opacity="0.9" />
              <circle cx="500" cy="125" r="3.5" fill="currentColor" opacity="0.9" />

              {/* Luxurious Crystal Chandeliers */}
              <line x1="400" y1="40" x2="400" y2="100" strokeWidth="2.5" opacity="1" />
              <path d="M 360 100 Q 400 70 440 100" strokeWidth="2.5" opacity="1" />
              <path d="M 350 115 C 350 140, 450 140, 450 115 Z" strokeWidth="2.5" opacity="1" />
              <path d="M 370 115 C 370 150, 430 150, 430 115 Z" strokeWidth="2" opacity="0.9" />
              <path d="M 385 115 C 385 155, 415 155, 415 115 Z" strokeWidth="1.5" opacity="0.85" />
              <line x1="350" y1="115" x2="350" y2="130" strokeWidth="1.5" opacity="0.9" />
              <circle cx="350" cy="133" r="3" fill="currentColor" opacity="1" />
              <line x1="450" y1="115" x2="450" y2="130" strokeWidth="1.5" opacity="0.9" />
              <circle cx="450" cy="133" r="3" fill="currentColor" opacity="1" />
              <line x1="400" y1="150" x2="400" y2="170" strokeWidth="1.5" opacity="0.9" />
              <polygon points="400,170 396,178 400,183 404,178" fill="currentColor" opacity="1" />

              <line x1="260" y1="80" x2="260" y2="140" strokeWidth="2" opacity="0.9" />
              <path d="M 235 140 C 235 160, 285 160, 285 140 Z" strokeWidth="2" opacity="0.9" />
              <line x1="260" y1="155" x2="260" y2="170" strokeWidth="1.5" opacity="0.9" />
              <circle cx="260" cy="173" r="3" fill="currentColor" opacity="1" />

              <line x1="540" y1="80" x2="540" y2="140" strokeWidth="2" opacity="0.9" />
              <path d="M 515 140 C 515 160, 565 160, 565 140 Z" strokeWidth="2" opacity="0.9" />
              <line x1="540" y1="155" x2="540" y2="170" strokeWidth="1.5" opacity="0.9" />
              <circle cx="540" cy="173" r="3" fill="currentColor" opacity="1" />

              {/* The Wedding Canopy Stage Sofa (Throne) */}
              <path d="M 330 400 L 330 350 C 330 320, 470 320, 470 350 L 470 400" strokeWidth="2.5" fill="#0b0c0e" opacity="1" />
              <path d="M 310 370 C 310 330, 340 330, 340 370 L 340 400" strokeWidth="2.2" fill="#0b0c0e" opacity="1" />
              <path d="M 490 370 C 490 330, 460 330, 460 370 L 460 400" strokeWidth="2.2" fill="#0b0c0e" opacity="1" />
              <rect x="330" y="365" width="140" height="25" rx="5" strokeWidth="2" fill="#0b0c0e" opacity="1" />
              <ellipse cx="335" cy="365" rx="10" ry="6" strokeWidth="1.8" fill="currentColor" opacity="0.5" />
              <ellipse cx="465" cy="365" rx="10" ry="6" strokeWidth="1.8" fill="currentColor" opacity="0.5" />

              {/* Floral Pedestals and Vases */}
              <rect x="230" y="340" width="16" height="60" rx="2" strokeWidth="2" fill="#0b0c0e" opacity="1" />
              <path d="M 220 340 C 220 310, 256 310, 256 340 Z" strokeWidth="2" opacity="0.9" />
              <path d="M 238 315 Q 220 280 230 260" strokeWidth="1.6" opacity="0.9" />
              <circle cx="230" cy="260" r="5" fill="currentColor" opacity="1" />
              <path d="M 238 315 Q 256 290 248 270" strokeWidth="1.6" opacity="0.9" />
              <circle cx="248" cy="270" r="4" fill="currentColor" opacity="1" />

              <rect x="554" y="340" width="16" height="60" rx="2" strokeWidth="2" fill="#0b0c0e" opacity="1" />
              <path d="M 544 340 C 544 310, 580 310, 580 340 Z" strokeWidth="2" opacity="0.9" />
              <path d="M 562 315 Q 544 290 552 270" strokeWidth="1.6" opacity="0.9" />
              <circle cx="552" cy="270" r="4" fill="currentColor" opacity="1" />
              <path d="M 562 315 Q 580 280 570 260" strokeWidth="1.6" opacity="0.9" />
              <circle cx="570" cy="260" r="5" fill="currentColor" opacity="1" />

              {/* Ambient Light Stars */}
              <path d="M 150 100 L 153 108 L 161 111 L 153 114 L 150 122 L 147 114 L 139 111 L 147 108 Z" fill="currentColor" opacity="0.85" />
              <path d="M 650 100 L 653 108 L 661 111 L 653 114 L 650 122 L 647 114 L 639 111 L 647 108 Z" fill="currentColor" opacity="0.85" />
              <path d="M 400 280 L 402 285 L 407 287 L 402 289 L 400 294 L 398 289 L 393 287 L 398 285 Z" fill="currentColor" opacity="0.9" />
              <path d="M 330 200 L 332 205 L 337 207 L 332 209 L 330 214 L 328 209 L 323 207 L 328 205 Z" fill="currentColor" opacity="0.9" />
              <path d="M 470 200 L 472 205 L 477 207 L 472 209 L 470 214 L 468 209 L 463 207 L 468 205 Z" fill="currentColor" opacity="0.9" />

              {/* Stage Floor Decking */}
              <line x1="60" y1="400" x2="740" y2="400" strokeWidth="3.5" opacity="1" />
              <rect x="50" y="400" width="700" height="18" rx="3" strokeWidth="2.5" fill="#0b0c0e" opacity="1" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 w-full border-b border-[#FDFBF7]/8">
        {/* Box 1: Address */}
        <div className="flex flex-col items-center justify-center p-8 md:p-12 border-b md:border-b-0 md:border-r border-[#FDFBF7]/8 text-center">
          <span className="font-inter text-[9px] font-bold uppercase tracking-[0.3em] text-[#FDFBF7]/35 mb-5">
            Address
          </span>
          <p className="font-inter text-sm md:text-base font-bold text-[#FDFBF7] uppercase tracking-wider leading-relaxed">
            123 Grand Pavilion<br />New York, NY 10001
          </p>
        </div>

        {/* Box 2: Social Media */}
        <div className="flex flex-col items-center justify-center p-8 md:p-12 border-b md:border-b-0 md:border-r border-[#FDFBF7]/8 text-center">
          <span className="font-inter text-[9px] font-bold uppercase tracking-[0.3em] text-[#FDFBF7]/35 mb-5">
            Social Media
          </span>
          <div className="flex gap-4">
            <Link href="#" className="w-10 h-10 rounded-full bg-[#FDFBF7] text-[#0b0c0e] flex items-center justify-center hover:bg-[#C5A880] hover:text-[#FDFBF7] transition-all duration-300 shadow-md">
              <InstagramIcon />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-[#FDFBF7] text-[#0b0c0e] flex items-center justify-center hover:bg-[#C5A880] hover:text-[#FDFBF7] transition-all duration-300 shadow-md">
              <FacebookIcon />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-[#FDFBF7] text-[#0b0c0e] flex items-center justify-center hover:bg-[#C5A880] hover:text-[#FDFBF7] transition-all duration-300 shadow-md">
              <TwitterIcon />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-[#FDFBF7] text-[#0b0c0e] flex items-center justify-center hover:bg-[#C5A880] hover:text-[#FDFBF7] transition-all duration-300 shadow-md">
              <YoutubeIcon />
            </Link>
          </div>
        </div>

        {/* Box 3: Contact Info */}
        <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center">
          <span className="font-inter text-[9px] font-bold uppercase tracking-[0.3em] text-[#FDFBF7]/35 mb-5">
            Booking Info
          </span>
          <p className="font-inter text-sm md:text-base font-bold text-[#FDFBF7] uppercase tracking-wider leading-relaxed">
            <a href="mailto:info@keshavevents.com" className="hover:text-[#C5A880] transition-colors">
              info@keshavevents.com
            </a>
            <br />
            <a href="tel:+011234567890" className="hover:text-[#C5A880] transition-colors">
              +01 123 456 7890
            </a>
          </p>
        </div>
      </div>

      {/* Copyright Footer bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-14 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-inter text-[10px] text-[#FDFBF7]/25 tracking-wider">
          © 2026 KESHAV EVENTS & DECOR. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-6">
          <Link href="#" className="font-inter text-[10px] text-[#FDFBF7]/25 hover:text-[#C5A880] tracking-wider uppercase transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="font-inter text-[10px] text-[#FDFBF7]/25 hover:text-[#C5A880] tracking-wider uppercase transition-colors">
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
}
