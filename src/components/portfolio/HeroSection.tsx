import { motion } from "framer-motion";
import { Download, Linkedin } from "lucide-react";
import { useProfile } from "@/hooks/use-portfolio-data";

const GlowingBrain = () => (
  <div className="relative w-64 h-64 md:w-80 md:h-80 animate-float">
    <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl" />
    <div className="absolute inset-4 rounded-full bg-accent/10 blur-2xl" />
    <svg viewBox="0 0 200 200" className="relative w-full h-full drop-shadow-2xl" fill="none">
      <defs>
        <radialGradient id="brainGlow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="hsl(249, 76%, 62%)" stopOpacity="0.9" />
          <stop offset="60%" stopColor="hsl(310, 100%, 73%)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(310, 100%, 73%)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(249, 76%, 62%)" />
          <stop offset="100%" stopColor="hsl(310, 100%, 73%)" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="85" r="55" fill="url(#brainGlow)" opacity="0.3" />
      <path d="M100 40 C70 40 50 60 50 85 C50 105 65 120 80 125 L80 145 C80 150 85 155 100 155 C115 155 120 150 120 145 L120 125 C135 120 150 105 150 85 C150 60 130 40 100 40Z" stroke="url(#pathGrad)" strokeWidth="2" fill="none" opacity="0.8" />
      <path d="M85 70 C85 60 100 55 100 65 C100 55 115 60 115 70 C115 80 100 85 100 95 C100 85 85 80 85 70Z" stroke="url(#pathGrad)" strokeWidth="1.5" fill="url(#brainGlow)" opacity="0.5" />
      <circle cx="75" cy="75" r="3" fill="hsl(249, 76%, 62%)" opacity="0.6" />
      <circle cx="125" cy="75" r="3" fill="hsl(310, 100%, 73%)" opacity="0.6" />
      <circle cx="100" cy="60" r="2" fill="hsl(249, 76%, 62%)" opacity="0.5" />
      <circle cx="88" cy="95" r="2" fill="hsl(310, 100%, 73%)" opacity="0.5" />
      <circle cx="112" cy="95" r="2" fill="hsl(249, 76%, 62%)" opacity="0.5" />
      <rect x="90" y="150" width="20" height="8" rx="2" fill="url(#pathGrad)" opacity="0.4" />
      <rect x="92" y="158" width="16" height="4" rx="2" fill="url(#pathGrad)" opacity="0.3" />
      <line x1="100" y1="20" x2="100" y2="10" stroke="hsl(249, 76%, 62%)" strokeWidth="1" opacity="0.3" />
      <line x1="140" y1="45" x2="148" y2="38" stroke="hsl(310, 100%, 73%)" strokeWidth="1" opacity="0.3" />
      <line x1="60" y1="45" x2="52" y2="38" stroke="hsl(249, 76%, 62%)" strokeWidth="1" opacity="0.3" />
      <line x1="155" y1="85" x2="165" y2="85" stroke="hsl(310, 100%, 73%)" strokeWidth="1" opacity="0.3" />
      <line x1="45" y1="85" x2="35" y2="85" stroke="hsl(249, 76%, 62%)" strokeWidth="1" opacity="0.3" />
    </svg>
  </div>
);

const HeroSection = () => {
  const { data: profile } = useProfile();

  const headline = profile?.hero_headline || "Simplifying the complex. Delivering what matters.";
  const subHeadline = profile?.sub_headline || "Alexandra Zilman — Product Manager specializing in high-stakes execution within regulated B2B SaaS and GovTech.";
  const cvUrl = profile?.cv_url;
  const linkedinUrl = profile?.linkedin_url;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-24">
      <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-primary/8 blur-3xl animate-blob" />
      <div className="absolute bottom-20 -right-32 w-80 h-80 rounded-full bg-accent/8 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />

      <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground">
            {headline.includes(".") ? (
              <>
                {headline.split(".")[0]}.{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {headline.split(".").slice(1).join(".").trim()}
                </span>
              </>
            ) : (
              headline
            )}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
            {subHeadline}
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
            <a
              href={cvUrl || "#"}
              className="glass-card inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded-2xl hover:opacity-90 transition-opacity"
              {...(cvUrl ? { download: true } : {})}
            >
              <Download size={18} />
              Download CV
            </a>
            <a
              href={linkedinUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card inline-flex items-center gap-2.5 px-7 py-3.5 text-foreground font-semibold rounded-2xl hover:bg-primary/5 transition-colors"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>
        </motion.div>

        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <GlowingBrain />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
