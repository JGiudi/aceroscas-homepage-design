import { ReactNode } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface Props {
  children: ReactNode;
}

const SmoothScroll = ({ children }: Props) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-50 origin-left"
        style={{ scaleX }}
      />
      {children}
    </>
  );
};

export default SmoothScroll;
