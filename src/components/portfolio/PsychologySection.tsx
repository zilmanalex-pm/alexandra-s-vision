import { motion } from "framer-motion";
import { Brain } from "lucide-react";

const slow = { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const };

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } },
};

const PsychologySection = () => (
  <section
    id="psychology"
    className="relative py-28 px-6 overflow-hidden"
    style={{ background: "linear-gradient(180deg, hsl(0,0%,10.2%) 0%, #B45309 30%, #B45309 70%, hsl(0,0%,10.2%) 100%)" }}
  >
    {/* Soft blur blobs */}
    <div className="absolute top-1/4 -left-32 w-[400px] h-[400px] rounded-full bg-accent/[0.15] blur-[160px] pointer-events-none" />
    <div className="absolute bottom-1/4 -right-32 w-[350px] h-[350px] rounded-full bg-primary/[0.1] blur-[140px] pointer-events-none" />

    <motion.div
      className="container mx-auto max-w-3xl relative z-10"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div variants={fadeUp} className="flex justify-center mb-8">
        <motion.div
          className="w-16 h-16 rounded-full bg-foreground/[0.1] border border-foreground/[0.15] flex items-center justify-center"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Brain size={30} strokeWidth={1} className="text-foreground" />
        </motion.div>
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className="text-3xl md:text-4xl font-bold text-center text-foreground mb-6"
      >
        The Psychology of <span className="text-accent">Product</span>
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className="text-center text-lg md:text-xl leading-relaxed text-foreground/80 max-w-2xl mx-auto"
      >
        With a degree in Psychology, I don't just build features; I design for human behavior.
        I bridge the gap between complex engineering and the way people actually think, feel, and work.
      </motion.p>
    </motion.div>
  </section>
);

export default PsychologySection;
