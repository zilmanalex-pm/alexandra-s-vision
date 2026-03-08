import { motion } from "framer-motion";
import { Eye, Wrench, Trophy } from "lucide-react";
import { useRef, useState } from "react";

const slow = { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] };

const cards = [
  {
    icon: Eye,
    title: "The Comprehensive Vision",
    bullets: ["Navigating Regulation & Gov-tech/Military", "Bridging the R&D Gap", "Ensuring Sustained Adoption"],
  },
  {
    icon: Wrench,
    title: "My Product Tool Kit",
    bullets: ["Stakeholder Alignment — roadmap management", "Execution Tools — Metrics-driven, UX-focused", "Change Management"],
  },
  {
    icon: Trophy,
    title: 'Evidence (The "Receipts")',
    bullets: ["21st Reporter platform success", "Excellence Model — Accelerated pilots by 3 months", "Managed Recovery Task"],
  },
];

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

const ProductEdgeSection = () => (
  <section id="edge" className="relative py-28 px-6">
    <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-accent/5 blur-[100px] animate-blob" style={{ animationDelay: "2s" }} />
    <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-primary/5 blur-[100px] animate-blob" style={{ animationDelay: "8s" }} />
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

      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...slow, delay: i * 0.15 }}
          >
            <TiltCard>
              <div className="glass-card glass-card-hover p-8 h-full">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center mb-6">
                  <card.icon size={26} strokeWidth={1.5} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{card.title}</h3>
                <ul className="space-y-3">
                  {card.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-muted-foreground text-sm">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProductEdgeSection;
