import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CHARS = "ACEROSCAS".split("");

export default function HeroV7() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 350),
      setTimeout(() => setPhase(2), 1050),
      setTimeout(() => setPhase(3), 2000),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative w-full h-screen bg-foreground flex items-center justify-center overflow-hidden">

      {/* Grid lines — aparecen al final */}
      <div className="absolute inset-0 pointer-events-none">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-background/[0.025]"
            style={{ left: `${i * (100 / 7)}%` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: phase >= 3 ? 1 : 0 }}
            transition={{ delay: 0.4 + i * 0.06, duration: 1.4, ease: [0.33, 1, 0.68, 1] }}
          />
        ))}
      </div>

      {/* La línea — el eje de la forja, brilla levemente en rojo al centro */}
      <motion.div
        className="absolute w-full h-px pointer-events-none"
        style={{
          top: "50%",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 20%, rgba(192,26,33,0.35) 50%, rgba(255,255,255,0.08) 80%, transparent 100%)",
          boxShadow: "0 0 12px rgba(192,26,33,0.15)",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
      />

      {/* Texto central */}
      <div className="relative z-10 text-center select-none">
        {/* Letras emergen de la línea hacia arriba */}
        <div className="flex justify-center items-end">
          {CHARS.map((char, i) => (
            <div key={i} className="overflow-hidden">
              <motion.span
                className="block font-display font-800 leading-none text-background"
                style={{ fontSize: "clamp(2.8rem, 9.5vw, 10.5rem)", letterSpacing: "-0.02em" }}
                initial={{ y: "110%" }}
                animate={{ y: phase >= 2 ? 0 : "110%" }}
                transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: i * 0.032 }}
              >
                {char}
              </motion.span>
            </div>
          ))}
          <div className="overflow-hidden">
            <motion.span
              className="block font-display font-800 leading-none text-primary"
              style={{ fontSize: "clamp(2.8rem, 9.5vw, 10.5rem)" }}
              initial={{ y: "110%" }}
              animate={{ y: phase >= 2 ? 0 : "110%" }}
              transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: CHARS.length * 0.032 + 0.04 }}
            >
              .
            </motion.span>
          </div>
        </div>

        {/* Tagline */}
        <motion.p
          className="font-body text-[11px] tracking-[0.5em] uppercase text-background/30 mt-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 10 }}
          transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
        >
          Aceros Especiales&nbsp;&nbsp;·&nbsp;&nbsp;Buenos Aires&nbsp;&nbsp;·&nbsp;&nbsp;Est.&nbsp;2013
        </motion.p>
      </div>

      {/* Corner — abajo izquierda */}
      <motion.p
        className="absolute bottom-8 left-8 md:left-16 font-body text-[9px] tracking-[0.35em] uppercase text-background/18 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 3 ? 1 : 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        Distribuidores · 50 años de historia
      </motion.p>

      {/* Scroll indicator — abajo derecha */}
      <motion.div
        className="absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 3 ? 1 : 0 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <span
          className="font-body text-[9px] tracking-[0.35em] uppercase text-background/20"
          style={{ writingMode: "vertical-lr" }}
        >
          scroll
        </span>
        <motion.div
          className="w-px bg-background/20"
          animate={{ height: [0, 40, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
