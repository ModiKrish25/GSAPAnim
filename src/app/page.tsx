"use client";

import EvattoNav from "@/components/evatto/EvattoNav";
import EvattoHero from "@/components/evatto/EvattoHero";
import EvattoLiquidPortal from "@/components/evatto/EvattoLiquidPortal";
import EvattoShowreel from "@/components/evatto/EvattoShowreel";
import EvattoIntro from "@/components/evatto/EvattoIntro";
import EvattoEventCards from "@/components/evatto/EvattoEventCards";
import EvattoVenues from "@/components/evatto/EvattoVenues";
import EvattoTextScroller from "@/components/evatto/EvattoTextScroller";
import EvattoDreamStage from "@/components/evatto/EvattoDreamStage";
import EvattoCTA from "@/components/evatto/EvattoCTA";
import EvattoBlog from "@/components/evatto/EvattoBlog";
import EvattoFooter from "@/components/evatto/EvattoFooter";

export default function Home() {
  return (
    <div className="bg-[#FDFBF7]">
      <EvattoNav />

      {/* 1. Hero */}
      <EvattoHero />

      {/* 2. ★ LIQUID PORTAL TRANSITION — bubble morph portal lens */}
      <EvattoLiquidPortal />

      {/* 3. ★ CINEMATIC IRIS SHOWREEL — pinned scroll scene transitions */}
      <EvattoShowreel />

      {/* 4. Gallery mosaic — 3 from top / 3 from bottom merge */}
      <EvattoIntro />

      {/* 5. Featured event cards — drop, fan, 3D flip */}
      <EvattoEventCards />

      {/* 6. Venues — horizontal scroll */}
      <EvattoVenues />

      {/* 7. ★ 3D TEXT SCROLLER — floating diagonal scroller in 3D perspective */}
      <EvattoTextScroller />

      {/* 8. Dream Stage — 3D mood visualiser */}
      <EvattoDreamStage />

      {/* 9. CTA — flying centered-to-corner images */}
      <EvattoCTA />

      {/* 10. Blog — staggered skew cards and looping partners marquee */}
      <EvattoBlog />

      {/* 11. Footer */}
      <EvattoFooter />
    </div>
  );
}
