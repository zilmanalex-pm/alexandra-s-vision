import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Download, Linkedin } from "lucide-react";
import { useProfile } from "@/hooks/use-portfolio-data";
import { useState, useEffect, useRef } from "react";


const GlowingBrain = () => (
  <div className="relative w-64 h-64 md:w-80 md:h-80 animate-float">
    <div className="absolute inset-0 rounded-full bg-primary/15 blur-3xl" />
    <div className="absolute inset-4 rounded-full bg-accent/10 blur-2xl" />
    <svg viewBox="0 0 200 200" className="relative w-full h-full" fill="none">
      <defs>
        <radialGradient id="brainGlow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="hsl(180, 43%, 30%)" stopOpacity="0.7" />
          <stop offset="60%" stopColor="hsl(36, 90%, 44%)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="hsl(36, 90%, 44%)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(180, 43%, 30%)" />
          <stop offset="100%" stopColor="hsl(36, 90%, 44%)" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="85" r="55" fill="url(#brainGlow)" opacity="0.25" />
      <path d="M100 40 C70 40 50 60 50 85 C50 105 65 120 80 125 L80 145 C80 150 85 155 100 155 C115 155 120 150 120 145 L120 125 C135 120 150 105 150 85 C150 60 130 40 100 40Z" stroke="url(#pathGrad)" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M85 70 C85 60 100 55 100 65 C100 55 115 60 115 70 C115 80 100 85 100 95 C100 85 85 80 85 70Z" stroke="url(#pathGrad)" strokeWidth="1" fill="url(#brainGlow)" opacity="0.35" />
      <circle cx="75" cy="75" r="2.5" fill="hsl(180, 43%, 30%)" opacity="0.5" />
      <circle cx="125" cy="75" r="2.5" fill="hsl(36, 90%, 44%)" opacity="0.5" />
      <circle cx="100" cy="60" r="1.5" fill="hsl(180, 43%, 30%)" opacity="0.4" />
      <circle cx="88" cy="95" r="1.5" fill="hsl(36, 90%, 44%)" opacity="0.4" />
      <circle cx="112" cy="95" r="1.5" fill="hsl(180, 43%, 30%)" opacity="0.4" />
      <rect x="90" y="150" width="20" height="8" rx="2" fill="url(#pathGrad)" opacity="0.3" />
      <rect x="92" y="158" width="16" height="4" rx="2" fill="url(#pathGrad)" opacity="0.2" />
    </svg>
  </div>
);

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
      className="glass-card inline-flex items-center gap-2.5 px-7 py-3.5 bg-accent text-accent-foreground font-semibold rounded-2xl hover:opacity-90 transition-opacity relative overflow-hidden"
      animate={pulse ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {/* Pulse ring */}
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

const slow = { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const };

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-24" style={{ background: "linear-gradient(180deg, #244D4D 0%, #244D4D 60%, hsl(0,0%,10.2%) 100%)" }}>
      {/* Drifting aura blobs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-primary/[0.05] blur-[180px] pointer-events-none"
        animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{ top: "10%", left: "-10%" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-accent/[0.05] blur-[180px] pointer-events-none"
        animate={{ x: [0, -60, 50, 0], y: [0, 50, -30, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ bottom: "5%", right: "-5%" }}
      />

      {/* Monstera background — immersive bleed */}
      <div
        className="absolute -right-20 top-0 bottom-0 w-[65%] pointer-events-none hidden lg:block"
        style={{
          maskImage: "linear-gradient(to left, black 0%, black 50%, transparent 90%)",
          WebkitMaskImage: "linear-gradient(to left, black 0%, black 50%, transparent 90%)",
        }}
      >
        <img
          src={monsteraImg}
          alt=""
          className="absolute -right-16 top-1/2 -translate-y-1/2 w-[700px] h-auto opacity-[0.35]"
          style={{
            mixBlendMode: "screen",
            filter: "drop-shadow(0 0 40px hsla(180, 43%, 30%, 0.35)) drop-shadow(0 0 80px hsla(180, 43%, 30%, 0.15))",
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl flex flex-col items-center relative z-10">
        <motion.div
          className="text-center max-w-3xl"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Name - prominent and centered */}
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3"
          >
            {fullName}
          </motion.h2>

          {/* Typing job title */}
          <motion.p
            variants={fadeUp}
            className="text-xl md:text-2xl tracking-[0.15em] uppercase text-accent font-medium mb-10 h-8"
          >
            {typedTitle}
            {!typingDone && <span className="inline-block w-0.5 h-6 bg-accent ml-1 animate-pulse align-middle" />}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tighter text-foreground"
          >
            {headline.includes(".") ? (
              <>
                {headline.split(".")[0]}.{" "}
                <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  {headline.split(".").slice(1).join(".").trim()}
                </span>
              </>
            ) : (
              headline
            )}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            {subHeadline}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4 justify-center">
            <PulsingCVButton href={cvUrl} />
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card inline-flex items-center gap-2.5 px-7 py-3.5 text-foreground font-semibold rounded-2xl border border-primary/25 hover:border-primary/50 transition-colors"
            >
              <Linkedin size={18} strokeWidth={1.5} />
              LinkedIn
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...slow, delay: 0.6 }}
        >
          <GlowingBrain />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
