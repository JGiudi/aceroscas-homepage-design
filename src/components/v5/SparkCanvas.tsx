import { useEffect, useRef } from "react";

/**
 * Welding spark particle system rendered on canvas.
 * Responds to mouse position for depth parallax.
 */
const SparkCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let mouseX = 0.5;
    let mouseY = 0.5;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth;
      mouseY = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", handleMouse);

    interface Spark {
      x: number; y: number; vx: number; vy: number;
      life: number; maxLife: number; size: number; bright: number;
    }

    const sparks: Spark[] = [];
    const SPARK_COUNT = 80;

    for (let i = 0; i < SPARK_COUNT; i++) {
      sparks.push(createSpark(canvas.width, canvas.height));
    }

    function createSpark(w: number, h: number): Spark {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.random() * 1.5 - 0.3,
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        bright: Math.random(),
      };
    }

    const render = () => {
      animationId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i];
        s.x += s.vx + (mouseX - 0.5) * 0.3;
        s.y += s.vy + (mouseY - 0.5) * 0.2;
        s.life++;

        if (s.life > s.maxLife || s.y < -10 || s.x < -10 || s.x > canvas.width + 10) {
          sparks[i] = createSpark(canvas.width, canvas.height);
          sparks[i].y = canvas.height + 10;
          continue;
        }

        const progress = s.life / s.maxLife;
        const alpha = progress < 0.1 ? progress * 10 : progress > 0.7 ? (1 - progress) / 0.3 : 1;

        // Orange-red spark color
        const r = 192 + s.bright * 63;
        const g = 26 + s.bright * 40;
        const b = 33;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * (1 - progress * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.4})`;
        ctx.fill();

        // Glow
        if (s.bright > 0.7) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.08})`;
          ctx.fill();
        }
      }
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-[9997] pointer-events-none"
      style={{ opacity: 0.35, mixBlendMode: "screen" }}
    />
  );
};

export default SparkCanvas;
