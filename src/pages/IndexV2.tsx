import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import FullscreenMenu from "@/components/FullscreenMenu";
import SmoothScroll from "@/components/SmoothScroll";
import HeroV2 from "@/components/v2/HeroV2";
import ScrollTextReveal from "@/components/v2/ScrollTextReveal";
import ClipPathReveal from "@/components/v2/ClipPathReveal";
import TubeShowcase from "@/components/v2/TubeShowcase";
import TimelineSection from "@/components/v2/TimelineSection";
import MarqueeText from "@/components/MarqueeText";
import StatsSection from "@/components/StatsSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import FooterSection from "@/components/FooterSection";

const IndexV2 = () => {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <CustomCursor />
      <FilmGrain />
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {!loading && (
        <>
          <FullscreenMenu />
          <SmoothScroll>
            <main>
              {/* Scroll-driven video hero — 300vh for scrub */}
              <HeroV2 />

              {/* Scroll text reveal — filosofía */}
              <ScrollTextReveal />

              {/* Marquee divider */}
              <div className="bg-background border-y border-border py-5 overflow-hidden">
                <MarqueeText
                  texts={["ACERO INOXIDABLE", "BARRAS", "CHAPAS", "TUBOS", "PERFILES", "HIERRO", "DISTRIBUCIÓN NACIONAL"]}
                  className="text-3xl md:text-5xl text-foreground/[0.08]"
                  speed={30}
                />
              </div>

              {/* Timeline with clip-path reveal */}
              <ClipPathReveal direction="bottom">
                <TimelineSection />
              </ClipPathReveal>

              {/* 3D Tube + Products showcase */}
              <TubeShowcase />

              {/* Stats */}
              <ClipPathReveal direction="top">
                <StatsSection />
              </ClipPathReveal>

              {/* Marquee */}
              <div className="bg-foreground border-y border-background/10 py-5 overflow-hidden">
                <MarqueeText
                  texts={["50 AÑOS", "3 GENERACIONES", "COMPROMISO", "CONFIANZA", "ENTREGAS 24HS"]}
                  className="text-3xl md:text-5xl text-background/[0.06]"
                  speed={25}
                  direction="right"
                />
              </div>

              {/* Advantages with clip reveal */}
              <ClipPathReveal direction="left">
                <AdvantagesSection />
              </ClipPathReveal>

              <FooterSection />
            </main>
          </SmoothScroll>
        </>
      )}
    </>
  );
};

export default IndexV2;
