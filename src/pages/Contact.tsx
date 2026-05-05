import { motion } from "framer-motion";
import { useState } from "react";
import FullscreenMenu from "@/components/FullscreenMenu";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SmoothScroll from "@/components/SmoothScroll";
import MagneticButton from "@/components/MagneticButton";
import FooterSection from "@/components/FooterSection";

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
      <CustomCursor />
      <FilmGrain />
      <FullscreenMenu />
      
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
                  Hablemos de su<br />
                  <span className="text-primary">próximo</span> proyecto<span className="text-primary">.</span>
                </h1>

                <p className="font-body text-lg text-muted-foreground max-w-md mb-16 leading-relaxed">
                  Trato directo de dueño a dueño. Cuéntenos sus necesidades y le responderemos con la celeridad que su industria exige.
                </p>

                <div className="space-y-10">
                  <div>
                    <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground/40 mb-3">Email de Ventas</p>
                    <a href="mailto:ventas@aceroscas.com.ar" className="font-display font-600 text-2xl hover:text-primary transition-colors">
                      ventas@aceroscas.com.ar
                    </a>
                  </div>
                  <div>
                    <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground/40 mb-3">Oficina Central</p>
                    <p className="font-display font-600 text-2xl">
                      Barracas, Buenos Aires<br />
                      Argentina
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground/40 mb-3">WhatsApp Directo</p>
                    <a href="tel:+541158392680" className="font-display font-600 text-2xl hover:text-primary transition-colors">
                      +54 11 5839-2680
                    </a>
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
                      placeholder="Nombre de su organización"
                      onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground">Su Mensaje</label>
                    <textarea 
                      required
                      rows={4}
                      data-cursor="Mensaje"
                      className="w-full bg-transparent border-b border-muted-foreground/20 py-3 focus:outline-none focus:border-primary transition-colors font-body resize-none"
                      placeholder="¿En qué podemos ayudarle?"
                      onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                    />
                  </div>

                  <div className="pt-6">
                    <MagneticButton
                      data-cursor="Enviar"
                      className="w-full bg-foreground text-background font-body font-bold text-xs tracking-[0.2em] py-5 transition-all hover:bg-primary group overflow-hidden relative"
                    >
                      <span className="relative z-10">ENVIAR CONSULTA</span>
                      <div className="absolute inset-0 bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
                    </MagneticButton>
                  </div>

                  <p className="font-body text-[10px] text-muted-foreground/60 text-center">
                    Al enviar este formulario, usted acepta nuestra política de privacidad y el trato directo de datos.
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
