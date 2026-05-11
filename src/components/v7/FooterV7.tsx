import { motion } from "framer-motion";

export default function FooterV7() {
  return (
    <footer className="relative bg-foreground overflow-hidden">

      {/* Separador */}
      <div className="h-px bg-background/[0.06] w-full" />

      {/* CTA — el email llena la pantalla */}
      <div className="px-8 md:px-16 pt-24 md:pt-32 pb-16">

        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="h-px w-8 bg-primary" />
          <span className="font-body text-[10px] tracking-[0.45em] uppercase text-primary">
            Contacto
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="font-display font-800 text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-background mb-12 max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        >
          ¿Necesitás acero?<br />
          <span className="text-primary">Hablemos.</span>
        </motion.h2>

        {/* Email grande — el centro de todo */}
        <motion.a
          href="mailto:franco@aceroscas.com.ar"
          className="group block font-display font-800 leading-none tracking-tight text-background/20 hover:text-background transition-colors duration-500 mb-16 break-all"
          style={{ fontSize: "clamp(1.6rem, 4.5vw, 5.5rem)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          franco@aceroscas.com.ar
          <motion.span
            className="block h-px bg-primary mt-2"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            style={{ transformOrigin: "left" }}
            transition={{ duration: 0.5 }}
          />
        </motion.a>

        {/* Grid contacto */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-background/[0.07] pt-12 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {[
            { label: "Ventas", value: "franco@aceroscas.com.ar", href: "mailto:franco@aceroscas.com.ar" },
            { label: "Info", value: "info@aceroscas.com.ar", href: "mailto:info@aceroscas.com.ar" },
            { label: "WhatsApp", value: "+54 11 5839-2680", href: "https://wa.me/5491158392680" },
            { label: "Ubicación", value: "CABA, Argentina", href: null },
          ].map((item) => (
            <div key={item.label}>
              <p className="font-body text-[9px] tracking-[0.35em] uppercase text-background/20 mb-2">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith("https") ? "_blank" : undefined}
                  rel={item.href.startsWith("https") ? "noopener noreferrer" : undefined}
                  className="font-body text-sm text-background/45 hover:text-primary transition-colors duration-300"
                >
                  {item.value}
                </a>
              ) : (
                <p className="font-body text-sm text-background/45">{item.value}</p>
              )}
            </div>
          ))}
        </motion.div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-background/[0.07] pt-8">
          <span className="font-display font-800 text-lg text-background/60 tracking-tight">
            ACEROSCAS<span className="text-primary">.</span>
          </span>
          <p className="font-body text-[10px] tracking-[0.25em] text-background/15 uppercase">
            © {new Date().getFullYear()} — Más de 50 años forjando confianza
          </p>
        </div>
      </div>
    </footer>
  );
}
