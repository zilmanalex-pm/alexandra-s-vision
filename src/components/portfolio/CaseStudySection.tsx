import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Monitor, Smartphone } from "lucide-react";
import { useCaseStudies } from "@/hooks/use-portfolio-data";

import eucalyptusImg from "@/assets/eucalyptus-branch.png";
import tarbutonDashboard from "@/assets/tarbuton-dashboard.png";
import tarbutonMobileEvent from "@/assets/tarbuton-mobile-event.png";
import tarbutonMobileHome from "@/assets/tarbuton-mobile-home.png";
import ScreenshotLightbox from "./ScreenshotLightbox";

const slow = { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const };
const font = { fontFamily: "'Lexend', sans-serif" } as const;


/** Realistic MacBook Pro 16" (Space Gray) frame */
const MacBookFrame = ({ img, title, onClick }: { img?: string | null; title: string; onClick?: () => void }) => (
  <div
    className={`w-full ${onClick ? "cursor-zoom-in" : ""}`}
    onClick={onClick}
  >
    {/* Teal screen glow */}
    <div
      className="absolute -bottom-4 left-[10%] right-[10%] h-16 rounded-full pointer-events-none z-0"
      style={{
        background: "hsla(180, 50%, 40%, 0.25)",
        filter: "blur(30px)",
      }}
    />

    <div className="relative z-10">
      {/* Screen bezel */}
      <div
        className="rounded-t-xl overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #2C2C2E, #1C1C1E)",
          padding: "8px 8px 0 8px",
          boxShadow: "0 -1px 0 hsla(0,0%,100%,0.08) inset",
        }}
      >
        {/* Camera notch */}
        <div className="flex justify-center mb-1">
          <div className="w-2 h-2 rounded-full" style={{ background: "#0A0A0A", border: "1px solid #3A3A3C" }} />
        </div>

        {/* Screen */}
        <div className="rounded-t-md aspect-video overflow-hidden relative" style={{ background: "#0A0A0A" }}>
          {img ? (
            <img src={img} alt={`${title} desktop`} className="w-full h-full object-contain" loading="lazy" />
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <Monitor size={36} strokeWidth={1} className="text-foreground/30 mb-3" />
              <span className="text-sm font-medium text-foreground/50">TarbutON Dashboard</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom chassis */}
      <div
        className="rounded-b-xl relative"
        style={{
          height: "14px",
          background: "linear-gradient(180deg, #3A3A3C, #2C2C2E, #1C1C1E)",
          boxShadow: "0 2px 8px hsla(0,0%,0%,0.5), 0 1px 0 hsla(0,0%,100%,0.06) inset",
        }}
      >
        {/* Hinge notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b-md"
          style={{ width: "18%", height: "4px", background: "#48484A" }}
        />
      </div>

      {/* Base / keyboard deck */}
      <div className="mx-auto" style={{ width: "75%", marginTop: "-1px" }}>
        <div
          className="rounded-b-lg"
          style={{
            height: "6px",
            background: "linear-gradient(180deg, #3A3A3C, #2C2C2E)",
            boxShadow: "0 2px 6px hsla(0,0%,0%,0.4)",
          }}
        />
      </div>
    </div>
  </div>
);

/** iPhone 15 Pro realistic frame */
const IPhoneFrame = ({
  img,
  label,
  offset = false,
  onClick,
}: {
  img?: string | null;
  label: string;
  offset?: boolean;
  onClick?: () => void;
}) => (
  <div
    className={`relative ${offset ? "mt-8" : ""} ${onClick ? "cursor-zoom-in" : ""}`}
    style={{ width: "clamp(8rem, 32vw, 11rem)" }}
    onClick={onClick}
  >
    {/* Teal outer glow */}
    <div
      className="absolute inset-0 rounded-[2.2rem] pointer-events-none"
      style={{
        boxShadow:
          "0 0 30px hsla(180, 50%, 40%, 0.35), 0 0 60px hsla(180, 50%, 40%, 0.15), 0 0 100px hsla(180, 50%, 40%, 0.08)",
      }}
    />

    {/* Titanium frame body */}
    <div
      className="relative rounded-[2.2rem] overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #8E8E93, #636366, #8E8E93)",
        padding: "3px",
        boxShadow:
          "inset 0 1px 0 hsla(0, 0%, 100%, 0.3), inset 0 -1px 0 hsla(0, 0%, 0%, 0.3), 0 4px 16px hsla(0, 0%, 0%, 0.5)",
      }}
    >
      {/* Inner bezel */}
      <div
        className="rounded-[2rem] overflow-hidden relative"
        style={{
          background: "#000",
          padding: "10px 4px 10px 4px",
        }}
      >
        {/* Dynamic Island */}
        <div
          className="absolute top-[6px] left-1/2 -translate-x-1/2 z-20 rounded-full"
          style={{
            width: "28%",
            height: "8px",
            background: "#1C1C1E",
            border: "1px solid hsla(0, 0%, 20%, 0.5)",
          }}
        />

        {/* Screen area */}
        <div className="rounded-[1.6rem] overflow-hidden aspect-[9/19.5] relative bg-black">
          {img ? (
            <img
              src={img}
              alt={label}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <Smartphone size={20} strokeWidth={1} className="text-foreground/30 mb-2" />
              <span className="text-[9px] font-medium text-foreground/50 px-2 text-center">{label}</span>
            </div>
          )}
        </div>

        {/* Home indicator */}
        <div
          className="mx-auto mt-2 rounded-full"
          style={{
            width: "30%",
            height: "4px",
            background: "hsla(0, 0%, 100%, 0.25)",
          }}
        />
      </div>
    </div>

    {/* Side buttons - volume */}
    <div
      className="absolute left-[-2px] top-[22%] w-[2px] h-[8%] rounded-l-sm"
      style={{ background: "linear-gradient(180deg, #8E8E93, #636366)" }}
    />
    <div
      className="absolute left-[-2px] top-[33%] w-[2px] h-[6%] rounded-l-sm"
      style={{ background: "linear-gradient(180deg, #8E8E93, #636366)" }}
    />
    <div
      className="absolute left-[-2px] top-[41%] w-[2px] h-[6%] rounded-l-sm"
      style={{ background: "linear-gradient(180deg, #8E8E93, #636366)" }}
    />
    {/* Side button - power */}
    <div
      className="absolute right-[-2px] top-[30%] w-[2px] h-[10%] rounded-r-sm"
      style={{ background: "linear-gradient(180deg, #8E8E93, #636366)" }}
    />
  </div>
);

const CaseStudySection = () => {
  const { data: caseStudies } = useCaseStudies();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const cs = caseStudies?.[0];

  const title = cs?.title || "TarbutON";
  const problem = cs?.problem_statement || "Cultural education platforms lacked cohesive digital infrastructure, resulting in low adoption, fragmented user journeys, and poor stakeholder alignment across districts.";
  const desktopImg = tarbutonDashboard;
  const mobileImg1 = tarbutonMobileHome;
  const mobileImg2 = tarbutonMobileEvent;

  const lightboxItems = [
    { src: desktopImg, caption: "TarbutON Dashboard — Homepage & Discovery", type: "desktop" as const },
    { src: mobileImg1, caption: "TarbutON — Mobile Homepage & Featured Events", type: "mobile" as const },
    { src: mobileImg2, caption: "TarbutON — Mobile Event Detail & Ticketing", type: "mobile" as const },
  ];

  return (
    <section id="casestudy" ref={sectionRef} className="relative py-28 px-6 overflow-hidden" style={{ background: "#1A1A1B" }}>
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-primary/5 blur-[120px] animate-blob pointer-events-none" style={{ animationDelay: "6s" }} />

      <motion.img
        src={eucalyptusImg}
        alt=""
        className="absolute top-0 -right-4 w-[400px] h-full object-contain pointer-events-none select-none hidden lg:block"
        style={{
          opacity: 0.85,
          mixBlendMode: "screen",
          y: parallaxY,
          filter: "drop-shadow(0 0 40px hsla(180, 43%, 30%, 0.5)) drop-shadow(0 0 80px hsla(180, 43%, 30%, 0.25)) brightness(0.5) saturate(1.4)",
          zIndex: 0,
        }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slow}
        >
          <h2 className="text-[32px] md:text-[48px] font-bold text-foreground" style={font}>
            Case Study: <span className="text-accent">TarbutON</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto" style={{ ...font, color: "#A3B8B8" }}>
            An interactive deep-dive into cultural education transformation.
          </p>
        </motion.div>

        <motion.div
          className="rounded-3xl p-8 md:p-10 mb-16 max-w-3xl mx-auto relative overflow-hidden"
          style={{ background: "#242426", border: "none" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slow}
        >
          <div className="relative z-10">
            <h3 className="text-[20px] md:text-[24px] font-semibold text-white mb-3" style={font}>The Problem</h3>
            <p className="leading-relaxed text-lg" style={{ ...font, color: "#E2E8F0" }}>{problem}</p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 [&>a]:w-full [&>a]:sm:w-auto">
              <a
                href="https://tarbut-on.lovable.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-lg font-bold text-white transition-all duration-300 hover:shadow-[0_0_20px_hsla(36,90%,44%,0.5)] hover:brightness-110"
                style={{
                  ...font,
                  background: "#D97706",
                  backgroundImage: "linear-gradient(110deg, transparent 33%, hsla(0,0%,100%,0.15) 50%, transparent 67%)",
                  backgroundSize: "300% 100%",
                }}
                onMouseEnter={(e) => { (e.currentTarget.style.backgroundPosition = "100% 0"); }}
                onMouseLeave={(e) => { (e.currentTarget.style.backgroundPosition = "0% 0"); }}
              >
                Go to TarbutON
              </a>
              <a
                href="https://drive.google.com/file/d/1fnYSeSOG5GMBHTSftxqFcb-nQcpGOCS-/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-lg font-bold text-white transition-all duration-300 hover:bg-primary/10"
                style={{
                  ...font,
                  background: "transparent",
                  border: "1.5px solid hsl(var(--primary))",
                }}
              >
                Download TarbutON Case Study PPT
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slow}
        >
          <div className="w-[90%] md:w-full mx-auto rounded-3xl p-4 md:p-8 hover:border-primary/30 transition-colors max-h-[60vh] md:max-h-none flex items-center" style={{ background: "hsla(0, 0%, 12%, 0.8)", border: "1px solid hsla(180, 43%, 30%, 0.15)" }}>
            <MacBookFrame img={desktopImg} title={title} onClick={() => setLightboxIndex(0)} />
          </div>
          <div className="w-[90%] md:w-full mx-auto rounded-3xl p-6 md:p-10 flex justify-center items-center gap-6 md:gap-8 hover:border-primary/30 transition-colors h-[60vh] md:h-auto" style={{ background: "hsla(0, 0%, 12%, 0.8)", border: "1px solid hsla(180, 43%, 30%, 0.15)" }}>
            <IPhoneFrame img={mobileImg1} label="Mobile Home" onClick={() => setLightboxIndex(1)} />
            <IPhoneFrame img={mobileImg2} label="Event Detail" offset onClick={() => setLightboxIndex(2)} />
          </div>
        </motion.div>
      </div>

      {lightboxIndex !== null && (
        <ScreenshotLightbox
          items={lightboxItems}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
};

export default CaseStudySection;
