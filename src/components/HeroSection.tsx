import { useRef, lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import geometricPattern from "@/assets/geometric-pattern.png";
import heroVideo from "@/assets/hero-video.mp4.asset.json";
import MagneticButton from "./MagneticButton";

const SteelTube3D = lazy(() => import("./SteelTube3D"));

// Character-level animation for dramatic text reveal
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

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.55, 0.85]);

  return (
    <section ref={sectionRef} className="relative h-screen flex items-center overflow-hidden bg-foreground">
      {/* Video background with parallax */}
      <motion.div className="absolute inset-0" style={{ scale: videoScale, y: videoY }}>
        <video
          src={heroVideo.url}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <motion.div
          className="absolute inset-0 bg-foreground"
          style={{ opacity: overlayOpacity }}
        />
      </motion.div>

      {/* Geometric pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url(${geometricPattern})`,
          backgroundSize: "200px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Grid lines */}
      <div className="absolute inset-0 z-[1]">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-background/[0.05]"
            style={{ left: `${(i + 1) * (100 / 7)}%` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1.5 + i * 0.1, duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          />
        ))}
      </div>

      {/* Navigation — logo only, hamburger is in FullscreenMenu */}
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
        <div className="hidden md:flex items-center gap-10 font-body text-sm font-medium tracking-wide text-background/60">
          {[
            { label: "NOSOTROS", href: "#legado" },
            { label: "VENTAJAS", href: "#ventajas" },
            { label: "CONTACTO", href: "#contacto" },
          ].map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="relative hover:text-background transition-colors duration-300 group"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4 + i * 0.1, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-500" />
            </motion.a>
          ))}
        </div>
      </motion.nav>

      {/* Main hero content */}
      <motion.div
        className="relative z-10 container mx-auto px-8 md:px-16"
        style={{ y: textY, opacity }}
      >
        <div className="max-w-5xl">
          {/* Eyebrow */}
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
              Est. 1973
            </span>
          </motion.div>

          {/* Giant title */}
          <h1 className="font-display font-800 text-[3.2rem] md:text-[5.5rem] lg:text-[7.5rem] leading-[0.88] tracking-tight text-background mb-8">
            <div className="overflow-hidden">
              <CharReveal text="Tres" delay={0.7} />
            </div>
            <div className="overflow-hidden">
              <CharReveal text="generaciones" delay={0.85} />
            </div>
            <div className="overflow-hidden text-primary">
              <CharReveal text="forjando" delay={1.05} />
            </div>
            <div className="overflow-hidden">
              <CharReveal text="la industria" delay={1.2} />
              <motion.span
                className="text-primary inline-block ml-1"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.8, type: "spring", stiffness: 300 }}
              >
                .
              </motion.span>
            </div>
          </h1>

          {/* Subtitle + CTA */}
          <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
            <motion.p
              className="font-body text-base md:text-lg text-background/50 max-w-md leading-relaxed"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 1.4 }}
            >
              El punto de encuentro entre la solidez de la
              trayectoria y la agilidad de la logística moderna.
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 1.6 }}
            >
              <MagneticButton
                href="#contacto"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-body font-semibold text-sm tracking-wide px-10 py-5 hover:brightness-110 transition-all duration-300 group relative overflow-hidden"
              >
                <span className="relative z-10">HABLÁ CON LOS DUEÑOS</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300 relative z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <span className="absolute inset-0 bg-secondary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 3D Steel Tube — right side */}
      <motion.div
        className="hidden lg:block absolute right-0 top-0 bottom-0 w-[45%] z-[5]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
      >
        <Suspense fallback={null}>
          <SteelTube3D className="opacity-60" />
        </Suspense>
      </motion.div>

      {/* Right side large number */}
      <div className="hidden lg:flex absolute right-16 bottom-20 z-10 flex-col items-end">
        <motion.div
          className="font-display font-800 text-[14rem] leading-none text-background/[0.04] select-none"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1], delay: 1.8 }}
        >
          50
        </motion.div>
        <motion.p
          className="font-body text-xs tracking-[0.3em] text-background/20 -mt-8 mr-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          AÑOS
        </motion.p>
      </div>

      {/* Bottom scroll indicator */}
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
        <span className="font-body text-[10px] tracking-[0.3em] text-background/30 uppercase">
          Scroll
        </span>
      </motion.div>

      {/* Bottom right corner info */}
      <motion.div
        className="hidden md:block absolute bottom-8 right-16 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <p className="font-body text-[10px] tracking-[0.2em] text-background/20 text-right">
          DISTRIBUIDORES DE ACERO
          <br />
          BUENOS AIRES, ARGENTINA
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
