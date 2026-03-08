import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useTestimonials } from "@/hooks/use-portfolio-data";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } },
};

const font = { fontFamily: "'Lexend', sans-serif" } as const;

const TestimonialsSection = () => {
  const { data: dbTestimonials, isLoading } = useTestimonials();
  const testimonials = dbTestimonials && dbTestimonials.length > 0 ? dbTestimonials : [];

  return (
    <section id="testimonials" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-accent/[0.04] blur-[140px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground" style={font}>
            My Customers <span className="text-accent">Speak</span>
          </h2>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-3xl backdrop-blur-xl p-6 animate-pulse" style={{ background: "hsla(0,0%,14%,0.6)", border: "1px solid hsla(180,43%,30%,0.2)" }}>
                <div className="h-4 bg-muted rounded w-3/4 mb-3" />
                <div className="h-4 bg-muted rounded w-full mb-2" />
                <div className="h-4 bg-muted rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : testimonials.length === 0 ? (
          <p className="text-center text-muted-foreground" style={font}>No testimonials yet.</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id || i}
                className="rounded-3xl backdrop-blur-xl p-6 flex flex-col"
                style={{
                  background: "hsla(0, 0%, 14%, 0.6)",
                  border: "1px solid hsla(180, 43%, 30%, 0.25)",
                }}
                variants={fadeUp}
              >
                <div className="w-10 h-10 rounded-full backdrop-blur-xl border border-primary/30 flex items-center justify-center mb-3 flex-shrink-0" style={{ background: "hsla(0, 0%, 100%, 0.08)" }}>
                  <Quote size={16} strokeWidth={1.5} className="text-foreground" />
                </div>

                <p className="text-foreground/80 leading-relaxed italic mb-5 flex-1" style={font}>
                  "{t.quote_text}"
                </p>

                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/15 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary" style={font}>
                      {(t.client_name || "?").charAt(0)}
                      {(t.client_name || "").split(" ")[1]?.charAt(0) || ""}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm leading-tight" style={font}>{t.client_name}</p>
                    <p className="text-xs text-muted-foreground" style={font}>
                      {t.client_title}
                      {t.company ? ` · ${t.company}` : ""}
                    </p>
                  </div>
                  {t.category_tag && (
                    <span className="ml-auto text-[10px] uppercase tracking-wider text-primary/60 bg-primary/[0.06] px-2 py-0.5 rounded-full" style={font}>
                      {t.category_tag}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
