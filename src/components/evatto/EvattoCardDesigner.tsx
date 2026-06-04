"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Sparkles, Type, Paintbrush, Layers, Download, Printer } from "lucide-react";

// Themes definition
const THEMES = [
  {
    id: "golden-night",
    label: "Golden Night",
    cardBg: "linear-gradient(135deg, #111317 0%, #1c1f24 100%)",
    borderColor: "#C5A880",
    textColor: "#FDFBF7",
    subColor: "rgba(253,251,247,0.5)",
    glowColor: "rgba(197,168,128,0.25)",
  },
  {
    id: "emerald-garden",
    label: "Emerald Garden",
    cardBg: "linear-gradient(135deg, #091a12 0%, #153826 100%)",
    borderColor: "#C5A880",
    textColor: "#FDFBF7",
    subColor: "rgba(253,251,247,0.55)",
    glowColor: "rgba(82,183,136,0.25)",
  },
  {
    id: "midnight-royal",
    label: "Midnight Royal",
    cardBg: "linear-gradient(135deg, #0b0d19 0%, #161a35 100%)",
    borderColor: "#e2e8f0",
    textColor: "#FDFBF7",
    subColor: "rgba(253,251,247,0.5)",
    glowColor: "rgba(99,102,241,0.25)",
  },
  {
    id: "pure-ivory",
    label: "Pure Ivory",
    cardBg: "linear-gradient(135deg, #f7f5f0 0%, #ffffff 100%)",
    borderColor: "#1A1A1A",
    textColor: "#1A1A1A",
    subColor: "rgba(26,26,26,0.5)",
    glowColor: "rgba(0,0,0,0.05)",
  },
  {
    id: "rose-gold",
    label: "Rose Gold",
    cardBg: "linear-gradient(135deg, #f7ece8 0%, #ecd5cc 100%)",
    borderColor: "#b38b7e",
    textColor: "#4a332d",
    subColor: "rgba(74,51,45,0.6)",
    glowColor: "rgba(179,139,126,0.2)",
  },
  {
    id: "champagne",
    label: "Champagne",
    cardBg: "linear-gradient(135deg, #f3ede2 0%, #e5d9c2 100%)",
    borderColor: "#C5A880",
    textColor: "#2C271E",
    subColor: "rgba(44,39,30,0.55)",
    glowColor: "rgba(197,168,128,0.2)",
  },
  {
    id: "ruby-gala",
    label: "Ruby Gala",
    cardBg: "linear-gradient(135deg, #2b0811 0%, #4c1120 100%)",
    borderColor: "#d4af37",
    textColor: "#FDFBF7",
    subColor: "rgba(253,251,247,0.5)",
    glowColor: "rgba(172,28,65,0.25)",
  },
  {
    id: "sapphire-stars",
    label: "Sapphire Stars",
    cardBg: "linear-gradient(135deg, #05162e 0%, #0d2a54 100%)",
    borderColor: "#c0c0c0",
    textColor: "#FDFBF7",
    subColor: "rgba(253,251,247,0.55)",
    glowColor: "rgba(5,22,46,0.25)",
  },
] as const;

// Fonts definition
const FONTS = [
  { id: "serif", label: "Classic Editorial", fontFamily: "var(--font-cormorant)", fontStyle: "normal" },
  { id: "script", label: "Romantic Calligraphy", fontFamily: "var(--font-cormorant)", fontStyle: "italic" },
  { id: "sans", label: "Modern Minimalist", fontFamily: "var(--font-inter)", fontStyle: "normal" },
] as const;

// Borders definition
const BORDERS = [
  { id: "royal", label: "Royal Frame" },
  { id: "corners", label: "Geometric Corners" },
  { id: "floral", label: "Floral Vine" },
] as const;

export default function EvattoCardDesigner() {
  const [headline, setHeadline] = useState("Aditya & Kiara");
  const [subtext, setSubtext] = useState("Saturday, November 28, 2026");
  const [venue, setVenue] = useState("The Forever Pavilion, New York");
  const [selectedTheme, setSelectedTheme] = useState<typeof THEMES[number]["id"]>("golden-night");
  const [selectedFont, setSelectedFont] = useState<typeof FONTS[number]["id"]>("serif");
  const [selectedBorder, setSelectedBorder] = useState<typeof BORDERS[number]["id"]>("royal");

  const cardRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  const theme = THEMES.find(t => t.id === selectedTheme) || THEMES[0];
  const font = FONTS.find(f => f.id === selectedFont) || FONTS[0];

  // 3D perspective tilt effect on mouse movement
  useEffect(() => {
    const card = cardRef.current;
    const container = cardContainerRef.current;
    if (!card || !container) return;

    let cachedRect = container.getBoundingClientRect();
    let rafId: number | null = null;
    let pendingX = 0;
    let pendingY = 0;

    const applyTilt = () => {
      rafId = null;
      // Calculate normal offset relative to card center (-1 to 1)
      const x = ((pendingX - cachedRect.left) / cachedRect.width) * 2 - 1;
      const y = ((pendingY - cachedRect.top) / cachedRect.height) * 2 - 1;

      gsap.to(card, {
        rotateY: x * 15,
        rotateX: -y * 15,
        translateZ: 30,
        duration: 0.8,
        ease: "power2.out",
        transformPerspective: 1000,
        overwrite: "auto",
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      if (!rafId) rafId = requestAnimationFrame(applyTilt);
    };

    const onMouseEnter = () => {
      cachedRect = container.getBoundingClientRect();
    };

    const onMouseLeave = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        translateZ: 0,
        duration: 1.2,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    container.addEventListener("mousemove", onMouseMove, { passive: true });
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);

    const onResize = () => {
      cachedRect = container.getBoundingClientRect();
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const downloadCard = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 1680;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let gradient = ctx.createLinearGradient(0, 0, 1200, 1680);
    if (selectedTheme === "golden-night") {
      gradient.addColorStop(0, "#111317");
      gradient.addColorStop(1, "#1c1f24");
    } else if (selectedTheme === "emerald-garden") {
      gradient.addColorStop(0, "#091a12");
      gradient.addColorStop(1, "#153826");
    } else if (selectedTheme === "midnight-royal") {
      gradient.addColorStop(0, "#0b0d19");
      gradient.addColorStop(1, "#161a35");
    } else if (selectedTheme === "pure-ivory") {
      gradient.addColorStop(0, "#f7f5f0");
      gradient.addColorStop(1, "#ffffff");
    } else if (selectedTheme === "rose-gold") {
      gradient.addColorStop(0, "#f7ece8");
      gradient.addColorStop(1, "#ecd5cc");
    } else if (selectedTheme === "champagne") {
      gradient.addColorStop(0, "#f3ede2");
      gradient.addColorStop(1, "#e5d9c2");
    } else if (selectedTheme === "ruby-gala") {
      gradient.addColorStop(0, "#2b0811");
      gradient.addColorStop(1, "#4c1120");
    } else if (selectedTheme === "sapphire-stars") {
      gradient.addColorStop(0, "#05162e");
      gradient.addColorStop(1, "#0d2a54");
    } else {
      gradient.addColorStop(0, "#111317");
      gradient.addColorStop(1, "#1c1f24");
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 1680);

    const margin = 50;
    ctx.strokeStyle = theme.borderColor;
    ctx.lineWidth = 6;
    ctx.strokeRect(margin, margin, 1200 - 2 * margin, 1680 - 2 * margin);

    if (selectedBorder === "royal") {
      ctx.strokeStyle = theme.borderColor;
      ctx.lineWidth = 2;
      ctx.strokeRect(margin + 20, margin + 20, 1200 - 2 * (margin + 20), 1680 - 2 * (margin + 20));
    } else if (selectedBorder === "corners") {
      ctx.strokeStyle = theme.borderColor;
      ctx.lineWidth = 8;
      const len = 60;
      const cornerMargin = margin + 15;
      ctx.beginPath();
      ctx.moveTo(cornerMargin + len, cornerMargin);
      ctx.lineTo(cornerMargin, cornerMargin);
      ctx.lineTo(cornerMargin, cornerMargin + len);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(1200 - cornerMargin - len, cornerMargin);
      ctx.lineTo(1200 - cornerMargin, cornerMargin);
      ctx.lineTo(1200 - cornerMargin, cornerMargin + len);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cornerMargin + len, 1680 - cornerMargin);
      ctx.lineTo(cornerMargin, 1680 - cornerMargin);
      ctx.lineTo(cornerMargin, 1680 - cornerMargin - len);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(1200 - cornerMargin - len, 1680 - cornerMargin);
      ctx.lineTo(1200 - cornerMargin, 1680 - cornerMargin);
      ctx.lineTo(1200 - cornerMargin, 1680 - cornerMargin - len);
      ctx.stroke();
    } else if (selectedBorder === "floral") {
      ctx.fillStyle = theme.borderColor;
      ctx.globalAlpha = 0.25;
      ctx.beginPath();
      ctx.arc(margin + 30, margin + 30, 80, 0, Math.PI * 0.5);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(1200 - margin - 30, 1680 - margin - 30, 80, Math.PI, Math.PI * 1.5);
      ctx.fill();
      ctx.globalAlpha = 1.0;
    }

    ctx.textAlign = "center";
    ctx.fillStyle = theme.subColor;
    ctx.font = "bold 26px Arial, sans-serif";
    ctx.fillText("YOU ARE INVITED", 600, 300);

    ctx.strokeStyle = theme.borderColor;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.35;
    ctx.beginPath();
    ctx.moveTo(560, 340);
    ctx.lineTo(640, 340);
    ctx.stroke();
    ctx.globalAlpha = 1.0;

    ctx.fillStyle = theme.textColor;
    const isItalic = selectedFont === "script";
    ctx.font = `${isItalic ? "italic" : ""} 80px ${selectedFont === "sans" ? "Arial" : "Georgia"}`;
    ctx.fillText(headline || "Names", 600, 680);

    ctx.fillStyle = theme.subColor;
    ctx.font = "italic 32px Georgia, serif";
    ctx.fillText("Together with their families", 600, 800);

    ctx.fillStyle = theme.textColor;
    ctx.font = "bold 28px Arial, sans-serif";
    ctx.fillText((subtext || "Date").toUpperCase(), 600, 1150);

    ctx.fillStyle = theme.subColor;
    ctx.font = "26px Arial, sans-serif";
    ctx.fillText(venue || "Venue Location", 600, 1220);

    const link = document.createElement("a");
    link.download = `invitation_${headline.toLowerCase().replace(/[^a-z0-9]/g, "_")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const printCard = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Invitation - ${headline}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Inter:wght@400;600&display=swap');
            body {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background-color: #ffffff;
            }
            .card-print {
              width: 450px;
              height: 630px;
              background: ${theme.cardBg};
              border-radius: 20px;
              padding: 4px;
              box-shadow: 0 10px 20px rgba(0,0,0,0.1);
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              box-sizing: border-box;
            }
            .inner-border {
              width: 100%;
              height: 100%;
              border-radius: 16px;
              border: 1.5px solid ${theme.borderColor};
              padding: 40px 30px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
              box-sizing: border-box;
              position: relative;
            }
            .divider {
              width: 16px;
              height: 1px;
              background: ${theme.borderColor};
              opacity: 0.35;
              margin: 10px auto 0 auto;
            }
            .sub-title {
              font-family: 'Inter', sans-serif;
              font-size: 10px;
              letter-spacing: 0.45em;
              text-transform: uppercase;
              color: ${theme.subColor};
              font-weight: 600;
              text-align: center;
            }
            .headline {
              font-family: ${font.id === "sans" ? "'Inter', sans-serif" : "'Cormorant Garamond', serif"};
              font-style: ${font.fontStyle};
              font-size: 32px;
              font-weight: ${font.fontStyle === "italic" ? 300 : 400};
              color: ${theme.textColor};
              text-align: center;
              margin: 0;
            }
            .details {
              font-family: 'Inter', sans-serif;
              font-size: 10px;
              letter-spacing: 0.15em;
              color: ${theme.textColor};
              font-weight: 600;
              text-align: center;
              text-transform: uppercase;
              margin-bottom: 6px;
            }
            .venue {
              font-family: 'Inter', sans-serif;
              font-size: 10px;
              letter-spacing: 0.08em;
              color: ${theme.subColor};
              text-align: center;
            }
            .floral-accent {
              position: absolute;
              inset: 0;
              overflow: hidden;
              pointer-events: none;
              opacity: 0.15;
            }
            @media print {
              body {
                background: none;
              }
              .card-print {
                box-shadow: none;
                page-break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <div class="card-print">
            <div class="inner-border">
              ${selectedBorder === "royal" ? `<div style="position: absolute; inset: 6px; border: 1px solid ${theme.borderColor}; opacity: 0.4; border-radius: 12px;"></div>` : ""}
              ${selectedBorder === "corners" ? `
                <div style="position: absolute; top: 10px; left: 10px; width: 12px; height: 12px; border-top: 1.5px solid ${theme.borderColor}; border-left: 1.5px solid ${theme.borderColor}; opacity: 0.7;"></div>
                <div style="position: absolute; top: 10px; right: 10px; width: 12px; height: 12px; border-top: 1.5px solid ${theme.borderColor}; border-right: 1.5px solid ${theme.borderColor}; opacity: 0.7;"></div>
                <div style="position: absolute; bottom: 10px; left: 10px; width: 12px; height: 12px; border-bottom: 1.5px solid ${theme.borderColor}; border-left: 1.5px solid ${theme.borderColor}; opacity: 0.7;"></div>
                <div style="position: absolute; bottom: 10px; right: 10px; width: 12px; height: 12px; border-bottom: 1.5px solid ${theme.borderColor}; border-right: 1.5px solid ${theme.borderColor}; opacity: 0.7;"></div>
              ` : ""}
              ${selectedBorder === "floral" ? `
                <div class="floral-accent">
                  <svg viewBox="0 0 100 100" style="position: absolute; top: 8px; left: 8px; width: 50px; height: 50px; fill: ${theme.borderColor};">
                    <path d="M10,10 Q20,15 30,10 Q40,30 20,40 Q15,20 10,10 Z" />
                  </svg>
                  <svg viewBox="0 0 100 100" style="position: absolute; bottom: 8px; right: 8px; width: 50px; height: 50px; fill: ${theme.borderColor}; transform: rotate(180deg);">
                    <path d="M10,10 Q20,15 30,10 Q40,30 20,40 Q15,20 10,10 Z" />
                  </svg>
                </div>
              ` : ""}

              <div>
                <p class="sub-title">You are Invited</p>
                <div class="divider"></div>
              </div>

              <div>
                <h4 class="headline">${headline}</h4>
                <p style="font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 13px; color: ${theme.subColor}; text-align: center; margin: 12px 0 0 0;">Together with their families</p>
              </div>

              <div>
                <p class="details">${subtext}</p>
                <p class="venue">${venue}</p>
              </div>
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <section className="w-full py-24 md:py-32" style={{ background: "#F5F2EC" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles size={11} style={{ color: "#C5A880" }} />
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "9.5px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#C5A880", fontWeight: 600 }}>
              Interactive Mockup
            </span>
          </div>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem,5vw,3.4rem)", fontWeight: 300, color: "#1A1A1A", lineHeight: 1.1, marginBottom: "14px" }}>
            Design Your <span style={{ color: "#C5A880", fontStyle: "italic" }}>Invitation Card</span>
          </h2>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "rgba(26,26,26,0.6)", lineHeight: 1.75 }}>
            Personalise your event styling with our interactive mockup tool. Type in your names, customize typography, layouts, and colors, and see it render in real-time.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editor Form Panel */}
          <div className="lg:col-span-5 space-y-8 bg-white border border-black/[0.04] p-8 md:p-10 rounded-[2.5rem] shadow-sm">
            <h3 className="font-cormorant text-2xl font-light text-black pb-4 border-b border-black/[0.06]">
              Card Customizer
            </h3>

            {/* Inputs */}
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="font-inter text-[10px] text-black/50 uppercase tracking-widest font-bold">Names / Headline</label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="border-b border-black/10 py-2 bg-transparent focus:outline-none focus:border-black transition-colors text-sm font-inter"
                  placeholder="e.g. Aditya & Kiara"
                  maxLength={40}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-inter text-[10px] text-black/50 uppercase tracking-widest font-bold">Date & Time</label>
                <input
                  type="text"
                  value={subtext}
                  onChange={(e) => setSubtext(e.target.value)}
                  className="border-b border-black/10 py-2 bg-transparent focus:outline-none focus:border-black transition-colors text-sm font-inter"
                  placeholder="e.g. Saturday, November 28, 2026"
                  maxLength={45}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-inter text-[10px] text-black/50 uppercase tracking-widest font-bold">Venue Location</label>
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="border-b border-black/10 py-2 bg-transparent focus:outline-none focus:border-black transition-colors text-sm font-inter"
                  placeholder="e.g. The Forever Pavilion, New York"
                  maxLength={50}
                />
              </div>
            </div>

            {/* Selection Options */}
            <div className="space-y-6 pt-4">
              {/* Option 1: Palette */}
              <div className="space-y-2">
                <span className="font-inter text-[10px] text-black/50 uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <Paintbrush size={11} /> Palette Theme
                </span>
                <div className="flex flex-wrap gap-2">
                  {THEMES.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTheme(t.id)}
                      style={{
                        fontFamily: "var(--font-inter)", fontSize: "11px", fontWeight: 600,
                        padding: "6px 12px", borderRadius: 50, cursor: "pointer", transition: "all 0.25s",
                        background: selectedTheme === t.id ? "#1A1A1A" : "rgba(0,0,0,0.03)",
                        color: selectedTheme === t.id ? "#FDFBF7" : "rgba(0,0,0,0.5)",
                        border: selectedTheme === t.id ? "1px solid #1A1A1A" : "1px solid rgba(0,0,0,0.08)",
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 2: Font */}
              <div className="space-y-2">
                <span className="font-inter text-[10px] text-black/50 uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <Type size={11} /> Font Style
                </span>
                <div className="flex flex-wrap gap-2">
                  {FONTS.map(f => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFont(f.id)}
                      style={{
                        fontFamily: "var(--font-inter)", fontSize: "11px", fontWeight: 600,
                        padding: "6px 12px", borderRadius: 50, cursor: "pointer", transition: "all 0.25s",
                        background: selectedFont === f.id ? "#1A1A1A" : "rgba(0,0,0,0.03)",
                        color: selectedFont === f.id ? "#FDFBF7" : "rgba(0,0,0,0.5)",
                        border: selectedFont === f.id ? "1px solid #1A1A1A" : "1px solid rgba(0,0,0,0.08)",
                      }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 3: Borders */}
              <div className="space-y-2">
                <span className="font-inter text-[10px] text-black/50 uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <Layers size={11} /> Border Frame
                </span>
                <div className="flex flex-wrap gap-2">
                  {BORDERS.map(b => (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBorder(b.id)}
                      style={{
                        fontFamily: "var(--font-inter)", fontSize: "11px", fontWeight: 600,
                        padding: "6px 12px", borderRadius: 50, cursor: "pointer", transition: "all 0.25s",
                        background: selectedBorder === b.id ? "#1A1A1A" : "rgba(0,0,0,0.03)",
                        color: selectedBorder === b.id ? "#FDFBF7" : "rgba(0,0,0,0.5)",
                        border: selectedBorder === b.id ? "1px solid #1A1A1A" : "1px solid rgba(0,0,0,0.08)",
                      }}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5 mt-6">
              <button
                onClick={downloadCard}
                className="py-4 bg-black hover:bg-black/85 text-[#FDFBF7] font-semibold text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <Download size={13} /> Save PNG
              </button>

              <button
                onClick={printCard}
                className="py-4 bg-transparent border border-black/20 hover:bg-black/[0.02] text-black font-semibold text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-bold"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <Printer size={13} /> Print Card
              </button>
            </div>
          </div>

          {/* Right Column: 3D Interactive Card Preview */}
          <div className="lg:col-span-7 flex justify-center items-center py-8">
            <div
              ref={cardContainerRef}
              style={{
                width: "100%",
                maxWidth: "420px",
                aspectRatio: "1/1.4",
                perspective: 1000,
                cursor: "grab",
              }}
            >
              {/* The Invitation Card */}
              <div
                ref={cardRef}
                style={{
                  width: "100%",
                  height: "100%",
                  background: theme.cardBg,
                  borderRadius: "28px",
                  padding: "4px",
                  boxShadow: `0 30px 60px -15px ${theme.glowColor}, inset 0 1px 1px rgba(255,255,255,0.1)`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
              >
                {/* Translucent overlay panel */}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "24px",
                    border: `1.5px solid ${theme.borderColor}`,
                    padding: "36px 28px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  {/* Decorative Borders */}
                  {selectedBorder === "royal" && (
                    <div
                      style={{
                        position: "absolute",
                        inset: "6px",
                        border: `1px solid ${theme.borderColor}`,
                        opacity: 0.4,
                        pointerEvents: "none",
                        borderRadius: "18px",
                      }}
                    />
                  )}

                  {selectedBorder === "corners" && (
                    <>
                      {/* Corner SVG trim overlays */}
                      <div style={{ position: "absolute", top: 12, left: 12, width: 14, height: 14, borderTop: `2px solid ${theme.borderColor}`, borderLeft: `2px solid ${theme.borderColor}`, opacity: 0.7 }} />
                      <div style={{ position: "absolute", top: 12, right: 12, width: 14, height: 14, borderTop: `2px solid ${theme.borderColor}`, borderRight: `2px solid ${theme.borderColor}`, opacity: 0.7 }} />
                      <div style={{ position: "absolute", bottom: 12, left: 12, width: 14, height: 14, borderBottom: `2px solid ${theme.borderColor}`, borderLeft: `2px solid ${theme.borderColor}`, opacity: 0.7 }} />
                      <div style={{ position: "absolute", bottom: 12, right: 12, width: 14, height: 14, borderBottom: `2px solid ${theme.borderColor}`, borderRight: `2px solid ${theme.borderColor}`, opacity: 0.7 }} />
                    </>
                  )}

                  {selectedBorder === "floral" && (
                    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", opacity: 0.15 }}>
                      {/* Floral vine background silhouette SVG elements */}
                      <svg viewBox="0 0 100 100" style={{ position: "absolute", top: 10, left: 10, width: 60, height: 60, fill: theme.borderColor }}>
                        <path d="M10,10 Q20,15 30,10 Q40,30 20,40 Q15,20 10,10 Z" />
                      </svg>
                      <svg viewBox="0 0 100 100" style={{ position: "absolute", bottom: 10, right: 10, width: 60, height: 60, fill: theme.borderColor, transform: "rotate(180deg)" }}>
                        <path d="M10,10 Q20,15 30,10 Q40,30 20,40 Q15,20 10,10 Z" />
                      </svg>
                    </div>
                  )}

                  {/* Card Content Elements */}
                  <div style={{ transform: "translateZ(20px)", textAlign: "center" }}>
                    <p
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "9px",
                        letterSpacing: "0.45em",
                        textTransform: "uppercase",
                        color: theme.subColor,
                        fontWeight: 600,
                        marginBottom: "14px",
                      }}
                    >
                      You are Invited
                    </p>
                    <div
                      style={{
                        width: "16px",
                        height: "1px",
                        background: theme.borderColor,
                        opacity: 0.35,
                        margin: "0 auto",
                      }}
                    />
                  </div>

                  <div style={{ transform: "translateZ(35px)", textAlign: "center", width: "100%" }}>
                    <h4
                      style={{
                        fontFamily: font.fontFamily,
                        fontStyle: font.fontStyle,
                        fontSize: "clamp(1.8rem, 3.8vw, 2.6rem)",
                        fontWeight: font.fontStyle === "italic" ? 300 : 350,
                        color: theme.textColor,
                        lineHeight: 1.15,
                        letterSpacing: font.id === "sans" ? "0.02em" : "-0.01em",
                      }}
                    >
                      {headline || "Names"}
                    </h4>
                    <p
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        fontStyle: "italic",
                        fontSize: "14px",
                        color: theme.subColor,
                        marginTop: "16px",
                      }}
                    >
                      Together with their families
                    </p>
                  </div>

                  <div style={{ transform: "translateZ(25px)", textAlign: "center" }}>
                    <p
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "10px",
                        letterSpacing: "0.15em",
                        color: theme.textColor,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        marginBottom: "6px",
                      }}
                    >
                      {subtext || "Date"}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "10px",
                        letterSpacing: "0.08em",
                        color: theme.subColor,
                      }}
                    >
                      {venue || "Venue Location"}
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
