"use client";
import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Music, Sparkles } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const LIGHTS = [
  {
    id: "warm-amber",
    label: "Warm Amber",
    color: "#e8a864",
    bgGradient: "radial-gradient(circle at 50% 30%, rgba(232, 168, 100, 0.4) 0%, rgba(26, 26, 26, 0) 70%)",
    lampColor: "rgba(232,168,100,0.85)",
  },
  {
    id: "romantic-blush",
    label: "Romantic Blush",
    color: "#f6b4be",
    bgGradient: "radial-gradient(circle at 50% 30%, rgba(246, 180, 190, 0.45) 0%, rgba(26, 26, 26, 0) 70%)",
    lampColor: "rgba(246,180,190,0.9)",
  },
  {
    id: "cool-sapphire",
    label: "Cool Sapphire",
    color: "#6b92f2",
    bgGradient: "radial-gradient(circle at 50% 30%, rgba(107, 146, 242, 0.35) 0%, rgba(26, 26, 26, 0) 70%)",
    lampColor: "rgba(107,146,242,0.85)",
  },
  {
    id: "emerald-garden",
    label: "Emerald Garden",
    color: "#52b788",
    bgGradient: "radial-gradient(circle at 50% 30%, rgba(82, 183, 136, 0.35) 0%, rgba(26, 26, 26, 0) 70%)",
    lampColor: "rgba(82,183,136,0.85)",
  },
];

const TRACKS = [
  { id: "quartet", label: "String Quartet (Classical)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: "jazz", label: "Smooth Jazz Lounge", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: "gala", label: "Grand Gala Ballroom", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
];

export default function EvattoAmbientMixer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(TRACKS[0]);
  const [selectedLight, setSelectedLight] = useState(LIGHTS[0]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync state transitions when selected track changes
  useEffect(() => {
    if (audioRef.current) {
      const playingBefore = isPlaying;
      audioRef.current.pause();
      audioRef.current.src = selectedTrack.url;
      audioRef.current.load();
      if (playingBefore) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [selectedTrack]);

  const handleTogglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // fallback if browser prevents autoplay block
          setIsPlaying(false);
        });
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <section className="py-20 md:py-32 bg-[#FDFBF7] border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        
        {/* Title */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="font-inter text-[11px] uppercase tracking-[0.3em] text-black/40 mb-4 font-semibold">
            Atmosphere preview
          </p>
          <ScrollReveal
            as="h2"
            type="words"
            className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A1A] leading-tight mb-6"
          >
            Ballroom Ambient Mixer
          </ScrollReveal>
          <p className="font-inter text-sm text-black/60 leading-relaxed">
            Unwind and experience your venue. Mix and toggle between high-end lighting filters and elegant musical performances to preview the sensory layout of your event.
          </p>
        </div>

        {/* The Mixer Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Controls Panel */}
          <div className="lg:col-span-5 bg-white border border-black/[0.04] p-8 md:p-10 rounded-[2.5rem] shadow-sm space-y-8">
            <h3 className="font-cormorant text-2xl font-light text-[#1a1a1a] pb-4 border-b border-black/[0.06] flex items-center gap-2">
              <Sparkles size={18} className="text-[#C5A880]" /> Theme Mixer
            </h3>

            {/* Hidden Audio Element */}
            <audio ref={audioRef} loop src={selectedTrack.url} />

            {/* Section 1: Music Playback */}
            <div className="space-y-4">
              <span className="font-inter text-[10px] text-black/40 uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Music size={11} /> 1. Soundscape Track
              </span>
              
              <div className="flex flex-col gap-2">
                {TRACKS.map((track) => (
                  <button
                    key={track.id}
                    onClick={() => setSelectedTrack(track)}
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "12px",
                      fontWeight: 600,
                      padding: "12px 18px",
                      borderRadius: "14px",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all 0.25s",
                      background: selectedTrack.id === track.id ? "#1A1A1A" : "rgba(0,0,0,0.02)",
                      color: selectedTrack.id === track.id ? "#FDFBF7" : "rgba(0,0,0,0.6)",
                      border: selectedTrack.id === track.id ? "1px solid #1A1A1A" : "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    {track.label}
                  </button>
                ))}
              </div>

              {/* Master Play Button */}
              <button
                onClick={handleTogglePlay}
                className="w-full mt-2 py-4 rounded-xl bg-[#C5A880] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md active:scale-98 cursor-pointer"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                {isPlaying ? "Pause Ambient Audio" : "Play Ambient Audio"}
              </button>
            </div>

            {/* Section 2: Lighting select */}
            <div className="space-y-3">
              <span className="font-inter text-[10px] text-black/40 uppercase tracking-widest font-bold flex items-center gap-1.5">
                💡 2. Ballroom Spotlights
              </span>
              <div className="grid grid-cols-2 gap-2">
                {LIGHTS.map((light) => (
                  <button
                    key={light.id}
                    onClick={() => setSelectedLight(light)}
                    className="py-3 px-4 rounded-xl border flex items-center gap-2 text-xs font-inter font-semibold transition-all cursor-pointer select-none"
                    style={{
                      background: selectedLight.id === light.id ? "#1a1a1a" : "transparent",
                      color: selectedLight.id === light.id ? "#ffffff" : "rgba(0,0,0,0.6)",
                      borderColor: selectedLight.id === light.id ? "#1a1a1a" : "rgba(0,0,0,0.1)",
                    }}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: light.color }} />
                    {light.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Simulator Screen */}
          <div className="lg:col-span-7">
            <div
              className="relative w-full aspect-[16/10] rounded-[2.5rem] bg-[#121316] overflow-hidden flex flex-col justify-end p-8 border border-white/5 shadow-2xl transition-all duration-1000"
            >
              {/* Dynamic Lamp Spot Light Glow */}
              <div
                className="absolute inset-0 transition-all duration-1000 ease-out pointer-events-none"
                style={{ background: selectedLight.bgGradient }}
              />

              {/* Minimal Line Art Ballroom Render */}
              <div className="absolute inset-0 flex items-center justify-center p-12 opacity-35 mix-blend-screen pointer-events-none">
                <svg viewBox="0 0 800 500" className="w-full h-full stroke-white fill-none stroke-[0.75] opacity-50">
                  {/* Spotlight fixture top center */}
                  <path d="M350,0 L370,30 L430,30 L450,0 Z" style={{ fill: "#1A1A1A" }} />
                  <ellipse cx="400" cy="30" rx="30" ry="10" />
                  
                  {/* Ceiling arches */}
                  <path d="M 0,100 Q 400,0 800,100" />
                  <path d="M 0,150 Q 400,50 800,150" />
                  
                  {/* Hanging Chandelier */}
                  <line x1="400" y1="30" x2="400" y2="130" className="stroke-[1.5]" />
                  <circle cx="400" cy="130" r="10" />
                  <path d="M360,150 L440,150 M340,170 L460,170 M380,130 Q400,190 420,130" />
                  
                  {/* Banquet Table in foreground */}
                  <ellipse cx="400" cy="420" rx="200" ry="50" />
                  <path d="M200,420 L200,500 M600,420 L600,500" />
                  
                  {/* Table details (candlesticks / flowers) */}
                  <line x1="400" y1="400" x2="400" y2="350" />
                  <line x1="320" y1="410" x2="320" y2="370" />
                  <line x1="480" y1="410" x2="480" y2="370" />
                </svg>
              </div>

              {/* Spotlight beam glow lamps */}
              <div
                className="absolute top-[30px] left-[370px] w-[60px] h-[30px] rounded-full blur-[2px] transition-all duration-1000"
                style={{ backgroundColor: selectedLight.lampColor, boxShadow: `0 0 40px 10px ${selectedLight.color}` }}
              />

              {/* Status Info */}
              <div className="relative z-10 flex flex-col gap-1 items-start text-white select-none">
                <span className="font-inter text-[9px] uppercase tracking-[0.25em] text-white/50 font-bold">
                  Ambient Preview Room
                </span>
                
                <h4 className="font-cormorant text-2xl font-light text-white flex items-center gap-2">
                  {selectedTrack.label}
                </h4>

                {/* Equalizer lines running on active play */}
                <div className="flex items-end gap-1.5 h-6 mt-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((bar) => {
                    const animationDur = 0.5 + Math.random() * 0.8;
                    return (
                      <div
                        key={bar}
                        className="w-1 rounded-full transition-all duration-300"
                        style={{
                          height: isPlaying ? "100%" : "3px",
                          backgroundColor: selectedLight.color,
                          animation: isPlaying ? `equalizer-pulse ${animationDur}s ease-in-out infinite alternate` : "none",
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              <style>{`
                @keyframes equalizer-pulse {
                  0% { height: 4px; }
                  100% { height: 24px; }
                }
              `}</style>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
