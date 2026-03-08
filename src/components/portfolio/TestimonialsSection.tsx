import { motion } from "framer-motion";
import { useTestimonials } from "@/hooks/use-portfolio-data";

const fallbackTestimonials = [
  { client_name: "Moshe Yeshayahu", client_title: "Engineering Lead", quote_text: "Alexandra has an exceptional ability to translate complex technical constraints into clear, actionable product requirements." },
  { client_name: "Adam Nave", client_title: "VP Product", quote_text: "Working with Alexandra means having someone who truly understands the intersection of technology, regulation, and user experience." },
  { client_name: "Mary Wagenhoff", client_title: "Design Director", quote_text: "Alexandra bridges the gap between design and engineering like no one else." },
  { client_name: "Swati Mandala", client_title: "Senior PM", quote_text: "Her stakeholder management skills are world-class." },
  { client_name: "Abigail Edelman", client_title: "Program Manager", quote_text: "Alexandra transformed our chaotic requirements landscape into a coherent product strategy." },
  { client_name: "Tomer Galand", client_title: "CTO", quote_text: "Few product managers understand the technical depth required for GovTech platforms." },
];

const TestimonialsSection = () => {
  const { data: dbTestimonials } = useTestimonials();
  const testimonials = dbTestimonials && dbTestimonials.length > 0 ? dbTestimonials : fallbackTestimonials;

  return (
    <section id="testimonials" className="relative py-24 overflow-hidden">
      <div className="container mx-auto max-w-6xl px-6 mb-12">
        <motion.h2 className="text-3xl md:text-4xl font-bold text-center text-foreground" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          The Wall of <span className="text-primary">Love</span>
        </motion.h2>
        <p className="text-center text-muted-foreground mt-3">What colleagues say about working with me.</p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex animate-ticker w-max">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="flex-shrink-0 w-80 mx-3">
              <div className="glass-card p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
                      {t.client_name.charAt(0)}
                      {t.client_name.split(" ")[1]?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{t.client_name}</p>
                    <p className="text-xs text-muted-foreground">{t.client_title}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">"{t.quote_text}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
