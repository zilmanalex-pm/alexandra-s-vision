import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { useProfile } from "@/hooks/use-portfolio-data";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } },
};

const FooterSection = () => {
  const { data: profile } = useProfile();

  const phone = profile?.phone || "+1 (234) 567-890";
  const email = profile?.email || "alex.zilman@gmail.com";
  const location = profile?.location || "Tel Aviv, Israel";

  return (
    <footer id="contact" className="py-16 px-6 border-t border-border">
      <motion.div
        className="container mx-auto max-w-4xl text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-8 mb-8">
          <a href={`tel:${phone}`} className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
            <Phone size={18} strokeWidth={1.5} /> {phone}
          </a>
          <a href={`mailto:${email}`} className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
            <Mail size={18} strokeWidth={1.5} /> {email}
          </a>
          <span className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={18} strokeWidth={1.5} /> {location}
          </span>
        </motion.div>
        <motion.p variants={fadeUp} className="text-sm text-muted-foreground/60">© 2026 Alexandra Zilman. Built for the future of SaaS.</motion.p>
      </motion.div>
    </footer>
  );
};

export default FooterSection;
