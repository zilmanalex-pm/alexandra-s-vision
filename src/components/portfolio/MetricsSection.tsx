import { motion } from "framer-motion";
import { TrendingUp, Users, Zap, Target, BarChart3 } from "lucide-react";
import { useMetrics } from "@/hooks/use-portfolio-data";

const slow = { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const };
const font = { fontFamily: "'Lexend', sans-serif" } as const;

const iconPool = [TrendingUp, Users, Zap, Target, BarChart3];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
};

const MetricsSection = () => {
  const { data: metrics } = useMetrics();

  if (!metrics || metrics.length === 0) return null;

  return (
    <section id="impact" className="relative py-28 px-6" style={{ background: "#1A1A1B" }}>
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slow}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground" style={font}>
            Measurable <span className="text-accent">Impact</span>
          </h2>
          <p className="mt-3 max-w-lg mx-auto" style={{ ...font, color: "hsla(180, 30%, 68%, 0.9)" }}>
            Real outcomes from real products. Numbers that moved the needle.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {metrics.map((m, i) => {
            const Icon = iconPool[i % iconPool.length];
            return (
              <motion.div
                key={m.id}
                variants={fadeUp}
                whileHover={{ scale: 1.03, boxShadow: "0 0 24px hsla(36, 90%, 44%, 0.25)" }}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] rounded-2xl p-8 text-center cursor-default transition-colors duration-300"
                style={{
                  background: "hsla(0, 0%, 12%, 0.9)",
                  border: "1px solid hsla(180, 43%, 30%, 0.15)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: "hsla(180, 43%, 30%, 0.12)", border: "1px solid hsla(180, 43%, 30%, 0.15)" }}
                >
                  <Icon size={20} strokeWidth={1} color="white" />
                </div>

                <p
                  className="text-5xl md:text-6xl font-bold leading-none"
                  style={{
                    ...font,
                    backgroundImage: "linear-gradient(135deg, #D97706, #B45309)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {m.value}
                </p>

                <p className="font-semibold text-foreground mt-4 text-base" style={font}>{m.label}</p>
                {m.description && (
                  <p className="text-sm mt-2 leading-relaxed" style={{ ...font, color: "hsla(180, 30%, 68%, 0.9)" }}>
                    {m.description}
                  </p>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default MetricsSection;
