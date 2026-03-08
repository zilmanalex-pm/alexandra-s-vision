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
      { icon: Compass, text: "Stakeholder Alignment — roadmap management" },
      { icon: TrendingUp, text: "Execution Tools — Metrics-driven, UX-focused" },
      { icon: Users2, text: "Change Management" },
    ],
  },
  {
    icon: Users2,
    title: 'Evidence (The "Receipts")',
    bullets: [
      { icon: ShieldCheck, text: "21st Reporter platform success" },
      { icon: Cpu, text: "Excellence Model — Accelerated pilots by 3 months" },
      { icon: Briefcase, text: "Managed Recovery Task" },
    ],
  },
];

/* ─── Animated Icon Container ─── */
const FloatingIcon = ({ icon: Icon, size = 26 }: { icon: typeof ShieldCheck; size?: number }) => (
  <motion.div
    className="w-14 h-14 rounded-full backdrop-blur-xl border border-primary/30 flex items-center justify-center group-hover:shadow-[0_0_20px_hsla(36,90%,44%,0.25)] transition-shadow duration-500 relative"
    style={{ background: "hsla(0, 0%, 100%, 0.08)" }}
    animate={{ y: [0, -4, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  >
    <Icon
      size={size}
      strokeWidth={1}
      className="text-foreground group-hover:text-accent group-hover:scale-110 transition-all duration-500"
    />
  </motion.div>
);

/* ─── 3D Tilt Card ─── */
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
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={reset} style={{ ...style, transition: "transform 0.5s cubic-bezier(0.03, 0.98, 0.52, 0.99)" }}>
      {children}
    </div>
  );
};

/* ─── Bullet icon ─── */
const BulletIcon = ({ icon: Icon }: { icon: typeof ShieldCheck }) => (
  <div className="flex-shrink-0 w-7 h-7 rounded-full backdrop-blur-xl border border-primary/30 flex items-center justify-center mt-0.5" style={{ background: "hsla(0, 0%, 100%, 0.08)" }}>
    <Icon size={14} strokeWidth={1} className="text-foreground" />
  </div>
);

const ProductEdgeSection = () => (
  <section id="edge" className="relative py-28 px-6">
    <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-accent/[0.05] blur-[100px] animate-blob pointer-events-none" style={{ animationDelay: "2s" }} />
    <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-primary/[0.05] blur-[100px] animate-blob pointer-events-none" style={{ animationDelay: "8s" }} />

    <div className="container mx-auto max-w-6xl relative z-10">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={slow}
      >
        My Product <span className="text-accent">Edge</span>
      </motion.h2>

      <motion.div
        className="gap-8"
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {cards.map((card, i) => (
          <motion.div key={i} variants={fadeUp} style={{ height: "100%" }}>
            <TiltCard>
              <div
                className="glass-card-hover p-8 group rounded-3xl backdrop-blur-xl"
                style={{
                  minHeight: "450px",
                  display: "flex",
                  flexDirection: "column",
                  background: "hsla(0, 0%, 14%, 0.6)",
                  border: "1px solid hsla(180, 43%, 30%, 0.25)",
                }}
              >
                <div className="mb-6">
                  <FloatingIcon icon={card.icon} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-5">{card.title}</h3>
                <ul className="space-y-3.5 mt-auto">
                  {card.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3 text-muted-foreground text-sm">
                      <BulletIcon icon={b.icon} />
                      <span className="pt-1">{b.text}</span>
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
