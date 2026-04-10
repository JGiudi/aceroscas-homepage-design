import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const timelineEvents = [
  {
    year: "1973",
    title: "El comienzo",
    description: "Ariel Castiglioni funda AcerosCas con un depósito en Buenos Aires y una convicción: el trato directo vale más que cualquier contrato.",
  },
  {
    year: "1985",
    title: "Primer depósito propio",
    description: "La empresa crece y adquiere su primer galpón. Stock permanente se convierte en marca registrada.",
  },
  {
    year: "1998",
    title: "Segunda generación",
    description: "Los hijos de Ariel se suman al negocio. Se amplía el catálogo a acero inoxidable, perfiles y tubos.",
  },
  {
    year: "2010",
    title: "Logística nacional",
    description: "Entregas en 24hs a todo el país. Red de distribución propia que cubre cada rincón de Argentina.",
  },
  {
    year: "2020",
    title: "Tercera generación",
    description: "La nueva generación digitaliza los procesos sin perder el ADN familiar: de dueño a dueño.",
  },
  {
    year: "HOY",
    title: "50+ años de confianza",
    description: "Tres generaciones, miles de clientes, una sola promesa: la palabra que se cumple.",
  },
];

const TimelineSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 bg-background overflow-hidden">
      {/* Background text */}
      <motion.div
        className="absolute top-1/2 right-0 -translate-y-1/2 font-display font-800 text-[18rem] md:text-[28rem] leading-none text-foreground/[0.015] select-none pointer-events-none whitespace-nowrap"
        style={{ x: useTransform(scrollYProgress, [0, 1], ["10%", "-20%"]) }}
      >
        1973—HOY
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
            Medio siglo
            <br />
            <span className="text-primary">forjando</span> confianza
            <span className="text-primary">.</span>
          </h2>
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
          <div className="space-y-24 md:space-y-32">
            {timelineEvents.map((event, i) => {
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={event.year}
                  className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 ${
                    isLeft ? "" : "md:direction-rtl"
                  }`}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.1,
                  }}
                >
                  {/* Year dot on the line */}
                  <motion.div
                    className="absolute left-8 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-foreground border-[3px] border-primary z-10"
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
                      className="font-display font-800 text-6xl md:text-8xl leading-none text-foreground/[0.06] block mb-4"
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
