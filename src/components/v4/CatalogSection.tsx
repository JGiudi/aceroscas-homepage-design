import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const products = [
  {
    id: "redondos",
    name: "Redondos",
    number: "01",
    sae: "SAE 1010 · 1021 · 1045 · 1026 · 4140 · 8620",
    description: "Barras macizas de sección circular. Trefilados y laminados en caliente. El producto más versátil de nuestro catálogo.",
    specs: "Ø 6mm a 300mm",
    use: "Ejes, pernos, bulones, mecanizado general",
  },
  {
    id: "cuadrados",
    name: "Cuadrados",
    number: "02",
    sae: "SAE 1010 · 1045 · 4140",
    description: "Sección cuadrada para matricería y mecanizado de precisión. Trefilados y laminados.",
    specs: "6x6mm a 150x150mm",
    use: "Matrices, herramental, estructuras",
  },
  {
    id: "hexagonales",
    name: "Hexagonales",
    number: "03",
    sae: "SAE 1010 · 1045 · 4140 · 8620",
    description: "Barras hexagonales para bulonería, tornillería y piezas especiales de alta demanda.",
    specs: "8mm a 75mm entre caras",
    use: "Bulones, tuercas, tornillería industrial",
  },
  {
    id: "palanquillas",
    name: "Palanquillas",
    number: "04",
    sae: "Aceros especiales · Cementación · Temple",
    description: "Nuestro fuerte. Acero macizo en bruto para forja y mecanizado pesado. Sección cuadrada de gran tamaño.",
    specs: "100x100 a 200x200mm",
    use: "Forja, mecanizado pesado, grandes piezas",
  },
  {
    id: "planchuelas",
    name: "Planchuelas",
    number: "05",
    sae: "SAE 1010 · 1045",
    description: "Barras planas de acero para herrería, estructuras y piezas especiales.",
    specs: "Espesores de 3mm a 50mm",
    use: "Herrería, soportes, platinas",
  },
];

const CatalogSection = () => {
  const [activeId, setActiveId] = useState(products[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const activeProduct = products.find((p) => p.id === activeId) || products[0];

  return (
    <section ref={sectionRef} id="productos" className="relative py-32 md:py-48 bg-foreground overflow-hidden">
      {/* Moving bg text */}
      <motion.div
        className="absolute top-1/2 left-0 -translate-y-1/2 font-display font-800 text-[12rem] md:text-[22rem] leading-none text-background/[0.01] select-none pointer-events-none whitespace-nowrap"
        style={{ x: useTransform(scrollYProgress, [0, 1], ["5%", "-25%"]) }}
      >
        CATÁLOGO • ACERO • MACIZO
      </motion.div>

      <div className="container mx-auto px-8 md:px-16 relative z-10">
        {/* Header */}
        <div className="mb-20 md:mb-28">
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="h-[2px] w-10 bg-primary" />
            <span className="font-body text-xs font-semibold tracking-[0.4em] uppercase text-primary">
              Catálogo
            </span>
          </motion.div>

          <h2 className="font-display font-800 text-4xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight text-background">
            Acero macizo
            <br />
            <span className="text-primary">en todas sus formas</span>
            <span className="text-primary">.</span>
          </h2>
        </div>

        {/* Interactive catalog */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-background/10">
          {/* Left: product selector tabs */}
          <div className="lg:col-span-4 border-r border-background/10">
            {products.map((product, i) => (
              <motion.button
                key={product.id}
                onClick={() => setActiveId(product.id)}
                className={`w-full text-left px-8 py-6 border-b border-background/10 last:border-b-0 transition-all duration-500 group relative overflow-hidden ${
                  activeId === product.id ? "bg-primary/10" : "hover:bg-background/[0.03]"
                }`}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
              >
                {/* Active indicator line */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary"
                  initial={false}
                  animate={{ scaleY: activeId === product.id ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-4">
                    <span className={`font-display font-800 text-xs tracking-wider transition-colors duration-300 ${
                      activeId === product.id ? "text-primary" : "text-background/20"
                    }`}>
                      {product.number}
                    </span>
                    <span className={`font-display font-700 text-xl md:text-2xl tracking-tight transition-colors duration-300 ${
                      activeId === product.id ? "text-primary" : "text-background/50 group-hover:text-background/70"
                    }`}>
                      {product.name}
                    </span>
                  </div>

                  <motion.svg
                    className={`w-5 h-5 transition-all duration-300 ${
                      activeId === product.id ? "text-primary translate-x-1" : "text-background/10"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right: product detail */}
          <div className="lg:col-span-8 relative min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                className="p-10 md:p-16 h-full flex flex-col justify-between"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Big number bg */}
                <motion.span
                  className="absolute top-4 right-8 font-display font-800 text-[10rem] md:text-[16rem] leading-none text-background/[0.02] select-none pointer-events-none"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  {activeProduct.number}
                </motion.span>

                <div className="relative z-10">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="font-body text-[10px] tracking-[0.4em] uppercase text-primary/50">
                      {activeProduct.sae}
                    </span>
                  </div>

                  <h3 className="font-display font-800 text-5xl md:text-7xl tracking-tight text-background mb-6">
                    {activeProduct.name}
                  </h3>

                  <motion.div
                    className="h-[2px] bg-primary mb-8"
                    initial={{ width: 0 }}
                    animate={{ width: 64 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />

                  <p className="font-body text-base md:text-lg text-background/40 leading-relaxed max-w-lg mb-10">
                    {activeProduct.description}
                  </p>

                  {/* Specs grid */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="border border-background/10 p-5">
                      <span className="font-body text-[9px] tracking-[0.3em] uppercase text-background/25 block mb-2">Medidas</span>
                      <span className="font-display font-700 text-lg text-background/70">{activeProduct.specs}</span>
                    </div>
                    <div className="border border-background/10 p-5">
                      <span className="font-body text-[9px] tracking-[0.3em] uppercase text-background/25 block mb-2">Aplicación</span>
                      <span className="font-display font-700 text-lg text-background/70">{activeProduct.use}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <motion.a
                  href="#contacto"
                  className="inline-flex items-center gap-3 mt-10 font-body text-sm font-semibold text-primary tracking-wide group"
                  whileHover={{ x: 8 }}
                >
                  <span>PEDIR COTIZACIÓN</span>
                  <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;
