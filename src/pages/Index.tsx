import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import HeroSection from "@/components/HeroSection";
import MarqueeText from "@/components/MarqueeText";
import LegacySection from "@/components/LegacySection";
import StatsSection from "@/components/StatsSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import FooterSection from "@/components/FooterSection";
import SmoothScroll from "@/components/SmoothScroll";

const Index = () => {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {!loading && (
        <SmoothScroll>
          <main>
            <HeroSection />

            {/* Marquee divider */}
            <div className="bg-background border-y border-border py-5 overflow-hidden">
              <MarqueeText
                texts={["ACERO INOXIDABLE", "BARRAS", "CHAPAS", "TUBOS", "PERFILES", "HIERRO", "DISTRIBUCIÓN NACIONAL"]}
                className="text-3xl md:text-5xl text-foreground/[0.08]"
                speed={30}
              />
            </div>

            <LegacySection />
            <StatsSection />

            {/* Second marquee */}
            <div className="bg-foreground border-y border-background/10 py-5 overflow-hidden">
              <MarqueeText
                texts={["50 AÑOS", "3 GENERACIONES", "COMPROMISO", "CONFIANZA", "ENTREGAS 24HS"]}
                className="text-3xl md:text-5xl text-background/[0.06]"
                speed={25}
                direction="right"
              />
            </div>

            <AdvantagesSection />
            <FooterSection />
          </main>
        </SmoothScroll>
      )}
    </>
  );
};

export default Index;
