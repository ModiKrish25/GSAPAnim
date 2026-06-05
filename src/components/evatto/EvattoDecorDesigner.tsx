"use client";
import React, { useState } from "react";
import { Sparkles, Check } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const FLOWERS = [
  { id: "roses", label: "Pure White Roses", color: "#F7F4EF", accentColor: "#e6ded1", description: "Classic, editorial elegance" },
  { id: "peonies", label: "Burgundy Peonies", color: "#800828", accentColor: "#590217", description: "Deep, rich romantic drama" },
  { id: "orchids", label: "Royal Orchids", color: "#D1A7E2", accentColor: "#b17fca", description: "Luxurious, exotic modern luxury" },
];

const GREENERY = [
  { id: "eucalyptus", label: "Silver Dollar Eucalyptus", color: "#768E80", description: "Muted, organic sage tones" },
  { id: "gypsophila", label: "Gold Gypsophila", color: "#D4AF37", description: "Metallic accents and starry sparkles" },
];

const RUNNERS = [
  { id: "linen", label: "Ivory Fine Linen", color: "#F3EDE2", description: "Soft, earthy textured linen" },
  { id: "velvet", label: "Midnight Silk Velvet", color: "#161A24", description: "Opulent, light-absorbing plush velvet" },
  { id: "champagne", label: "Champagne Crushed Silk", color: "#E0D5C1", description: "Refined luster with subtle sheen" },
];

const CANDLES = [
  { id: "tapers", label: "Brass Taper Candlesticks", height: 120, radius: 4 },
  { id: "tea", label: "Floating Tea Glass Votives", height: 40, radius: 10 },
];

export default function EvattoDecorDesigner() {
  const [selectedFlower, setSelectedFlower] = useState(FLOWERS[0]);
  const [selectedGreenery, setSelectedGreenery] = useState(GREENERY[0]);
  const [selectedRunner, setSelectedRunner] = useState(RUNNERS[0]);
  const [selectedCandle, setSelectedCandle] = useState(CANDLES[0]);

  return (
    <section className="py-20 md:py-32 bg-[#FDFBF7] border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        
        {/* Title */}
        <div className="max-w-2xl mb-16">
          <p className="font-inter text-[11px] uppercase tracking-[0.3em] text-black/40 mb-4 font-semibold">
            Styling customization
          </p>
          <ScrollReveal
            as="h2"
            type="words"
            className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A1A] leading-tight mb-6"
          >
            Centerpiece & Table Designer
          </ScrollReveal>
          <p className="font-inter text-sm text-black/60 leading-relaxed">
            Customize the details of your reception tables. Choose runner fabrics, floral tones, greenery accents, and candle pairings to preview a live vector rendering of your dining layout.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1. Floral Tones */}
            <div className="space-y-2.5">
              <span className="font-inter text-[10px] text-black/40 uppercase tracking-widest font-bold block">
                1. Base Floral Palette
              </span>
              <div className="grid grid-cols-1 gap-2">
                {FLOWERS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedFlower(item)}
                    className="w-full text-left p-4 rounded-xl border flex items-center justify-between transition-all cursor-pointer bg-white"
                    style={{
                      borderColor: selectedFlower.id === item.id ? "#1A1A1A" : "rgba(0,0,0,0.06)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: item.color }} />
                      <div>
                        <h4 className="font-inter text-xs font-semibold text-[#1a1a1a]">{item.label}</h4>
                        <p className="font-inter text-[10px] text-black/45 mt-0.5">{item.description}</p>
                      </div>
                    </div>
                    {selectedFlower.id === item.id && <Check size={14} className="text-[#C5A880]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Greenery Accent */}
            <div className="space-y-2.5">
              <span className="font-inter text-[10px] text-black/40 uppercase tracking-widest font-bold block">
                2. Foliage & Accent Greenery
              </span>
              <div className="grid grid-cols-2 gap-2">
                {GREENERY.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedGreenery(item)}
                    className="p-3.5 rounded-xl border text-left bg-white transition-all cursor-pointer flex justify-between items-center"
                    style={{
                      borderColor: selectedGreenery.id === item.id ? "#1A1A1A" : "rgba(0,0,0,0.06)",
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="font-inter text-xs font-semibold text-[#1a1a1a]">{item.label.split(" ")[0]}</span>
                    </div>
                    {selectedGreenery.id === item.id && <Check size={12} className="text-[#C5A880]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Runner Fabric */}
            <div className="space-y-2.5">
              <span className="font-inter text-[10px] text-black/40 uppercase tracking-widest font-bold block">
                3. Table Runner Linen
              </span>
              <div className="grid grid-cols-1 gap-2">
                {RUNNERS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedRunner(item)}
                    className="w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer bg-white"
                    style={{
                      borderColor: selectedRunner.id === item.id ? "#1A1A1A" : "rgba(0,0,0,0.06)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: item.color }} />
                      <div>
                        <h4 className="font-inter text-xs font-semibold text-[#1a1a1a]">{item.label}</h4>
                      </div>
                    </div>
                    {selectedRunner.id === item.id && <Check size={14} className="text-[#C5A880]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Candle selection */}
            <div className="space-y-2.5">
              <span className="font-inter text-[10px] text-black/40 uppercase tracking-widest font-bold block">
                4. Candlelight styling
              </span>
              <div className="grid grid-cols-2 gap-2">
                {CANDLES.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedCandle(item)}
                    className="p-3.5 rounded-xl border text-left bg-white transition-all cursor-pointer flex justify-between items-center"
                    style={{
                      borderColor: selectedCandle.id === item.id ? "#1A1A1A" : "rgba(0,0,0,0.06)",
                    }}
                  >
                    <span className="font-inter text-xs font-semibold text-[#1a1a1a]">{item.label.split(" ")[0]} Style</span>
                    {selectedCandle.id === item.id && <Check size={12} className="text-[#C5A880]" />}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* SVG Preview Column */}
          <div className="lg:col-span-7 bg-[#F5F2EC] rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-8 lg:p-12 shadow-sm border border-black/[0.03] flex items-center justify-center">
            
            {/* The SVG Container */}
            <div className="relative w-full aspect-square max-w-[320px] md:max-w-[380px] lg:max-w-[420px] bg-white rounded-3xl p-4 md:p-6 shadow-md border border-black/[0.02] mx-auto">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                
                {/* 1. Dining Table Outline */}
                <ellipse cx="200" cy="200" rx="190" ry="190" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="3" />
                <ellipse cx="200" cy="200" rx="180" ry="180" fill="#FCFAF7" stroke="rgba(0,0,0,0.04)" strokeWidth="1" />

                {/* 2. Plates set around the circular table (6 guest placements) */}
                {[0, 60, 120, 180, 240, 300].map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  const cx = 200 + Math.cos(rad) * 140;
                  const cy = 200 + Math.sin(rad) * 140;
                  return (
                    <g key={angle}>
                      {/* Charger Plate */}
                      <circle cx={cx} cy={cy} r="26" fill="#FDFBF7" stroke="rgba(26,26,26,0.12)" strokeWidth="1.5" />
                      {/* Dinner Plate */}
                      <circle cx={cx} cy={cy} r="20" fill="#ffffff" stroke="rgba(26,26,26,0.05)" strokeWidth="1" />
                      {/* Inner gold rim */}
                      <circle cx={cx} cy={cy} r="18" fill="none" stroke="#dfba6b" strokeWidth="0.5" opacity="0.6" />
                      {/* Napkin overlay */}
                      <rect
                        x={cx - 5}
                        y={cy - 22}
                        width="10"
                        height="44"
                        rx="2"
                        fill={selectedRunner.color}
                        stroke="rgba(0,0,0,0.08)"
                        strokeWidth="0.5"
                      />
                    </g>
                  );
                })}

                {/* 3. Table Runner (Vertical span across the center of table) */}
                <path
                  d="M130,20 C130,20 120,200 130,380 L270,380 C270,380 280,200 270,20 M130,20"
                  fill={selectedRunner.color}
                  stroke="rgba(0,0,0,0.06)"
                  strokeWidth="1.5"
                  className="transition-all duration-500"
                />

                {/* 4. Foliage greenery layer (rendered beneath flowers) */}
                <g className="transition-all duration-500">
                  {/* Greenery arcs around centerpiece */}
                  <circle cx="200" cy="200" r="45" fill="none" stroke={selectedGreenery.color} strokeWidth="14" opacity="0.8" strokeDasharray="10 6" />
                  <circle cx="200" cy="200" r="55" fill="none" stroke={selectedGreenery.color} strokeWidth="6" opacity="0.6" strokeDasharray="6 8" />
                </g>

                {/* 5. Centerpiece Main Floral Dome Vase */}
                <circle cx="200" cy="200" r="42" fill="rgba(0,0,0,0.04)" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
                
                {/* Individual flowers inside dome */}
                <g className="transition-all duration-500">
                  {/* Core center flower */}
                  <circle cx="200" cy="200" r="14" fill={selectedFlower.color} stroke={selectedFlower.accentColor} strokeWidth="1.5" />
                  <circle cx="200" cy="200" r="9" fill="none" stroke={selectedFlower.accentColor} strokeWidth="1" />
                  
                  {/* Outer circle of flowers */}
                  {[0, 60, 120, 180, 240, 300].map((angle, idx) => {
                    const rad = (angle * Math.PI) / 180;
                    const fx = 200 + Math.cos(rad) * 24;
                    const fy = 200 + Math.sin(rad) * 24;
                    return (
                      <g key={idx}>
                        <circle cx={fx} cy={fy} r="11" fill={selectedFlower.color} stroke={selectedFlower.accentColor} strokeWidth="1.5" />
                        <circle cx={fx} cy={fy} r="6" fill="none" stroke={selectedFlower.accentColor} strokeWidth="1" />
                      </g>
                    );
                  })}
                </g>

                {/* 6. Candlelight (Tapers or Votives placed around the centerpiece) */}
                <g className="transition-all duration-500">
                  {[45, 135, 225, 315].map((angle, idx) => {
                    const rad = (angle * Math.PI) / 180;
                    const cx = 200 + Math.cos(rad) * 78;
                    const cy = 200 + Math.sin(rad) * 78;
                    
                    return (
                      <g key={idx}>
                        {selectedCandle.id === "tapers" ? (
                          <>
                            {/* Brass base */}
                            <circle cx={cx} cy={cy} r="6" fill="#D4AF37" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />
                            {/* Candle stem body */}
                            <circle cx={cx} cy={cy} r="3.5" fill="#FCFAF2" />
                            {/* Candle Flame Glow */}
                            <circle cx={cx} cy={cy} r="14" fill="rgba(253, 224, 71, 0.25)" className="animate-pulse" />
                            <circle cx={cx} cy={cy} r="2" fill="#FDE047" />
                          </>
                        ) : (
                          <>
                            {/* Glass Votive rim */}
                            <circle cx={cx} cy={cy} r="9" fill="rgba(255,255,255,0.75)" stroke="rgba(0,0,0,0.12)" strokeWidth="0.5" />
                            {/* Flame inside glass */}
                            <circle cx={cx} cy={cy} r="12" fill="rgba(253, 224, 71, 0.2)" className="animate-pulse" />
                            <circle cx={cx} cy={cy} r="3" fill="#FDE047" />
                          </>
                        )}
                      </g>
                    );
                  })}
                </g>

              </svg>

              {/* Gold Accents Badge overlay */}
              <div className="absolute top-4 right-4 bg-[#C5A880]/10 border border-[#C5A880]/30 rounded-full px-3 py-1 flex items-center gap-1">
                <Sparkles size={9} className="text-[#C5A880]" />
                <span className="font-inter text-[8px] uppercase tracking-wider text-[#C5A880] font-bold">1:1 Scale Render</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
