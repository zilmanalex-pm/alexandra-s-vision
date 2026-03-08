import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { useProfile } from "@/hooks/use-portfolio-data";

const font = { fontFamily: "'Lexend', sans-serif" } as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } },
};

const FooterSection = () => {
  const { data: profile } = useProfile();

  const phone = profile?.phone || "+972545464305";
  const email = profile?.email || "zilman.alex@gmail.com";
  const location = profile?.location || "Israel";

  const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, "")}`;

  return (
    <footer id="contact" className="py-16 px-6 border-t border-primary/20">
      <motion.div
        className="container mx-auto max-w-4xl text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-8" style={font}>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
          >
            <MessageCircle size={18} strokeWidth={1.5} /> {phone}
          </a>
          <a href={`mailto:${email}`} className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
            <Mail size={18} strokeWidth={1.5} /> {email}
          </a>
          <span className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={18} strokeWidth={1.5} /> {location}
          </span>
        </motion.div>

        <motion.p variants={fadeUp} className="mt-8 text-muted-foreground/50 leading-relaxed" style={{ ...font, fontSize: "12px" }}>
          Privacy Note: This site uses anonymous session tracking solely to measure page views and traffic sources. No personal data is collected or stored. All analytics data is aggregated and used only for portfolio performance insights.
        </motion.p>
      </motion.div>
    </footer>
  );
};

export default FooterSection;
