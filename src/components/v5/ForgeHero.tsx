import { useRef, lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroVideo from "@/assets/hero-video.mp4.asset.json";
import MagneticButton from "@/components/MagneticButton";
import brushedSteel from "@/assets/brushed-steel.jpg";

const SteelShapes3D = lazy(() => import("@/components/v2/SteelShapes3D"));

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
        initial={{ y: "120%", rotateX: 90, opacity: 0 }}
        animate={{ y: 0, rotateX: 0, opacity: 1 }}
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

const ForgeHero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const textY = useTransform(scrollYProgress, [0, 0.5], ["0%", "80%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [0.55, 0.35, 0.75]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.4]);

  // Steel block emerges and stretches on scroll
  const blockScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 2.5]);
  const blockOpacity = useTransform(scrollYProgress, [0.6, 0.9], [1, 0]);
  const blockY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Brushed steel texture parallax
  const textureBgX = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  return (
    <div ref={sectionRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-foreground">
        {/* Video background */}
        <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
          <video
            src={heroVideo.url}
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

        {/* Brushed steel texture overlay - moves with mouse via CSS */}
        <motion.div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url(${brushedSteel})`,
            backgroundSize: "400px",
            backgroundRepeat: "repeat",
            x: textureBgX,
          }}
        />

        {/* Industrial grid overlay */}
        <div className="absolute inset-0 z-[1]">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 bottom-0 w-px bg-background/[0.04]"
              style={{ left: `${(i + 1) * (100 / 9)}%` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 1.5 + i * 0.08, duration: 1, ease: [0.33, 1, 0.68, 1] }}
            />
          ))}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-px bg-background/[0.03]"
              style={{ top: `${(i + 1) * 25}%` }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.8 + i * 0.1, duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
            />
          ))}
        </div>

        {/* Brand pattern parallax - chevrons */}
        <motion.div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            y: useTransform(scrollYProgress, [0, 1], ["0%", "15%"]),
          }}
        >
          <div className="absolute top-20 right-20 w-40 h-40 opacity-[0.03]">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute border-l-2 border-t-2 border-primary"
                style={{
                  width: `${100 - i * 15}%`,
                  height: `${100 - i * 15}%`,
                  top: `${i * 7.5}%`,
                  left: `${i * 7.5}%`,
                  transform: "rotate(45deg)",
                }}
              />
            ))}
          </div>
        </motion.div>

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
            transition={{ type: "spring", stiffness: 400 }}
          >
            ACEROSCAS<span className="text-primary">.</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Productos", href: "#productos-v5" },
              { label: "Historia", href: "#historia-v5" },
              { label: "Ventajas", href: "#ventajas-v5" },
              { label: "Contacto", href: "#contacto-v5" },
            ].map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="font-body text-[11px] tracking-[0.2em] uppercase text-background/40 hover:text-primary transition-colors duration-300"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4 + i * 0.1, duration: 0.6 }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>
        </motion.nav>

        {/* Hero content */}
        <motion.div
          className="relative z-10 h-full flex items-center"
          style={{ y: textY, opacity: textOpacity }}
        >
          <div className="container mx-auto px-8 md:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: text */}
              <div>
                <motion.div
                  className="flex items-center gap-4 mb-8"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.6 }}
                >
                  <motion.div
                    className="h-[2px] bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: 60 }}
                    transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.8 }}
                  />
                  <span className="font-body text-xs font-semibold tracking-[0.4em] uppercase text-primary">
                    Acero Macizo • Est. 1973
                  </span>
                </motion.div>

                <h1 className="font-display font-800 text-[3rem] md:text-[4.5rem] lg:text-[6rem] leading-[0.88] tracking-tight text-background mb-8">
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

                <motion.p
                  className="font-body text-base md:text-lg text-background/50 max-w-md leading-relaxed mb-8"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 1.4 }}
                >
                  Redondos, cuadrados, hexagonales y palanquillas.
                  Tres generaciones distribuyendo acero macizo.
                </motion.p>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 1.6 }}
                >
                  <MagneticButton
                    href="#contacto-v5"
                    className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-body font-semibold text-sm tracking-wide px-10 py-5 hover:brightness-110 transition-all duration-300 group relative overflow-hidden"
                  >
                    <span className="relative z-10">HABLEMOS DE DUEÑO A DUEÑO</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <span className="absolute inset-0 bg-secondary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
                  </MagneticButton>
                </motion.div>
              </div>

              {/* Right: 3D steel block */}
              <motion.div
                className="hidden lg:block relative h-[500px]"
                style={{ scale: blockScale, opacity: blockOpacity, y: blockY }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1.5 }}
              >
                <Suspense fallback={null}>
                  <SteelShapes3D activeShape="palanquilla" />
                </Suspense>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-8 md:left-16 flex items-center gap-4 z-10"
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

        {/* Bottom bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-10 border-t border-background/10 backdrop-blur-sm bg-foreground/30"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <div className="hidden md:grid grid-cols-5 divide-x divide-background/10">
            {["Redondos", "Cuadrados", "Hexagonales", "Palanquillas", "Planchuelas"].map((item) => (
              <div key={item} className="px-4 py-4 text-center">
                <span className="font-body text-[9px] tracking-[0.3em] text-background/25 uppercase">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Large "50 AÑOS" */}
        <div className="hidden lg:flex absolute right-16 bottom-24 z-10 flex-col items-end pointer-events-none">
          <motion.div
            className="font-display font-800 text-[12rem] leading-none text-background/[0.04] select-none"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1], delay: 1.8 }}
          >50</motion.div>
          <motion.p
            className="font-body text-xs tracking-[0.3em] text-background/20 -mt-8 mr-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >AÑOS</motion.p>
        </div>
      </div>
    </div>
  );
};

export default ForgeHero;
