import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import FullscreenMenu from "@/components/FullscreenMenu";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SmoothScroll from "@/components/SmoothScroll";
import MagneticButton from "@/components/MagneticButton";
import FooterSection from "@/components/v6/FooterSection";
import { ChevronRight, Download } from "lucide-react";

const productCategories = [
  {
    id: "carbono",
    title: "Aceros al Carbono",
    description: "La base de la industria. Versatilidad y resistencia para aplicaciones generales.",
    items: [
      { quality: "SAE 1010/20", detail: "Bajo Carbono", sizes: "Ø 6mm a 300mm", profiles: ["redondo", "cuadrado", "planchuela"] },
      { quality: "SAE 1040/45", detail: "Medio Carbono", sizes: "Ø 12mm a 500mm", profiles: ["redondo", "cuadrado", "hexagonal"] },
    ]
  },
  {
    id: "mecanica",
    title: "Construcción Mecánica",
    description: "Aceros aleados para piezas de alta exigencia, fatiga y tracción.",
    items: [
      { quality: "SAE 4140", detail: "Cromo-Molibdeno", sizes: "Ø 16mm a 400mm", profiles: ["redondo", "cuadrado"] },
      { quality: "SAE 4340", detail: "Níquel-Cromo-Molibdeno", sizes: "Ø 20mm a 350mm", profiles: ["redondo"] },
      { quality: "SAE 5115", detail: "Cromo", sizes: "Ø 10mm a 250mm", profiles: ["redondo"] },
    ]
  },
  {
    id: "inoxidables",
    title: "Aceros Inoxidables",
    description: "Resistencia a la corrosión y estética para ambientes exigentes y sanitarios.",
    items: [
      { quality: "AISI 304/304L", detail: "Austenítico", sizes: "Ø 3mm a 300mm", profiles: ["redondo", "cuadrado", "hexagonal", "planchuela"] },
      { quality: "AISI 316/316L", detail: "Alta Corrosión", sizes: "Ø 6mm a 250mm", profiles: ["redondo", "planchuela"] },
      { quality: "AISI 410/420", detail: "Martensítico", sizes: "Ø 8mm a 200mm", profiles: ["redondo"] },
    ]
  },
  {
    id: "cementacion",
    title: "Aceros para Cementación",
    description: "Para piezas que requieren gran dureza superficial y núcleo tenaz.",
    items: [
      { quality: "SAE 8620", detail: "Níquel-Cromo-Molibdeno", sizes: "Ø 16mm a 300mm", profiles: ["redondo"] },
      { quality: "SAE 3310", detail: "Níquel-Cromo", sizes: "Ø 20mm a 250mm", profiles: ["redondo"] },
    ]
  },
  {
    id: "herramientas",
    title: "Trabajo en Frío y Caliente",
    description: "Aceros de alta dureza para matrices, moldes y herramientas de corte.",
    items: [
      { quality: "K100 (D6)", detail: "Alto Cromo", sizes: "Barras y Bloques", profiles: ["redondo", "cuadrado", "planchuela"] },
      { quality: "K110 (D2)", detail: "Tenacidad", sizes: "Barras y Bloques", profiles: ["redondo", "planchuela"] },
      { quality: "W302 (H13)", detail: "Trabajo en Caliente", sizes: "Barras y Bloques", profiles: ["redondo"] },
    ]
  },
  {
    id: "rapido",
    title: "Acero Rápido",
    description: "Alta resistencia al desgaste y mantenimiento de dureza a altas temperaturas.",
    items: [
      { quality: "M2", detail: "Molibdeno-Tungsteno", sizes: "Ø 3mm a 150mm", profiles: ["redondo", "cuadrado"] },
    ]
  },
  {
    id: "calibrados",
    title: "Calibrados y Pulidos",
    description: "Terminación superficial superior para precisión dimensional.",
    items: [
      { quality: "1018/1045", detail: "Barras de Precisión", sizes: "Ø 3mm a 100mm", profiles: ["redondo", "cuadrado", "hexagonal"] },
    ]
  },
  {
    id: "plata",
    title: "Plata al Tungsteno",
    description: "Acero de alta calidad con acabado rectificado y gran precisión.",
    items: [
      { quality: "Plata", detail: "Tungsteno", sizes: "Ø 1mm a 50mm", profiles: ["redondo"] },
    ]
  },
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredCategories = activeCategory === "all" 
    ? productCategories 
    : productCategories.filter(cat => cat.id === activeCategory);

  return (
    <>
      <CustomCursor />
      <FilmGrain />
      <FullscreenMenu />
      
      <SmoothScroll>
        <main className="bg-background min-h-screen pt-32 pb-20">
          <div className="container mx-auto px-8 md:px-16">
            
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="mb-20"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[2px] w-10 bg-primary" />
                <span className="font-body text-xs font-semibold tracking-[0.4em] uppercase text-primary">
                  Catálogo de Soluciones
                </span>
              </div>
              
              <h1 className="font-display font-800 text-5xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tight text-foreground mb-8">
                Materiales que<br />
                sostienen la <span className="text-primary">industria</span><span className="text-primary">.</span>
              </h1>

              <div className="flex flex-wrap gap-4 mt-12">
                <button 
                  onClick={() => setActiveCategory("all")}
                  data-cursor="Filtrar"
                  className={`px-6 py-2 rounded-full border text-xs font-body tracking-widest transition-all duration-300 ${activeCategory === "all" ? "bg-primary border-primary text-white" : "border-foreground/10 hover:border-primary text-muted-foreground"}`}
                >
                  TODOS
                </button>
                {productCategories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    data-cursor="Filtrar"
                    className={`relative px-6 py-2 rounded-full border text-xs font-body tracking-widest transition-all duration-500 overflow-hidden group ${activeCategory === cat.id ? "bg-primary border-primary text-white" : "border-foreground/10 hover:border-primary text-muted-foreground"}`}
                  >
                    <motion.span 
                      className="absolute inset-0 bg-primary/10 origin-center"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1.5 }}
                      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                    />
                    <span className="relative z-10">{cat.title.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Grid */}
            <div className="space-y-32">
              <AnimatePresence mode="popLayout">
                {filteredCategories.map((category, catIdx) => (
                  <motion.section 
                    key={category.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, delay: catIdx * 0.1 }}
                    className="relative"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                      {/* Category Header */}
                      <div className="lg:col-span-1">
                        <span className="font-display font-800 text-6xl text-foreground/[0.03] absolute -top-10 -left-4 select-none">
                          0{catIdx + 1}
                        </span>
                        <h2 className="font-display font-800 text-3xl md:text-4xl text-foreground mb-6 tracking-tight relative z-10">
                          {category.title}
                        </h2>
                        <p className="font-body text-muted-foreground leading-relaxed max-w-xs mb-8">
                          {category.description}
                        </p>
                        <MagneticButton 
                          data-cursor="PDF"
                          className="flex items-center gap-2 text-xs font-bold tracking-widest text-primary hover:text-primary/80 transition-colors"
                        >
                          <Download size={16} /> LISTA DE PESOS
                        </MagneticButton>
                      </div>

                      {/* Technical Table */}
                      <div className="lg:col-span-2 bg-zinc-100/50 rounded-sm border border-foreground/[0.03] overflow-hidden">
                        <div className="grid grid-cols-4 bg-foreground/[0.02] border-b border-foreground/[0.05] px-6 py-4">
                          <span className="font-body text-[10px] tracking-widest uppercase text-muted-foreground">Calidad</span>
                          <span className="font-body text-[10px] tracking-widest uppercase text-muted-foreground">Detalle</span>
                          <span className="font-body text-[10px] tracking-widest uppercase text-muted-foreground">Medidas</span>
                          <span className="font-body text-[10px] tracking-widest uppercase text-muted-foreground text-right">Perfiles</span>
                        </div>
                        
                        <div className="divide-y divide-foreground/[0.05]">
                          {category.items.map((item, itemIdx) => (
                            <motion.div 
                              key={itemIdx}
                              whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                              className="grid grid-cols-4 px-6 py-6 items-center group cursor-default"
                            >
                              <span className="font-display font-700 text-lg md:text-xl text-foreground group-hover:text-primary transition-colors">
                                {item.quality}
                              </span>
                              <span className="font-body text-sm text-muted-foreground">
                                {item.detail}
                              </span>
                              <span className="font-body text-sm font-medium">
                                {item.sizes}
                              </span>
                              <div className="flex justify-end gap-2">
                                {item.profiles.map(p => (
                                  <div key={p} className="w-6 h-6 border border-primary/20 rounded-sm flex items-center justify-center bg-white shadow-sm" title={p}>
                                     {p === "redondo" && <div className="w-3 h-3 rounded-full bg-primary" />}
                                     {p === "cuadrado" && <div className="w-3 h-3 bg-primary" />}
                                     {p === "hexagonal" && <div className="w-3 h-3 bg-primary" style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }} />}
                                     {p === "planchuela" && <div className="w-4 h-1.5 bg-primary" />}
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.section>
                ))}
              </AnimatePresence>
            </div>

            {/* Global CTA */}
            <motion.section 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-40 bg-foreground text-background p-12 md:p-24 rounded-sm text-center relative overflow-hidden"
            >
               <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
                  <div className="w-full h-full" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
               </div>
               
               <h2 className="font-display font-800 text-4xl md:text-6xl mb-8 tracking-tight relative z-10">
                 ¿No encuentra la medida<br />que busca?
               </h2>
               <p className="font-body text-background/60 mb-12 max-w-xl mx-auto relative z-10">
                 Contamos con stock permanente y capacidad para procesar pedidos especiales. Hable directamente con nosotros.
               </p>
               <div className="flex justify-center relative z-10">
                 <MagneticButton
                   href="/contacto"
                   className="bg-primary text-white font-body font-bold text-xs tracking-[0.2em] px-12 py-5 hover:bg-white hover:text-foreground transition-all duration-500"
                 >
                   SOLICITAR ASESORAMIENTO
                 </MagneticButton>
               </div>
            </motion.section>

          </div>
        </main>
        <FooterSection />
      </SmoothScroll>
    </>
  );
};

export default Products;
