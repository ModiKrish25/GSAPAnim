"use client";

import EvattoNav from "@/components/evatto/EvattoNav";
import EvattoHero from "@/components/evatto/EvattoHero";
import EvattoIntro from "@/components/evatto/EvattoIntro";
import EvattoEventCards from "@/components/evatto/EvattoEventCards";
import EvattoVenues from "@/components/evatto/EvattoVenues";
import EvattoDreamStage from "@/components/evatto/EvattoDreamStage";
import EvattoCTA from "@/components/evatto/EvattoCTA";
import EvattoBlog from "@/components/evatto/EvattoBlog";
import EvattoFooter from "@/components/evatto/EvattoFooter";

export default function Home() {
  return (
    <div className="bg-[#FDFBF7]">
      {/* Fixed Navigation */}
      <EvattoNav />

      {/* 1. Hero — fullscreen bg image, per-char headline slide-up */}
      <EvattoHero />

      {/* 2. Gallery — full-width mosaic: 3 from top + 3 from bottom, scrub reversible */}
      <EvattoIntro />

      {/* 3. Event Cards — tilted deck that fans out on scroll */}
      <EvattoEventCards />

      {/* 4. Venues — dark bg, pinned horizontal scroll */}
      <EvattoVenues />

      {/* 5. Immersive 3D Dream Stage — interactive 3D perspective mood visualizer & liquid portal cursor */}
      <EvattoDreamStage />

      {/* 6. CTA — sage green, corner images float in */}
      <EvattoCTA />

      {/* 7. Blog — 3-col grid + infinite marquee */}
      <EvattoBlog />

      {/* 8. Footer — dark bg, giant outlined text */}
      <EvattoFooter />
    </div>
  );
}
