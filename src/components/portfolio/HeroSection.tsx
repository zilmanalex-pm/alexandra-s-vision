import { motion } from "framer-motion";
import { Download, Linkedin, UserRound } from "lucide-react";
import { useProfile } from "@/hooks/use-portfolio-data";
import { useState, useEffect } from "react";
import monsteraImg from "@/assets/monstera-hero.png";

/* ─── Typing animation hook ─── */
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
      if (i >= text.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayed, done };
};

/* ─── CV Pulse button ─── */
const PulsingCVButton = ({ href }: { href: string }) => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1200);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-accent text-accent-foreground font-semibold rounded-2xl hover:opacity-90 transition-opacity relative overflow-hidden"
      style={{ fontFamily: "'Lexend', sans-serif" }}
      animate={pulse ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {pulse && (
        <motion.span
          className="absolute inset-0 rounded-2xl border-2 border-accent"
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 1.15 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      )}
      <Download size={18} strokeWidth={1.5} />
      Download CV
    </motion.a>
  );
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } },
};

const HeroSection = () => {
  const { data: profile } = useProfile();

  const fullName = profile?.full_name || "Alexandra Zilman";
  const jobTitle = profile?.job_title || "Product Manager";
  const headline = profile?.hero_headline || "Simplifying the complex. Delivering what matters.";
  const subHeadline = profile?.sub_headline || "Specializing in high-stakes execution within regulated B2B SaaS and GovTech.";
  const cvUrl = profile?.cv_url || "https://drive.google.com/file/d/16-ZXZKiDFk0hHNDCVRnRLVZT_GPJXnqX/view?usp=drive_link";
  const linkedinUrl = profile?.linkedin_url || "https://www.linkedin.com/in/alexandra-zilman-33770a11/";

  const { displayed: typedTitle, done: typingDone } = useTypingEffect(jobTitle, 70);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#1A1A1B" }}
    >
      {/* ── Left Column (60%) ── */}
      <div className="relative z-10 w-full lg:w-[60%] px-8 md:px-16 lg:px-20 py-24">
        <motion.div
          className="max-w-2xl"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Name */}
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-2"
            style={{ fontFamily: "'Lexend', sans-serif" }}
          >
            {fullName}
          </motion.h2>

          {/* Typing job title */}
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl tracking-[0.2em] uppercase text-accent font-medium mb-16 h-7"
            style={{ fontFamily: "'Lexend', sans-serif" }}
          >
            {typedTitle}
            {!typingDone && (
              <span className="inline-block w-0.5 h-5 bg-accent ml-1 animate-pulse align-middle" />
            )}
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground"
            style={{ fontFamily: "'Lexend', sans-serif" }}
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

          {/* Sub-headline */}
          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg"
            style={{ fontFamily: "'Lexend', sans-serif" }}
          >
            {subHeadline}
          </motion.p>

          {/* Buttons */}
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <PulsingCVButton href={cvUrl} />
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 text-foreground font-semibold rounded-2xl border border-primary/25 hover:border-primary/50 transition-colors backdrop-blur-md"
              style={{
                fontFamily: "'Lexend', sans-serif",
                background: "hsla(0, 0%, 14%, 0.4)",
              }}
            >
              <Linkedin size={18} strokeWidth={1.5} />
              LinkedIn
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Right Column (40%) — Leaf + Photo Placeholder ── */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[45%]">
        {/* Monstera bleeding off edges */}
        <motion.img
          src={monsteraImg}
          alt=""
          className="absolute -right-24 -bottom-20 w-[800px] h-auto"
          style={{
            mixBlendMode: "screen",
            filter: "brightness(1.5) saturate(1.7) drop-shadow(0 0 60px hsla(180, 43%, 30%, 0.3))",
            opacity: 0.45,
          }}
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 0.45, scale: 1, x: 0 }}
          transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
        />

        {/* Floating profile photo placeholder */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
        >
          <div className="relative w-48 h-48 md:w-56 md:h-56">
            {/* Glow ring */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/15 blur-2xl" />
            {/* Glass frame */}
            <div
              className="relative w-full h-full rounded-full flex flex-col items-center justify-center border border-white/[0.12] overflow-hidden backdrop-blur-xl"
              style={{ background: "hsla(0, 0%, 12%, 0.6)" }}
            >
              <UserRound size={64} strokeWidth={1} className="text-accent/60 mb-2" />
              <span
                className="text-xs text-muted-foreground/70 tracking-wide"
                style={{ fontFamily: "'Lexend', sans-serif" }}
              >
                Your Photo
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subtle gradient edge blending left→right */}
      <div
        className="absolute inset-0 pointer-events-none hidden lg:block"
        style={{
          background: "linear-gradient(to right, #1A1A1B 0%, #1A1A1B 45%, transparent 65%)",
        }}
      />
    </section>
  );
};

export default HeroSection;
