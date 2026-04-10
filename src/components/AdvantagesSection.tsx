import { Clock, Package, Users } from "lucide-react";
import { motion } from "framer-motion";
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

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1],
      delay: i * 0.15,
    },
  }),
};

const AdvantagesSection = () => {
  return (
    <section id="ventajas" className="py-28 md:py-40 bg-background relative overflow-hidden">
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url(${geometricPattern})`,
          backgroundSize: "250px",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="container mx-auto px-8 md:px-16 relative z-10">
        {/* Section header */}
        <div className="max-w-2xl mb-20">
          <motion.p
            className="font-body text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ventaja Competitiva
          </motion.p>
          <h2 className="font-display font-800 text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-foreground">
            <TextReveal>Por qué eligen</TextReveal>
            <br />
            <span className="text-secondary">
              <TextReveal delay={0.15}>trabajar con nosotros</TextReveal>
            </span>
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

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {advantages.map((item, i) => (
            <motion.div
              key={item.accent}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative bg-card border border-border p-10 md:p-12 hover:border-primary/30 transition-colors duration-500 cursor-default"
            >
              {/* Number accent */}
              <motion.span
                className="absolute top-6 right-8 font-display text-6xl font-800 text-foreground/[0.04] select-none group-hover:text-primary/10 transition-colors duration-500"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
              >
                {item.accent}
              </motion.span>

              {/* Icon with animated border */}
              <motion.div
                className="w-12 h-12 flex items-center justify-center mb-8 text-primary border border-primary/20 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-500"
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <item.icon className="w-5 h-5" strokeWidth={1.5} />
              </motion.div>

              <h3 className="font-display font-700 text-xl md:text-2xl text-foreground mb-4 tracking-tight">
                {item.title}
              </h3>

              <motion.div
                className="h-[2px] bg-primary/40 mb-6"
                initial={{ width: 32 }}
                whileHover={{ width: 48 }}
                transition={{ duration: 0.4 }}
                style={{ width: 32 }}
                className="h-[2px] bg-primary/40 mb-6 w-8 group-hover:w-12 transition-all duration-500"
              />

              <p className="font-body text-muted-foreground leading-relaxed text-sm md:text-base">
                {item.description}
              </p>

              {/* Bottom border animation on hover */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
