import { motion, useScroll, useTransform } from "framer-motion";
import { User } from "lucide-react";
import { useTestimonials } from "@/hooks/use-portfolio-data";
import { useRef } from "react";
import palmFrondImg from "@/assets/palm-frond.png";


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
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const testimonials = dbTestimonials && dbTestimonials.length > 0 ? dbTestimonials : [];

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-28 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-accent/[0.04] blur-[140px] pointer-events-none" />

      {/* Palm frond - diagonal background */}
      <motion.img
        src={palmFrondImg}
        alt=""
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] object-contain pointer-events-none select-none"
        style={{
          opacity: 0.7,
          mixBlendMode: "screen",
          y: parallaxY,
          rotate: -25,
          filter: "drop-shadow(0 0 40px hsla(180, 43%, 30%, 0.5)) drop-shadow(0 0 80px hsla(180, 43%, 30%, 0.25)) brightness(0.5) saturate(1.4)",
          zIndex: 0,
        }}
      />

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
              <div key={i} className="rounded-3xl backdrop-blur-xl p-6 animate-pulse" style={{ background: "hsla(0,0%,14%,0.6)", border: "1px solid hsla(180,43%,30%,0.15)" }}>
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
                  border: "1px solid hsla(180, 43%, 30%, 0.15)",
                }}
                variants={fadeUp}
              >
                <p className="text-foreground/90 leading-relaxed italic flex-1" style={font}>
                  <span className="text-accent text-xl font-bold not-italic">"</span>
                  {t.quote_text}
                  <span className="text-accent text-xl font-bold not-italic">"</span>
                </p>

                <div className="flex items-center gap-3 pt-4 mt-4 border-t border-border">
                  <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/15 flex items-center justify-center flex-shrink-0">
                    <User size={16} strokeWidth={1.5} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm leading-tight" style={font}>{t.client_name}</p>
                    <p className="text-xs text-muted-foreground" style={font}>
                      {t.client_title}
                      {t.company ? ` · ${t.company}` : ""}
                    </p>
                  </div>
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
