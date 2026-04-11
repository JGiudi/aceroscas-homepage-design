import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const categories = [
  {
    title: "Redondos",
    subtitle: "SAE 1010 · 1045 · 4140 · 8620",
    description: "Barras macizas de sección circular. Ø 6mm a 300mm. Trefilados y laminados en caliente.",
    number: "01",
    gradient: "from-primary/20 to-transparent",
  },
  {
    title: "Cuadrados",
    subtitle: "Trefilados · Laminados",
    description: "Sección cuadrada para matricería y mecanizado. 6x6mm a 150x150mm.",
    number: "02",
    gradient: "from-secondary/30 to-transparent",
  },
  {
    title: "Hexagonales",
    subtitle: "Bulonería · Tornillería",
    description: "Barras hexagonales de 8mm a 75mm entre caras. Calidades especiales.",
    number: "03",
    gradient: "from-primary/15 to-transparent",
  },
  {
    title: "Palanquillas",
    subtitle: "Nuestro fuerte",
    description: "Acero macizo en bruto para forja y mecanizado pesado. Sección 100x100 a 200x200mm.",
    number: "04",
    gradient: "from-secondary/20 to-transparent",
  },
];

const ParallaxGallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 bg-background overflow-hidden">
      {/* Giant background text */}
      <motion.div
        className="absolute top-1/2 left-0 -translate-y-1/2 font-display font-800 text-[15rem] md:text-[25rem] leading-none text-foreground/[0.015] select-none pointer-events-none whitespace-nowrap"
        style={{ x: useTransform(scrollYProgress, [0, 1], ["5%", "-30%"]) }}
      >
        CATÁLOGO • PRODUCTOS
      </motion.div>

      <div className="container mx-auto px-8 md:px-16 relative z-10">
        {/* Header */}
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
              Catálogo
            </span>
          </motion.div>

          <h2 className="font-display font-800 text-4xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight text-foreground">
            Acero macizo
            <br />
            <span className="text-primary">en todas sus formas</span>
            <span className="text-primary">.</span>
          </h2>
        </div>

        {/* Category cards with parallax */}
        <div className="space-y-0">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.number} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CategoryCard = ({ category, index }: { category: typeof categories[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      className="relative border-t border-border py-16 md:py-24"
      style={{ scale }}
    >
      <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center ${isEven ? "" : "md:direction-rtl"}`}>
        {/* Number */}
        <motion.div
          className={`md:col-span-2 ${isEven ? "" : "md:col-start-11 md:text-right"}`}
          style={{ y }}
        >
          <span className="font-display font-800 text-[8rem] md:text-[12rem] leading-none text-foreground/[0.04] select-none block">
            {category.number}
          </span>
        </motion.div>

        {/* Content */}
        <motion.div
          className={`md:col-span-5 ${isEven ? "md:col-start-3" : "md:col-start-4"}`}
          initial={{ opacity: 0, x: isEven ? -60 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="direction-ltr">
            <span className="font-body text-[10px] tracking-[0.4em] uppercase text-primary/60 block mb-3">
              {category.subtitle}
            </span>
            <h3 className="font-display font-800 text-5xl md:text-7xl tracking-tight text-foreground mb-6">
              {category.title}
            </h3>
            <motion.div
              className="h-[2px] bg-primary mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <p className="font-body text-base text-muted-foreground leading-relaxed max-w-md">
              {category.description}
            </p>
          </div>
        </motion.div>

        {/* Visual block - abstract steel texture */}
        <motion.div
          className={`md:col-span-4 ${isEven ? "md:col-start-9" : "md:col-start-1"}`}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{ y: useTransform(scrollYProgress, [0, 1], [40, -40]) }}
        >
          <div className="direction-ltr">
            <div className={`relative aspect-[4/3] bg-gradient-to-br ${category.gradient} overflow-hidden`}>
              {/* Abstract steel pattern */}
              <div className="absolute inset-0">
                {[...Array(5)].map((_, j) => (
                  <motion.div
                    key={j}
                    className="absolute bg-foreground/[0.03]"
                    style={{
                      width: `${20 + j * 15}%`,
                      height: "1px",
                      top: `${15 + j * 18}%`,
                      left: `${j * 5}%`,
                    }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 + j * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  />
                ))}
              </div>
              {/* Cross shape */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-primary/30" />
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[1px] bg-primary/30" />
              </div>
              {/* Corner marks */}
              <div className="absolute top-4 left-4 w-6 h-6 border-l border-t border-foreground/10" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-foreground/10" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ParallaxGallery;
