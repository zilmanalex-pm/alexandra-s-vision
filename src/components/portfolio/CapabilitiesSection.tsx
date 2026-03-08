import { motion } from "framer-motion";

const slow = { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
};
const popIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const languages = ["English", "Hebrew", "Russian"];
const skills = [
  "RBAC (Role-Based Access Control)",
  "Data-Driven Decision Making",
  "Stakeholder Management",
  "GovTech Compliance",
  "B2B SaaS Strategy",
];

const CapabilitiesSection = () => (
  <section id="capabilities" className="relative py-28 px-6">
    {/* Ambient blobs */}
    <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-primary/[0.04] blur-[120px] animate-blob pointer-events-none" />
    <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-accent/[0.04] blur-[100px] animate-blob pointer-events-none" style={{ animationDelay: "6s" }} />

    <div className="container mx-auto max-w-5xl relative z-10">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground"
        style={{ fontFamily: "'Lexend', sans-serif" }}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={slow}
      >
        Capabilities
      </motion.h2>

      {/* Languages */}
      <motion.div
        className="mb-14"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h3
          variants={fadeUp}
          className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-6 text-center"
          style={{ fontFamily: "'Lexend', sans-serif" }}
        >
          Languages
        </motion.h3>
        <div className="flex flex-wrap justify-center gap-4">
          {languages.map((lang) => (
            <motion.span
              key={lang}
              variants={popIn}
              className="px-6 py-2.5 rounded-full text-sm font-medium border border-accent/60 text-foreground backdrop-blur-md"
              style={{
                fontFamily: "'Lexend', sans-serif",
                background: "hsla(0, 0%, 14%, 0.6)",
                boxShadow: "0 0 18px hsla(180, 43%, 30%, 0.2), inset 0 1px 0 hsla(180, 43%, 30%, 0.08)",
              }}
            >
              {lang}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Core PM Skills */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h3
          variants={fadeUp}
          className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-6 text-center"
          style={{ fontFamily: "'Lexend', sans-serif" }}
        >
          Core PM Skills
        </motion.h3>
        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              variants={popIn}
              whileHover={{ scale: 1.06, boxShadow: "0 0 24px hsla(36, 90%, 44%, 0.3)" }}
              className="px-5 py-2 rounded-full text-sm font-medium border border-accent/40 text-foreground/90 cursor-default transition-colors duration-300 hover:border-accent/80"
              style={{
                fontFamily: "'Lexend', sans-serif",
                background: "hsla(0, 0%, 14%, 0.5)",
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default CapabilitiesSection;
