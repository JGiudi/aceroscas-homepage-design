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

  const imageY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1]);

  return (
    <section ref={sectionRef} id="legado" className="py-28 md:py-40 bg-background-alt relative overflow-hidden">
      <div className="container mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left — Image with parallax */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
          >
            <div className="aspect-[4/5] overflow-hidden">
              <motion.img
                src={steelTexture}
                alt="Textura de acero laminado — la materia prima de nuestra historia"
                loading="lazy"
                width={1920}
                height={1080}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                style={{ y: imageY, scale: imageScale }}
              />
            </div>
            {/* Accent blocks with animation */}
            <motion.div
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 -z-10"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
            />
            <motion.div
              className="absolute -top-4 -left-4 w-20 h-20 border border-primary/20"
              initial={{ scale: 0, rotate: -45 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
            />
          </motion.div>

          {/* Right — Copy */}
          <div className="lg:col-span-6 lg:col-start-7">
            <motion.p
              className="font-body text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            >
              El Legado
            </motion.p>

            <h2 className="font-display font-800 text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-foreground mb-8">
              <TextReveal delay={0.1}>Una palabra que</TextReveal>
              <br />
              <span className="text-secondary">
                <TextReveal delay={0.2}>vale desde hace</TextReveal>
              </span>
              <br />
              <TextReveal delay={0.3}>más de 50 años</TextReveal>
              <motion.span
                className="text-primary inline-block"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.8, type: "spring", stiffness: 300 }}
              >
                .
              </motion.span>
            </h2>

            <motion.div
              className="h-[2px] bg-primary mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
            />

            <motion.p
              className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
            >
              En AcerosCas no vendemos solo metal. Entregamos un compromiso que
              nació con Ariel y la vieja escuela del trato directo — un legado que
              hoy transformamos en logística moderna sin perder el ADN familiar.
            </motion.p>

            <motion.p
              className="font-body text-base md:text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.4 }}
            >
              Somos tres generaciones trabajando a la par para que, cuando nos
              pidas algo, sientas que estás hablando{" "}
              <span className="text-foreground font-semibold">de dueño a dueño</span>,
              con la confianza de que el material llega y la promesa se cumple.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegacySection;
