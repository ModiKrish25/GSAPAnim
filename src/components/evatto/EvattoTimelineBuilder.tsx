"use client";
import React, { useState, useRef, useEffect } from "react";
import { Plus, Trash2, Clock, Printer, Calendar, ChevronDown } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const DURATION_OPTIONS = [
  { value: 15, label: "15 Min" },
  { value: 30, label: "30 Min" },
  { value: 45, label: "45 Min" },
  { value: 60, label: "1 Hr" },
  { value: 90, label: "1.5 Hr" },
  { value: 120, label: "2 Hr" },
  { value: 180, label: "3 Hr" },
];

interface DropdownProps {
  value: number;
  onChange: (val: number) => void;
}

function DurationDropdown({ value, onChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentOption = DURATION_OPTIONS.find((o) => o.value === value) || DURATION_OPTIONS[0];

  return (
    <div ref={containerRef} className="relative inline-block text-left w-full sm:w-auto">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full sm:w-auto inline-flex justify-between items-center gap-2 pl-4 pr-3 py-2 text-xs font-semibold text-black/70 bg-white border border-black/10 rounded-full hover:border-[#C5A880] hover:text-black focus:outline-none transition-all cursor-pointer min-h-[38px]"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <span>{currentOption.label}</span>
        <ChevronDown size={13} className={`text-black/45 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-[#C5A880]" : ""}`} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-1.5 w-full sm:w-32 rounded-xl bg-white border border-black/[0.06] shadow-lg focus:outline-none z-50 py-1.5"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {DURATION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors cursor-pointer block ${
                opt.value === value
                  ? "bg-[#C5A880]/10 text-[#C5A880] font-semibold"
                  : "text-black/70 hover:bg-black/[0.02] hover:text-black"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface TimelineBlock {
  id: string;
  label: string;
  defaultDuration: number; // in minutes
  icon: string;
}

const PRESETS: TimelineBlock[] = [
  { id: "ceremony", label: "Grand Wedding Ceremony", defaultDuration: 45, icon: "💍" },
  { id: "cocktails", label: "Cocktail Reception & Hors d'oeuvres", defaultDuration: 60, icon: "🍸" },
  { id: "entrance", label: "Grand Couple Entrance", defaultDuration: 15, icon: "✨" },
  { id: "dinner", label: "Luxury Sit-Down Dining Service", defaultDuration: 90, icon: "🍽️" },
  { id: "toasts", label: "Toasts & Family Speeches", defaultDuration: 20, icon: "🥂" },
  { id: "dance", label: "First Dance & Parent Dances", defaultDuration: 15, icon: "💃" },
  { id: "cake", label: "Traditional Cake Cutting", defaultDuration: 15, icon: "🍰" },
  { id: "party", label: "Live Band & DJ Party Set", defaultDuration: 120, icon: "🎵" },
];

interface ScheduledItem extends TimelineBlock {
  key: string;
  duration: number;
}

export default function EvattoTimelineBuilder() {
  const [startTime, setStartTime] = useState("16:00"); // 4:00 PM
  const [schedule, setSchedule] = useState<ScheduledItem[]>([
    { ...PRESETS[0], key: "s-1", duration: 45 },
    { ...PRESETS[1], key: "s-2", duration: 60 },
    { ...PRESETS[3], key: "s-3", duration: 90 },
    { ...PRESETS[5], key: "s-4", duration: 15 },
    { ...PRESETS[7], key: "s-5", duration: 120 },
  ]);

  const addBlock = (preset: TimelineBlock) => {
    const newItem: ScheduledItem = {
      ...preset,
      key: `s-${Date.now()}-${Math.random()}`,
      duration: preset.defaultDuration,
    };
    setSchedule([...schedule, newItem]);
  };

  const removeBlock = (key: string) => {
    setSchedule(schedule.filter((item) => item.key !== key));
  };

  const updateDuration = (key: string, duration: number) => {
    setSchedule(
      schedule.map((item) => {
        if (item.key === key) {
          return { ...item, duration };
        }
        return item;
      })
    );
  };

  // Helper to calculate times sequentially
  const getCalculatedSchedule = () => {
    let currentTotalMinutes =
      parseInt(startTime.split(":")[0]) * 60 + parseInt(startTime.split(":")[1]);

    return schedule.map((item) => {
      const startHour = Math.floor(currentTotalMinutes / 60) % 24;
      const startMin = currentTotalMinutes % 60;
      const ampm = startHour >= 12 ? "PM" : "AM";
      const startHour12 = startHour % 12 || 12;

      const timeString = `${startHour12}:${startMin.toString().padStart(2, "0")} ${ampm}`;
      
      // Calculate end time for next iteration
      const endTotalMinutes = currentTotalMinutes + item.duration;
      const endHour = Math.floor(endTotalMinutes / 60) % 24;
      const endMin = endTotalMinutes % 60;
      const endAmpm = endHour >= 12 ? "PM" : "AM";
      const endHour12 = endHour % 12 || 12;
      const endTimeString = `${endHour12}:${endMin.toString().padStart(2, "0")} ${endAmpm}`;

      currentTotalMinutes = endTotalMinutes;

      return {
        ...item,
        timeString,
        endTimeString,
      };
    });
  };

  const calculatedItems = getCalculatedSchedule();

  const printSchedule = () => {
    window.print();
  };

  return (
    <section className="py-20 md:py-32 bg-[#FDFBF7] border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6 mb-10 md:mb-16">
          <div className="max-w-2xl">
            <p className="font-inter text-[11px] uppercase tracking-[0.3em] text-black/40 mb-4 font-semibold">
              Event Planning Portal
            </p>
            <ScrollReveal
              as="h2"
              type="words"
              className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A1A] leading-tight"
            >
              Day-of Timeline Builder
            </ScrollReveal>
            <p className="font-inter text-sm text-black/60 leading-relaxed mt-4">
              Map out your wedding reception, dinner gala, or corporate evening. Add program events, drag/reorder their timelines, adjust durations, and print your clean layout itinerary instantly.
            </p>
          </div>

          <button
            onClick={printSchedule}
            className="flex items-center gap-2 px-5 py-3 rounded-full border border-black/10 hover:border-black/25 text-xs font-inter font-semibold text-black bg-white hover:bg-black/[0.02] transition-all cursor-pointer shadow-sm active:scale-95 shrink-0 whitespace-nowrap self-start md:self-auto"
          >
            <Printer size={13} />
            Print Day-of Schedule
          </button>
        </div>

        {/* Builder grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          
          {/* Presets Column */}
          <div className="lg:col-span-4 bg-white border border-black/[0.04] p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-sm flex flex-col gap-5 h-fit">
            <h3 className="font-cormorant text-xl text-black pb-3 border-b border-black/[0.06]">
              Add Program Events
            </h3>
            
            <div className="flex flex-col gap-2">
              <label className="font-inter text-[10px] text-black/40 uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Clock size={11} /> Timeline Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full border border-black/10 py-2.5 px-4 rounded-xl focus:outline-none focus:border-black bg-transparent text-sm font-inter font-medium"
              />
            </div>

            <div className="space-y-2 mt-2">
              <span className="font-inter text-[10px] text-black/40 uppercase tracking-widest font-bold block mb-1">Available Presets</span>
              <div className="grid grid-cols-1 gap-2">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => addBlock(preset)}
                    className="w-full text-left px-4 py-3 rounded-xl border border-black/[0.05] hover:border-black/20 hover:bg-black/[0.01] transition-all cursor-pointer flex items-center justify-between text-xs font-inter text-black/75 hover:text-black font-semibold active:scale-[0.98]"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-sm">{preset.icon}</span>
                      {preset.label}
                    </span>
                    <Plus size={14} className="text-black/40" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Timeline Column */}
          <div className="lg:col-span-8 bg-[#F5F2EC]/40 border border-black/[0.04] p-5 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] relative min-h-[300px] md:min-h-[400px]">
            {schedule.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <Calendar size={36} className="text-black/20 mb-3" />
                <span className="font-cormorant italic text-lg text-black/40">Your timeline is empty.</span>
                <span className="font-inter text-xs text-black/35 mt-1">Select presets from the left panel to begin mapping.</span>
              </div>
            ) : (
              <div className="space-y-6 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[1.5px] before:bg-[#C5A880]/30">
                {calculatedItems.map((item, idx) => (
                  <div
                    key={item.key}
                    className="relative flex gap-6 items-start group"
                  >
                    {/* Time node dot */}
                    <div className="w-[36px] h-[36px] rounded-full bg-white border border-[#C5A880] flex items-center justify-center shadow-sm shrink-0 z-10 font-bold text-sm">
                      {item.icon}
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 bg-white border border-black/[0.03] p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 group-hover:shadow-md transition-shadow">
                      <div>
                        <span className="font-inter text-[10px] text-[#C5A880] font-bold uppercase tracking-wider block mb-1">
                          {item.timeString} — {item.endTimeString}
                        </span>
                        <h4 className="font-cormorant text-lg text-[#1A1A1A] font-light">
                          {item.label}
                        </h4>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-3 shrink-0">
                        <DurationDropdown
                          value={item.duration}
                          onChange={(val) => updateDuration(item.key, val)}
                        />

                        <button
                          onClick={() => removeBlock(item.key)}
                          className="p-2 rounded-full hover:bg-red-50 text-black/35 hover:text-red-500 transition-colors cursor-pointer shrink-0"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Printable schedule container */}
      <div className="hidden print:block print:fixed print:inset-0 print:bg-white print:z-[9999] print:p-12 print:overflow-y-auto">
        <div className="text-center border-b-2 border-[#C5A880] pb-6 mb-10">
          <h1 className="text-2xl font-light uppercase tracking-widest text-[#1A1A1A] font-cormorant">
            Keshav Events & Decor
          </h1>
          <p className="text-xs text-gray-500 font-inter tracking-wider mt-2 uppercase">Custom Day-of Schedule Timeline</p>
        </div>
        
        <div className="space-y-6">
          {calculatedItems.map((item) => (
            <div
              key={item.key}
              className="flex justify-between items-center border-b border-gray-100 py-4"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <div className="font-semibold text-sm text-[#C5A880] w-48">
                {item.timeString} - {item.endTimeString}
              </div>
              <div className="flex-grow text-base text-[#1A1A1A]">
                {item.icon} {item.label}
              </div>
              <div className="text-gray-400 text-xs shrink-0">
                {item.duration} Min
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
