import { useRef, lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ClipPathReveal from "./ClipPathReveal";

const SteelTube3DV2 = lazy(() => import("./SteelTube3DV2"));

const TubeShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgX = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section ref={sectionRef} className="relative py-0 bg-foreground overflow-hidden">
      {/* Background scrolling text */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 font-display font-800 text-[15rem] md:text-[25rem] leading-none text-background/[0.015] select-none pointer-events-none whitespace-nowrap"
        style={{ x: bgX }}
      >
        ACERO • TUBOS • BARRAS • PERFILES
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left: 3D Tube */}
        <ClipPathReveal direction="left" className="relative h-[60vh] lg:h-auto">
          <div className="absolute inset-0 bg-foreground">
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <motion.div
                  className="w-16 h-16 border-2 border-primary/20 border-t-primary rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
            }>
              <SteelTube3DV2 />
            </Suspense>
          </div>
        </ClipPathReveal>

        {/* Right: Content */}
        <div className="flex items-center py-20 md:py-28 lg:py-0 px-8 md:px-16 lg:px-20 bg-foreground">
          <div className="max-w-lg">
            <motion.div
              className="flex items-center gap-4 mb-8"
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
              className="font-display font-800 text-4xl md:text-5xl lg:text-6xl leading-[0.92] tracking-tight text-background mb-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            >
              Todo el acero
              <br />
              que tu obra
              <br />
              <span className="text-primary">necesita</span>
              <span className="text-primary">.</span>
            </motion.h2>

            <motion.div
              className="h-[2px] bg-primary mb-10"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />

            {/* Product list */}
            <div className="space-y-6">
              {["Barras de acero", "Chapas y planchuelas", "Tubos sin costura", "Perfiles estructurales", "Acero inoxidable", "Hierro comercial"].map((product, i) => (
                <motion.div
                  key={product}
                  className="group flex items-center justify-between border-b border-background/10 pb-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                >
                  <span className="font-body text-lg text-background/70 group-hover:text-background transition-colors duration-300">
                    {product}
                  </span>
                  <motion.svg
                    className="w-5 h-5 text-background/20 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TubeShowcase;
