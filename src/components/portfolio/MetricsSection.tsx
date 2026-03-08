import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { useMetrics } from "@/hooks/use-portfolio-data";

const MetricsSection = () => {
  const { data: metrics } = useMetrics();

  if (!metrics || metrics.length === 0) return null;

  return (
    <section id="metrics" className="relative py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-14 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Key <span className="text-primary">Metrics</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <motion.div
              key={m.id}
              className="glass-card glass-card-hover p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={20} className="text-primary" />
              </div>
              <p className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {m.value}
              </p>
              <p className="font-semibold text-foreground mt-2 text-sm">{m.label}</p>
              {m.description && (
                <p className="text-xs text-muted-foreground mt-1">{m.description}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
