import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import steelForgeVideo from "@/assets/steel-forge-video.mp4.asset.json";

const ProcessVideoScroll = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1.3, 1, 1, 1.1]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.3]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 0.4, 0.4, 0.9]);

  // Horizontal crossing text
  const textX = useTransform(scrollYProgress, [0, 1], ["100%", "-100%"]);
  const textX2 = useTransform(scrollYProgress, [0, 1], ["-50%", "80%"]);

  // Content reveal
  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [60, 0, 0, -60]);

  return (
    <section ref={sectionRef} className="relative h-[400vh] bg-foreground">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Video background */}
        <motion.div className="absolute inset-0" style={{ scale: videoScale, opacity: videoOpacity }}>
          <video
            src={steelForgeVideo.url}
            muted
            playsInline
            autoPlay
            loop
            preload="auto"
            className="w-full h-full object-cover"
            data-cursor-isotipo
          />
          <motion.div className="absolute inset-0 bg-foreground" style={{ opacity: overlayOpacity }} />
        </motion.div>

        {/* Horizontal text layers */}
        <div className="absolute inset-0 flex flex-col justify-center pointer-events-none overflow-hidden">
          <motion.div
            className="font-display font-800 text-[6rem] md:text-[12rem] lg:text-[16rem] leading-none text-background/[0.04] whitespace-nowrap select-none"
            style={{ x: textX }}
          >
            DEL HORNO • A TU OBRA • ACERO • MACIZO
          </motion.div>
          <motion.div
            className="font-display font-800 text-[4rem] md:text-[8rem] lg:text-[10rem] leading-none text-primary/[0.06] whitespace-nowrap select-none mt-4"
            style={{ x: textX2 }}
          >
            SAE 1010 • 1045 • 4140 • 8620 • FORJA
          </motion.div>
        </div>

        {/* Center content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.div className="text-center max-w-4xl px-8" style={{ opacity: contentOpacity, y: contentY }}>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[1px] w-16 bg-primary/60" />
              <span className="font-body text-[10px] font-semibold tracking-[0.5em] uppercase text-primary">
                El proceso
              </span>
              <div className="h-[1px] w-16 bg-primary/60" />
            </div>

            <h2 className="font-display font-800 text-5xl md:text-7xl lg:text-8xl leading-[0.88] tracking-tight text-background mb-8">
              Del horno
              <br />
              <span className="text-primary">a tu obra</span>
              <span className="text-primary">.</span>
            </h2>

            <p className="font-body text-base md:text-lg text-background/40 max-w-lg mx-auto leading-relaxed">
              Cada barra que entregamos pasó por un proceso de selección
              riguroso. Trabajamos solo con acerías de primer nivel.
            </p>
          </motion.div>
        </div>

        {/* Bottom stats */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-10 border-t border-background/10"
          style={{ opacity: useTransform(scrollYProgress, [0.5, 0.65, 0.9, 1], [0, 1, 1, 0]) }}
        >
          <div className="grid grid-cols-3 divide-x divide-background/10">
            {[
              { label: "CALIDADES", value: "SAE" },
              { label: "ACERO", value: "MACIZO" },
              { label: "ENTREGA", value: "24HS" },
            ].map((item) => (
              <div key={item.label} className="px-8 py-6 text-center">
                <span className="font-display font-800 text-2xl md:text-3xl text-primary block">{item.value}</span>
                <span className="font-body text-[9px] tracking-[0.4em] text-background/30 uppercase">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Corner frames */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/20 pointer-events-none" />
        <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary/20 pointer-events-none" />
        <div className="absolute bottom-20 left-8 w-16 h-16 border-l-2 border-b-2 border-primary/20 pointer-events-none" />
        <div className="absolute bottom-20 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/20 pointer-events-none" />
      </div>
    </section>
  );
};

export default ProcessVideoScroll;
