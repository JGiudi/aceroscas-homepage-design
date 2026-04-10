import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 50, suffix: "+", label: "AÑOS EN EL\nMERCADO", prefix: "" },
  { value: 3, suffix: "", label: "GENERACIONES\nDE COMPROMISO", prefix: "" },
  { value: 24, suffix: "HS", label: "ENTREGAS EN\nTODO EL PAÍS", prefix: "" },
  { value: 100, suffix: "%", label: "TASA DE\nCUMPLIMIENTO", prefix: "" },
];

const AnimatedCounter = ({ value, suffix, prefix }: { value: number; suffix: string; prefix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * value);
      setCount(start);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <div ref={ref} className="font-display font-800 text-6xl md:text-8xl lg:text-[7rem] leading-none tracking-tighter text-foreground">
      {prefix}{count}{suffix}
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-28 md:py-40 bg-background relative overflow-hidden">
      {/* Decorative grid */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-border/50"
            style={{ left: `${(i + 1) * (100 / 6)}%` }}
          />
        ))}
      </div>

      <div className="container mx-auto px-8 md:px-16 relative z-10">
        <motion.p
          className="font-body text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          En números
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                ease: [0.33, 1, 0.68, 1],
                delay: i * 0.12,
              }}
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              <motion.div
                className="h-[2px] bg-primary my-6"
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.12, ease: [0.33, 1, 0.68, 1] }}
              />
              <p className="font-body text-xs tracking-[0.2em] text-muted-foreground whitespace-pre-line leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
