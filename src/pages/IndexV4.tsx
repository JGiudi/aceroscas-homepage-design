import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import FullscreenMenu from "@/components/FullscreenMenu";
import SmoothScroll from "@/components/SmoothScroll";
import HeroV4 from "@/components/v4/HeroV4";
import ScrollTextReveal from "@/components/v2/ScrollTextReveal";
import SteelQualitiesMarquee from "@/components/v3/SteelQualitiesMarquee";
import HistoryScrollVideo from "@/components/v4/HistoryScrollVideo";
import ProcessVideoSection from "@/components/v4/ProcessVideoSection";
import CatalogSection from "@/components/v4/CatalogSection";
import ClipPathReveal from "@/components/v2/ClipPathReveal";
import StatsSection from "@/components/StatsSection";
import MarqueeText from "@/components/MarqueeText";
import AdvantagesSection from "@/components/AdvantagesSection";
import FooterSection from "@/components/FooterSection";

const IndexV4 = () => {
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
              {/* Hero — video bg + zoom on scroll */}
              <HeroV4 />

              {/* Philosophy text reveal on scroll */}
              <ScrollTextReveal />

              {/* Steel qualities marquee strip */}
              <SteelQualitiesMarquee />

              {/* History — video scrub on scroll, 1973→HOY */}
              <HistoryScrollVideo />

              {/* Process — different video, "Del horno a tu obra" */}
              <ProcessVideoSection />

              {/* Catalog — interactive product explorer */}
              <ClipPathReveal direction="bottom">
                <CatalogSection />
              </ClipPathReveal>

              {/* Stats */}
              <ClipPathReveal direction="top">
                <StatsSection />
              </ClipPathReveal>

              {/* Marquee */}
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

export default IndexV4;
