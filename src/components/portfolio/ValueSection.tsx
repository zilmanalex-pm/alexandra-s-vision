import { motion } from "framer-motion";
import { useValues } from "@/hooks/use-portfolio-data";
import { Puzzle, Layers, RefreshCcw, Sparkles } from "lucide-react";
 


const headingFont = { fontFamily: "'Lexend', sans-serif" } as const;
const bodyFont = { fontFamily: "'Plus Jakarta Sans', 'Lexend', sans-serif" } as const;
const slow = { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
};

const ICONS = [Puzzle, Layers, RefreshCcw, Sparkles];

const ValueSection = () => {
  const { data: valuesData } = useValues();
  const strengths = (valuesData ?? [])
    .filter((v: any) => v?.text)
    .sort((a: any, b: any) => (a.display_order ?? 0) - (b.display_order ?? 0))
    .map((v: any, i: number) => ({ icon: ICONS[i % ICONS.length], text: v.text as string }));

  return (
    <section id="value" className="relative py-28 px-6">
      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-primary/[0.04] blur-[120px] animate-blob pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.h2
          className="text-[32px] md:text-[48px] font-bold text-center mb-16 text-foreground"
          style={headingFont}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slow}
        >
          The Value I{" "}
          <span className="text-accent">Bring</span>
        </motion.h2>

        <motion.div
          className="rounded-3xl overflow-visible"
          style={{
            background: "hsla(0, 0%, 12%, 0.9)",
            border: "1px solid hsla(180, 43%, 30%, 0.15)",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slow}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Left column — 60% (3/5) */}
            <motion.div
              className="lg:col-span-3 p-10 md:p-14 lg:p-16 flex flex-col justify-center"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                {strengths.map((s, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="flex items-start gap-3.5"
                  >
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                      style={{ background: "hsla(180, 43%, 30%, 0.12)", border: "1px solid hsla(180, 43%, 30%, 0.15)" }}
                    >
                      <s.icon size={16} strokeWidth={1.5} style={{ color: "#D97706" }} />
                    </div>
                    <p className="text-sm md:text-base leading-relaxed text-foreground/90" style={bodyFont}>
                      {s.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right column — 40% (2/5) */}
            <motion.div
              className="lg:col-span-2 flex items-center justify-center p-4 sm:p-8 lg:p-6 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
            >
              <div
                className="w-[30vw] max-w-72 aspect-[3/4] rounded-3xl overflow-hidden"
                style={{
                  border: "1px solid hsla(180, 43%, 30%, 0.2)",
                  boxShadow: "0 0 40px hsla(180, 43%, 30%, 0.2), 0 0 80px hsla(180, 43%, 30%, 0.1)",
                }}
              >
                <img
                  src="/lovable-uploads/Alex Avatar.png"
                  alt="Alexandra Zilman"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    const img = e.currentTarget;
                    const fallbacks = [
                      "/lovable-uploads/alex-avatar.png",
                      "/lovable-uploads/alex%20avatar.png",
                      "/lovable-uploads/Alex-Avatar.png",
                      "/Alex Avatar.png",
                    ];
                    const tried = Number(img.dataset.fallbackIdx ?? "0");
                    if (tried < fallbacks.length) {
                      img.dataset.fallbackIdx = String(tried + 1);
                      img.src = fallbacks[tried];
                    }
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueSection;
