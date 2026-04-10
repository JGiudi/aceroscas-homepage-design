import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"counting" | "revealing" | "done">("counting");

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase("revealing");
          setTimeout(() => {
            setPhase("done");
            setTimeout(onComplete, 800);
          }, 600);
          return 100;
        }
        // Accelerating count
        const increment = prev < 30 ? 1 : prev < 70 ? 2 : prev < 90 ? 3 : 5;
        return Math.min(prev + increment, 100);
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-foreground"
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Grid lines background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`v-${i}`}
                className="absolute top-0 bottom-0 w-px bg-background/[0.04]"
                style={{ left: `${(i + 1) * (100 / 7)}%` }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.05, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              />
            ))}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`h-${i}`}
                className="absolute left-0 right-0 h-px bg-background/[0.04]"
                style={{ top: `${(i + 1) * 20}%` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2 + i * 0.05, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              />
            ))}
          </div>

          {/* Logo */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          >
            <div className="font-display font-800 text-4xl md:text-5xl tracking-tight text-background mb-12">
              ACEROSCAS<span className="text-primary">.</span>
            </div>
          </motion.div>

          {/* Counter */}
          <motion.div
            className="relative z-10 flex items-baseline gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <span className="font-display font-800 text-[8rem] md:text-[12rem] leading-none text-background/10 tabular-nums">
              {String(count).padStart(3, "0")}
            </span>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-20 left-16 right-16 md:left-32 md:right-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <div className="h-px bg-background/10 relative overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-primary"
                style={{ width: `${count}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>
            <div className="flex justify-between mt-4">
              <span className="font-body text-xs tracking-[0.2em] text-background/30">CARGANDO</span>
              <span className="font-body text-xs tracking-[0.2em] text-background/30">
                ACEROSCAS SA — EST. 1973
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
