import { motion } from "framer-motion";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import FullscreenMenu from "@/components/FullscreenMenu";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SmoothScroll from "@/components/SmoothScroll";
import MagneticButton from "@/components/MagneticButton";
import FooterSection from "@/components/v6/FooterSection";

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    empresa: "",
    mensaje: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add submission logic here
  };

  return (
    <>
      <Helmet>
        <title>Contacto | ACEROSCAS — Distribuidores de Acero Buenos Aires</title>
        <meta name="description" content="Contactate con ACEROSCAS para cotizaciones de acero especial. Atención personalizada, respuesta en 24hs. Email: franco@aceroscas.com.ar | WhatsApp: +54 11 5839-2680." />
        <meta property="og:title" content="Contacto | ACEROSCAS" />
        <meta property="og:description" content="Solicitá tu cotización de acero especial. Respuesta en 24hs, atención directa sin intermediarios." />
        <link rel="canonical" href="https://aceroscas.com.ar/contacto" />
      </Helmet>
      <CustomCursor />
      <FilmGrain />
      <FullscreenMenu homeHref="/v8" />
      
      <SmoothScroll>
        <main className="bg-background min-h-screen pt-32 pb-20">
          <div className="container mx-auto px-8 md:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              
              {/* Left Column: Info & Title */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-[2px] w-10 bg-primary" />
                  <span className="font-body text-xs font-semibold tracking-[0.4em] uppercase text-primary">
                    Contacto
                  </span>
                </div>
                
                <h1 className="font-display font-800 text-5xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tight text-foreground mb-12">
                  Hablemos de tu<br />
                  <span className="text-primary">próxima</span> cotización<span className="text-primary">.</span>
                </h1>

                <p className="font-body text-lg text-muted-foreground max-w-md mb-16 leading-relaxed">
                  Trato directo de dueño a dueño. Contanos tus necesidades y te respondemos con la velocidad que tu industria exige.
                </p>

                <div className="space-y-10">
                  <div>
                    <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground/40 mb-3">Ventas CABA</p>
                    <a href="tel:+5491123192749" className="font-display font-600 text-xl hover:text-primary transition-colors block">
                      +54 9 11 2319-2749
                    </a>
                    <a href="mailto:ventas@aceroscas.com.ar" className="font-display font-600 text-xl hover:text-primary transition-colors block mt-1">
                      ventas@aceroscas.com.ar
                    </a>
                  </div>
                  <div>
                    <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground/40 mb-3">Ventas Interior</p>
                    <a href="https://wa.me/5491158392680" target="_blank" rel="noopener noreferrer" className="font-display font-600 text-xl hover:text-primary transition-colors block">
                      +54 11 5839-2680
                    </a>
                    <a href="mailto:franco@aceroscas.com.ar" className="font-display font-600 text-xl hover:text-primary transition-colors block mt-1">
                      franco@aceroscas.com.ar
                    </a>
                  </div>
                  <div>
                    <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground/40 mb-3">Info</p>
                    <a href="mailto:info@aceroscas.com.ar" className="font-display font-600 text-xl hover:text-primary transition-colors">
                      info@aceroscas.com.ar
                    </a>
                  </div>
                  <div>
                    <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground/40 mb-3">Ubicación</p>
                    <p className="font-display font-600 text-xl">
                      Provincia de<br />
                      Buenos Aires
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Form */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
                className="bg-zinc-100 p-8 md:p-12 rounded-sm shadow-sm relative overflow-hidden"
              >
                {/* Decorative Pattern Background */}
                <div className="absolute top-0 right-0 p-10 opacity-[0.03] select-none pointer-events-none">
                   <span className="font-display font-800 text-[15rem] leading-none">AC</span>
                </div>

                <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground">Nombre Completo</label>
                      <input 
                        type="text" 
                        required
                        data-cursor="Escribir"
                        className="w-full bg-transparent border-b border-muted-foreground/20 py-3 focus:outline-none focus:border-primary transition-colors font-body"
                        placeholder="Ej: Juan Pérez"
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground">Email Corporativo</label>
                      <input 
                        type="email" 
                        required
                        data-cursor="Escribir"
                        className="w-full bg-transparent border-b border-muted-foreground/20 py-3 focus:outline-none focus:border-primary transition-colors font-body"
                        placeholder="ejemplo@empresa.com"
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground">Empresa / Rubro</label>
                    <input 
                      type="text" 
                      className="w-full bg-transparent border-b border-muted-foreground/20 py-3 focus:outline-none focus:border-primary transition-colors font-body"
                      placeholder="Nombre de tu organización"
                      onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground">Tu Mensaje</label>
                    <textarea 
                      required
                      rows={4}
                      data-cursor="Mensaje"
                      className="w-full bg-transparent border-b border-muted-foreground/20 py-3 focus:outline-none focus:border-primary transition-colors font-body resize-none"
                      placeholder="¿En qué podemos ayudarte?"
                      onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                    />
                  </div>

                  <div className="pt-6">
                    <MagneticButton
                      data-cursor="Enviar"
                      className="w-full bg-foreground text-background font-body font-bold text-xs tracking-[0.2em] py-5 px-8 text-center transition-all hover:bg-primary group overflow-hidden relative"
                    >
                      <span className="relative z-10">ENVIAR</span>
                      <div className="absolute inset-0 bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
                    </MagneticButton>
                  </div>

                  <p className="font-body text-[10px] text-muted-foreground/60 text-center">
                    Al enviar este formulario, aceptás nuestra política de privacidad y el trato directo de datos.
                  </p>
                </form>
              </motion.div>

            </div>
          </div>
        </main>
        <FooterSection />
      </SmoothScroll>
    </>
  );
};

export default Contact;
