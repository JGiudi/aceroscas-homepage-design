import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import steelHistoryVideo from "@/assets/steel-history-video.mp4.asset.json";

const milestones = [
  { year: "1973", title: "El comienzo", text: "Ariel Castiglioni funda AcerosCas con un depósito y una convicción: el trato directo vale más que cualquier contrato." },
  { year: "1985", title: "Primer depósito propio", text: "La empresa crece. Stock permanente se convierte en marca registrada." },
  { year: "1998", title: "Segunda generación", text: "Los hijos de Ariel se suman. Se amplía el catálogo y la red comercial." },
  { year: "2010", title: "Logística nacional", text: "Entregas en 24hs a todo el país. Red de distribución propia." },
  { year: "2020", title: "Tercera generación", text: "La nueva generación digitaliza sin perder el ADN familiar." },
  { year: "HOY", title: "50+ años", text: "Tres generaciones, una promesa: la palabra que se cumple." },
];

const HorizontalTimeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Horizontal scroll
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(milestones.length - 1) * 100}vw`]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Video scrub opacity
  const videoOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.5, 0.25, 0.25, 0.5]);

  return (
    <section
      ref={sectionRef}
      id="historia-v5"
      className="relative bg-foreground"
      style={{ height: `${milestones.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background video */}
        <motion.div className="absolute inset-0" style={{ opacity: videoOpacity }}>
          <video
            src={steelHistoryVideo.url}
            muted
            playsInline
            autoPlay
            loop
            preload="auto"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </motion.div>

        {/* Section header - fixed */}
        <div className="absolute top-12 left-8 md:left-16 z-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[2px] w-10 bg-primary" />
            <span className="font-body text-xs font-semibold tracking-[0.4em] uppercase text-primary">
              Nuestra Historia
            </span>
          </div>
          <h2 className="font-display font-800 text-3xl md:text-5xl text-background tracking-tight">
            50 años forjando
            <span className="text-primary"> confianza.</span>
          </h2>
        </div>

        {/* Steel beam progress bar */}
        <div className="absolute bottom-20 left-8 md:left-16 right-8 md:right-16 z-20">
          <div className="relative h-[3px] bg-background/10">
            <motion.div
              className="absolute top-0 left-0 h-full bg-primary"
              style={{ width: progressWidth }}
            />
            {/* Milestone dots */}
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ left: `${(i / (milestones.length - 1)) * 100}%` }}
              >
                <motion.div
                  className="w-3 h-3 rounded-full border-2 border-primary bg-foreground -translate-x-1/2"
                  style={{
                    backgroundColor: useTransform(
                      scrollYProgress,
                      [i / milestones.length, (i + 0.5) / milestones.length],
                      ["hsl(0 0% 7%)", "hsl(358 79% 43%)"]
                    ),
                  }}
                />
                <span className="font-body text-[9px] tracking-[0.2em] text-background/30 mt-3 -translate-x-1/2 whitespace-nowrap">
                  {m.year}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Horizontal panels */}
        <motion.div
          className="absolute top-0 left-0 h-full flex"
          style={{ x }}
        >
          {milestones.map((milestone, i) => (
            <div key={milestone.year} className="w-screen h-full flex items-center justify-center shrink-0 relative px-8 md:px-16">
              {/* Giant year background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <span className="font-display font-800 text-[20rem] md:text-[35rem] leading-none text-background/[0.02] select-none">
                  {milestone.year}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10 max-w-2xl">
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <span className="font-display font-800 text-7xl md:text-9xl text-primary/20 block leading-none">
                    {milestone.year}
                  </span>
                </motion.div>

                <h3 className="font-display font-800 text-3xl md:text-5xl text-background mb-6 tracking-tight">
                  {milestone.title}
                </h3>

                <div className="h-[2px] w-16 bg-primary mb-6" />

                <p className="font-body text-lg md:text-xl text-background/50 leading-relaxed max-w-lg">
                  {milestone.text}
                </p>

                {/* Counter */}
                <div className="mt-8 flex items-center gap-3">
                  <span className="font-body text-xs text-background/30 tracking-wider">
                    {String(i + 1).padStart(2, "0")} / {String(milestones.length).padStart(2, "0")}
                  </span>
                  <div className="w-16 h-[1px] bg-background/10" />
                </div>
              </div>

              {/* Decorative vertical line on right edge */}
              {i < milestones.length - 1 && (
                <div className="absolute right-0 top-[20%] bottom-[20%] w-px bg-background/[0.06]" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Corner frame lines */}
        <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-primary/20 pointer-events-none z-20" />
        <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-primary/20 pointer-events-none z-20" />
      </div>
    </section>
  );
};

export default HorizontalTimeline;
