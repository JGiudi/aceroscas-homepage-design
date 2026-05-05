import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import FullscreenMenu from "@/components/FullscreenMenu";
import SmoothScroll from "@/components/SmoothScroll";
import HeroV4 from "@/components/v4/HeroV4";
import ScrollTextReveal from "@/components/v2/ScrollTextReveal";
import ClipPathReveal from "@/components/v2/ClipPathReveal";
import ProductShowcase from "@/components/v2/ProductShowcase";
import TimelineSection from "@/components/v2/TimelineSection";
import MarqueeText from "@/components/MarqueeText";
import StatsSection from "@/components/StatsSection";
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
              {/* Hero V4: Layout V2 + Background Industrial */}
              <HeroV4 />

              {/* Scroll text reveal */}
              <ScrollTextReveal />

              {/* Marquee divider */}
              <div className="bg-background border-y border-border py-5 overflow-hidden">
                <MarqueeText
                  texts={["ACERO MACIZO", "REDONDOS", "CUADRADOS", "HEXAGONALES", "PALANQUILLAS", "TREFILADOS", "LAMINADOS", "FORJADOS"]}
                  className="text-3xl md:text-5xl text-foreground/[0.08]"
                  speed={30}
                />
              </div>

              {/* Timeline */}
              <ClipPathReveal direction="bottom">
                <TimelineSection />
              </ClipPathReveal>

              {/* Products */}
              <ProductShowcase />

              {/* Stats */}
              <ClipPathReveal direction="top">
                <StatsSection />
              </ClipPathReveal>

              {/* Marquee */}
              <div className="bg-foreground border-y border-background/10 py-5 overflow-hidden">
                <MarqueeText
                  texts={["50 AÑOS", "3 GENERACIONES", "SAE 1010", "SAE 1045", "SAE 4140", "CALIDAD", "CONFIANZA"]}
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
