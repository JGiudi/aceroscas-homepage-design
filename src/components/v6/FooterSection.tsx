import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import MarqueeText from "@/components/MarqueeText";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const contactItems = [
  {
    label: "Ventas",
    value: "franco@aceroscas.com.ar",
    sub: "Representante Comercial",
    href: "mailto:franco@aceroscas.com.ar",
  },
  {
    label: "Info",
    value: "info@aceroscas.com.ar",
    sub: "Consultas generales",
    href: "mailto:info@aceroscas.com.ar",
  },
  {
    label: "WhatsApp",
    value: "+54 11 5839-2680",
    sub: "Cotizaciones rápidas",
    href: "https://wa.me/5491158392680",
  },
  {
    label: "Ubicación",
    value: "Ciudad Autónoma\nde Buenos Aires",
    sub: "Ver en Google Maps",
    href: "https://maps.app.goo.gl/LMUym3N835iDwUqYA?g_st=iwb",
  },
];

const FooterSection = () => {
  return (
    <footer id="contacto" className="bg-foreground relative overflow-hidden">
      {/* Top marquee band */}
      <div className="border-t border-b border-background/10 py-6 overflow-hidden">
        <MarqueeText
          texts={["HABLEMOS", "DE TU PRÓXIMA COTIZACIÓN", "CONTACTANOS", "ACEROSCAS"]}
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
            próxima cotización
            <span className="text-primary">.</span>
          </motion.h2>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <MagneticButton
              href="mailto:franco@aceroscas.com.ar"
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

            <a
              href="https://wa.me/5491158392680"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-background/20 text-background font-body font-semibold text-base tracking-wide px-10 py-6 hover:border-[#25D366] hover:text-[#25D366] transition-all duration-300"
            >
              <WhatsAppIcon />
              <span>WHATSAPP</span>
            </a>
          </motion.div>
        </div>

        {/* Contact grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-6 border-t border-background/10 pt-16 mb-20">
          {contactItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <p className="font-body text-xs tracking-[0.3em] uppercase text-background/30 mb-3">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith("https") ? "_blank" : undefined}
                  rel={item.href.startsWith("https") ? "noopener noreferrer" : undefined}
                  className="font-body text-base text-background/70 hover:text-primary transition-colors duration-300 block whitespace-pre-line"
                >
                  {item.value}
                </a>
              ) : (
                <p className="font-body text-base text-background/70 whitespace-pre-line">
                  {item.value}
                </p>
              )}
              {item.sub && (
                <p className="font-body text-[11px] text-background/30 mt-1 tracking-wide">
                  {item.sub}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Map embed */}
        <motion.div
          className="mb-20 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <iframe
            src="https://maps.google.com/maps?q=-34.7971087,-58.1795255&z=15&output=embed"
            width="100%"
            height="320"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) grayscale(20%)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación ACEROSCAS"
          />
          <a
            href="https://maps.app.goo.gl/LMUym3N835iDwUqYA?g_st=iwb"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 flex items-center gap-2 bg-foreground/80 backdrop-blur-sm border border-background/10 px-3 py-1.5 font-body text-xs text-background/60 hover:text-primary transition-colors duration-300"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            Ver en Google Maps
          </a>
        </motion.div>

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
            Más de 50 años forjando confianza en la industria
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
