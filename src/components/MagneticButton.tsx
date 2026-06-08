import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

const MagneticButton = ({ children, className = "", href, onClick }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = href ? "a" : "button";

  const fullWidth = className.includes("w-full");

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={fullWidth ? "block w-full" : "inline-block"}
    >
      <Tag
        href={href}
        onClick={onClick}
        className={`block ${className}`}
      >
        {children}
      </Tag>
    </motion.div>
  );
};

export default MagneticButton;
