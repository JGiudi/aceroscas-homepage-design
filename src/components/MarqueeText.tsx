import { motion } from "framer-motion";

interface Props {
  texts: string[];
  speed?: number;
  separator?: string;
  className?: string;
  direction?: "left" | "right";
}

const MarqueeText = ({
  texts,
  speed = 20,
  separator = "—",
  className = "",
  direction = "left",
}: Props) => {
  const content = texts.join(` ${separator} `) + ` ${separator} `;
  const duplicated = content.repeat(4);

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-block"
        animate={{
          x: direction === "left" ? [0, "-25%"] : ["-25%", 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        <span className="font-display font-800">{duplicated}</span>
      </motion.div>
    </div>
  );
};

export default MarqueeText;
