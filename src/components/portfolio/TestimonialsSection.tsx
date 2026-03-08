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

const fallbackTestimonials = [
  { id: "1", client_name: "Moshe Yeshayahu", client_title: "General Manager", company: "Qmarkets", quote_text: "Alexandra brings a strong product mindset... she has a knack for turning fuzzy problems into practical solutions.", category_tag: "Strategy" },
  { id: "2", client_name: "Adam Nave", client_title: "Project Success Manager", company: "GovTech Solutions", quote_text: "Transforming insights into actionable resources seamlessly.", category_tag: "Execution" },
];

const TestimonialsSection = () => {
  const { data: dbTestimonials } = useTestimonials();
  const testimonials = dbTestimonials && dbTestimonials.length > 0 ? dbTestimonials : fallbackTestimonials;

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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Wall of <span className="text-accent">Love</span>
          </h2>
          <p className="text-muted-foreground mt-3">What colleagues and stakeholders say about working together.</p>
        </motion.div>

        {/* Masonry Grid with staggered fade-up */}
        <motion.div
          className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id || i}
              className="glass-card glass-card-hover p-6 break-inside-avoid"
              variants={fadeUp}
            >
              <Quote size={20} strokeWidth={1.5} className="text-accent/40 mb-3" />

              <p className="text-foreground/80 leading-relaxed italic mb-5">
                "{t.quote_text}"
              </p>

              <div className="flex items-center gap-3 pt-3 border-t border-border">
                <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">
                    {(t.client_name || "?").charAt(0)}
                    {(t.client_name || "").split(" ")[1]?.charAt(0) || ""}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm leading-tight">{t.client_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.client_title}
                    {t.company ? ` · ${t.company}` : ""}
                  </p>
                </div>
                {t.category_tag && (
                  <span className="ml-auto text-[10px] uppercase tracking-wider text-primary/60 bg-primary/[0.06] px-2 py-0.5 rounded-full">
                    {t.category_tag}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
