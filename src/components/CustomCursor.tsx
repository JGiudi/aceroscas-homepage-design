import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
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
      const interactive = target.closest("a, button, [data-cursor], input, textarea, select");
      if (interactive) {
        setIsHovering(true);
        setHoverText((interactive as HTMLElement).dataset.cursor || "");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor], input, textarea, select");
      if (interactive) {
        setIsHovering(false);
        setHoverText("");
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
            width: isHovering ? 80 : isClicking ? 24 : 40,
            height: isHovering ? 80 : isClicking ? 24 : 40,
            marginLeft: isHovering ? -40 : isClicking ? -12 : -20,
            marginTop: isHovering ? -40 : isClicking ? -12 : -20,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {hoverText && (
            <motion.span
              className="font-body text-[10px] font-semibold tracking-[0.15em] uppercase text-background"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              {hoverText}
            </motion.span>
          )}
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
            width: isHovering ? 6 : 5,
            height: isHovering ? 6 : 5,
            marginLeft: isHovering ? -3 : -2.5,
            marginTop: isHovering ? -3 : -2.5,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
