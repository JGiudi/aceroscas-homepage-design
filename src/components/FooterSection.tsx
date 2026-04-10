import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import MarqueeText from "./MarqueeText";

const FooterSection = () => {
  return (
    <footer id="contacto" className="bg-foreground relative overflow-hidden">
      {/* Top marquee band */}
      <div className="border-t border-b border-background/10 py-6 overflow-hidden">
        <MarqueeText
          texts={["HABLEMOS", "DE TU PRÓXIMO PROYECTO", "CONTACTANOS", "ACEROSCAS"]}
          className="text-5xl md:text-7xl lg:text-8xl text-background/[0.06]"
          speed={25}
        />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-8 md:px-16 py-20 md:py-28 relative z-10">
        {/* Big CTA area */}
        <div className="mb-24">
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-[2px] w-10 bg-primary" />
            <span className="font-body text-xs font-semibold tracking-[0.4em] uppercase text-primary">
              Contacto
            </span>
          </motion.div>

          <motion.h2
            className="font-display font-800 text-4xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight text-background mb-10 max-w-3xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          >
            Hablemos de tu
            <br />
            próximo proyecto
            <span className="text-primary">.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <MagneticButton
              href="mailto:info@aceroscas.com.ar"
              className="inline-flex items-center gap-4 bg-primary text-primary-foreground font-body font-semibold text-base tracking-wide px-12 py-6 hover:brightness-110 transition-all duration-300 group relative overflow-hidden"
            >
              <span className="relative z-10">ESCRIBINOS</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-300 relative z-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
              <span className="absolute inset-0 bg-secondary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
            </MagneticButton>
          </motion.div>
        </div>

        {/* Contact grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 border-t border-background/10 pt-16 mb-20">
          {[
            { label: "Email", value: "info@aceroscas.com.ar", href: "mailto:info@aceroscas.com.ar" },
            { label: "Teléfono", value: "+54 11 4000-0000", href: "tel:+541140000000" },
            { label: "Ubicación", value: "Buenos Aires,\nArgentina", href: null },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <p className="font-body text-xs tracking-[0.3em] uppercase text-background/30 mb-4">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  className="font-body text-lg text-background/70 hover:text-primary transition-colors duration-300"
                  data-cursor="VER"
                >
                  {item.value}
                </a>
              ) : (
                <p className="font-body text-lg text-background/70 whitespace-pre-line">
                  {item.value}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <motion.div
          className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="flex items-center gap-6">
            <motion.div
              className="font-display font-800 text-xl tracking-tight text-background"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              ACEROSCAS<span className="text-primary">.</span>
            </motion.div>
            <p className="font-body text-xs text-background/20">
              © {new Date().getFullYear()} Todos los derechos reservados.
            </p>
          </div>
          <p className="font-body text-xs text-background/20">
            50+ años forjando confianza en la industria
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
