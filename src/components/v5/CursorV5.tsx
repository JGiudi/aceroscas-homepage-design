import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const CursorV5 = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [showIsotipo, setShowIsotipo] = useState(false);
  const [hoverText, setHoverText] = useState("");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });
  const dotX = useSpring(cursorX, { stiffness: 1000, damping: 50 });
  const dotY = useSpring(cursorY, { stiffness: 1000, damping: 50 });
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = "ontouchstart" in window;
    if (isTouchDevice.current) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor], input, textarea, select, [data-cursor-isotipo]");
      if (interactive) {
        setIsHovering(true);
        const el = interactive as HTMLElement;
        setHoverText(el.dataset.cursor || "");
        // Show isotipo "C" on images, videos, and elements with data-cursor-isotipo
        const isIsotipo = el.hasAttribute("data-cursor-isotipo") || target.closest("img, video, canvas, [data-cursor-isotipo]");
        setShowIsotipo(!!isIsotipo);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor], input, textarea, select, [data-cursor-isotipo]");
      if (interactive) {
        setIsHovering(false);
        setHoverText("");
        setShowIsotipo(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY]);

  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  const ringSize = showIsotipo ? 72 : isHovering ? 80 : isClicking ? 24 : 40;
  const ringOffset = ringSize / -2;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          className="flex items-center justify-center rounded-full border border-background/80"
          animate={{
            width: ringSize,
            height: ringSize,
            marginLeft: ringOffset,
            marginTop: ringOffset,
            borderColor: showIsotipo ? "hsl(358 79% 43%)" : undefined,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <AnimatePresence mode="wait">
            {showIsotipo ? (
              <motion.span
                key="isotipo"
                className="font-display font-800 text-xl text-primary"
                initial={{ opacity: 0, scale: 0, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0, rotate: 90 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                C
              </motion.span>
            ) : hoverText ? (
              <motion.span
                key="text"
                className="font-body text-[10px] font-semibold tracking-[0.15em] uppercase text-background"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                {hoverText}
              </motion.span>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x: dotX, y: dotY }}
      >
        <motion.div
          className="rounded-full bg-primary"
          animate={{
            width: showIsotipo ? 0 : isHovering ? 6 : 5,
            height: showIsotipo ? 0 : isHovering ? 6 : 5,
            marginLeft: showIsotipo ? 0 : isHovering ? -3 : -2.5,
            marginTop: showIsotipo ? 0 : isHovering ? -3 : -2.5,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
      </motion.div>
    </>
  );
};

export default CursorV5;
