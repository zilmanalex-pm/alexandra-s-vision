import { motion } from "framer-motion";
import { ShieldCheck, BarChart3, Landmark, Rocket, Globe } from "lucide-react";
import { useCapabilities } from "@/hooks/use-portfolio-data";

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

const fallbackSkills = [
  "RBAC (Role-Based Access Control)",
  "Data-Driven Decision Making",
  "GovTech Compliance",
  "B2B SaaS Strategy",
];

const fallbackLanguages = [
  { lang: "English", level: "Native" },
  { lang: "Hebrew", level: "Native" },
  { lang: "Russian", level: "Native" },
];

const skillIcons = [ShieldCheck, BarChart3, Landmark, Rocket];

const font = { fontFamily: "'Lexend', sans-serif" } as const;

const CapabilitiesSection = () => {
  const { data: capabilities } = useCapabilities();

  const dbSkills = capabilities?.filter((c: any) => c.category === "skill") ?? [];
  const dbLanguages = capabilities?.filter((c: any) => c.category === "language") ?? [];

  const skills = dbSkills.length > 0
    ? dbSkills.map((s: any) => s.skill_name)
    : fallbackSkills;

  const languages = dbLanguages.length > 0
    ? dbLanguages.map((l: any) => ({ lang: l.skill_name, level: l.proficiency_label || "" }))
    : fallbackLanguages;

  return (
    <section id="capabilities" className="relative py-28 px-6">
      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-primary/[0.04] blur-[120px] animate-blob pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-accent/[0.04] blur-[100px] animate-blob pointer-events-none" style={{ animationDelay: "6s" }} />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground"
          style={font}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slow}
        >
          Core <span className="text-accent">Capabilities</span>
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 gap-12 md:gap-16"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div>
            <motion.h3
              variants={fadeUp}
              className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-6"
              style={font}
            >
              Strategic Skills
            </motion.h3>
            <div className="space-y-3">
              {skills.map((label: string, i: number) => {
                const Icon = skillIcons[i % skillIcons.length];
                return (
                  <motion.div
                    key={label}
                    variants={popIn}
                    whileHover={{ scale: 1.03, boxShadow: "0 0 24px hsla(36, 90%, 44%, 0.25)" }}
                    className="flex items-center gap-3.5 px-5 py-3 rounded-2xl text-foreground/90 cursor-default transition-colors duration-300 backdrop-blur-md"
                    style={{ ...font, background: "hsla(0, 0%, 14%, 0.5)", border: "1px solid hsla(180, 43%, 30%, 0.15)" }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full backdrop-blur-xl flex items-center justify-center" style={{ background: "hsla(0, 0%, 100%, 0.08)", border: "1px solid hsla(180, 43%, 30%, 0.15)" }}>
                      <Icon size={16} strokeWidth={1.5} className="text-foreground" />
                    </div>
                    <span className="text-sm font-medium">{label}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div>
            <motion.h3
              variants={fadeUp}
              className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-6"
              style={font}
            >
              Languages
            </motion.h3>
            <div className="space-y-3">
              {languages.map((l: { lang: string; level: string }) => (
                <motion.div
                  key={l.lang}
                  variants={popIn}
                  whileHover={{ scale: 1.03, boxShadow: "0 0 24px hsla(36, 90%, 44%, 0.25)" }}
                  className="flex items-center gap-3.5 px-5 py-3 rounded-2xl text-foreground backdrop-blur-md cursor-default transition-colors duration-300"
                  style={{
                    ...font,
                    background: "hsla(0, 0%, 14%, 0.6)",
                    border: "1px solid hsla(180, 43%, 30%, 0.15)",
                  }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full backdrop-blur-xl flex items-center justify-center" style={{ background: "hsla(0, 0%, 100%, 0.08)", border: "1px solid hsla(180, 43%, 30%, 0.15)" }}>
                    <Globe size={16} strokeWidth={1.5} className="text-foreground" />
                  </div>
                  <span className="text-sm font-medium flex-1">{l.lang}</span>
                  <span className="text-xs text-muted-foreground">{l.level}</span>
                </motion.div>
              ))}
            </div>
            <motion.p
              variants={fadeUp}
              className="mt-5 text-sm text-muted-foreground leading-relaxed"
              style={font}
            >
              Excellent communication & presentation skills across all three languages.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
