import { useRef, useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";

const events = [
  { year: "1973", title: "Nace Sudaceros", desc: "Renzo Casalini funda la empresa con el primer stock de acero en Buenos Aires. Empieza todo." },
  { year: "2005", title: "La nueva generación", desc: "La segunda generación entra al negocio. Más catálogo, más clientes, misma filosofía." },
  { year: "2010", title: "Mil toneladas", desc: "El stock supera las 1.000 toneladas permanentes. Un hito que redefine la escala." },
  { year: "2013", title: "Nace AcerosCas", desc: "La tercera generación funda AcerosCas. Sucesión 100% familiar, cero interrupciones." },
  { year: "2023", title: "5 máquinas automáticas", desc: "Capacidad de corte hasta 550mm. La inversión más grande de la historia." },
  { year: "2025", title: "Primer camión propio", desc: "Entrega propia en CABA. El interior, con red terciarizada de confianza." },
  { year: "2026", title: "Depósito propio", desc: "El siguiente capítulo: infraestructura propia para la próxima década." },
];

// Dígito individual con animación de slot-machine.
// CLAVE: font-size se hereda del contenedor padre, así '1em' es el tamaño correcto.
const Digit = ({ value, delay = 0 }: { value: string; delay?: number }) => (
  <span
    style={{
      display: "inline-block",
      overflow: "hidden",
      height: "1em",       // 1em del parent = 1 dígito de alto → clip correcto
      verticalAlign: "bottom",
    }}
  >
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={value}
        style={{ display: "block" }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.42, ease: [0.33, 1, 0.68, 1], delay }}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  </span>
);

const OdometerYear = ({ year }: { year: string }) => (
  // font-size en este div → todos los 'em' de los hijos lo usan
  <div
    className="font-display font-800 select-none pointer-events-none leading-none tracking-tight"
    style={{
      fontSize: "clamp(5rem, 18vw, 18rem)",
      color: "rgba(255,255,255,0.052)",
      letterSpacing: "-0.02em",
      lineHeight: 1,
    }}
  >
    {year.split("").map((d, i) => (
      <Digit key={i} value={d} delay={i * 0.055} />
    ))}
  </div>
);

export default function TimelineV7() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const raw = Math.floor(v * events.length + 0.03);
      setActiveIndex(Math.min(Math.max(raw, 0), events.length - 1));
    });
  }, [scrollYProgress]);

  const current = events[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative bg-foreground"
      style={{ height: `${events.length * 110}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Año gigante watermark centrado */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex + "-bg"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <OdometerYear year={current.year} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Header */}
        <div className="absolute top-8 left-8 md:left-16 flex items-center gap-3">
          <div className="h-px w-6 bg-primary" />
          <span className="font-body text-[10px] tracking-[0.4em] uppercase text-background/25">Historia</span>
        </div>

        {/* Scroll hint */}
        <div className="absolute top-8 right-8 md:right-16">
          <span className="font-body text-[9px] tracking-[0.3em] text-background/15 uppercase">
            {activeIndex < events.length - 1 ? "seguí bajando" : "fin de la historia"}
          </span>
        </div>

        {/* Contenido — abajo */}
        <div className="absolute bottom-0 left-0 right-0 pb-14 px-8 md:px-16">

          {/* Barra de progreso por hitos */}
          <div className="flex gap-1 mb-8">
            {events.map((_, i) => (
              <div key={i} className="h-px bg-background/10 flex-1 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-primary"
                  initial={false}
                  animate={{ scaleX: i <= activeIndex ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                  style={{ transformOrigin: "left" }}
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.42, ease: [0.33, 1, 0.68, 1] }}
              >
                <span className="block font-display font-800 text-6xl md:text-8xl leading-none text-background mb-3">
                  {current.year}
                </span>
                <h3 className="font-display font-800 text-xl md:text-2xl text-background/45 mb-2">
                  {current.title}
                </h3>
                <p className="font-body text-sm text-background/30 max-w-md leading-relaxed">
                  {current.desc}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="hidden lg:flex justify-end items-end">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex + "-counter"}
                  className="text-right"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="font-display font-800 text-[6rem] leading-none text-background/[0.04] select-none">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="block font-body text-[10px] tracking-[0.4em] text-background/18 uppercase mt-1">
                    de {String(events.length).padStart(2, "0")} hitos
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
