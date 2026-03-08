import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle } from "lucide-react";

const font = { fontFamily: "'Lexend', sans-serif" } as const;

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const ConnectSection = () => (
  <section id="connect" className="relative py-24 px-6">
    <div className="container mx-auto max-w-5xl relative z-10">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Left column */}
        <motion.div variants={fadeUp}>
          <h2 className="text-[32px] md:text-[48px] font-bold text-foreground mb-6" style={font}>
            Ready to simplify{" "}
            <span className="text-accent">the complex?</span>
          </h2>

          <div className="space-y-3">
            <a
              href="mailto:zilman.alex@gmail.com"
              className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors"
              style={font}
            >
              <Mail size={18} strokeWidth={1.5} />
              zilman.alex@gmail.com
            </a>
            <span className="flex items-center gap-3 text-muted-foreground" style={font}>
              <MapPin size={18} strokeWidth={1.5} />
              Israel
            </span>
          </div>
        </motion.div>

        {/* Right column */}
        <motion.div variants={fadeUp} className="flex md:justify-end">
          <a
            href="https://wa.me/972545464305"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-accent text-accent-foreground font-semibold rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_hsla(36,90%,44%,0.4)] hover:scale-[1.03] animate-pulse-glow"
            style={font}
          >
            <MessageCircle size={22} strokeWidth={1.5} />
            <span className="text-lg">Chat on WhatsApp</span>
          </a>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default ConnectSection;
