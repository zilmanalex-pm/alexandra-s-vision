import { motion } from "framer-motion";
import { Puzzle, Layers, Repeat, UserRound } from "lucide-react";
import monsteraImg from "@/assets/monstera-hero.png";

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
  <section id="about" className="relative py-28 px-6 overflow-hidden">
    {/* Vibrant monstera behind text */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        maskImage: "radial-gradient(ellipse 70% 80% at 70% 50%, black 0%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 80% at 70% 50%, black 0%, transparent 70%)",
      }}
    >
      <img
        src={monsteraImg}
        alt=""
        className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[650px] h-auto opacity-[0.3]"
        style={{
          mixBlendMode: "screen",
          filter: "brightness(1.6) saturate(1.8) drop-shadow(0 0 50px hsla(180, 43%, 30%, 0.3))",
        }}
      />
    </div>

    <div className="absolute top-1/2 right-0 w-[350px] h-[350px] rounded-full bg-primary/[0.05] blur-[100px] animate-blob pointer-events-none" style={{ animationDelay: "3s" }} />
    <div className="container mx-auto max-w-6xl relative z-10">
      <motion.div
        className="flex flex-col lg:flex-row items-center gap-16"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Headshot */}
        <motion.div className="flex-shrink-0 text-center" variants={fadeUp}>
          <div className="relative w-56 h-56 md:w-64 md:h-64 mx-auto">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/25 to-accent/20 blur-2xl" />
            <div
              className="relative w-full h-full rounded-full flex items-center justify-center border border-white/[0.12] overflow-hidden backdrop-blur-xl"
              style={{ background: "hsla(0, 0%, 14%, 0.5)" }}
            >
              <UserRound size={80} strokeWidth={1} className="text-accent/70" />
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground italic">Upload Photo Here</p>
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
