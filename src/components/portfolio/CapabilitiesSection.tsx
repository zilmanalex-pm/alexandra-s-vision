import { motion, useScroll, useTransform } from "framer-motion";
import { Target, Bot, Sparkles } from "lucide-react";
import { useMemo, useRef } from "react";
import monsteraImg from "@/assets/monstera-leaf.png";
import { useCapabilities } from "@/hooks/use-portfolio-data";

const slow = { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};
const popIn = {
  hidden: { opacity: 1, scale: 1 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

const font = { fontFamily: "'Lexend', sans-serif" } as const;

const TRAIT_ITEMS = [
  "Self-Driven Continuous Learning Loops",
  "Independent & First-Principles Thinking",
  "Cross-Functional Complex Collaboration",
  "High-Complexity Problem Specialization",
];

const CapabilitiesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const { data: capabilities } = useCapabilities();

  const columns = useMemo(() => {
    const skillItems: string[] = [];
    const aiItems: string[] = [];

    (capabilities ?? []).forEach((row: any) => {
      const label = (row?.skill_name ?? "").toString().trim();
      if (!label) return;
      const cat = (row?.category ?? "").toString().trim().toLowerCase();
      if (cat === "skill" || cat === "pm" || cat === "core") {
        skillItems.push(label);
      } else if (cat === "ai" || cat.includes("tech")) {
        aiItems.push(label);
      }
    });

    return [
      { key: "skill", title: "Core PM Capabilities", Icon: Target, items: skillItems },
      { key: "ai", title: "AI & Technical Architecture", Icon: Bot, items: aiItems },
      { key: "trait", title: "Core Personal Traits", Icon: Sparkles, items: TRAIT_ITEMS },
    ];
  }, [capabilities]);

  return (
    <section id="capabilities" ref={sectionRef} className="relative py-24 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-primary/[0.04] blur-[120px] animate-blob pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-accent/[0.04] blur-[100px] animate-blob pointer-events-none" style={{ animationDelay: "6s" }} />

      <motion.img
        src={monsteraImg}
        alt=""
        className="absolute -bottom-24 -left-24 w-[550px] h-[550px] object-contain pointer-events-none select-none"
        style={{
          opacity: 0.7,
          mixBlendMode: "screen",
          y: parallaxY,
          filter: "drop-shadow(0 0 40px hsla(180, 43%, 30%, 0.5)) drop-shadow(0 0 80px hsla(180, 43%, 30%, 0.25)) brightness(0.5) saturate(1.4)",
          transform: "rotate(-15deg)",
          zIndex: 1,
        }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.h2
          className="text-[32px] md:text-[48px] font-bold text-center mb-16 text-foreground"
          style={font}
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={slow}
        >
          Core <span className="text-accent">Capabilities</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {columns.map((col) => (
            <motion.div
              key={col.key}
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <motion.h3
                variants={fadeUp}
                className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-6"
                style={font}
              >
                {col.title}
              </motion.h3>
              <div className="space-y-3">
                {col.items.map((item) => {
                  const Icon = col.Icon;
                  return (
                    <motion.div
                      key={item}
                      variants={popIn}
                      whileHover={{ scale: 1.02, boxShadow: "0 0 20px hsla(36, 90%, 44%, 0.2)" }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground/90 cursor-default transition-colors duration-300 backdrop-blur-md"
                      style={{
                        ...font,
                        background: "hsla(0, 0%, 14%, 0.5)",
                        border: "1px solid hsla(180, 43%, 30%, 0.15)",
                      }}
                    >
                      <div
                        className="flex-shrink-0 w-7 h-7 rounded-full backdrop-blur-xl flex items-center justify-center"
                        style={{
                          background: "hsla(0, 0%, 100%, 0.08)",
                          border: "1px solid hsla(180, 43%, 30%, 0.15)",
                        }}
                      >
                        <Icon size={14} strokeWidth={1.5} className="text-foreground" />
                      </div>
                      <span className="text-sm font-medium leading-snug">{item}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
