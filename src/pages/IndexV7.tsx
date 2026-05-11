import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import FullscreenMenu from "@/components/FullscreenMenu";
import SmoothScroll from "@/components/SmoothScroll";

import HeroV7 from "@/components/v7/HeroV7";
import ManifestoSection from "@/components/v7/ManifestoSection";
import TimelineV7 from "@/components/v7/TimelineV7";
import ProductsV7 from "@/components/v7/ProductsV7";
import FooterV7 from "@/components/v7/FooterV7";

const IndexV7 = () => {
  const [loading, setLoading] = useState(true);
  const handleDone = useCallback(() => setLoading(false), []);

  return (
    <>
      <CustomCursor />
      <FilmGrain />
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={handleDone} />}
      </AnimatePresence>

      {!loading && (
        <>
          <FullscreenMenu />
          <SmoothScroll>
            <main>
              <HeroV7 />
              <ManifestoSection />
              <TimelineV7 />
              <ProductsV7 />
              <FooterV7 />
            </main>
          </SmoothScroll>
        </>
      )}
    </>
  );
};

export default IndexV7;
