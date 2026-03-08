import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useCallback } from "react";

const font = { fontFamily: "'Lexend', sans-serif" } as const;

interface LightboxItem {
  element: React.ReactNode;
  caption: string;
}

interface ScreenshotLightboxProps {
  items: LightboxItem[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const ScreenshotLightbox = ({ items, activeIndex, onClose, onNavigate }: ScreenshotLightboxProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && activeIndex > 0) onNavigate(activeIndex - 1);
      if (e.key === "ArrowRight" && activeIndex < items.length - 1) onNavigate(activeIndex + 1);
    },
    [activeIndex, items.length, onClose, onNavigate]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md"
        style={{ background: "hsla(0, 0%, 10%, 0.88)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
          style={{ background: "hsla(0, 0%, 20%, 0.6)" }}
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        {/* Previous arrow */}
        {activeIndex > 0 && (
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate(activeIndex - 1); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
            style={{ background: "hsla(0, 0%, 20%, 0.5)" }}
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>
        )}

        {/* Next arrow */}
        {activeIndex < items.length - 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate(activeIndex + 1); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
            style={{ background: "hsla(0, 0%, 20%, 0.5)" }}
          >
            <ChevronRight size={24} strokeWidth={1.5} />
          </button>
        )}

        {/* Content */}
        <motion.div
          key={activeIndex}
          className="w-full max-w-4xl mx-8 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full">
            {items[activeIndex].element}
          </div>
          <p
            className="mt-4 text-sm text-foreground/70 text-center"
            style={font}
          >
            {items[activeIndex].caption}
          </p>
          <p className="mt-1 text-xs text-muted-foreground" style={font}>
            {activeIndex + 1} / {items.length}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ScreenshotLightbox;
