import { Phone, Mail, MapPin } from "lucide-react";

const FooterSection = () => (
  <footer id="contact" className="py-16 px-6 border-t border-border">
    <div className="container mx-auto max-w-4xl text-center">
      <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
        <a href="tel:+1234567890" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <Phone size={18} /> +1 (234) 567-890
        </a>
        <a href="mailto:alexandra@zilman.dev" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <Mail size={18} /> alexandra@zilman.dev
        </a>
        <span className="flex items-center gap-2 text-muted-foreground">
          <MapPin size={18} /> Tel Aviv, Israel
        </span>
      </div>
      <p className="text-sm text-muted-foreground">© 2026 Alexandra Zilman. Built for the future of SaaS.</p>
    </div>
  </footer>
);

export default FooterSection;
