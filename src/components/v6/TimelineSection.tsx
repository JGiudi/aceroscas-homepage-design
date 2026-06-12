import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const timelineEvents = [
  {
    year: "AÑOS '70",
    title: "Nace Sudaceros",
    description:
      "Renzo Casalini funda Sudaceros en Buenos Aires. Primera generación familiar en el rubro del acero — la semilla de todo lo que vendría.",
  },
  {
    year: "2005",
    title: "La nueva generación",
    description:
      "La siguiente generación da sus primeros pasos en el negocio. Nuevas ideas, mismos valores: el trato directo y la palabra que se cumple.",
  },
  {
    year: "2010",
    title: "Mil toneladas en stock",
    description:
      "Superamos las 1.000 toneladas de acero en stock permanente. Un hito que marca la escala y la seriedad del negocio familiar.",
  },
  {
    year: "2013",
    title: "Nace AcerosCas",
    description:
      "AcerosCas surge como la sucesión familiar de Sudaceros, empresa creada por Renzo Casalini (primera generación). Pasa a ser 100% de la familia — nuevo nombre, misma esencia.",
  },
  {
    year: "2023–2025",
    title: "Renovación tecnológica",
    description:
      "Incorporamos 5 máquinas automáticas de corte con capacidad hasta 550mm de diámetro. Precisión industrial al servicio de la producción de nuestros clientes.",
  },
  {
    year: "2025",
    title: "Logística propia en CABA",
    description:
      "Adquirimos nuestro primer camión propio. Distribución directa dentro de Provincia de Buenos Aires; para el interior, red de distribución terciarizada que cubre cada rincón del país.",
  },
  {
    year: "2026",
    title: "Depósito propio",
    description:
      "Un hito histórico: AcerosCas estrena su primer depósito propio en Buenos Aires. El espacio que necesitábamos para seguir creciendo.",
  },
  {
    year: "HOY",
    title: "Medio siglo de confianza",
    description:
      "Más de 50 años de historia familiar en el rubro del acero. Tres generaciones, miles de clientes, una sola promesa.",
  },
];

const TimelineSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 bg-background overflow-hidden">
      {/* Background watermark */}
      <motion.div
        className="absolute top-1/2 right-0 -translate-y-1/2 font-display font-800 text-[18rem] md:text-[28rem] leading-none text-foreground/[0.015] select-none pointer-events-none whitespace-nowrap"
        style={{ x: useTransform(scrollYProgress, [0, 1], ["10%", "-20%"]) }}
      >
        50 AÑOS
      </motion.div>

      <div className="container mx-auto px-8 md:px-16 relative z-10">
        {/* Section header */}
        <div className="mb-24 md:mb-32">
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-[2px] w-10 bg-primary" />
            <span className="font-body text-xs font-semibold tracking-[0.4em] uppercase text-primary">
              Nuestra Historia
            </span>
          </motion.div>

          <h2 className="font-display font-800 text-4xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight text-foreground max-w-3xl">
            Más de medio siglo
            <br />
            de historia
            <span className="text-primary"> familiar</span>
            <span className="text-primary">.</span>
          </h2>

          <motion.p
            className="font-body text-base text-muted-foreground mt-6 max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            10 años como AcerosCas, con más de 50 años de trayectoria familiar en el rubro.
            Tres generaciones forjando confianza.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated center line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border">
            <motion.div
              className="w-full bg-primary origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Events */}
          <div className="space-y-20 md:space-y-28">
            {timelineEvents.map((event, i) => {
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={event.year}
                  className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16`}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.1,
                  }}
                >
                  {/* Dot on the timeline line */}
                  <motion.div
                    className="absolute left-8 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-background border-[3px] border-primary z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3, type: "spring", stiffness: 300 }}
                  />

                  {/* Content */}
                  <div
                    className={`pl-20 md:pl-0 ${
                      isLeft
                        ? "md:pr-20 md:text-right"
                        : "md:col-start-2 md:pl-20"
                    }`}
                  >
                    <motion.span
                      className="font-display font-800 text-5xl md:text-7xl leading-none text-foreground/[0.06] block mb-4"
                      initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      {event.year}
                    </motion.span>

                    <h3 className="font-display font-700 text-2xl md:text-3xl text-foreground mb-4 tracking-tight">
                      {event.title}
                    </h3>

                    <motion.div
                      className={`h-[2px] bg-primary mb-6 ${isLeft ? "md:ml-auto" : ""}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: 48 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    />

                    <p className="font-body text-base text-muted-foreground leading-relaxed max-w-md">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
