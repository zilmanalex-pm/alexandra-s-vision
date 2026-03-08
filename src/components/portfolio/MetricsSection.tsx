import { motion } from "framer-motion";
import { TrendingUp, Users, Zap } from "lucide-react";
import { useMetrics } from "@/hooks/use-portfolio-data";
import { useRef, useState } from "react";

const slow = { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const };

const iconByCategory: Record<string, typeof TrendingUp> = {
  Efficiency: TrendingUp,
  Growth: Users,
  Speed: Zap,
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } },
};

/* ─── 3D Tilt Card with glow ─── */
const TiltMetricCard = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({
    transform: "perspective(800px) rotateX(0deg) rotateY(0deg)",
    borderColor: "hsla(180, 43%, 30%, 0.08)",
    boxShadow: "0 0 0 transparent",
  });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`,
      borderColor: "hsla(180, 43%, 30%, 0.35)",
      boxShadow: "0 0 30px hsla(180, 43%, 30%, 0.12)",
    });
  };

  const reset = () =>
    setStyle({
      transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)",
      borderColor: "hsla(180, 43%, 30%, 0.08)",
      boxShadow: "0 0 0 transparent",
    });

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        ...style,
        transition: "transform 0.5s cubic-bezier(0.03, 0.98, 0.52, 0.99), border-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      {children}
    </div>
  );
};

const MetricsSection = () => {
  const { data: metrics } = useMetrics();

  if (!metrics || metrics.length === 0) return null;

  return (
    <section id="impact" className="relative py-28 px-6" style={{ background: "linear-gradient(180deg, hsl(0,0%,10.2%) 0%, #244D4D 30%, #244D4D 70%, hsl(0,0%,10.2%) 100%)" }}>
      <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-accent/[0.05] blur-[140px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slow}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Measurable <span className="text-accent">Impact</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Real outcomes from real products — numbers that moved the needle.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {metrics.map((m) => {
            const Icon = iconByCategory[m.category || ""] || TrendingUp;
            return (
              <motion.div key={m.id} variants={fadeUp}>
                <TiltMetricCard>
                  <div className="glass-card p-8 text-center relative group h-full">
                    <div className="absolute -inset-1 rounded-3xl bg-accent/[0.04] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center mx-auto mb-6">
                        <Icon size={22} strokeWidth={1.5} className="text-primary" />
                      </div>

                      <p className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-accent via-accent to-primary bg-clip-text text-transparent leading-none">
                        {m.value}
                      </p>

                      <p className="font-semibold text-foreground mt-4 text-base">{m.label}</p>
                      {m.description && (
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{m.description}</p>
                      )}
                    </div>
                  </div>
                </TiltMetricCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default MetricsSection;
