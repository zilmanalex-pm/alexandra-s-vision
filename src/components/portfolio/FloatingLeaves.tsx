import { motion } from "framer-motion";

/* Floating botanical line-art leaves */
const FloatingLeaves = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Leaf 1 - top right */}
    <motion.svg
      viewBox="0 0 60 60"
      className="absolute top-8 right-12 w-12 h-12 opacity-[0.12]"
      animate={{ y: [0, -6, 0], rotate: [0, 5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d="M30 5 C20 15 10 30 15 45 C20 55 35 55 40 45 C50 30 40 15 30 5Z"
        stroke="hsl(180, 43%, 30%)"
        strokeWidth="1"
        fill="none"
      />
      <path d="M30 5 L28 45" stroke="hsl(180, 43%, 30%)" strokeWidth="0.5" fill="none" />
      <path d="M25 20 L28 25" stroke="hsl(180, 43%, 30%)" strokeWidth="0.5" fill="none" />
      <path d="M35 25 L29 30" stroke="hsl(180, 43%, 30%)" strokeWidth="0.5" fill="none" />
    </motion.svg>

    {/* Leaf 2 - left side */}
    <motion.svg
      viewBox="0 0 50 50"
      className="absolute top-1/3 left-6 w-10 h-10 opacity-[0.1]"
      animate={{ y: [0, 5, 0], rotate: [0, -8, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
    >
      <path
        d="M25 5 C15 12 8 25 12 38 C16 48 34 48 38 38 C42 25 35 12 25 5Z"
        stroke="hsl(36, 90%, 44%)"
        strokeWidth="1"
        fill="none"
      />
      <path d="M25 5 L24 38" stroke="hsl(36, 90%, 44%)" strokeWidth="0.5" fill="none" />
    </motion.svg>

    {/* Leaf 3 - bottom right */}
    <motion.svg
      viewBox="0 0 40 40"
      className="absolute bottom-16 right-1/4 w-8 h-8 opacity-[0.08]"
      animate={{ y: [0, -4, 0], rotate: [0, 10, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 4 }}
    >
      <path
        d="M20 3 C12 10 6 20 10 30 C14 37 26 37 30 30 C34 20 28 10 20 3Z"
        stroke="hsl(180, 43%, 30%)"
        strokeWidth="1"
        fill="none"
      />
      <path d="M20 3 L19 30" stroke="hsl(180, 43%, 30%)" strokeWidth="0.5" fill="none" />
    </motion.svg>
  </div>
);

export default FloatingLeaves;
