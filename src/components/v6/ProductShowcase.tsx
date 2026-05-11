import { useRef, useState, useEffect, lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SteelShapes3D = lazy(() => import("./SteelShapes3D"));

const products = [
  {
    id: "redondo",
    name: "Redondos",
    description: "Barras de acero macizo de sección circular. Calidades SAE 1010, 1045, 4140, 8620.",
    specs: "Ø 6mm a 300mm",
  },
  {
    id: "cuadrado",
    name: "Cuadrados",
    description: "Barras de sección cuadrada para matricería y mecanizado. Trefilados y laminados.",
    specs: "6x6mm a 150x150mm",
  },
  {
    id: "hexagonal",
    name: "Hexagonales",
    description: "Barras hexagonales para bulonería, tornillería y piezas especiales.",
    specs: "8mm a 75mm entre caras",
  },
  {
    id: "palanquilla",
    name: "Palanquillas",
    description: "Acero macizo en bruto para forja y mecanizado pesado. Nuestro fuerte.",
    specs: "Sección 100x100 a 200x200mm",
  },
  {
    id: "planchuela",
    name: "Planchuelas",
    description: "Barras planas de acero para herrería, estructuras y piezas especiales.",
    specs: "Espesores de 3mm a 50mm",
  },
];


const ProductShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 60vh por producto = scroll más rápido que antes (era 100vh)
  const VH_PER_PRODUCT = 60;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const segment = 1 / products.length;
      const idx = Math.floor((v + segment / 2) / segment);
      setActiveIndex(Math.min(Math.max(0, idx), products.length - 1));
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const bgX = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-foreground"
      style={{ height: `${products.length * VH_PER_PRODUCT}vh` }}
    >
      {/* Background scrolling text */}
      <motion.div
        className="fixed top-1/2 -translate-y-1/2 font-display font-800 text-[12rem] md:text-[20rem] leading-none text-background/[0.015] select-none pointer-events-none whitespace-nowrap z-0"
        style={{ x: bgX }}
      >
        ACEROS ESPECIALES • CALIDAD • INDUSTRIA
      </motion.div>

      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Left: 3D Shape */}
          <div className="relative h-[50vh] lg:h-full bg-foreground">
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <motion.div
                  className="w-16 h-16 border-2 border-primary/20 border-t-primary rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
            }>
              <SteelShapes3D activeShape={products[activeIndex].id} />
            </Suspense>

            {/* Product number */}
            <motion.div
              key={activeIndex}
              className="absolute bottom-8 left-8 md:left-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="font-display font-800 text-7xl md:text-9xl text-background/[0.06] select-none">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
            </motion.div>
          </div>

          {/* Right: Content */}
          <div className="flex items-center py-12 lg:py-0 px-8 md:px-16 lg:px-20 bg-foreground">
            <div className="max-w-lg w-full">
              <motion.div
                className="flex items-center gap-4 mb-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="h-[2px] w-10 bg-primary" />
                <span className="font-body text-xs font-semibold tracking-[0.4em] uppercase text-primary">
                  Productos
                </span>
              </motion.div>

              <motion.h2
                className="font-display font-800 text-3xl md:text-4xl lg:text-5xl leading-[0.92] tracking-tight text-background mb-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              >
                Todo el acero
                <br />
                que tu fábrica
                <br />
                <span className="text-primary">necesita</span>
                <span className="text-primary">.</span>
              </motion.h2>

              {/* Product list */}
              <div className="space-y-0">
                {products.map((product, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <motion.div
                      key={product.id}
                      className={`group border-b border-background/10 py-3 cursor-pointer transition-all duration-500 ${
                        isActive ? "pl-4 border-l-2 border-l-primary" : "pl-0 border-l-2 border-l-transparent"
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.06 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className={`font-display font-800 text-xl md:text-2xl transition-colors duration-400 ${
                            isActive ? "text-primary" : "text-background/40"
                          }`}>
                            {product.name}
                          </span>
                          <motion.div
                            initial={false}
                            animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="font-body text-sm text-background/50 mt-2 max-w-sm leading-relaxed">
                              {product.description}
                            </p>
                            <span className="font-body text-xs text-primary/80 mt-1 inline-block tracking-wide">
                              {product.specs}
                            </span>
                          </motion.div>
                        </div>
                        <motion.svg
                          className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                            isActive ? "text-primary translate-x-1" : "text-background/15"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </motion.svg>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Progress indicator */}
              <div className="mt-8 flex items-center gap-3">
                <span className="font-body text-xs text-background/30 tracking-wider">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
                </span>
                <div className="flex-1 h-[1px] bg-background/10 relative">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-primary"
                    animate={{ width: `${((activeIndex + 1) / products.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
