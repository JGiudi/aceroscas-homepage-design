import { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SteelShapes3D = lazy(() => import("@/components/v6/SteelShapes3D"));

const products = [
  { id: "redondo",     label: "Redondo",      tag: "Ø 6–300 mm",          desc: "SAE 1010, 1045, 4140, 8620" },
  { id: "cuadrado",   label: "Cuadrado",     tag: "6×6–150×150 mm",      desc: "Trefilados y laminados" },
  { id: "hexagonal",  label: "Hexagonal",    tag: "8–75 mm entre caras", desc: "Bulonería y tornillería" },
  { id: "palanquilla",label: "Palanquilla",  tag: "100×100–200×200 mm",  desc: "Forja y mecanizado pesado" },
  { id: "planchuela", label: "Planchuela",   tag: "Espesor 3–50 mm",     desc: "Herrería y estructuras" },
];

export default function ProductsV7() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative bg-foreground min-h-screen flex flex-col lg:flex-row overflow-hidden">

      {/* Izquierda — selector */}
      <div className="relative z-10 flex flex-col justify-center px-8 md:px-16 py-20 lg:py-0 lg:w-[42%]">

        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="h-px w-8 bg-primary" />
          <span className="font-body text-[10px] tracking-[0.45em] uppercase text-primary">Catálogo</span>
        </motion.div>

        <motion.h2
          className="font-display font-800 text-4xl md:text-5xl leading-tight tracking-tight text-background mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
        >
          Stock permanente.<br />
          <span className="text-primary">Entrega inmediata.</span>
        </motion.h2>

        <nav className="flex flex-col">
          {products.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className={`group relative text-left py-4 border-b transition-all duration-400 ${
                i === active
                  ? "border-b-primary/30 pl-5"
                  : "border-b-background/10 pl-0 hover:pl-3"
              }`}
            >
              {/* borde izquierdo activo */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary"
                initial={false}
                animate={{ scaleY: i === active ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
              />

              <div className="flex items-baseline justify-between">
                <span
                  className={`font-display font-800 text-2xl md:text-3xl transition-colors duration-300 ${
                    i === active ? "text-primary" : "text-background/30 group-hover:text-background/60"
                  }`}
                >
                  {p.label}
                </span>
                <span className="font-body text-[10px] tracking-wider text-background/20 ml-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <AnimatePresence>
                {i === active && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2 flex items-center gap-4">
                      <span className="font-body text-xs text-primary/70">{p.tag}</span>
                      <span className="text-background/20">·</span>
                      <span className="font-body text-xs text-background/35">{p.desc}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          ))}
        </nav>

        <motion.a
          href="/productos"
          className="mt-10 inline-flex items-center gap-3 font-body text-xs tracking-[0.3em] uppercase text-background/25 hover:text-primary transition-colors duration-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          Ver catálogo completo
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </motion.a>
      </div>

      {/* Derecha — 3D */}
      <div className="relative lg:flex-1 h-[55vw] lg:h-auto min-h-[400px]">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <motion.div
              className="w-10 h-10 border border-primary/30 border-t-primary rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        }>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SteelShapes3D activeShape={products[active].id} className="w-full h-full" />
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </div>
    </section>
  );
}
