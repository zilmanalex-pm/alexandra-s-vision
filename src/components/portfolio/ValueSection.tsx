import { motion } from "framer-motion";
import { useValues } from "@/hooks/use-portfolio-data";
import compassImg from "@/assets/compass-botanical.png";

const font = { fontFamily: "'Lexend', sans-serif" } as const;
const slow = { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
};

const fallbackValues = [
  "Specializing in high-stakes execution within regulated B2B SaaS and GovTech.",
  "I bridge the gap between deep technical constraints and user needs, building product structures that reduce support friction and drive long-term platform health.",
  "I thrive where requirements are messy and stakeholders are many.",
  "Expertise in resolving fragmented signals into scalable platform logic.",
  "I own the lifecycle of adoption, bridging the gap between technical constraints and user needs.",
];

const ValueSection = () => {
  const { data: dbValues } = useValues();
  const values = dbValues && dbValues.length > 0 ? dbValues.map((v) => v.text ?? "") : fallbackValues;

  return (
    <section id="value" className="relative py-28 px-6">
      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-primary/[0.04] blur-[120px] animate-blob pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground"
          style={font}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slow}
        >
          The Value I <span className="text-accent">Bring</span>
        </motion.h2>

        <motion.div
          className="rounded-3xl overflow-hidden"
          style={{
            background: "hsla(180, 30%, 16%, 0.85)",
            border: "1px solid hsla(180, 43%, 30%, 0.25)",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slow}
        >
          <div className="flex flex-col lg:flex-row">
            {/* Left — Text */}
            <motion.div
              className="flex-1 p-10 md:p-14 lg:p-16"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="space-y-5">
                {values.map((text, i) => (
                  <motion.p
                    key={i}
                    variants={fadeUp}
                    className="text-foreground/90 leading-relaxed text-base md:text-lg"
                    style={font}
                  >
                    {text}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            {/* Right — Compass illustration */}
            <motion.div
              className="flex-shrink-0 lg:w-[320px] flex items-center justify-center p-10 lg:p-14"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
            >
              <img
                src={compassImg}
                alt="Botanical compass illustration"
                className="w-48 h-48 md:w-56 md:h-56 object-contain opacity-60"
                style={{
                  filter: "brightness(2) invert(1)",
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
