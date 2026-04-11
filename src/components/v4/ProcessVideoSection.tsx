import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import steelProcessVideo from "@/assets/steel-process-video.mp4.asset.json";

const ProcessVideoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1.4, 1, 1, 1.2]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.2, 1, 1, 0.2]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.85, 0.35, 0.35, 0.9]);

  const textX1 = useTransform(scrollYProgress, [0, 1], ["80%", "-80%"]);
  const textX2 = useTransform(scrollYProgress, [0, 1], ["-40%", "60%"]);

  return (
    <section ref={sectionRef} className="relative h-[350vh] bg-foreground">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Video */}
        <motion.div className="absolute inset-0" style={{ scale: videoScale, opacity: videoOpacity }}>
          <video
            src={steelProcessVideo.url}
            muted
            playsInline
            autoPlay
            loop
            preload="auto"
            className="w-full h-full object-cover"
          />
          <motion.div className="absolute inset-0 bg-foreground" style={{ opacity: overlayOpacity }} />
        </motion.div>

        {/* Crossing text layers */}
        <div className="absolute inset-0 flex flex-col justify-center pointer-events-none overflow-hidden">
          <motion.div
            className="font-display font-800 text-[5rem] md:text-[10rem] lg:text-[14rem] leading-none text-background/[0.03] whitespace-nowrap select-none"
            style={{ x: textX1 }}
          >
            FORJA • TEMPLE • LAMINADO • TREFILADO
          </motion.div>
          <motion.div
            className="font-display font-800 text-[3rem] md:text-[6rem] lg:text-[8rem] leading-none text-primary/[0.04] whitespace-nowrap select-none mt-4"
            style={{ x: textX2 }}
          >
            CALIDAD • PRECISIÓN • RESISTENCIA
          </motion.div>
        </div>

        {/* Center content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.div
            className="text-center max-w-3xl px-8"
            style={{
              opacity: useTransform(scrollYProgress, [0.25, 0.4, 0.6, 0.75], [0, 1, 1, 0]),
              y: useTransform(scrollYProgress, [0.25, 0.4, 0.6, 0.75], [80, 0, 0, -80]),
            }}
          >
            <motion.div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[1px] w-16 bg-primary/50" />
              <span className="font-body text-[10px] font-semibold tracking-[0.5em] uppercase text-primary">
                El Proceso
              </span>
              <div className="h-[1px] w-16 bg-primary/50" />
            </motion.div>

            <h2 className="font-display font-800 text-5xl md:text-7xl lg:text-8xl leading-[0.88] tracking-tight text-background mb-8">
              Del horno
              <br />
              <span className="text-primary">a tu obra</span>
              <span className="text-primary">.</span>
            </h2>

            <p className="font-body text-base md:text-lg text-background/35 max-w-lg mx-auto leading-relaxed">
              Cada barra pasó por un proceso de selección riguroso.
              Trabajamos solo con acerías de primer nivel.
            </p>
          </motion.div>
        </div>

        {/* Bottom stats */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-10 border-t border-background/10"
          style={{
            opacity: useTransform(scrollYProgress, [0.55, 0.7, 0.9, 1], [0, 1, 1, 0]),
          }}
        >
          <div className="grid grid-cols-3 divide-x divide-background/10">
            {[
              { label: "CALIDADES", value: "SAE" },
              { label: "PROCESO", value: "MACIZO" },
              { label: "ENTREGA", value: "24HS" },
            ].map((item) => (
              <div key={item.label} className="px-8 py-6 text-center">
                <span className="font-display font-800 text-2xl md:text-3xl text-primary block">{item.value}</span>
                <span className="font-body text-[9px] tracking-[0.4em] text-background/25 uppercase">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Corner frames */}
        <div className="absolute top-8 left-8 w-14 h-14 border-l-2 border-t-2 border-primary/15 pointer-events-none" />
        <div className="absolute top-8 right-8 w-14 h-14 border-r-2 border-t-2 border-primary/15 pointer-events-none" />
        <div className="absolute bottom-20 left-8 w-14 h-14 border-l-2 border-b-2 border-primary/15 pointer-events-none" />
        <div className="absolute bottom-20 right-8 w-14 h-14 border-r-2 border-b-2 border-primary/15 pointer-events-none" />
      </div>
    </section>
  );
};

export default ProcessVideoSection;
