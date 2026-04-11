import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/Preloader";
import CursorV5 from "@/components/v5/CursorV5";
import FilmGrain from "@/components/FilmGrain";
import SparkCanvas from "@/components/v5/SparkCanvas";
import FullscreenMenu from "@/components/FullscreenMenu";
import SmoothScroll from "@/components/SmoothScroll";
import ForgeHero from "@/components/v5/ForgeHero";
import LiquidTextReveal from "@/components/v5/LiquidTextReveal";
import SteelQualitiesMarquee from "@/components/v3/SteelQualitiesMarquee";
import HorizontalTimeline from "@/components/v5/HorizontalTimeline";
import ProcessVideoScroll from "@/components/v5/ProcessVideoScroll";
import ProductsExplorer from "@/components/v5/ProductsExplorer";
import ClipPathReveal from "@/components/v2/ClipPathReveal";
import StatsSection from "@/components/StatsSection";
import MarqueeText from "@/components/MarqueeText";
import AdvantagesSection from "@/components/AdvantagesSection";
import FooterSection from "@/components/FooterSection";

const IndexV5 = () => {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <CursorV5 />
      <FilmGrain />
      <SparkCanvas />
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {!loading && (
        <>
          <FullscreenMenu />
          <SmoothScroll>
            <main>
              {/* Hero — Video + 3D steel block that morphs on scroll */}
              <ForgeHero />

              {/* Liquid typography text reveal with sparks */}
              <LiquidTextReveal />

              {/* Steel qualities marquee */}
              <SteelQualitiesMarquee />

              {/* Horizontal scroll timeline — 50 years on a steel beam */}
              <HorizontalTimeline />

              {/* Forge video scroll — "Del horno a tu obra" */}
              <ProcessVideoScroll />

              {/* Products explorer with sticky 3D */}
              <ProductsExplorer />

              {/* Stats */}
              <ClipPathReveal direction="top">
                <StatsSection />
              </ClipPathReveal>

              {/* Industrial marquee */}
              <div className="bg-foreground border-y border-background/10 py-5 overflow-hidden">
                <MarqueeText
                  texts={["50 AÑOS", "3 GENERACIONES", "ACERO MACIZO", "DE DUEÑO A DUEÑO", "CONFIANZA"]}
                  className="text-3xl md:text-5xl text-background/[0.06]"
                  speed={25}
                  direction="right"
                />
              </div>

              {/* Advantages */}
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

export default IndexV5;
