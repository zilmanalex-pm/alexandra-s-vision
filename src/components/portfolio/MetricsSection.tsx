import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { useMetrics } from "@/hooks/use-portfolio-data";

const slow = { duration: 1, ease: [0.25, 0.1, 0.25, 1] };

const MetricsSection = () => {
  const { data: metrics } = useMetrics();

  if (!metrics || metrics.length === 0) return null;

  return (
    <section id="metrics" className="relative py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-foreground" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={slow}>
          Key <span className="text-accent">Metrics</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <motion.div
              key={m.id}
              className="glass-card glass-card-hover p-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...slow, delay: i * 0.12 }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={20} strokeWidth={1.5} className="text-primary" />
              </div>
              <p className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                {m.value}
              </p>
              <p className="font-semibold text-foreground mt-2 text-sm">{m.label}</p>
              {m.description && <p className="text-xs text-muted-foreground mt-1">{m.description}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
