import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import brushedSteel from "@/assets/brushed-steel.jpg";

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
  { text: "de", highlight: false },
  { text: "dueño", highlight: true },
  { text: "a", highlight: false },
  { text: "dueño.", highlight: true },
];

const LiquidTextReveal = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.2"],
  });

  return (
    <section ref={sectionRef} className="relative py-40 md:py-60 bg-foreground overflow-hidden">
      {/* Background "AC" with steel texture mask */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-800 text-[30rem] md:text-[50rem] leading-none select-none pointer-events-none"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [100, -100]),
          WebkitTextFillColor: "transparent",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          backgroundImage: `url(${brushedSteel})`,
          backgroundSize: "400px",
          opacity: 0.04,
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

        {/* Liquid text reveal */}
        <p className="font-display font-800 text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight max-w-6xl">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = (i + 1) / words.length;
            return <LiquidWord key={i} word={word} progress={scrollYProgress} start={start} end={end} />;
          })}
        </p>
      </div>

      {/* Spark particles floating */}
      <SparkParticles scrollProgress={scrollYProgress} />
    </section>
  );
};

const LiquidWord = ({
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
  const opacity = useTransform(progress, [start, end], [0.08, 1]);
  const y = useTransform(progress, [start, end], [12, 0]);
  const blur = useTransform(progress, [start, Math.min(end, start + 0.03)], [4, 0]);

  return (
    <motion.span
      className={`inline-block mr-[0.3em] ${word.highlight ? "text-primary" : "text-background"}`}
      style={{
        opacity,
        y,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
      }}
    >
      {word.text}
    </motion.span>
  );
};

// Floating spark particles
const SparkParticles = ({ scrollProgress }: { scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"] }) => {
  const sparks = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          className="absolute rounded-full bg-primary"
          style={{
            left: `${spark.x}%`,
            top: `${spark.y}%`,
            width: spark.size,
            height: spark.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: spark.duration,
            repeat: Infinity,
            delay: spark.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default LiquidTextReveal;
