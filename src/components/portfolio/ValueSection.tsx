import { motion } from "framer-motion";
import { useProfile } from "@/hooks/use-portfolio-data";
import { Puzzle, Layers, RefreshCcw } from "lucide-react";
import profileImg from "@/assets/alexandra-profile.jpg";
 


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
                  src={profileImg}
                  alt="Alexandra Zilman"
                  className="w-full h-full object-cover object-top"
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
