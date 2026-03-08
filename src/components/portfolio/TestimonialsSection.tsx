import { motion, useScroll, useTransform } from "framer-motion";
import { User, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import palmFrondImg from "@/assets/palm-frond.png";

type Testimonial = {
  id: string;
  client_name: string | null;
  client_title: string | null;
  company: string | null;
  quote_text: string | null;
  display_order: number | null;
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } },
};

const font = { fontFamily: "'Lexend', sans-serif" } as const;

const TestimonialCard = ({ t }: { t: Testimonial }) => (
  <div
    className="rounded-3xl backdrop-blur-xl p-6 flex flex-col"
    style={{
      background: "hsla(0, 0%, 14%, 0.6)",
      border: "1px solid hsla(180, 43%, 30%, 0.15)",
    }}
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
  </div>
);

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const isMobile = useIsMobile();

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("testimonials")
        .select("id, client_name, client_title, company, quote_text, display_order")
        .order("display_order", { ascending: true });

      if (error) {
        console.error("[Testimonials] Failed to fetch:", error);
        setTestimonials([]);
      } else {
        setTestimonials((data as Testimonial[]) || []);
      }
      setIsLoading(false);
    };
    fetchTestimonials();
  }, []);

  const visibleTestimonials = isMobile && !showAll ? testimonials.slice(0, 2) : testimonials;
  const hasMore = isMobile && testimonials.length > 2 && !showAll;

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-28 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-accent/[0.04] blur-[140px] pointer-events-none" />

      <motion.img
        src={palmFrondImg}
        alt=""
        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
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
          <h2 className="text-[32px] md:text-[48px] font-bold text-foreground" style={font}>
            My Customers <span className="text-accent">Speak</span>
          </h2>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(isMobile ? 2 : 6)].map((_, i) => (
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
          <>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {visibleTestimonials.map((t, i) => (
                <motion.div key={t.id || i} variants={fadeUp}>
                  <TestimonialCard t={t} />
                </motion.div>
              ))}
            </motion.div>

            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setShowAll(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-foreground transition-all duration-300 hover:scale-105"
                  style={{
                    ...font,
                    background: "hsla(180, 43%, 30%, 0.15)",
                    border: "1px solid hsla(180, 43%, 30%, 0.25)",
                  }}
                >
                  Show All ({testimonials.length})
                  <ChevronDown size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
