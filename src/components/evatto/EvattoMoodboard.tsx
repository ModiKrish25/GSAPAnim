"use client";
import React, { useState, useRef, useEffect } from "react";
import { Move, RefreshCw, Quote } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface CollageItem {
  id: string;
  type: "photo" | "swatch" | "quote";
  title?: string;
  image?: string;
  color?: string; // for swatch
  content?: string; // for quote
  initialX: number; // percentage from left
  initialY: number; // percentage from top
  initialRot: number; // degrees
  width: number; // width in px
}

const COLLAGE_ITEMS: CollageItem[] = [
  {
    id: "item-1",
    type: "photo",
    title: "Editorial Flora",
    image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=400",
    initialX: 10,
    initialY: 15,
    initialRot: -6,
    width: 200,
  },
  {
    id: "item-2",
    type: "photo",
    title: "Atmospheric Candlelight",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80&w=400",
    initialX: 45,
    initialY: 8,
    initialRot: 5,
    width: 220,
  },
  {
    id: "item-3",
    type: "photo",
    title: "Grand Hanging Wisteria",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400",
    initialX: 68,
    initialY: 42,
    initialRot: -8,
    width: 190,
  },
  {
    id: "item-4",
    type: "swatch",
    title: "Champagne Velvet",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400",
    initialX: 18,
    initialY: 55,
    initialRot: 12,
    width: 130,
  },
  {
    id: "item-5",
    type: "swatch",
    title: "Carrara Marble",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=400",
    initialX: 42,
    initialY: 60,
    initialRot: -4,
    width: 140,
  },
  {
    id: "item-6",
    type: "quote",
    content: "Luxury is not about standing out, it's about being remembered.",
    initialX: 72,
    initialY: 10,
    initialRot: 3,
    width: 210,
  },
];

export default function EvattoMoodboard() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [itemsState, setItemsState] = useState(
    COLLAGE_ITEMS.map((item) => ({
      ...item,
      x: 0, // dynamic pixel offset X
      y: 0, // dynamic pixel offset Y
      rotation: item.initialRot,
    }))
  );
  
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [zIndexOrder, setZIndexOrder] = useState<string[]>(COLLAGE_ITEMS.map((i) => i.id));
  const dragStartRef = useRef({ x: 0, y: 0 });
  const itemStartPosRef = useRef({ x: 0, y: 0 });

  const bringToFront = (id: string) => {
    setZIndexOrder((prev) => {
      const filtered = prev.filter((x) => x !== id);
      return [...filtered, id];
    });
  };

  const handleStart = (id: string, clientX: number, clientY: number) => {
    setDraggedId(id);
    bringToFront(id);
    
    const targetItem = itemsState.find((item) => item.id === id);
    if (!targetItem) return;

    dragStartRef.current = { x: clientX, y: clientY };
    itemStartPosRef.current = { x: targetItem.x, y: targetItem.y };
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!draggedId) return;

    const deltaX = clientX - dragStartRef.current.x;
    const deltaY = clientY - dragStartRef.current.y;

    setItemsState((prev) =>
      prev.map((item) => {
        if (item.id === draggedId) {
          return {
            ...item,
            x: itemStartPosRef.current.x + deltaX,
            y: itemStartPosRef.current.y + deltaY,
          };
        }
        return item;
      })
    );
  };

  useEffect(() => {
    const onGlobalMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const onGlobalTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onGlobalEnd = () => {
      setDraggedId(null);
    };

    if (draggedId) {
      window.addEventListener("mousemove", onGlobalMove);
      window.addEventListener("mouseup", onGlobalEnd);
      window.addEventListener("touchmove", onGlobalTouchMove);
      window.addEventListener("touchend", onGlobalEnd);
    }

    return () => {
      window.removeEventListener("mousemove", onGlobalMove);
      window.removeEventListener("mouseup", onGlobalEnd);
      window.removeEventListener("touchmove", onGlobalTouchMove);
      window.removeEventListener("touchend", onGlobalEnd);
    };
  }, [draggedId]);

  const handleReset = () => {
    setItemsState(
      COLLAGE_ITEMS.map((item) => ({
        ...item,
        x: 0,
        y: 0,
        rotation: item.initialRot,
      }))
    );
    setZIndexOrder(COLLAGE_ITEMS.map((i) => i.id));
  };

  return (
    <section className="py-20 md:py-32 bg-[#FDFBF7] border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        
        {/* Header with layout reset */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <p className="font-inter text-[11px] uppercase tracking-[0.3em] text-black/40 mb-4 font-semibold">
              Creative Sandbox
            </p>
            <ScrollReveal
              as="h2"
              type="words"
              className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A1A] leading-tight"
            >
              Bespoke Styling Moodboard
            </ScrollReveal>
          </div>
          
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-5 py-3 rounded-full border border-black/10 hover:border-black/25 text-xs font-inter font-semibold text-black bg-white hover:bg-black/[0.02] transition-all cursor-pointer shadow-sm group self-start active:scale-95"
          >
            <RefreshCw size={13} className="transition-transform duration-500 group-hover:rotate-180 text-black/60" />
            Reset Moodboard
          </button>
        </div>

        {/* Sandbox Canvas */}
        <div
          ref={canvasRef}
          className="relative w-full h-[650px] bg-[#F4F1EA] rounded-[32px] md:rounded-[40px] overflow-hidden shadow-inner border border-black/[0.05]"
          style={{
            backgroundImage: "radial-gradient(rgba(26,26,26,0.06) 1.2px, transparent 1.2px)",
            backgroundSize: "24px 24px"
          }}
        >
          {/* Subtle instructional tag */}
          <div className="absolute top-6 left-6 z-10 bg-white/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-black/[0.04] flex items-center gap-1.5 pointer-events-none">
            <Move size={11} className="text-black/45" />
            <span className="font-inter text-[9px] uppercase tracking-wider text-black/50 font-bold">Drag & arrange swatches</span>
          </div>

          {/* Cards mapping */}
          {itemsState.map((item) => {
            const zIndex = zIndexOrder.indexOf(item.id) + 10;
            const isDraggingThis = draggedId === item.id;

            return (
              <div
                key={item.id}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleStart(item.id, e.clientX, e.clientY);
                }}
                onTouchStart={(e) => {
                  if (e.touches.length > 0) {
                    handleStart(item.id, e.touches[0].clientX, e.touches[0].clientY);
                  }
                }}
                className={`absolute rounded-xl bg-white select-none transition-shadow ${
                  isDraggingThis ? "shadow-2xl scale-[1.02]" : "shadow-md hover:shadow-lg"
                }`}
                style={{
                  left: `${item.initialX}%`,
                  top: `${item.initialY}%`,
                  width: `${item.width}px`,
                  transform: `translate3d(${item.x}px, ${item.y}px, 0px) rotate(${item.rotation}deg)`,
                  zIndex: zIndex,
                  cursor: isDraggingThis ? "grabbing" : "grab",
                  padding: item.type === "photo" ? "10px 10px 24px 10px" : item.type === "swatch" ? "8px" : "20px",
                  border: "1px solid rgba(26, 26, 26, 0.05)",
                  transition: isDraggingThis ? "none" : "transform 0.15s ease-out, shadow 0.25s ease",
                }}
              >
                {/* Photo Element */}
                {item.type === "photo" && (
                  <div className="flex flex-col gap-3 pointer-events-none">
                    <div className="aspect-[4/3] overflow-hidden rounded-lg bg-black/5 relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover select-none"
                        loading="lazy"
                      />
                    </div>
                    <span className="font-cormorant italic text-[13px] text-black/70 text-center block">
                      {item.title}
                    </span>
                  </div>
                )}

                {/* Swatch Element */}
                {item.type === "swatch" && (
                  <div className="flex flex-col gap-2 pointer-events-none">
                    <div className="aspect-square overflow-hidden rounded-lg bg-black/5">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover select-none"
                        loading="lazy"
                      />
                    </div>
                    <span className="font-inter text-[9px] uppercase tracking-wider text-black/45 text-center block font-semibold">
                      {item.title}
                    </span>
                  </div>
                )}

                {/* Quote Element */}
                {item.type === "quote" && (
                  <div className="flex flex-col gap-3.5 pointer-events-none">
                    <Quote size={16} className="text-[#C5A880] opacity-80" />
                    <p className="font-cormorant text-lg md:text-xl font-light text-black/85 leading-relaxed italic">
                      "{item.content}"
                    </p>
                    <span className="font-inter text-[9px] uppercase tracking-widest text-black/45 font-bold mt-1">
                      Keshav & Decor Style philosophy
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
