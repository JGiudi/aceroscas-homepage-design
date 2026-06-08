import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import geometricPattern from "@/assets/geometric-pattern.png";
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
          ease: [0.16, 1, 0.3, 1],
          delay: delay + i * 0.035,
        }}
      >
        {char === " " ? " " : char}
      </motion.span>
    ))}
  </span>
);

const HeroV2 = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const textY = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [0.6, 0.4, 0.8]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.4]);

  return (
    <div ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-foreground">
        {/* Background */}
        <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
          <div className="w-full h-full bg-[#0a0a0a]" />
          <motion.div
            className="absolute inset-0 bg-foreground"
            style={{ opacity: overlayOpacity }}
          />
        </motion.div>

        {/* Pattern */}
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

        {/* Nav — logo oficial + fallback texto */}
        <motion.nav
          className="absolute top-0 left-0 right-0 z-20 flex items-center px-8 md:px-16 py-8"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 1.2 }}
        >
          <motion.a
            href="/"
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {/* Logo imagen — poner logo-aceroscas.png en /public */}
            <img
              src="/logo-aceroscas.png"
              alt="AcerosCas"
              className="h-10 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <span className="font-display font-800 text-2xl tracking-tight text-background">
              ACEROSCAS<span className="text-primary">.</span>
            </span>
          </motion.a>
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
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.6 }}
            >
              <motion.div
                className="h-[2px] bg-primary"
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.8 }}
              />
              <span className="font-body text-xs font-semibold tracking-[0.4em] uppercase text-primary">
                Aceros Especiales · Est. 2013
              </span>
            </motion.div>

            <h1 className="sr-only">ACEROSCAS — Distribuidores de Acero Especial en Buenos Aires</h1>
            <div aria-hidden="true" className="font-display font-800 text-[3.2rem] md:text-[5.5rem] lg:text-[7.5rem] leading-[0.92] tracking-tight text-background mb-8">
              <div className="overflow-hidden"><CharReveal text="Tres" delay={0.7} /></div>
              <div className="overflow-hidden"><CharReveal text="generaciones" delay={0.85} /></div>
              <div className="overflow-hidden text-primary"><CharReveal text="forjando" delay={1.05} /></div>
              <div className="overflow-hidden">
                <CharReveal text="la industria" delay={1.2} />
                <motion.span
                  className="text-primary inline-block ml-1"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.8, type: "spring", stiffness: 300 }}
                >.</motion.span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
              <motion.p
                className="font-body text-base md:text-lg text-background/50 max-w-md leading-relaxed"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 1.4 }}
              >
                Aceros Especiales con stock permanente y
                entregas en toda la Argentina.
              </motion.p>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 1.6 }}
              >
                <MagneticButton
                  href="/contacto"
                  className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-body font-semibold text-sm tracking-wide px-10 py-5 hover:brightness-110 transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="relative z-10">HABLÁ CON NOSOTROS</span>
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

        {/* Bottom right */}
        <motion.div
          className="hidden md:block absolute bottom-8 right-16 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <p className="font-body text-[10px] tracking-[0.2em] text-background/20 text-right">
            DISTRIBUIDORES DE ACERO<br />BUENOS AIRES, ARGENTINA
          </p>
        </motion.div>

        {/* Large "50" */}
        <div className="hidden lg:flex absolute right-16 bottom-20 z-10 flex-col items-end">
          <motion.div
            className="font-display font-800 text-[14rem] leading-none text-background/[0.04] select-none"
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

export default HeroV2;
