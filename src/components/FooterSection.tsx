import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

const FooterSection = () => {
  return (
    <footer id="contacto" className="bg-foreground text-background py-20 md:py-28 relative overflow-hidden">
      {/* Animated background element */}
      <motion.div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/[0.03]"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-8 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          >
            <motion.div
              className="font-display font-800 text-3xl tracking-tight mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              ACEROSCAS<span className="text-primary">.</span>
            </motion.div>
            <p className="font-body text-sm leading-relaxed text-background/60 max-w-xs">
              Distribuidores de acero para la industria argentina.
              Tres generaciones de compromiso, una sola palabra.
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.15 }}
          >
            <h4 className="font-display font-700 text-sm tracking-[0.2em] uppercase text-primary mb-6">
              Contacto directo
            </h4>
            <ul className="space-y-4 font-body text-sm text-background/70">
              {[
                "info@aceroscas.com.ar",
                "+54 11 4000-0000",
                "Buenos Aires, Argentina",
              ].map((text, i) => (
                <motion.li
                  key={text}
                  className="flex items-start gap-3 group cursor-default"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                  whileHover={{ x: 4 }}
                >
                  <span className="text-primary mt-0.5 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  <span className="group-hover:text-background transition-colors duration-300">{text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="lg:col-span-4 flex flex-col justify-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
          >
            <p className="font-body text-sm text-background/50 mb-6">
              Hablemos de tu próximo proyecto.
              <br />
              Atención presencial y acompañamiento constante.
            </p>
            <MagneticButton
              href="mailto:info@aceroscas.com.ar"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-body font-semibold text-sm tracking-wide px-8 py-4 w-fit hover:brightness-110 transition-all duration-300 group relative overflow-hidden"
            >
              <span className="relative z-10">ESCRIBINOS</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300 relative z-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <span className="absolute inset-0 bg-secondary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
            </MagneticButton>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="font-body text-xs text-background/30">
            © {new Date().getFullYear()} AcerosCas SA. Todos los derechos reservados.
          </p>
          <p className="font-body text-xs text-background/30">
            50+ años forjando confianza en la industria
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
