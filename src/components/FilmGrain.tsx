import { useEffect, useRef } from "react";

const FilmGrain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let lastTime = 0;
    const fps = 24; // Film-like frame rate
    const interval = 1000 / fps;

    const resize = () => {
      canvas.width = window.innerWidth / 2;
      canvas.height = window.innerHeight / 2;
    };
    resize();
    window.addEventListener("resize", resize);

    const render = (time: number) => {
      animationId = requestAnimationFrame(render);
      if (time - lastTime < interval) return;
      lastTime = time;

      const { width, height } = canvas;
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const grain = Math.random() * 60;
        data[i] = grain;
        data[i + 1] = grain;
        data[i + 2] = grain;
        data[i + 3] = 255;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-[9998] pointer-events-none"
      style={{
        opacity: 0.08,
        mixBlendMode: "overlay",
        imageRendering: "pixelated",
      }}
    />
  );
};

export default FilmGrain;
