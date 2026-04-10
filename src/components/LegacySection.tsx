import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import steelTexture from "@/assets/steel-texture-hero.jpg";
import TextReveal from "./TextReveal";

const LegacySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.2, 1]);
  const clipProgress = useTransform(scrollYProgress, [0.1, 0.4], [0, 100]);

  return (
    <section ref={sectionRef} id="legado" className="relative overflow-hidden bg-background-alt">
      {/* Full-width dramatic layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left — Image with clip-path reveal */}
        <motion.div
          className="relative h-[60vh] lg:h-auto overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
        >
          <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
            <img
              src={steelTexture}
              alt="Textura de acero laminado — la materia prima de nuestra historia"
              loading="lazy"
              className="w-full h-full object-cover grayscale"
            />
          </motion.div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

          {/* Floating text on image */}
          <motion.div
            className="absolute bottom-12 left-8 md:left-16 z-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
          >
            <span className="font-display font-800 text-[8rem] md:text-[12rem] leading-none text-background/[0.08] select-none">
              73
            </span>
          </motion.div>
        </motion.div>

        {/* Right — Copy */}
        <div className="flex items-center py-20 md:py-28 lg:py-0 px-8 md:px-16 lg:px-20">
          <div className="max-w-lg">
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            >
              <div className="h-[2px] w-10 bg-primary" />
              <span className="font-body text-xs font-semibold tracking-[0.4em] uppercase text-primary">
                El Legado
              </span>
            </motion.div>

            <h2 className="font-display font-800 text-4xl md:text-5xl lg:text-6xl leading-[0.92] tracking-tight text-foreground mb-10">
              <TextReveal delay={0.1}>Una palabra</TextReveal>
              <br />
              <TextReveal delay={0.2}>que vale desde</TextReveal>
              <br />
              <span className="text-secondary">
                <TextReveal delay={0.3}>hace más de</TextReveal>
              </span>
              <br />
              <TextReveal delay={0.4}>50 años</TextReveal>
              <motion.span
                className="text-primary inline-block"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.9, type: "spring", stiffness: 300 }}
              >
                .
              </motion.span>
            </h2>

            <motion.div
              className="h-[2px] bg-primary mb-10"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
            />

            <motion.p
              className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
            >
              En AcerosCas no vendemos solo metal. Entregamos un compromiso que
              nació con Ariel y la vieja escuela del trato directo — un legado que
              hoy transformamos en logística moderna sin perder el ADN familiar.
            </motion.p>

            <motion.p
              className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.4 }}
            >
              Somos tres generaciones trabajando a la par para que, cuando nos
              pidas algo, sientas que estás hablando{" "}
              <span className="text-foreground font-semibold">de dueño a dueño</span>,
              con la confianza de que el material llega y la promesa se cumple.
            </motion.p>

            {/* Signature-like element */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <span className="font-display font-800 text-sm text-secondary-foreground">AC</span>
              </div>
              <div>
                <p className="font-display font-700 text-sm text-foreground">Familia Castiglioni</p>
                <p className="font-body text-xs text-muted-foreground">3ra Generación — Buenos Aires</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegacySection;
