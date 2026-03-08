import { motion } from "framer-motion";
import { Puzzle, Layers, Repeat } from "lucide-react";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } },
};

const values = [
  { icon: Puzzle, text: "I thrive where requirements are messy and stakeholders are many." },
  { icon: Layers, text: "Expertise in resolving fragmented signals into scalable platform logic." },
  { icon: Repeat, text: "I own the lifecycle of adoption, bridging the gap between technical constraints and user needs." },
];

const AboutSection = () => (
  <section id="about" className="relative py-28 px-6">
    <div className="absolute top-1/2 right-0 w-[350px] h-[350px] rounded-full bg-primary/[0.05] blur-[100px] animate-blob pointer-events-none" style={{ animationDelay: "3s" }} />
    <div className="container mx-auto max-w-6xl">
      <motion.div
        className="flex flex-col lg:flex-row items-center gap-16"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Headshot */}
        <motion.div className="flex-shrink-0" variants={fadeUp}>
          <div className="relative w-56 h-56 md:w-64 md:h-64">
            <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-primary/20 to-accent/15 blur-2xl" />
            <div className="relative w-full h-full rounded-full bg-secondary flex items-center justify-center border border-border overflow-hidden">
              <span className="text-5xl font-bold text-primary/30 select-none">AZ</span>
            </div>
          </div>
        </motion.div>

        {/* Value Props */}
        <div className="flex-1 space-y-8">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground">
            About & <span className="text-accent">Value</span>
          </motion.h2>
          {values.map((v, i) => (
            <motion.div key={i} className="flex items-start gap-5" variants={fadeUp}>
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                <v.icon size={22} strokeWidth={1.5} className="text-primary" />
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed pt-2">{v.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
