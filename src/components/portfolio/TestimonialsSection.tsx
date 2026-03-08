import { motion } from "framer-motion";

const testimonials = [
  { name: "Moshe Yeshayahu", role: "Engineering Lead", quote: "Alexandra has an exceptional ability to translate complex technical constraints into clear, actionable product requirements. Her strategic thinking elevated our entire team's output." },
  { name: "Adam Nave", role: "VP Product", quote: "Working with Alexandra means having someone who truly understands the intersection of technology, regulation, and user experience. She's a force multiplier for any organization." },
  { name: "Mary Wagenhoff", role: "Design Director", quote: "Alexandra bridges the gap between design and engineering like no one else. Her user-centric approach and attention to adoption metrics drove measurable improvements." },
  { name: "Swati Mandala", role: "Senior PM", quote: "Her stakeholder management skills are world-class. Alexandra can align competing interests and deliver outcomes that exceed expectations in highly regulated environments." },
  { name: "Abigail Edelman", role: "Program Manager", quote: "Alexandra transformed our chaotic requirements landscape into a coherent product strategy. Her systematic approach to adoption and change management is remarkable." },
  { name: "Tomer Galand", role: "CTO", quote: "Few product managers understand the technical depth required for GovTech platforms. Alexandra not only understands it—she leverages it to build better products." },
];

const TestimonialsSection = () => (
  <section id="testimonials" className="relative py-24 overflow-hidden">
    <div className="container mx-auto max-w-6xl px-6 mb-12">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center text-foreground"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        The Wall of <span className="text-primary">Love</span>
      </motion.h2>
      <p className="text-center text-muted-foreground mt-3">What colleagues say about working with me.</p>
    </div>

    {/* Auto-scrolling ticker */}
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
      <div className="flex animate-ticker w-max">
        {[...testimonials, ...testimonials].map((t, i) => (
          <div key={i} className="flex-shrink-0 w-80 mx-3">
            <div className="glass-card p-6 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{t.name.charAt(0)}{t.name.split(" ")[1]?.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed italic">"{t.quote}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
