import { Clock, Package, Users } from "lucide-react";
import geometricPattern from "@/assets/geometric-pattern.png";

const advantages = [
  {
    icon: Clock,
    title: "Entregas en 24–48 hs",
    description:
      "Logística propia diseñada para cumplir plazos. Si te damos una fecha, la respetamos.",
    accent: "01",
  },
  {
    icon: Package,
    title: "Stock permanente",
    description:
      "Más de 50 años nos enseñaron qué necesita la industria. Tenemos lo que buscás, siempre.",
    accent: "02",
  },
  {
    icon: Users,
    title: "Atención personalizada",
    description:
      "Conocemos a cada cliente por su nombre. El trato de dueño a dueño no es un eslogan, es cómo trabajamos.",
    accent: "03",
  },
];

const AdvantagesSection = () => {
  return (
    <section id="ventajas" className="py-28 md:py-40 bg-background relative overflow-hidden">
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url(${geometricPattern})`,
          backgroundSize: "250px",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="container mx-auto px-8 md:px-16 relative z-10">
        {/* Section header */}
        <div className="max-w-2xl mb-20">
          <p className="font-body text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-6">
            Ventaja Competitiva
          </p>
          <h2 className="font-display font-800 text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-foreground">
            Por qué eligen
            <br />
            <span className="text-secondary">trabajar con nosotros</span>
            <span className="text-primary">.</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {advantages.map((item) => (
            <div
              key={item.accent}
              className="group relative bg-card border border-border p-10 md:p-12 hover:border-primary/30 transition-all duration-500"
            >
              {/* Number accent */}
              <span className="absolute top-6 right-8 font-display text-6xl font-800 text-foreground/[0.04] select-none group-hover:text-primary/10 transition-colors duration-500">
                {item.accent}
              </span>

              <div className="w-10 h-10 flex items-center justify-center mb-8 text-primary">
                <item.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>

              <h3 className="font-display font-700 text-xl md:text-2xl text-foreground mb-4 tracking-tight">
                {item.title}
              </h3>

              <div className="w-8 h-[2px] bg-primary/40 mb-6 group-hover:w-12 transition-all duration-500" />

              <p className="font-body text-muted-foreground leading-relaxed text-sm md:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
