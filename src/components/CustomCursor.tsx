import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverText, setHoverText] = useState("");
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springX = useSpring(cursorX, { stiffness: 400, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 400, damping: 30 });
  
  const dotX = useSpring(cursorX, { stiffness: 800, damping: 40 });
  const dotY = useSpring(cursorY, { stiffness: 800, damping: 40 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const interactive = target.closest("a, button, [data-cursor], input, textarea, select");
      if (interactive) {
        setIsHovering(true);
        const text = (interactive as HTMLElement).getAttribute("data-cursor");
        if (text) setHoverText(text);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const interactive = target.closest("a, button, [data-cursor], input, textarea, select");
      if (interactive) {
        setIsHovering(false);
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
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
  }, [cursorX, cursorY]); // These are stable refs from useMotionValue

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          className="flex items-center justify-center rounded-full border border-primary/40 bg-primary/5 backdrop-blur-[1px]"
          animate={{
            width: isHovering ? 90 : isClicking ? 20 : 36,
            height: isHovering ? 90 : isClicking ? 20 : 36,
            marginLeft: isHovering ? -45 : isClicking ? -10 : -18,
            marginTop: isHovering ? -45 : isClicking ? -10 : -18,
          }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
        >
          <AnimatePresence>
            {hoverText && (
              <motion.span
                className="font-body text-[9px] font-bold tracking-[0.15em] uppercase text-white"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                {hoverText}
              </motion.span>
            )}
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
            width: isHovering ? 4 : 4,
            height: isHovering ? 4 : 4,
            marginLeft: -2,
            marginTop: -2,
            opacity: isHovering ? 0 : 1
          }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;

