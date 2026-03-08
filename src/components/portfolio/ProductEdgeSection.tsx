import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Users2, TrendingUp, Compass, Briefcase } from "lucide-react";
import { useRef, useState } from "react";
import { useProductEdge } from "@/hooks/use-portfolio-data";

import oliveBranchImg from "@/assets/olive-branch.png";

const slow = { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const };

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } },
};

const iconMap: Record<string, typeof ShieldCheck> = {
  ShieldCheck, Cpu, Users2, TrendingUp, Compass, Briefcase,
};

const fallbackCards = [
  {
    title: "The Comprehensive Vision",
    icon_name: "ShieldCheck",
    bullet_points: ["Navigating Regulation & Gov-tech/Military", "Bridging the R&D Gap", "Ensuring Sustained Adoption"],
  },
  {
    title: "My Product Tool Kit",
    icon_name: "Cpu",
    bullet_points: ["Stakeholder Alignment (Roadmap Management)", "Execution Tools (Metrics-driven, UX-focused)", "Change Management"],
  },
  {
    title: "Evidence",
    icon_name: "Users2",
    bullet_points: ["21st Reporter platform success", "Excellence Model (Accelerated pilots by 3 months)", "Managed Recovery Task"],
  },
];

const bulletIcons = [ShieldCheck, Cpu, Users2, TrendingUp, Compass, Briefcase];

const FloatingIcon = ({ icon: Icon, size = 26 }: { icon: typeof ShieldCheck; size?: number }) => (
  <motion.div
    className="w-14 h-14 rounded-full backdrop-blur-xl flex items-center justify-center group-hover:shadow-[0_0_24px_hsla(36,90%,44%,0.35)] transition-shadow duration-500 relative"
    style={{ background: "hsla(36, 90%, 44%, 0.12)", border: "1px solid hsla(36, 90%, 44%, 0.25)" }}
    animate={{ y: [0, -4, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  >
    <Icon
      size={size}
      strokeWidth={1}
      className="text-accent group-hover:scale-110 transition-all duration-500"
    />
  </motion.div>
);

const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ transform: "perspective(600px) rotateX(0deg) rotateY(0deg)" });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({ transform: `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)` });
  };
  const reset = () => setStyle({ transform: "perspective(600px) rotateX(0deg) rotateY(0deg)" });

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={reset} style={{ ...style, transition: "transform 0.5s cubic-bezier(0.03, 0.98, 0.52, 0.99)" }} className="h-full">
      {children}
    </div>
  );
};

const BulletIcon = ({ icon: Icon }: { icon: typeof ShieldCheck }) => (
  <div className="flex-shrink-0 w-7 h-7 rounded-full backdrop-blur-xl flex items-center justify-center mt-0.5" style={{ background: "hsla(0, 0%, 100%, 0.08)", border: "1px solid hsla(180, 43%, 30%, 0.15)" }}>
    <Icon size={14} strokeWidth={1} className="text-foreground" />
  </div>
);

const ProductEdgeSection = () => {
  const { data: dbCards } = useProductEdge();
  

  const cards = dbCards && dbCards.length > 0
    ? dbCards.map((c: any) => ({
        title: c.title,
        icon_name: c.icon_name || "ShieldCheck",
        bullet_points: Array.isArray(c.bullet_points) ? c.bullet_points : [],
      }))
    : fallbackCards;

  return (
    <section
      id="edge"
      className="relative py-32 px-6 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(0,0%,10.2%) 0%, hsla(180, 30%, 12%, 0.6) 30%, hsla(180, 30%, 12%, 0.6) 70%, hsl(0,0%,10.2%) 100%)",
      }}
    >
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/[0.06] blur-[160px] animate-blob pointer-events-none" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-primary/[0.06] blur-[140px] animate-blob pointer-events-none" style={{ animationDelay: "8s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-accent/[0.03] blur-[200px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slow}
        >
          <motion.p
            className="text-sm uppercase tracking-[0.25em] text-accent font-medium mb-4"
            style={{ fontFamily: "'Lexend', sans-serif" }}
          >
            What Sets Me Apart
          </motion.p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground" style={{ fontFamily: "'Lexend', sans-serif" }}>
            My Product <span className="text-accent">Edge</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Olive branch backdrop */}
          <img
            src={oliveBranchImg}
            alt=""
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] object-contain pointer-events-none select-none"
            style={{
              opacity: 0.25,
              mixBlendMode: "screen",
              filter: "brightness(0.6) saturate(1.3)",
              zIndex: 0,
            }}
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
          {cards.map((card: any, i: number) => {
            const CardIcon = iconMap[card.icon_name] || ShieldCheck;
            return (
              <motion.div key={i} variants={fadeUp} className="h-full">
                <TiltCard>
                  <div
                    className="glass-card-hover p-8 group rounded-3xl backdrop-blur-xl h-full"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      background: "hsla(0, 0%, 14%, 0.7)",
                      border: "1px solid hsla(180, 43%, 30%, 0.15)",
                      boxShadow: "0 4px 40px hsla(180, 43%, 30%, 0.06), inset 0 1px 0 hsla(0, 0%, 100%, 0.04)",
                    }}
                  >
                    <div className="mb-6">
                      <FloatingIcon icon={CardIcon} />
                    </div>
                    <h3
                      className="text-xl font-semibold text-foreground mb-6"
                      style={{ fontFamily: "'Lexend', sans-serif" }}
                    >
                      {card.title}
                    </h3>
                    <ul className="space-y-4 mt-auto">
                      {card.bullet_points.map((text: string, j: number) => (
                        <li key={j} className="flex items-start gap-3 text-foreground/80 text-sm">
                          <BulletIcon icon={bulletIcons[j % bulletIcons.length]} />
                          <span className="pt-1 leading-relaxed">{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductEdgeSection;
