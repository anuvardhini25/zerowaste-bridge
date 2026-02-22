import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuotePopupProps {
  isOpen: boolean;
  onClose: () => void;
  quotes: string[];
  title: string;
  variant?: "food" | "blood";
}

const QuotePopup = ({ isOpen, onClose, quotes, title, variant = "food" }: QuotePopupProps) => {
  const [currentQuote, setCurrentQuote] = useState(0);

  const bgClass = variant === "blood" ? "gradient-blood" : "gradient-hero";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative max-w-md w-full rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`${bgClass} p-8 text-center`}>
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mb-4"
              >
                <Sparkles className="w-12 h-12 text-primary-foreground" />
              </motion.div>
              <h3 className="text-2xl font-bold text-primary-foreground mb-2">{title}</h3>
            </div>
            <div className="bg-card p-8">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentQuote}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="text-lg italic text-center text-foreground leading-relaxed mb-6"
                >
                  "{quotes[currentQuote]}"
                </motion.p>
              </AnimatePresence>
              <div className="flex justify-center gap-2 mb-6">
                {quotes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentQuote(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      i === currentQuote ? "bg-primary" : "bg-border"
                    }`}
                  />
                ))}
              </div>
              <Button onClick={onClose} className="w-full">
                Continue
              </Button>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-primary-foreground/80 hover:text-primary-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuotePopup;
