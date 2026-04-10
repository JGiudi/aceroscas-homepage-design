import { useRef } from "react";
import { Clock, Package, Users, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import geometricPattern from "@/assets/geometric-pattern.png";
import TextReveal from "./TextReveal";

const advantages = [
  {
    icon: Clock,
    title: "Entregas en 24–48 hs",
    description:
      "Logística propia diseñada para cumplir plazos. Si te damos una fecha, la respetamos.",
    accent: "01",
  },
  {
    icon: Package,
    title: "Stock permanente",
    description:
      "Más de 50 años nos enseñaron qué necesita la industria. Tenemos lo que buscás, siempre.",
    accent: "02",
  },
  {
    icon: Users,
    title: "Atención personalizada",
    description:
      "Conocemos a cada cliente por su nombre. El trato de dueño a dueño no es un eslogan, es cómo trabajamos.",
    accent: "03",
  },
];

const AdvantagesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section ref={sectionRef} id="ventajas" className="py-28 md:py-40 bg-foreground relative overflow-hidden">
      {/* Pattern overlay */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url(${geometricPattern})`,
          backgroundSize: "200px",
          backgroundRepeat: "repeat",
          y: bgY,
        }}
      />

      {/* Grid lines */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-background/[0.04]"
            style={{ left: `${(i + 1) * (100 / 7)}%` }}
          />
        ))}
      </div>

      <div className="container mx-auto px-8 md:px-16 relative z-10">
        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="h-[2px] w-10 bg-primary" />
              <span className="font-body text-xs font-semibold tracking-[0.4em] uppercase text-primary">
                Ventaja Competitiva
              </span>
            </motion.div>

            <h2 className="font-display font-800 text-4xl md:text-5xl lg:text-[3.8rem] leading-[0.92] tracking-tight text-background">
              <TextReveal>Por qué eligen</TextReveal>
              <br />
              <span className="text-primary">
                <TextReveal delay={0.15}>trabajar</TextReveal>
              </span>
              <br />
              <TextReveal delay={0.25}>con nosotros</TextReveal>
              <motion.span
                className="text-primary inline-block"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
              >
                .
              </motion.span>
            </h2>
          </div>

          <motion.div
            className="flex items-end"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="font-body text-base text-background/40 max-w-sm leading-relaxed">
              Cada detalle de nuestro proceso está pensado para que
              tu obra no se detenga. La industria no espera, nosotros tampoco.
            </p>
          </motion.div>
        </div>

        {/* Cards — horizontal full-width layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-background/10">
          {advantages.map((item, i) => (
            <motion.div
              key={item.accent}
              className="group relative border-b md:border-b-0 md:border-r border-background/10 last:border-r-0 p-10 md:p-12 lg:p-16"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.8,
                ease: [0.33, 1, 0.68, 1],
                delay: i * 0.15,
              }}
            >
              {/* Number */}
              <motion.span
                className="font-display text-[6rem] md:text-[8rem] font-800 leading-none text-background/[0.03] absolute top-4 right-8 select-none group-hover:text-primary/10 transition-colors duration-700"
              >
                {item.accent}
              </motion.span>

              {/* Icon */}
              <motion.div
                className="w-14 h-14 flex items-center justify-center mb-10 text-primary border border-primary/20 group-hover:border-primary group-hover:bg-primary/10 transition-all duration-500"
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <item.icon className="w-6 h-6" strokeWidth={1.5} />
              </motion.div>

              <h3 className="font-display font-700 text-2xl md:text-3xl text-background mb-4 tracking-tight">
                {item.title}
              </h3>

              <motion.div
                className="h-[2px] bg-primary mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
              />

              <p className="font-body text-background/40 leading-relaxed text-sm md:text-base mb-8">
                {item.description}
              </p>

              {/* Hover arrow */}
              <motion.div
                className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              >
                <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase">Ver más</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
