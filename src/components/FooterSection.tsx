const FooterSection = () => {
  return (
    <footer id="contacto" className="bg-foreground text-background py-20 md:py-28">
      <div className="container mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="font-display font-800 text-3xl tracking-tight mb-6">
              ACEROSCAS<span className="text-primary">.</span>
            </div>
            <p className="font-body text-sm leading-relaxed text-background/60 max-w-xs">
              Distribuidores de acero para la industria argentina.
              Tres generaciones de compromiso, una sola palabra.
            </p>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="font-display font-700 text-sm tracking-[0.2em] uppercase text-primary mb-6">
              Contacto directo
            </h4>
            <ul className="space-y-4 font-body text-sm text-background/70">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-0.5">→</span>
                <span>info@aceroscas.com.ar</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-0.5">→</span>
                <span>+54 11 4000-0000</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-0.5">→</span>
                <span>Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <p className="font-body text-sm text-background/50 mb-6">
              Hablemos de tu próximo proyecto.
              <br />
              Atención presencial y acompañamiento constante.
            </p>
            <a
              href="mailto:info@aceroscas.com.ar"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-body font-semibold text-sm tracking-wide px-8 py-4 w-fit hover:brightness-110 transition-all duration-300 group"
            >
              ESCRIBINOS
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-background/30">
            © {new Date().getFullYear()} AcerosCas SA. Todos los derechos reservados.
          </p>
          <p className="font-body text-xs text-background/30">
            50+ años forjando confianza en la industria
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
