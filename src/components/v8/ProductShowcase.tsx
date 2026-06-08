import { useRef, useState, useEffect, lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SteelShapes3D = lazy(() => import("../v6/SteelShapes3D"));

const products = [
  {
    id: "redondo",
    name: "Redondos",
    categories: [
      {
        type: "Trefilados",
        qualities: "SAE 1010, 1026, 1040, 1045, 4140, 8620, 1212, 12L14",
        sizes: "Ø 3mm a 60mm",
      },
      {
        type: "Laminados",
        qualities: "SAE 1010, 1026, 1040, 1045, 4130, 4140, 4140 BONIFICADO, 4340, 8620, 52100",
        sizes: "Ø 15,8mm a 190mm",
      },
      {
        type: "Forjados",
        qualities: "SAE 1010, 1026, 1040, 1045, 4130, 4140, 4140 BONIFICADO, 4340, 8620, 52100",
        sizes: "Ø 203mm a 700mm",
      },
    ],
  },
  {
    id: "cuadrado",
    name: "Cuadrados",
    categories: [
      {
        type: "Trefilados",
        qualities: "SAE 1010, 1040, 1045, 1212, 12L14",
        sizes: "Entre caras 4mm a 70mm",
      },
      {
        type: "Forjados",
        qualities: "SAE 1010, 1040, 4140, 8620",
        sizes: "Corte a medida, espesor mín. 12mm",
      },
    ],
  },
  {
    id: "hexagonal",
    name: "Hexagonales",
    categories: [
      {
        type: "Trefilados",
        qualities: "SAE 1010, 1040, 1045",
        sizes: "6mm a 60mm",
      },
      {
        type: "Forjados",
        qualities: "SAE 1045",
        sizes: "50mm a 120mm",
      },
    ],
  },
  {
    id: "palanquilla",
    name: "Palanquillas",
    categories: [
      {
        type: "Laminadas",
        qualities: "SAE 1026, 1040, 1045, 4140, 8620",
        sizes: "50mm a 160mm",
      },
    ],
  },
  {
    id: "planchuela",
    name: "Planchuelas",
    categories: [
      {
        type: "",
        qualities: "SAE 1016, SAE 1045",
        sizes: "Medidas a consultar",
      },
    ],
  },
];

const Spinner = () => (
  <div className="w-full h-full flex items-center justify-center">
    <motion.div
      className="w-16 h-16 border-2 border-primary/20 border-t-primary rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const ProductList = ({
  activeIndex,
  onSelect,
  interactive,
}: {
  activeIndex: number;
  onSelect?: (i: number) => void;
  interactive: boolean;
}) => (
  <div className="space-y-0">
    {products.map((product, i) => {
      const isActive = i === activeIndex;
      return (
        <motion.div
          key={product.id}
          className={`border-b border-background/10 py-3 transition-all duration-500 ${
            interactive ? "cursor-pointer" : ""
          } ${isActive ? "pl-4 border-l-2 border-l-primary" : "pl-0 border-l-2 border-l-transparent"}`}
          onClick={() => interactive && onSelect?.(i)}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.06 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <span
                className={`font-display font-800 text-xl md:text-2xl transition-colors duration-400 ${
                  isActive ? "text-primary" : "text-background/40"
                }`}
              >
                {product.name}
              </span>
              <motion.div
                initial={false}
                animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-2 space-y-3">
                  {product.categories.map((cat, ci) => (
                    <div key={ci}>
                      {cat.type && (
                        <span className="font-body text-[10px] font-semibold tracking-[0.3em] uppercase text-background/40 block mb-0.5">
                          {cat.type}
                        </span>
                      )}
                      <p className="font-body text-xs text-background/50 leading-relaxed">
                        {cat.qualities}
                      </p>
                      <span className="font-body text-xs text-primary/70 mt-0.5 inline-block tracking-wide">
                        {cat.sizes}
                      </span>
                    </div>
                  ))}
                </div>
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
);

const ProgressBar = ({ activeIndex }: { activeIndex: number }) => (
  <div className="flex items-center gap-3">
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
);

const SectionHeader = () => (
  <>
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
  </>
);

const ProductShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 1024
  );

  const VH_PER_PRODUCT = 60;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (isMobile) return;
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const segment = 1 / products.length;
      const idx = Math.floor((v + segment / 2) / segment);
      setActiveIndex(Math.min(Math.max(0, idx), products.length - 1));
    });
    return unsubscribe;
  }, [scrollYProgress, isMobile]);

  const bgX = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  // ── Mobile layout ──────────────────────────────────────────────
  if (isMobile) {
    return (
      <section className="bg-foreground px-6 pt-10 pb-12">
        <SectionHeader />
        <ProductList activeIndex={activeIndex} onSelect={setActiveIndex} interactive />
        <div className="mt-6">
          <ProgressBar activeIndex={activeIndex} />
        </div>
      </section>
    );
  }

  // ── Desktop layout (sticky scroll, igual que v6) ───────────────
  return (
    <section
      ref={sectionRef}
      className="relative bg-foreground"
      style={{ height: `${products.length * VH_PER_PRODUCT}vh` }}
    >
      <motion.div
        className="fixed top-1/2 -translate-y-1/2 font-display font-800 text-[20rem] leading-none text-background/[0.015] select-none pointer-events-none whitespace-nowrap z-0"
        style={{ x: bgX }}
      >
        ACEROS ESPECIALES • CALIDAD • INDUSTRIA
      </motion.div>

      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="grid grid-cols-2 h-full">
          {/* Left: 3D Shape */}
          <div className="relative h-full bg-foreground">
            <Suspense fallback={<Spinner />}>
              <SteelShapes3D activeShape={products[activeIndex].id} showReflection={false} />
            </Suspense>
            <motion.div
              key={activeIndex}
              className="absolute bottom-8 left-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="font-display font-800 text-9xl text-background/[0.06] select-none">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
            </motion.div>
          </div>

          {/* Right: Content */}
          <div className="flex items-center px-20 bg-foreground">
            <div className="max-w-lg w-full">
              <SectionHeader />
              <ProductList activeIndex={activeIndex} interactive={false} />
              <div className="mt-8">
                <ProgressBar activeIndex={activeIndex} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
