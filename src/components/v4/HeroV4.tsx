import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroVideo from "@/assets/hero-video.mp4.asset.json";
import MagneticButton from "@/components/MagneticButton";

const CharReveal = ({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => (
  <span className={`inline-block overflow-hidden ${className}`}>
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        className="inline-block"
        initial={{ y: "120%", rotateX: 90 }}
        animate={{ y: 0, rotateX: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay: delay + i * 0.03,
        }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </span>
);

const productTypes = [
  { name: "Redondos", sae: "SAE 1010 · 1045" },
  { name: "Cuadrados", sae: "Trefilados" },
  { name: "Hexagonales", sae: "Bulonería" },
  { name: "Palanquillas", sae: "El fuerte" },
  { name: "Planchuelas", sae: "Herrería" },
];

const HeroV4 = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const textY = useTransform(scrollYProgress, [0, 0.4], ["0%", "60%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [0.6, 0.4, 0.8]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.35]);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <div ref={sectionRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-foreground">
        {/* Video */}
        <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
          <video
            ref={videoRef}
            src={heroVideo.url}
            muted
            playsInline
            autoPlay
            loop
            preload="auto"
            className="w-full h-full object-cover"
          />
          <motion.div className="absolute inset-0 bg-foreground" style={{ opacity: overlayOpacity }} />
        </motion.div>

        {/* Subtle grid */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 bottom-0 w-px bg-background/[0.03]"
              style={{ left: `${(i + 1) * (100 / 7)}%` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 1.5 + i * 0.08, duration: 1 }}
            />
          ))}
        </div>

        {/* Nav */}
        <motion.nav
          className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-16 py-8"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 1.2 }}
        >
          <motion.div
            className="font-display font-800 text-2xl tracking-tight text-background"
            whileHover={{ scale: 1.05 }}
          >
            ACEROSCAS<span className="text-primary">.</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {["Productos", "Historia", "Ventajas", "Contacto"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-body text-[11px] tracking-[0.2em] uppercase text-background/40 hover:text-primary transition-colors duration-300"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4 + i * 0.1, duration: 0.6 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.nav>

        {/* Hero content */}
        <motion.div
          className="relative z-10 h-full flex items-center container mx-auto px-8 md:px-16"
          style={{ y: textY, opacity: textOpacity }}
        >
          <div className="max-w-5xl">
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                className="h-[2px] bg-primary"
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
              <span className="font-body text-xs font-semibold tracking-[0.4em] uppercase text-primary">
                Acero Macizo • Est. 1973
              </span>
            </motion.div>

            <h1 className="font-display font-800 text-[3rem] md:text-[5rem] lg:text-[7rem] leading-[0.88] tracking-tight text-background mb-8">
              <div className="overflow-hidden"><CharReveal text="La solidez" delay={0.7} /></div>
              <div className="overflow-hidden"><CharReveal text="que tu obra" delay={0.9} /></div>
              <div className="overflow-hidden text-primary"><CharReveal text="necesita" delay={1.1} /></div>
              <motion.span
                className="text-primary inline-block"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.6, type: "spring", stiffness: 300 }}
              >.</motion.span>
            </h1>

            <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
              <motion.p
                className="font-body text-base md:text-lg text-background/50 max-w-md leading-relaxed"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                Redondos, cuadrados, hexagonales y palanquillas.
                Tres generaciones distribuyendo acero macizo en toda Argentina.
              </motion.p>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                <MagneticButton
                  href="#contacto"
                  className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-body font-semibold text-sm tracking-wide px-10 py-5 hover:brightness-110 transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="relative z-10">PEDÍ COTIZACIÓN</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <span className="absolute inset-0 bg-secondary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
                </MagneticButton>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-24 md:bottom-20 left-8 md:left-16 flex items-center gap-4 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <motion.div
            className="w-[1px] h-12 bg-primary/60 origin-top"
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="font-body text-[10px] tracking-[0.3em] text-background/30 uppercase">Scroll</span>
        </motion.div>

        {/* Bottom product bar — FIXED: proper spacing, no overlaps */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-10"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <div className="border-t border-background/10 bg-foreground/40 backdrop-blur-sm">
            <div className="hidden md:grid grid-cols-5">
              {productTypes.map((item, i) => (
                <motion.div
                  key={item.name}
                  className="group border-r border-background/10 last:border-r-0 px-6 py-5 text-center cursor-pointer hover:bg-background/[0.04] transition-colors duration-500"
                  whileHover={{ y: -2 }}
                >
                  <span className="font-display font-700 text-sm tracking-wide text-background/60 group-hover:text-primary transition-colors duration-300 block">
                    {item.name}
                  </span>
                  <span className="font-body text-[9px] tracking-[0.2em] text-background/20 uppercase mt-1 block">
                    {item.sae}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 50 años badge */}
        <div className="hidden lg:flex absolute right-16 top-1/2 -translate-y-1/2 z-10 flex-col items-end">
          <motion.div
            className="font-display font-800 text-[12rem] leading-none text-background/[0.03] select-none"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 1.8 }}
          >50</motion.div>
          <motion.p
            className="font-body text-xs tracking-[0.3em] text-background/15 -mt-6 mr-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >AÑOS</motion.p>
        </div>
      </div>
    </div>
  );
};

export default HeroV4;
