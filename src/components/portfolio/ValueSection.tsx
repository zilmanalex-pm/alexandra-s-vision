import { motion } from "framer-motion";
import { useProfile } from "@/hooks/use-portfolio-data";
import { Puzzle, Layers, RefreshCcw } from "lucide-react";
import fernImg from "@/assets/fern-frond.png";

const headingFont = { fontFamily: "'Lexend', sans-serif" } as const;
const bodyFont = { fontFamily: "'Plus Jakarta Sans', 'Lexend', sans-serif" } as const;
const slow = { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
};

const primaryText =
  "Specializing in high-stakes execution within regulated B2B SaaS and GovTech. I bridge the gap between deep technical constraints and user needs, building product structures that reduce support friction and drive long-term platform health.";

const strengths = [
  { icon: Puzzle, text: "I thrive where requirements are messy and stakeholders are many." },
  { icon: Layers, text: "Expertise in resolving fragmented signals into scalable platform logic." },
  { icon: RefreshCcw, text: "I own the lifecycle of adoption, bridging the gap between technical constraints and user needs." },
];

const ValueSection = () => {
  const { data: profile } = useProfile();
  const mainText = profile?.value_statement || primaryText;

  return (
    <section id="value" className="relative py-28 px-6">
      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-primary/[0.04] blur-[120px] animate-blob pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground"
          style={headingFont}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slow}
        >
          The Value I{" "}
          <span
            style={{
              backgroundImage: "linear-gradient(135deg, #D97706, #B45309)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Bring
          </span>
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
              <motion.p
                variants={fadeUp}
                className="text-base md:text-lg leading-relaxed mb-8"
                style={{ ...bodyFont, color: "hsla(180, 30%, 68%, 0.9)" }}
              >
                {mainText}
              </motion.p>

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
              className="lg:col-span-2 flex items-center justify-center p-8 lg:p-6 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
            >
              {/* Subtle teal glow behind fern */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at center, hsla(180, 43%, 30%, 0.08) 0%, transparent 70%)",
                }}
              />
              <img
                src={fernImg}
                alt="Fern frond"
                className="w-52 h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain relative z-10"
                style={{
                  filter: "drop-shadow(0 0 25px hsla(180, 43%, 30%, 0.3)) drop-shadow(0 0 50px hsla(180, 43%, 30%, 0.12)) brightness(0.9) saturate(1.3)",
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueSection;
