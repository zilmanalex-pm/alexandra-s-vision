import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Mail } from "lucide-react";

const font = { fontFamily: "'Lexend', sans-serif" } as const;

const ScrollNav = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
      setVisible(scrollPercent > 0.5);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToContact = () => {
    const el = document.getElementById("connect");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={scrollToContact}
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            style={{
              ...font,
              background: "hsl(36, 90%, 44%)",
              border: "1px solid hsla(36, 90%, 44%, 0.5)",
              boxShadow: "0 4px 20px hsla(36, 90%, 44%, 0.4)",
            }}
            aria-label="Contact"
          >
            <Mail size={20} className="text-white" />
          </button>
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            style={{
              background: "hsla(0, 0%, 14%, 0.9)",
              border: "1px solid hsla(180, 43%, 30%, 0.25)",
              boxShadow: "0 4px 20px hsla(0, 0%, 0%, 0.4)",
            }}
            aria-label="Back to top"
          >
            <ArrowUp size={20} className="text-foreground" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollNav;
