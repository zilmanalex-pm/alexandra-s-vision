import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { useEffect, useCallback, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const font = { fontFamily: "'Lexend', sans-serif" } as const;

interface LightboxItem {
  src: string;
  caption: string;
  type: "desktop" | "mobile";
}

interface ScreenshotLightboxProps {
  items: LightboxItem[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const ScreenshotLightbox = ({ items, activeIndex, onClose, onNavigate }: ScreenshotLightboxProps) => {
  const isMobile = useIsMobile();
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const initialDistance = useRef<number | null>(null);
  const initialScale = useRef(1);

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

  useEffect(() => {
    setScale(1);
  }, [activeIndex]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      initialDistance.current = Math.hypot(dx, dy);
      initialScale.current = scale;
    }
  }, [scale]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialDistance.current) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const newScale = Math.min(Math.max(initialScale.current * (dist / initialDistance.current), 1), 4);
      setScale(newScale);
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    initialDistance.current = null;
  }, []);

  const currentItem = items[activeIndex];
  const isMobileScreenshot = currentItem.type === "mobile";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md"
        style={{ background: "hsla(0, 0%, 6%, 0.92)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors z-10"
          style={{ background: "hsla(0, 0%, 20%, 0.6)" }}
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        {/* Previous arrow */}
        {activeIndex > 0 && (
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate(activeIndex - 1); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors z-10"
            style={{ background: "hsla(0, 0%, 20%, 0.5)" }}
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>
        )}

        {/* Next arrow */}
        {activeIndex < items.length - 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate(activeIndex + 1); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors z-10"
            style={{ background: "hsla(0, 0%, 20%, 0.5)" }}
          >
            <ChevronRight size={24} strokeWidth={1.5} />
          </button>
        )}

        {/* Content */}
        <motion.div
          key={activeIndex}
          ref={contentRef}
          className="flex flex-col items-center touch-none cursor-zoom-in"
          style={{
            maxHeight: "90vh",
            width: isMobileScreenshot ? "auto" : (isMobile ? "95vw" : "90vw"),
            maxWidth: isMobileScreenshot ? (isMobile ? "85vw" : "400px") : "1400px",
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="transition-transform duration-100"
            style={{
              transform: `scale(${scale})`,
              maxHeight: "85vh",
            }}
          >
            <img
              src={currentItem.src}
              alt={currentItem.caption}
              className="object-contain rounded-lg"
              style={{
                maxHeight: isMobile ? "80vh" : "85vh",
                width: "100%",
                border: "3px solid hsla(0, 0%, 100%, 0.9)",
                boxShadow: "0 0 40px hsla(0, 0%, 0%, 0.5)",
              }}
            />
          </div>
          <p className="mt-4 text-sm text-foreground/70 text-center" style={font}>
            {currentItem.caption}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-xs text-muted-foreground" style={font}>
              {activeIndex + 1} / {items.length}
            </p>
            {isMobile && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <ZoomIn size={12} /> Pinch to zoom
              </span>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ScreenshotLightbox;
