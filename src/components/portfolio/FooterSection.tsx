import { Phone, Mail, MapPin } from "lucide-react";
import { useProfile } from "@/hooks/use-portfolio-data";

const FooterSection = () => {
  const { data: profile } = useProfile();

  const phone = profile?.phone || "+1 (234) 567-890";
  const email = profile?.email || "alexandra@zilman.dev";
  const location = profile?.location || "Tel Aviv, Israel";

  return (
    <footer id="contact" className="py-16 px-6 border-t border-border">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
          <a href={`tel:${phone}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <Phone size={18} /> {phone}
          </a>
          <a href={`mailto:${email}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <Mail size={18} /> {email}
          </a>
          <span className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={18} /> {location}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">© 2026 Alexandra Zilman. Built for the future of SaaS.</p>
      </div>
    </footer>
  );
};

export default FooterSection;
