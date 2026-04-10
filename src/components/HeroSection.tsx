import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import geometricPattern from "@/assets/geometric-pattern.png";
import MagneticButton from "./MagneticButton";

const navLinks = [
  { label: "NOSOTROS", href: "#legado" },
  { label: "VENTAJAS", href: "#ventajas" },
  { label: "CONTACTO", href: "#contacto" },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const numberOpacity = useTransform(scrollYProgress, [0, 0.4], [0.03, 0.08]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Geometric pattern overlay with parallax */}
      <motion.div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `url(${geometricPattern})`,
          backgroundSize: "300px",
          backgroundRepeat: "repeat",
          y: bgY,
        }}
      />

      {/* Animated grain noise */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top navigation bar */}
      <motion.nav
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-16 py-8"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 1 }}
      >
        <motion.div
          className="font-display font-800 text-2xl tracking-tight text-foreground"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          ACEROSCAS<span className="text-primary">.</span>
        </motion.div>
        <div className="hidden md:flex items-center gap-10 font-body text-sm font-medium tracking-wide text-muted-foreground">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="relative hover:text-foreground transition-colors duration-300 group"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 + i * 0.1, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-500" />
            </motion.a>
          ))}
        </div>
      </motion.nav>

      {/* Hero content with parallax */}
      <motion.div
        className="relative z-10 container mx-auto px-8 md:px-16"
        style={{ y: textY, opacity, scale }}
      >
        <div className="max-w-4xl">
          {/* Red accent line */}
          <motion.div
            className="h-[3px] bg-primary mb-10"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
          />

          <motion.p
            className="font-body text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.5 }}
          >
            Distribuidores de acero desde 1973
          </motion.p>

          {/* Title with word-by-word reveal */}
          <h1 className="font-display font-800 text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight text-foreground mb-8">
            {["Tres", "generaciones"].map((word, i) => (
              <span key={word} className="inline-block overflow-hidden mr-[0.3em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.6 + i * 0.07 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <br />
            {["forjando"].map((word) => (
              <span key={word} className="inline-block overflow-hidden mr-[0.3em] text-secondary">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.8 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <br />
            {["la", "industria"].map((word, i) => (
              <span key={word} className="inline-block overflow-hidden mr-[0.3em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.9 + i * 0.07 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <motion.span
              className="text-primary inline-block"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.2, type: "spring", stiffness: 300 }}
            >
              .
            </motion.span>
          </h1>

          <motion.p
            className="font-body text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed mb-12"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 1.0 }}
          >
            El punto de encuentro entre la solidez de la trayectoria
            y la agilidad de la logística moderna.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 1.2 }}
          >
            <MagneticButton
              href="#contacto"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-body font-semibold text-sm tracking-wide px-8 py-4 hover:brightness-110 transition-all duration-300 group relative overflow-hidden"
            >
              <span className="relative z-10">HABLÁ CON LOS DUEÑOS</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300 relative z-10"
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
      </motion.div>

      {/* Right side steel texture accent with parallax */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[35%]">
        <motion.div
          className="absolute inset-0"
          style={{ y: bgY }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-bl from-muted/80 via-border/40 to-transparent" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-16 z-20"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1], delay: 1.4 }}
        >
          <motion.div
            className="font-display text-[12rem] font-800 leading-none select-none"
            style={{ opacity: numberOpacity }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            50
          </motion.div>
          <p className="font-body text-xs tracking-[0.2em] text-muted-foreground/60 text-right -mt-6">
            AÑOS
          </p>
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-8 md:left-16 flex items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <motion.div
          className="w-[1px] h-10 bg-primary/40"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="font-body text-xs tracking-[0.2em] text-muted-foreground">
          SCROLL
        </span>
      </motion.div>
    </section>
  );
};

export default HeroSection;
