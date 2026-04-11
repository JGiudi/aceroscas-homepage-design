import { motion } from "framer-motion";

const qualities = [
  "SAE 1010", "SAE 1021", "SAE 1026", "SAE 1045", "SAE 4140", "SAE 8620",
  "CEMENTACIÓN", "TEMPLE", "TREFILADO", "LAMINADO", "FORJADO",
];

const SteelQualitiesMarquee = () => {
  return (
    <div className="bg-foreground border-y border-background/10 py-6 overflow-hidden relative">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-foreground to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-foreground to-transparent z-10" />

      <div className="flex">
        {[0, 1].map((set) => (
          <motion.div
            key={set}
            className="flex shrink-0 gap-8 items-center"
            animate={{ x: [0, "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...qualities, ...qualities].map((q, i) => (
              <div key={`${set}-${i}`} className="flex items-center gap-8 shrink-0">
                <span className="font-display font-800 text-2xl md:text-4xl text-background/[0.06] whitespace-nowrap select-none">
                  {q}
                </span>
                <span className="w-2 h-2 bg-primary/20 rotate-45 shrink-0" />
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SteelQualitiesMarquee;
