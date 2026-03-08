import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Users2, TrendingUp, Compass, Briefcase } from "lucide-react";
import { useRef, useState } from "react";

const slow = { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const };

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } },
};

const cards = [
  {
    icon: ShieldCheck,
    title: "The Comprehensive Vision",
    bullets: [
      { icon: ShieldCheck, text: "Navigating Regulation & Gov-tech/Military" },
      { icon: Cpu, text: "Bridging the R&D Gap" },
      { icon: Users2, text: "Ensuring Sustained Adoption" },
    ],
  },
  {
    icon: Cpu,
    title: "My Product Tool Kit",
    bullets: [
      { icon: Compass, text: "Stakeholder Alignment (Roadmap Management)" },
      { icon: TrendingUp, text: "Execution Tools (Metrics-driven, UX-focused)" },
      { icon: Users2, text: "Change Management" },
    ],
  },
  {
    icon: Users2,
    title: "Evidence",
    bullets: [
      { icon: ShieldCheck, text: "21st Reporter platform success" },
      { icon: Cpu, text: "Excellence Model (Accelerated pilots by 3 months)" },
      { icon: Briefcase, text: "Managed Recovery Task" },
    ],
  },
];

const FloatingIcon = ({ icon: Icon, size = 26 }: { icon: typeof ShieldCheck; size?: number }) => (
  <motion.div
    className="w-14 h-14 rounded-full backdrop-blur-xl border border-accent/40 flex items-center justify-center group-hover:shadow-[0_0_24px_hsla(36,90%,44%,0.35)] transition-shadow duration-500 relative"
    style={{ background: "hsla(36, 90%, 44%, 0.12)" }}
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
  <div className="flex-shrink-0 w-7 h-7 rounded-full backdrop-blur-xl border border-primary/30 flex items-center justify-center mt-0.5" style={{ background: "hsla(0, 0%, 100%, 0.08)" }}>
    <Icon size={14} strokeWidth={1} className="text-foreground" />
  </div>
);

const ProductEdgeSection = () => (
  <section
    id="edge"
    className="relative py-32 px-6 overflow-hidden"
    style={{
      background: "linear-gradient(180deg, hsl(0,0%,10.2%) 0%, hsla(180, 30%, 12%, 0.6) 30%, hsla(180, 30%, 12%, 0.6) 70%, hsl(0,0%,10.2%) 100%)",
    }}
  >
    {/* Ambient glow blobs */}
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

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {cards.map((card, i) => (
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
                  <FloatingIcon icon={card.icon} />
                </div>
                <h3
                  className="text-xl font-semibold text-foreground mb-6"
                  style={{ fontFamily: "'Lexend', sans-serif" }}
                >
                  {card.title}
                </h3>
                <ul className="space-y-4 mt-auto">
                  {card.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3 text-foreground/80 text-sm">
                      <BulletIcon icon={b.icon} />
                      <span className="pt-1 leading-relaxed">{b.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ProductEdgeSection;
