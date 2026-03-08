import { motion } from "framer-motion";
import { Download, Linkedin } from "lucide-react";
import { useProfile } from "@/hooks/use-portfolio-data";
import { useState, useEffect } from "react";
import monsteraHeroImg from "@/assets/monstera-leaf.png";

const useTypingEffect = (text: string, speed = 60) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(timer); setDone(true); }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayed, done };
};

const font = { fontFamily: "'Lexend', sans-serif" } as const;

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.18 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } },
};

const HeroSection = () => {
  const { data: profile } = useProfile();

  const fullName = profile?.full_name || "Alexandra Zilman";
  const jobTitle = profile?.job_title || "Product Manager";
  const subHeadline = profile?.sub_headline || "Specializing in high-stakes execution within regulated B2B SaaS and GovTech.";
  const cvUrl = profile?.cv_url || "https://drive.google.com/file/d/16-ZXZKiDFk0hHNDCVRnRLVZT_GPJXnqX/view?usp=drive_link";
  const linkedinUrl = profile?.linkedin_url || "https://www.linkedin.com/in/alexandra-zilman-33770a11/";

  const { displayed: typedTitle, done: typingDone } = useTypingEffect(jobTitle, 70);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#1A1A1B" }}
    >
      {/* Large botanical leaf framing the left side */}
      <motion.img
        src={monsteraHeroImg}
        alt=""
        className="absolute -left-20 top-1/2 -translate-y-1/2 w-[700px] h-[700px] lg:w-[900px] lg:h-[900px] object-contain pointer-events-none select-none"
        style={{
          opacity: 0.9,
          mixBlendMode: "screen",
          filter: "drop-shadow(0 0 50px hsla(180, 43%, 30%, 0.6)) drop-shadow(0 0 100px hsla(180, 43%, 30%, 0.3)) brightness(0.45) saturate(1.5)",
          zIndex: 0,
        }}
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 0.9, x: 0 }}
        transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
      />

      <div className="container mx-auto max-w-6xl px-8 md:px-16 lg:px-20 py-24 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-16">
          {/* ── Left: Text ── */}
          <motion.div
            className="flex-1 max-w-2xl"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-2"
              style={font}
            >
              {fullName}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl tracking-[0.2em] uppercase text-accent font-medium mb-16 h-7"
              style={font}
            >
              {typedTitle}
              {!typingDone && (
                <span className="inline-block w-0.5 h-5 bg-accent ml-1 animate-pulse align-middle" />
              )}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground"
              style={font}
            >
              Simplifying the complex.{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, hsl(36, 90%, 44%) 0%, hsl(28, 90%, 52%) 100%)",
                }}
              >
                Delivering what matters.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg leading-relaxed max-w-lg"
              style={{ ...font, color: "#A3B8B8" }}
            >
              {subHeadline}
            </motion.p>
          </motion.div>

          {/* ── Right: Glass CTA box ── */}
          <motion.div
            className="flex-shrink-0 w-full lg:w-auto"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
          >
            <div
              className="rounded-3xl backdrop-blur-xl p-8 flex flex-col gap-4 lg:min-w-[240px]"
              style={{
                background: "hsla(0, 0%, 14%, 0.5)",
                border: "1px solid hsla(180, 43%, 30%, 0.15)",
              }}
            >
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-accent text-accent-foreground font-semibold rounded-2xl hover:opacity-90 transition-opacity border-0"
                style={font}
              >
                <Download size={18} strokeWidth={1.5} />
                Download CV
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                 className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-foreground font-semibold rounded-2xl transition-colors hover:border-primary/50"
                style={{ ...font, background: "hsla(0, 0%, 14%, 0.4)", border: "1px solid hsla(180, 43%, 30%, 0.15)" }}
              >
                <Linkedin size={18} strokeWidth={1.5} />
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
