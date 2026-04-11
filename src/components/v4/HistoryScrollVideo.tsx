import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import steelHistoryVideo from "@/assets/steel-history-video.mp4.asset.json";

const milestones = [
  { year: "1973", text: "Ariel Castiglioni funda AcerosCas en Buenos Aires" },
  { year: "1985", text: "Primer depósito propio. Stock permanente." },
  { year: "1998", text: "Segunda generación. Se amplía el catálogo." },
  { year: "2010", text: "Logística nacional. Entregas en 24hs." },
  { year: "2020", text: "Tercera generación. Digitalización." },
  { year: "HOY", text: "50+ años. Una sola promesa: la palabra que se cumple." },
];

const HistoryScrollVideo = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Scrub video with scroll
  const videoOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.3, 1, 1, 0.3]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.85, 0.5, 0.5, 0.85]);

  // Active milestone based on scroll
  const activeIndex = useTransform(scrollYProgress, [0, 1], [0, milestones.length - 1]);

  // Progress line
  const lineProgress = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);

  // Counter year text
  const yearX = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  return (
    <section ref={sectionRef} id="historia" className="relative h-[500vh] bg-foreground">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Video background */}
        <motion.div className="absolute inset-0" style={{ opacity: videoOpacity }}>
          <video
            ref={videoRef}
            src={steelHistoryVideo.url}
            muted
            playsInline
            autoPlay
            loop
            preload="auto"
            className="w-full h-full object-cover"
          />
          <motion.div
            className="absolute inset-0 bg-foreground"
            style={{ opacity: overlayOpacity }}
          />
        </motion.div>

        {/* Horizontal scrolling year background */}
        <div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden">
          <motion.div
            className="font-display font-800 text-[8rem] md:text-[14rem] lg:text-[20rem] leading-none text-background/[0.025] whitespace-nowrap select-none"
            style={{ x: yearX }}
          >
            1973 • 1985 • 1998 • 2010 • 2020 • HOY
          </motion.div>
        </div>

        {/* Section label */}
        <div className="absolute top-8 left-8 md:left-16 z-20">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="h-[2px] w-10 bg-primary" />
            <span className="font-body text-xs font-semibold tracking-[0.4em] uppercase text-primary">
              Nuestra Historia
            </span>
          </motion.div>
        </div>

        {/* Title */}
        <motion.div
          className="absolute top-8 right-8 md:right-16 z-20 text-right"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.1, 0.15], [0, 0, 1]),
          }}
        >
          <h2 className="font-display font-800 text-2xl md:text-4xl leading-[0.92] text-background tracking-tight">
            Medio siglo
            <br />
            <span className="text-primary">forjando</span> confianza<span className="text-primary">.</span>
          </h2>
        </motion.div>

        {/* Timeline content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-8 md:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left: progress line + milestones */}
              <div className="lg:col-span-5 relative">
                {/* Vertical progress line */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-background/10">
                  <motion.div
                    className="w-full bg-primary origin-top"
                    style={{ height: lineProgress }}
                  />
                </div>

                <div className="pl-10 space-y-8">
                  {milestones.map((milestone, i) => (
                    <MilestoneItem
                      key={milestone.year}
                      milestone={milestone}
                      index={i}
                      totalItems={milestones.length}
                      scrollProgress={scrollYProgress}
                    />
                  ))}
                </div>
              </div>

              {/* Right: big year counter */}
              <div className="hidden lg:flex lg:col-span-7 items-center justify-center">
                <ActiveYearDisplay scrollProgress={scrollYProgress} />
              </div>
            </div>
          </div>
        </div>

        {/* Corner frames */}
        <div className="absolute top-20 left-8 w-12 h-12 border-l-2 border-t-2 border-primary/15 pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-primary/15 pointer-events-none" />
      </div>
    </section>
  );
};

const MilestoneItem = ({
  milestone,
  index,
  totalItems,
  scrollProgress,
}: {
  milestone: { year: string; text: string };
  index: number;
  totalItems: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) => {
  const start = index / totalItems;
  const peak = (index + 0.5) / totalItems;
  const end = (index + 1) / totalItems;

  const opacity = useTransform(scrollProgress, [start, peak, end], [0.15, 1, 0.25]);
  const scale = useTransform(scrollProgress, [start, peak, end], [0.95, 1, 0.95]);
  const x = useTransform(scrollProgress, [start, peak, end], [-10, 0, -10]);

  return (
    <motion.div className="relative" style={{ opacity, scale, x }}>
      {/* Dot on line */}
      <motion.div
        className="absolute -left-10 top-3 w-3 h-3 rounded-full border-2 border-primary bg-foreground"
        style={{
          scale: useTransform(scrollProgress, [start, peak, end], [0.6, 1.2, 0.6]),
        }}
      />

      <div className="flex items-baseline gap-4 mb-1">
        <span className="font-display font-800 text-3xl md:text-4xl text-primary tracking-tight">
          {milestone.year}
        </span>
      </div>
      <p className="font-body text-sm md:text-base text-background/50 leading-relaxed max-w-sm">
        {milestone.text}
      </p>
    </motion.div>
  );
};

const ActiveYearDisplay = ({
  scrollProgress,
}: {
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) => {
  return (
    <div className="relative">
      {milestones.map((milestone, i) => {
        const start = i / milestones.length;
        const peak = (i + 0.5) / milestones.length;
        const end = (i + 1) / milestones.length;

        return (
          <motion.div
            key={milestone.year}
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{
              opacity: useTransform(scrollProgress, [start, peak - 0.05, peak, peak + 0.05, end], [0, 0, 1, 0, 0]),
            }}
          >
            <span className="font-display font-800 text-[10rem] xl:text-[14rem] leading-none text-background/[0.06] select-none">
              {milestone.year}
            </span>
          </motion.div>
        );
      })}

      {/* Static center element */}
      <div className="w-[14rem] h-[14rem]" />
    </div>
  );
};

export default HistoryScrollVideo;
