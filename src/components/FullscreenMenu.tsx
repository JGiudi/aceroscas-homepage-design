import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";

const FullscreenMenu = ({ homeHref = "/" }: { homeHref?: string }) => {
  const menuLinks = [
    { label: "Inicio", href: homeHref, num: "01" },
    { label: "Productos", href: "/productos", num: "02" },
    { label: "Contacto", href: "/contacto", num: "03" },
  ];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger button */}
    <motion.button
      className="fixed top-8 right-8 md:right-16 z-[60] w-14 h-14 flex items-center justify-center group mix-blend-difference"
      onClick={() => setIsOpen(!isOpen)}
      whileHover="hover"
      initial={false}
      animate={isOpen ? "open" : "closed"}
    >
      <div className="relative w-8 h-5 flex flex-col justify-between pointer-events-none">
        <motion.span
          className="block h-[2px] bg-white origin-left"
          variants={{
            closed: { rotate: 0, y: 0, width: "100%" },
            open: { rotate: 45, y: -2, width: "120%" },
            hover: { width: "120%", x: -2 }
          }}
          transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
        />
        <motion.span
          className="block h-[2px] bg-white origin-center"
          variants={{
            closed: { opacity: 1, scaleX: 1 },
            open: { opacity: 0, scaleX: 0 },
            hover: { scaleX: 1.2 }
          }}
          transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
        />
        <motion.span
          className="block h-[2px] bg-white origin-left"
          variants={{
            closed: { rotate: 0, y: 0, width: "60%" },
            open: { rotate: -45, y: 2, width: "120%" },
            hover: { width: "100%" }
          }}
          transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
        />
      </div>
    </motion.button>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-foreground flex items-center"
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 3rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          >
            {/* Background decorative elements */}
            <motion.div
              className="absolute top-20 right-20 font-display font-800 text-[20rem] leading-none text-background/[0.02] select-none"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              AC
            </motion.div>

            {/* Grid lines */}
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-0 bottom-0 w-px bg-background/[0.04]"
                  style={{ left: `${(i + 1) * (100 / 7)}%` }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                />
              ))}
            </div>

            <div className="container mx-auto px-8 md:px-16 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Links */}
                <nav className="flex flex-col gap-2">
                  {menuLinks.map((link, i) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-baseline gap-6 py-4 border-b border-background/10 overflow-hidden"
                      initial={{ y: 80, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.7,
                        ease: [0.33, 1, 0.68, 1],
                        delay: 0.3 + i * 0.1,
                      }}
                    >
                      <span className="font-body text-xs tracking-[0.3em] text-primary/60 group-hover:text-primary transition-colors duration-500">
                        {link.num}
                      </span>
                      <span className="font-display font-800 text-5xl md:text-7xl lg:text-8xl text-background tracking-tight group-hover:text-primary transition-colors duration-500 relative">
                        {link.label}
                        <motion.span
                          className="absolute -bottom-2 left-0 h-[3px] bg-primary"
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.5 }}
                        />
                      </span>
                      <motion.svg
                        className="w-8 h-8 text-background/20 group-hover:text-primary group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-500 ml-auto"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                      </motion.svg>
                    </motion.a>
                  ))}
                </nav>

                {/* Info column */}
                <motion.div
                  className="hidden lg:flex flex-col justify-end pb-8"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  <div className="space-y-8">
                    <div>
                      <p className="font-body text-xs tracking-[0.3em] uppercase text-background/30 mb-1">Ventas CABA</p>
                      <a href="tel:+5491123192749" className="font-body text-sm text-background/60 hover:text-primary transition-colors block">
                        +54 9 11 2319-2749
                      </a>
                      <a href="mailto:ventas@aceroscas.com.ar" className="font-body text-sm text-background/60 hover:text-primary transition-colors block">
                        ventas@aceroscas.com.ar
                      </a>
                    </div>
                    <div>
                      <p className="font-body text-xs tracking-[0.3em] uppercase text-background/30 mb-1">Ventas Interior</p>
                      <a href="https://wa.me/5491158392680" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-background/60 hover:text-primary transition-colors block">
                        +54 11 5839-2680
                      </a>
                      <a href="mailto:franco@aceroscas.com.ar" className="font-body text-sm text-background/60 hover:text-primary transition-colors block">
                        franco@aceroscas.com.ar
                      </a>
                    </div>
                    <div>
                      <p className="font-body text-xs tracking-[0.3em] uppercase text-background/30 mb-3">Info</p>
                      <a href="mailto:info@aceroscas.com.ar" className="font-body text-sm text-background/60 hover:text-primary transition-colors">
                        info@aceroscas.com.ar
                      </a>
                    </div>
                    <div>
                      <p className="font-body text-xs tracking-[0.3em] uppercase text-background/30 mb-3">Ubicación</p>
                      <p className="font-body text-sm text-background/60">
                        Provincia de Buenos Aires
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Bottom bar */}
            <motion.div
              className="absolute bottom-8 left-8 md:left-16 right-8 md:right-16 flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <span className="font-display font-800 text-xl text-background">
                ACEROSCAS<span className="text-primary">.</span>
              </span>
              <span className="font-body text-xs text-background/20 tracking-[0.2em]">
                DISTRIBUIDORES DE ACERO — DESDE 1973
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FullscreenMenu;
