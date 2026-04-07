import geometricPattern from "@/assets/geometric-pattern.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Geometric pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `url(${geometricPattern})`,
          backgroundSize: "300px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Top navigation bar */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-16 py-8">
        <div className="font-display font-800 text-2xl tracking-tight text-foreground">
          ACEROSCAS<span className="text-primary">.</span>
        </div>
        <div className="hidden md:flex items-center gap-10 font-body text-sm font-medium tracking-wide text-muted-foreground">
          <a href="#legado" className="hover:text-foreground transition-colors duration-300">NOSOTROS</a>
          <a href="#ventajas" className="hover:text-foreground transition-colors duration-300">VENTAJAS</a>
          <a href="#contacto" className="hover:text-foreground transition-colors duration-300">CONTACTO</a>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-8 md:px-16">
        <div className="max-w-4xl">
          {/* Red accent line */}
          <div className="w-0 h-[3px] bg-primary mb-10 animate-line-grow" />

          <p className="font-body text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Distribuidores de acero desde 1973
          </p>

          <h1 className="font-display font-800 text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight text-foreground mb-8 opacity-0 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            Tres generaciones
            <br />
            <span className="text-secondary">forjando</span>
            <br />
            la industria<span className="text-primary">.</span>
          </h1>

          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed mb-12 opacity-0 animate-fade-up" style={{ animationDelay: "0.6s" }}>
            El punto de encuentro entre la solidez de la trayectoria
            y la agilidad de la logística moderna.
          </p>

          <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.8s" }}>
            <a
              href="#contacto"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-body font-semibold text-sm tracking-wide px-8 py-4 hover:brightness-110 transition-all duration-300 group"
            >
              HABLÁ CON LOS DUEÑOS
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
      </div>

      {/* Right side steel texture accent */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[35%]">
        <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent z-10" />
        <img
          src={"/steel-hero.jpg"}
          alt=""
          className="w-full h-full object-cover opacity-40"
          style={{ display: "none" }}
        />
        {/* Abstract steel gradient */}
        <div className="absolute inset-0 bg-gradient-to-bl from-muted/80 via-border/40 to-transparent" />
        <div className="absolute bottom-20 right-16 z-20">
          <div className="font-display text-[12rem] font-800 leading-none text-foreground/[0.03] select-none">
            50
          </div>
          <p className="font-body text-xs tracking-[0.2em] text-muted-foreground/60 text-right -mt-6">
            AÑOS
          </p>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-10 left-8 md:left-16 flex items-center gap-3 opacity-0 animate-fade-in" style={{ animationDelay: "1.2s" }}>
        <div className="w-[1px] h-10 bg-primary/40" />
        <span className="font-body text-xs tracking-[0.2em] text-muted-foreground rotate-0">
          SCROLL
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
