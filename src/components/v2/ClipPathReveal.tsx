import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Props {
  children: React.ReactNode;
  direction?: "top" | "bottom" | "left";
  className?: string;
}

const ClipPathReveal = ({ children, direction = "bottom", className = "" }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const getClipPath = () => {
    switch (direction) {
      case "top":
        return {
          from: "inset(100% 0% 0% 0%)",
          to: "inset(0% 0% 0% 0%)",
        };
      case "left":
        return {
          from: "inset(0% 100% 0% 0%)",
          to: "inset(0% 0% 0% 0%)",
        };
      case "bottom":
      default:
        return {
          from: "inset(0% 0% 100% 0%)",
          to: "inset(0% 0% 0% 0%)",
        };
    }
  };

  const { from, to } = getClipPath();
  const clipPath = useTransform(scrollYProgress, [0.1, 0.4], [from, to]);

  return (
    <motion.div ref={ref} className={className} style={{ clipPath }}>
      {children}
    </motion.div>
  );
};

export default ClipPathReveal;
