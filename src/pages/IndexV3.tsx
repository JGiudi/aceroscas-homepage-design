import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import FullscreenMenu from "@/components/FullscreenMenu";
import SmoothScroll from "@/components/SmoothScroll";
import IndustrialHero from "@/components/v3/IndustrialHero";
import ScrollTextReveal from "@/components/v2/ScrollTextReveal";
import SteelQualitiesMarquee from "@/components/v3/SteelQualitiesMarquee";
import ClipPathReveal from "@/components/v2/ClipPathReveal";
import TimelineSection from "@/components/v2/TimelineSection";
import HorizontalScrollVideo from "@/components/v3/HorizontalScrollVideo";
import ProductShowcase from "@/components/v2/ProductShowcase";
import ParallaxGallery from "@/components/v3/ParallaxGallery";
import StatsSection from "@/components/StatsSection";
import MarqueeText from "@/components/MarqueeText";
import AdvantagesSection from "@/components/AdvantagesSection";
import FooterSection from "@/components/FooterSection";

const IndexV3 = () => {
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
              {/* Hero with video + diagonal wipe on scroll */}
              <IndustrialHero />

              {/* Scroll-driven text reveal */}
              <ScrollTextReveal />

              {/* Steel qualities marquee */}
              <SteelQualitiesMarquee />

              {/* Timeline with clip-path */}
              <ClipPathReveal direction="bottom">
                <TimelineSection />
              </ClipPathReveal>

              {/* Forge video scroll section — cinematic interlude */}
              <HorizontalScrollVideo />

              {/* 3D Product showcase — sticky scroll */}
              <ProductShowcase />

              {/* Parallax product gallery */}
              <ParallaxGallery />

              {/* Stats */}
              <ClipPathReveal direction="top">
                <StatsSection />
              </ClipPathReveal>

              {/* Industrial marquee */}
              <div className="bg-foreground border-y border-background/10 py-5 overflow-hidden">
                <MarqueeText
                  texts={["50 AÑOS", "3 GENERACIONES", "ACERO MACIZO", "CONFIANZA", "DE DUEÑO A DUEÑO"]}
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

export default IndexV3;
