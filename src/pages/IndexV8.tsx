import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { AnimatePresence, motion } from "framer-motion";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import FullscreenMenu from "@/components/FullscreenMenu";
import SmoothScroll from "@/components/SmoothScroll";
import MarqueeText from "@/components/MarqueeText";

import HeroV2 from "@/components/v6/HeroV2";
import ScrollTextReveal from "@/components/v6/ScrollTextReveal";
import ClipPathReveal from "@/components/v6/ClipPathReveal";
import ProductShowcase from "@/components/v8/ProductShowcase";
import TimelineSection from "@/components/v6/TimelineSection";
import StatsSection from "@/components/v6/StatsSection";
import AdvantagesSection from "@/components/v6/AdvantagesSection";
import FooterSection from "@/components/v6/FooterSection";

const WhatsAppFAB = () => (
  <motion.a
    href="https://wa.me/5491158392680"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 3, type: "spring", stiffness: 300, damping: 20 }}
    aria-label="Contactar por WhatsApp"
  >
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  </motion.a>
);

const IndexV8 = () => {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Helmet>
        <title>ACEROSCAS — Distribuidores de Acero Especial | Buenos Aires</title>
        <meta name="description" content="ACEROSCAS: distribuidores de acero especial en Buenos Aires. Redondos, cuadrados, hexagonales, palanquillas y planchuelas. SAE 1010 a SAE 52100. Stock permanente, entregas en 24-48hs." />
        <meta property="og:title" content="ACEROSCAS — Distribuidores de Acero Especial | Buenos Aires" />
        <meta property="og:description" content="Tres generaciones distribuyendo acero especial en Argentina. Stock permanente y atención personalizada." />
        <link rel="canonical" href="https://aceroscas.com.ar/v8" />
      </Helmet>
      <CustomCursor />
      <FilmGrain />
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {!loading && (
        <>
          <WhatsAppFAB />
          <FullscreenMenu homeHref="/v8" />
          <SmoothScroll>
            <main>
              <HeroV2 />

              <ScrollTextReveal />

              {/* Marquee divider */}
              <div className="bg-background border-y border-border py-5 overflow-hidden">
                <MarqueeText
                  texts={["ACEROS ESPECIALES", "REDONDOS", "CUADRADOS", "HEXAGONALES", "PALANQUILLAS", "TREFILADOS", "LAMINADOS", "FORJADOS"]}
                  className="text-3xl md:text-5xl text-foreground/[0.08]"
                  speed={30}
                />
              </div>

              {/* Timeline con clip-path reveal */}
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
                  texts={["10 AÑOS ACEROSCAS", "3 GENERACIONES", "SAE 1010", "SAE 1045", "SAE 4140", "CALIDAD", "CONFIANZA"]}
                  className="text-3xl md:text-5xl text-background/[0.06]"
                  speed={25}
                  direction="right"
                />
              </div>

              {/* Ventajas */}
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

export default IndexV8;
