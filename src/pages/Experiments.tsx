import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import FilmGrain from "@/components/FilmGrain";

// ─────────────────────────────────────────────────────────────────────────────
// EXPERIMENTO 1 — Letras magnéticas
// Bug fix: no mezclar y en initial/animate Y en spring style simultáneamente
// ─────────────────────────────────────────────────────────────────────────────
const MagneticChar = ({ char, index }: { char: string; index: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const radius = 150;
      if (dist < radius && dist > 0.1) {
        const force = ((radius - dist) / radius) ** 1.5;
        x.set(-(dx / dist) * force * 60);
        y.set(-(dy / dist) * force * 60);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [x, y]);

  return (
    // opacity-only en initial/animate para no conflictuar con spring y
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy, display: "inline-block" }}
      className="font-display font-800 text-foreground select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
    >
      {char}
    </motion.span>
  );
};

const MagneticText = () => (
  <div className="flex items-center justify-center h-full">
    <div className="flex flex-wrap justify-center gap-1" style={{ fontSize: "clamp(2.5rem, 8vw, 8rem)" }}>
      {"ACEROSCAS".split("").map((c, i) => <MagneticChar key={i} char={c} index={i} />)}
      <MagneticChar char="." index={9} />
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// EXPERIMENTO 2 — Metal fundido (difusión de calor reactiva al cursor)
// ─────────────────────────────────────────────────────────────────────────────
const MoltenMetal = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999, active: false });
  const animRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();

    const COLS = 90, ROWS = 55;
    let heat = new Float32Array(COLS * ROWS);
    const get = (x: number, y: number) => x >= 0 && x < COLS && y >= 0 && y < ROWS ? heat[y * COLS + x] : 0;
    const set = (x: number, y: number, v: number) => {
      if (x >= 0 && x < COLS && y >= 0 && y < ROWS) heat[y * COLS + x] = Math.max(0, Math.min(1, v));
    };

    const tick = () => {
      const W = canvas.width, H = canvas.height;
      const cw = W / COLS, ch = H / ROWS;
      if (mouseRef.current.active) {
        const mx = Math.floor(mouseRef.current.x / cw);
        const my = Math.floor(mouseRef.current.y / ch);
        for (let dy = -3; dy <= 3; dy++)
          for (let dx = -3; dx <= 3; dx++) {
            const d = Math.hypot(dx, dy);
            if (d <= 3) set(mx + dx, my + dy, get(mx + dx, my + dy) + (1 - d / 3.5) * 0.5);
          }
      }
      const next = new Float32Array(heat.length);
      for (let y = 0; y < ROWS; y++)
        for (let x = 0; x < COLS; x++) {
          const avg = (get(x - 1, y) + get(x + 1, y) + get(x, y - 1) + get(x, y + 1)) / 4;
          next[y * COLS + x] = Math.max(0, (get(x, y) * 0.72 + avg * 0.28) * 0.963);
        }
      heat = next;
      ctx.clearRect(0, 0, W, H);
      for (let y = 0; y < ROWS; y++)
        for (let x = 0; x < COLS; x++) {
          const t = heat[y * COLS + x];
          if (t < 0.015) continue;
          let r, g, b;
          if (t < 0.35) { r = Math.round(120 + 135 * (t / 0.35)); g = Math.round(120 - 80 * (t / 0.35)); b = Math.round(128 - 120 * (t / 0.35)); }
          else if (t < 0.72) { const tt = (t - 0.35) / 0.37; r = 255; g = Math.round(40 + 120 * tt); b = 8; }
          else { const tt = (t - 0.72) / 0.28; r = 255; g = Math.round(160 + 95 * tt); b = Math.round(8 + 247 * tt); }
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.globalAlpha = Math.min(1, t * 1.8);
          ctx.fillRect(x * cw - 0.5, y * ch - 0.5, cw + 1, ch + 1);
        }
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full"
        onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top, active: true }; }}
        onMouseLeave={() => { mouseRef.current.active = false; }} />
      <p className="absolute bottom-4 left-0 right-0 text-center font-body text-[10px] tracking-[0.3em] uppercase text-white/20 pointer-events-none">Mové el cursor para fundir</p>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// EXPERIMENTO 3 — Test de estrés: barra que se dobla y rompe
// ─────────────────────────────────────────────────────────────────────────────
const StressTest = () => {
  const [bendY, setBendY] = useState(0);
  const [broken, setBroken] = useState(false);
  const dragging = useRef(false);
  const MAX = 110;
  const stress = Math.abs(bendY) / MAX;
  const r = Math.round(160 + 95 * stress);
  const g = Math.round(162 - 148 * stress);
  const b = Math.round(168 - 155 * stress);
  const color = `rgb(${r},${g},${b})`;
  const W = 360, H = 280, midX = W / 2;
  const path = broken
    ? `M 24 0 L ${midX - 28} ${bendY * 0.75} M ${midX + 28} ${bendY * 0.75} L ${W - 24} 0`
    : `M 24 0 Q ${midX} ${bendY} ${W - 24} 0`;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 select-none">
      <svg width={W} height={H} viewBox={`0 ${-H / 2} ${W} ${H}`} className="overflow-visible"
        onPointerMove={(e) => {
          if (!dragging.current || broken) return;
          const svg = (e.target as SVGElement).closest("svg")!;
          const rect = svg.getBoundingClientRect();
          const ny = Math.max(-MAX, Math.min(MAX, e.clientY - rect.top - H / 2));
          setBendY(ny);
          if (Math.abs(ny) >= MAX - 3) setBroken(true);
        }}
        onPointerUp={() => { dragging.current = false; }}
      >
        <rect x={0} y={-9} width={30} height={18} fill="#555560" rx={3} />
        <rect x={W - 30} y={-9} width={30} height={18} fill="#555560" rx={3} />
        <path d={path} stroke={color} strokeWidth={9} fill="none" strokeLinecap="round" />
        {!broken && stress > 0.15 && Array.from({ length: 7 }, (_, i) => {
          const t = (i + 1) / 8;
          const px = 24 + (W - 48) * t;
          const py = 2 * (1 - t) * t * bendY;
          return <line key={i} x1={px - 5} y1={py - 10} x2={px + 5} y2={py + 10} stroke={color} strokeWidth={1.2} opacity={stress * 0.7} />;
        })}
        {!broken && (
          <circle cx={midX} cy={bendY} r={13} fill="#C01A21" className="cursor-grab"
            onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); dragging.current = true; }}
            onPointerUp={() => { dragging.current = false; }} />
        )}
      </svg>
      <div className="text-center space-y-2">
        <p className="font-body text-[10px] tracking-[0.35em] uppercase" style={{ color: stress > 0.8 ? "#C01A21" : "rgba(255,255,255,0.2)" }}>
          {broken ? "— ROTURA —" : `Estrés: ${Math.round(stress * 100)}%${stress > 0.8 ? " · PUNTO CRÍTICO" : ""}`}
        </p>
        {broken && (
          <motion.button onClick={() => { setBroken(false); setBendY(0); }}
            className="font-body text-[10px] tracking-[0.3em] uppercase text-foreground/30 hover:text-primary border border-foreground/10 px-5 py-2 transition-colors"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Reset</motion.button>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// EXPERIMENTO 4 — Forja de partículas (1000 partículas forman "AC")
// ─────────────────────────────────────────────────────────────────────────────
interface P { x: number; y: number; hx: number; hy: number; vx: number; vy: number }

const ParticleForge = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    const tmp = document.createElement("canvas");
    tmp.width = W; tmp.height = H;
    const tc = tmp.getContext("2d")!;

    document.fonts.ready.then(() => {
      tc.fillStyle = "#fff"; tc.fillRect(0, 0, W, H);
      tc.fillStyle = "#000";
      tc.font = `900 ${H * 0.62}px Syne, sans-serif`;
      tc.textAlign = "center"; tc.textBaseline = "middle";
      tc.fillText("AC", W / 2, H / 2);
      const id = tc.getImageData(0, 0, W, H).data;
      const pts: { x: number; y: number }[] = [];
      for (let y = 0; y < H; y += 4)
        for (let x = 0; x < W; x += 4)
          if (id[(y * W + x) * 4] < 128) pts.push({ x, y });
      pts.sort(() => Math.random() - 0.5);
      const particles: P[] = pts.slice(0, 1000).map((p) => ({
        x: Math.random() * W, y: Math.random() * H, hx: p.x, hy: p.y, vx: 0, vy: 0,
      }));

      const tick = () => {
        ctx.clearRect(0, 0, W, H);
        const mx = mouseRef.current.x, my = mouseRef.current.y;
        for (const p of particles) {
          const dx = p.x - mx, dy = p.y - my;
          const dist = Math.hypot(dx, dy);
          if (dist < 110 && dist > 0.1) {
            const f = ((110 - dist) / 110) ** 2;
            p.vx += (dx / dist) * f * 9; p.vy += (dy / dist) * f * 9;
          }
          p.vx += (p.hx - p.x) * 0.09; p.vy += (p.hy - p.y) * 0.09;
          p.vx *= 0.82; p.vy *= 0.82;
          p.x += p.vx; p.y += p.vy;
          const dh = Math.hypot(p.x - p.hx, p.y - p.hy);
          const heat = Math.min(1, dh / 80);
          ctx.fillStyle = `rgb(${Math.round(175 + 80 * heat)},${Math.round(175 - 155 * heat)},${Math.round(180 - 160 * heat)})`;
          ctx.fillRect(p.x - 1, p.y - 1, 2, 2);
        }
        animRef.current = requestAnimationFrame(tick);
      };
      tick();
    });
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full"
        onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }; }}
        onMouseLeave={() => { mouseRef.current = { x: -9999, y: -9999 }; }} />
      <p className="absolute bottom-4 left-0 right-0 text-center font-body text-[10px] tracking-[0.3em] uppercase text-white/20 pointer-events-none">El cursor dispersa las partículas</p>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// EXPERIMENTO 5 — Ondas de acero (simulación de onda en superficie metálica)
// ─────────────────────────────────────────────────────────────────────────────
const WaveSteel = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const dropRef = useRef<(x: number, y: number) => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    const SCALE = 3;
    const COLS = Math.floor(W / SCALE);
    const ROWS = Math.floor(H / SCALE);
    let curr = new Float32Array(COLS * ROWS);
    let prev = new Float32Array(COLS * ROWS);

    const idx = (x: number, y: number) => y * COLS + x;
    const get = (arr: Float32Array, x: number, y: number) =>
      x > 0 && x < COLS - 1 && y > 0 && y < ROWS - 1 ? arr[idx(x, y)] : 0;

    dropRef.current = (px, py) => {
      const cx = Math.floor(px / SCALE);
      const cy = Math.floor(py / SCALE);
      for (let dy = -3; dy <= 3; dy++)
        for (let dx = -3; dx <= 3; dx++) {
          const d = Math.hypot(dx, dy);
          if (d <= 3 && cx + dx > 0 && cx + dx < COLS - 1 && cy + dy > 0 && cy + dy < ROWS - 1)
            curr[idx(cx + dx, cy + dy)] = 5 * (1 - d / 3.5);
        }
    };

    // Auto-drops periódicos
    let autoTimer = 0;
    const autoDrop = () => {
      dropRef.current(Math.random() * W, Math.random() * H);
      autoTimer = window.setTimeout(autoDrop, 1200 + Math.random() * 2000);
    };
    autoTimer = window.setTimeout(autoDrop, 800);

    const tick = () => {
      // Ecuación de onda: u(t+1) = 2u(t) - u(t-1) + c²∇²u
      const next = new Float32Array(COLS * ROWS);
      for (let y = 1; y < ROWS - 1; y++)
        for (let x = 1; x < COLS - 1; x++) {
          next[idx(x, y)] = (
            (get(curr, x - 1, y) + get(curr, x + 1, y) + get(curr, x, y - 1) + get(curr, x, y + 1)) / 2
            - get(prev, x, y)
          ) * 0.994; // amortiguación
        }
      prev = curr; curr = next;

      // Render — mapeo a colores metálicos
      const imgData = ctx.createImageData(W, H);
      const data = imgData.data;
      for (let y = 0; y < ROWS; y++)
        for (let x = 0; x < COLS; x++) {
          const v = curr[idx(x, y)];
          const bright = Math.min(255, Math.max(0, 115 + v * 55));
          const warm = bright + 6;
          for (let sy = 0; sy < SCALE; sy++)
            for (let sx = 0; sx < SCALE; sx++) {
              const pi = ((y * SCALE + sy) * W + (x * SCALE + sx)) * 4;
              data[pi] = warm; data[pi + 1] = bright; data[pi + 2] = warm + 2; data[pi + 3] = 255;
            }
        }
      ctx.putImageData(imgData, 0, 0);
      animRef.current = requestAnimationFrame(tick);
    };
    tick();

    return () => { cancelAnimationFrame(animRef.current); clearTimeout(autoTimer); };
  }, []);

  return (
    <div className="relative w-full h-full cursor-crosshair">
      <canvas ref={canvasRef} className="w-full h-full"
        onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); dropRef.current(e.clientX - r.left, e.clientY - r.top); }} />
      <p className="absolute bottom-4 left-0 right-0 text-center font-body text-[10px] tracking-[0.3em] uppercase text-white/20 pointer-events-none">
        Hacé click para crear ondas
      </p>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// EXPERIMENTO 6 — Fragmentación (click fractura la superficie en astillas)
// ─────────────────────────────────────────────────────────────────────────────
interface Shard { id: number; x: number; y: number; angle: number; dist: number; rot: number; w: number; h: number; gray: number }

const Fractura = () => {
  const [shards, setShards] = useState<Shard[]>([]);
  const nextId = useRef(0);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const count = 18 + Math.floor(Math.random() * 12);
    const newShards: Shard[] = Array.from({ length: count }, (_, i) => ({
      id: nextId.current++,
      x: cx, y: cy,
      angle: (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.6,
      dist: 80 + Math.random() * 220,
      rot: (Math.random() - 0.5) * 540,
      w: 8 + Math.random() * 44,
      h: 4 + Math.random() * 20,
      gray: 90 + Math.floor(Math.random() * 80),
    }));
    setShards(prev => [...prev, ...newShards]);
    const ids = newShards.map(s => s.id);
    setTimeout(() => setShards(prev => prev.filter(s => !ids.includes(s.id))), 1600);
  };

  // Polígono en forma de astilla metálica
  const shardPath = (w: number, h: number) =>
    `0,${h / 2} ${w * 0.15},0 ${w},${h * 0.35} ${w * 0.85},${h} ${w * 0.05},${h * 0.75}`;

  return (
    <div
      className="relative w-full h-full overflow-hidden cursor-crosshair bg-[#111114]"
      onClick={handleClick}
    >
      {/* Superficie base con textura sutil */}
      <div className="absolute inset-0 opacity-20"
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)", backgroundSize: "28px 28px" }} />

      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <AnimatePresence>
          {shards.map((s) => (
            <motion.polygon
              key={s.id}
              points={shardPath(s.w, s.h)}
              fill={`rgb(${s.gray},${s.gray},${s.gray + 8})`}
              stroke={`rgba(${s.gray + 40},${s.gray + 40},${s.gray + 50},0.5)`}
              strokeWidth={0.5}
              initial={{
                translateX: s.x - s.w / 2,
                translateY: s.y - s.h / 2,
                rotate: 0,
                opacity: 1,
                scale: 1,
              }}
              animate={{
                translateX: s.x - s.w / 2 + Math.cos(s.angle) * s.dist,
                translateY: s.y - s.h / 2 + Math.sin(s.angle) * s.dist + s.dist * 0.4,
                rotate: s.rot,
                opacity: 0,
                scale: 0.3,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </AnimatePresence>
      </svg>

      {shards.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="font-display font-800 text-white/[0.04] select-none" style={{ fontSize: "clamp(3rem, 12vw, 12rem)" }}>
            FRACTURA
          </p>
        </div>
      )}

      <p className="absolute bottom-4 left-0 right-0 text-center font-body text-[10px] tracking-[0.3em] uppercase text-white/20 pointer-events-none">
        Hacé click para fragmentar la superficie
      </p>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────
const experiments = [
  { id: "magnetic",   label: "Campo Magnético",   tag: "Física reactiva",         description: "Las letras tienen masa. El cursor las repele, la tensión las trae de vuelta.", component: MagneticText,   bg: "bg-foreground" },
  { id: "molten",     label: "Metal Fundido",      tag: "Difusión de calor",       description: "Simulación térmica reactiva. 90×55 celdas. El cursor calienta la superficie.", component: MoltenMetal,    bg: "bg-[#0a0a0a]" },
  { id: "stress",     label: "Test de Estrés",     tag: "Mecánica estructural",    description: "Arrastrá el punto rojo. La barra se dobla, el color cambia, la estructura falla.", component: StressTest,     bg: "bg-foreground" },
  { id: "particles",  label: "Forja de Partículas",tag: "Sistema de partículas",   description: "1.000 partículas forman el logo AC. El cursor las dispersa, vuelven solas.", component: ParticleForge,  bg: "bg-[#080808]" },
  { id: "waves",      label: "Ondas de Acero",     tag: "Simulación de ondas",     description: "Ecuación de onda 2D sobre superficie metálica. Click para crear ondas, se propagan y se anulan.", component: WaveSteel,      bg: "bg-[#0c0c0e]" },
  { id: "fractura",   label: "Fragmentación",      tag: "Física de impacto",       description: "Click en cualquier punto. La superficie se fragmenta en astillas metálicas con física.", component: Fractura,       bg: "bg-[#0e0e10]" },
];

export default function Experiments() {
  const [active, setActive] = useState(0);
  const Exp = experiments[active].component;

  return (
    <div className="min-h-screen bg-foreground text-background">
      <FilmGrain />

      <header className="fixed top-0 left-0 right-0 z-50 px-8 md:px-12 py-5 flex items-center justify-between bg-foreground/80 backdrop-blur-sm border-b border-background/[0.05]">
        <div className="flex items-center gap-4">
          <a href="/v7" className="font-display font-800 text-lg text-background tracking-tight">
            ACEROSCAS<span className="text-primary">.</span>
          </a>
          <span className="font-body text-[9px] tracking-[0.4em] uppercase text-background/20">Lab experimental</span>
        </div>
        <span className="font-body text-[9px] tracking-[0.3em] uppercase text-primary/50 border border-primary/20 px-3 py-1">
          v0.1 — WIP
        </span>
      </header>

      <div className="pt-[57px] flex flex-col lg:flex-row" style={{ minHeight: "100vh" }}>

        {/* Sidebar */}
        <aside className="lg:w-[320px] flex-shrink-0 px-6 md:px-10 pt-8 pb-8 lg:pb-0 border-r border-background/[0.06] flex flex-col gap-1 overflow-y-auto">
          <p className="font-body text-[9px] tracking-[0.4em] uppercase text-background/18 mb-4">
            {experiments.length} experimentos
          </p>
          {experiments.map((exp, i) => (
            <button key={exp.id} onClick={() => setActive(i)}
              className={`group relative text-left px-3 py-3 transition-all duration-300 border-l-2 ${
                i === active ? "bg-background/[0.04] border-primary" : "border-transparent hover:bg-background/[0.02] hover:border-background/10"
              }`}
            >
              <p className={`font-display font-800 text-base transition-colors ${i === active ? "text-background" : "text-background/30 group-hover:text-background/55"}`}>
                {exp.label}
              </p>
              <p className="font-body text-[10px] text-background/18 tracking-wide">{exp.tag}</p>
              <AnimatePresence>
                {i === active && (
                  <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                    className="font-body text-xs text-background/28 mt-2 leading-relaxed overflow-hidden">
                    {exp.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </button>
          ))}
          <div className="mt-auto pt-8 border-t border-background/[0.05]">
            <p className="font-body text-[9px] text-background/15 leading-relaxed">
              Prototipos experimentales. Algunos van a producción, otros solo existen para explorar.
            </p>
          </div>
        </aside>

        {/* Área principal */}
        <main className="flex-1 relative" style={{ minHeight: "calc(100vh - 57px)" }}>
          <AnimatePresence mode="wait">
            <motion.div key={active} className={`absolute inset-0 ${experiments[active].bg}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}>
              <Exp />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
