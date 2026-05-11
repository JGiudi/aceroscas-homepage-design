import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const ALL_WORDS = ["El", "acero", "no", "miente.", "Tampoco", "nosotros."];

const Word = ({
  word,
  index,
  total,
  scrollProgress,
}: {
  word: string;
  index: number;
  total: number;
  scrollProgress: MotionValue<number>;
}) => {
  const start = 0.05 + (index / total) * 0.65;
  const end = start + 0.18;
  const opacity = useTransform(scrollProgress, [start, end], [0.07, 1]);
  const y = useTransform(scrollProgress, [start, end], [50, 0]);

  return (
    <motion.span
      style={{
        opacity,
        y,
        display: "inline-block",
        fontSize: "clamp(3.2rem, 8.5vw, 10rem)",
        lineHeight: 0.9,
      }}
      className="font-display font-800 tracking-tight text-foreground"
    >
      {word}
    </motion.span>
  );
};

export default function ManifestoSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineWidth = useTransform(scrollYProgress, [0.05, 0.3], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative bg-background py-36 md:py-52 px-8 md:px-16 overflow-hidden">

      <motion.div
        className="flex items-center gap-4 mb-16"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <motion.div className="h-px bg-primary" style={{ width: lineWidth }} />
        <span className="font-body text-[10px] tracking-[0.45em] uppercase text-primary whitespace-nowrap">
          Nuestra filosofía
        </span>
      </motion.div>

      <div className="flex flex-wrap gap-x-[0.3em] gap-y-1">
        {ALL_WORDS.map((word, i) => (
          <Word key={i} word={word} index={i} total={ALL_WORDS.length} scrollProgress={scrollYProgress} />
        ))}
      </div>

      <motion.p
        className="font-body text-sm text-foreground/30 mt-16 max-w-sm leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Tres generaciones de familia. La misma obsesión: el acero correcto,
        en tiempo, sin excusas.
      </motion.p>
    </section>
  );
}
