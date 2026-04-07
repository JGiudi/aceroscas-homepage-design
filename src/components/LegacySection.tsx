import steelTexture from "@/assets/steel-texture-hero.jpg";

const LegacySection = () => {
  return (
    <section id="legado" className="py-28 md:py-40 bg-background-alt relative overflow-hidden">
      <div className="container mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left — Image */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={steelTexture}
                alt="Textura de acero laminado — la materia prima de nuestra historia"
                loading="lazy"
                width={1920}
                height={1080}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Accent block */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 -z-10" />
            <div className="absolute -top-4 -left-4 w-20 h-20 border border-primary/20" />
          </div>

          {/* Right — Copy */}
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="font-body text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-6">
              El Legado
            </p>

            <h2 className="font-display font-800 text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-foreground mb-8">
              Una palabra que
              <br />
              <span className="text-secondary">vale desde hace</span>
              <br />
              más de 50 años<span className="text-primary">.</span>
            </h2>

            <div className="w-16 h-[2px] bg-primary mb-8" />

            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              En AcerosCas no vendemos solo metal. Entregamos un compromiso que
              nació con Ariel y la vieja escuela del trato directo — un legado que
              hoy transformamos en logística moderna sin perder el ADN familiar.
            </p>

            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              Somos tres generaciones trabajando a la par para que, cuando nos
              pidas algo, sientas que estás hablando{" "}
              <span className="text-foreground font-semibold">de dueño a dueño</span>,
              con la confianza de que el material llega y la promesa se cumple.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegacySection;
