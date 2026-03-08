import { motion } from "framer-motion";
import { TrendingUp, Users, Zap } from "lucide-react";
import { useMetrics } from "@/hooks/use-portfolio-data";

const slow = { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const };

const iconByCategory: Record<string, typeof TrendingUp> = {
  Efficiency: TrendingUp,
  Growth: Users,
  Speed: Zap,
};

const MetricsSection = () => {
  const { data: metrics } = useMetrics();

  if (!metrics || metrics.length === 0) return null;

  return (
    <section id="impact" className="relative py-28 px-6">
      <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-accent/5 blur-[140px] pointer-events-none" />

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((m, i) => {
            const Icon = iconByCategory[m.category || ""] || TrendingUp;
            return (
              <motion.div
                key={m.id}
                className="glass-card glass-card-hover p-8 text-center relative group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...slow, delay: i * 0.15 }}
              >
                {/* Floating glow behind the card on hover */}
                <div className="absolute -inset-1 rounded-3xl bg-accent/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
