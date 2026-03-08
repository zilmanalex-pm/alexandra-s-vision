import { motion } from "framer-motion";
import { Puzzle, Layers, Repeat } from "lucide-react";

const values = [
  {
    icon: Puzzle,
    text: "I thrive where requirements are messy and stakeholders are many.",
  },
  {
    icon: Layers,
    text: "Expertise in resolving fragmented signals into scalable platform logic.",
  },
  {
    icon: Repeat,
    text: "I own the lifecycle of adoption, bridging the gap between technical constraints and user needs.",
  },
];

const AboutSection = () => (
  <section id="about" className="relative py-24 px-6">
    <div className="container mx-auto max-w-6xl">
      <motion.div
        className="flex flex-col lg:flex-row items-center gap-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        {/* Headshot */}
        <div className="flex-shrink-0">
          <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-xl" />
            <div className="relative w-full h-full rounded-full bg-muted flex items-center justify-center border-4 border-white/60 overflow-hidden">
              <span className="text-5xl font-bold text-primary/40 select-none">AZ</span>
            </div>
          </div>
        </div>

        {/* Value Props */}
        <div className="flex-1 space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            About & <span className="text-primary">Value</span>
          </h2>
          {values.map((v, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-5"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <v.icon size={22} className="text-primary" />
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
