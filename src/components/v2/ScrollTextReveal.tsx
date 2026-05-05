import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const words = [
  { text: "No", highlight: false },
  { text: "vendemos", highlight: false },
  { text: "solo", highlight: false },
  { text: "metal.", highlight: true },
  { text: "Entregamos", highlight: false },
  { text: "un", highlight: false },
  { text: "compromiso", highlight: true },
  { text: "que", highlight: false },
  { text: "nació", highlight: false },
  { text: "con", highlight: false },
  { text: "la", highlight: false },
  { text: "vieja", highlight: false },
  { text: "escuela", highlight: false },
  { text: "del", highlight: false },
  { text: "trato", highlight: true },
  { text: "directo", highlight: true },
  { text: "—", highlight: false },
  { text: "un", highlight: false },
  { text: "legado", highlight: true },
  { text: "que", highlight: false },
  { text: "hoy", highlight: false },
  { text: "transformamos", highlight: false },
  { text: "en", highlight: false },
  { text: "logística", highlight: true },
  { text: "moderna.", highlight: true },
];

const wordCount = words.length;

const ScrollTextReveal = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Progreso 0→1 del scroll “de sección” mapeado a un tramo más corto (lo→hi) para que
  // el reveal termine ANTES de que scrollYProgress llegue a 1 (a veces no lo hace del todo).
  const revealProgress = useTransform(scrollYProgress, (v) => {
    const lo = 0.16;
    const hi = 0.58;
    if (v <= lo) return 0;
    if (v >= hi) return 1;
    return (v - lo) / (hi - lo);
  });

  return (
    <section
      ref={sectionRef}
      className="relative py-40 md:py-60 bg-foreground overflow-hidden"
    >
      {/* Background decorative number */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-800 text-[30rem] md:text-[50rem] leading-none text-background/[0.015] select-none pointer-events-none"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [100, -100]),
        }}
      >
        AC
      </motion.div>

      <div className="container mx-auto px-8 md:px-16 relative z-10">
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="h-[2px] w-10 bg-primary" />
          <span className="font-body text-xs font-semibold tracking-[0.4em] uppercase text-primary">
            Nuestra Filosofía
          </span>
        </motion.div>

        {/* Word-by-word reveal */}
        <p className="font-display font-800 text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight max-w-6xl">
          {words.map((word, i) => {
            const start = i / wordCount;
            const end = (i + 1) / wordCount;

            return <Word key={i} word={word} progress={revealProgress} start={start} end={end} />;
          })}
        </p>
      </div>

      {/* Aumenta la altura de la sección para que haya recorrido de scroll real hacia scrollYProgress ≈ 1 */}
      <div className="pointer-events-none h-[85vh] min-h-[480px] w-full shrink-0" aria-hidden />
    </section>
  );
};

const Word = ({
  word,
  progress,
  start,
  end,
}: {
  word: { text: string; highlight: boolean };
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}) => {
  const opacity = useTransform(progress, [start, end], [0.22, 1], { clamp: true });
  const y = useTransform(progress, [start, end], [10, 0], { clamp: true });

  return (
    <motion.span
      className={`inline-block mr-[0.3em] ${word.highlight ? "text-primary" : "text-background"}`}
      style={{ opacity, y }}
    >
      {word.text}
    </motion.span>
  );
};

export default ScrollTextReveal;
