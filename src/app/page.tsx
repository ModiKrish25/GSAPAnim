"use client";

import EvattoNav from "@/components/evatto/EvattoNav";
import EvattoHero from "@/components/evatto/EvattoHero";
import EvattoShowreel from "@/components/evatto/EvattoShowreel";
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
      <EvattoNav />

      {/* 1. Hero */}
      <EvattoHero />

      {/* 2. ★ CINEMATIC IRIS SHOWREEL — pinned scroll scene transitions */}
      <EvattoShowreel />

      {/* 3. Gallery mosaic — 3 from top / 3 from bottom merge */}
      <EvattoIntro />

      {/* 4. Featured event cards — drop, fan, 3D flip */}
      <EvattoEventCards />

      {/* 5. Venues — horizontal scroll */}
      <EvattoVenues />

      {/* 6. Dream Stage — 3D mood visualiser */}
      <EvattoDreamStage />

      {/* 7. CTA */}
      <EvattoCTA />

      {/* 8. Blog */}
      <EvattoBlog />

      {/* 9. Footer */}
      <EvattoFooter />
    </div>
  );
}
