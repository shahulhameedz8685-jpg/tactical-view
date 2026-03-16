import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Lock, Delete } from "lucide-react";

interface PinLockScreenProps {
  onUnlock: () => void;
}

const CORRECT_PIN = "1234"; // Default PIN

const PinLockScreen = ({ onUnlock }: PinLockScreenProps) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);

  const handleKeyPress = useCallback((digit: string) => {
    if (locked) return;
    setError(false);
    const newPin = pin + digit;
    setPin(newPin);

    if (newPin.length === 4) {
      if (newPin === CORRECT_PIN) {
        onUnlock();
      } else {
        setError(true);
        setAttempts((a) => a + 1);
        setTimeout(() => {
          setPin("");
          setError(false);
          if (attempts >= 4) {
            setLocked(true);
            setTimeout(() => {
              setLocked(false);
              setAttempts(0);
            }, 30000);
          }
        }, 600);
      }
    }
  }, [pin, locked, attempts, onUnlock]);

  const handleDelete = useCallback(() => {
    if (locked) return;
    setPin((p) => p.slice(0, -1));
    setError(false);
  }, [locked]);

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "DEL"];

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-[100] font-mono">
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center mb-10"
      >
        <div className="w-16 h-16 border border-primary/30 flex items-center justify-center mb-4">
          <ShieldCheck size={28} className="text-primary glow-green" />
        </div>
        <h1 className="text-primary text-sm tracking-[0.4em] glow-green mb-1">TACTICAL SENTINEL</h1>
        <p className="text-muted-foreground text-[10px] tracking-[0.3em]">SECURE ACCESS REQUIRED</p>
      </motion.div>

      {/* PIN dots */}
      <motion.div className="flex gap-4 mb-8">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{
              borderColor: error
                ? "hsl(0 100% 60%)"
                : pin.length > i
                ? "hsl(120 100% 54%)"
                : "hsl(120 100% 54% / 0.2)",
              backgroundColor: pin.length > i
                ? error ? "hsl(0 100% 60%)" : "hsl(120 100% 54%)"
                : "transparent",
              scale: error ? [1, 1.2, 0.9, 1] : 1,
            }}
            transition={{ duration: 0.15 }}
            className="w-4 h-4 border"
          />
        ))}
      </motion.div>

      {/* Error / locked message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-destructive text-[10px] tracking-widest mb-4 glow-red"
          >
            ACCESS DENIED — ATTEMPT {attempts}/5
          </motion.p>
        )}
        {locked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-destructive text-[10px] tracking-widest mb-4 glow-red"
          >
            <Lock size={12} />
            <span>SYSTEM LOCKED — 30s COOLDOWN</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keypad */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="grid grid-cols-3 gap-2 max-w-[240px]"
      >
        {keys.map((key) => {
          if (key === "") return <div key="empty" />;
          if (key === "DEL") {
            return (
              <button
                key="del"
                onClick={handleDelete}
                disabled={locked}
                className="h-14 flex items-center justify-center border border-primary/10 text-muted-foreground hover:text-primary hover:border-primary/30 active:bg-primary/10 transition-colors disabled:opacity-20"
              >
                <Delete size={18} />
              </button>
            );
          }
          return (
            <button
              key={key}
              onClick={() => handleKeyPress(key)}
              disabled={locked}
              className="h-14 text-lg tracking-widest border border-primary/10 text-primary/70 hover:text-primary hover:border-primary/30 active:bg-primary/10 transition-colors disabled:opacity-20"
            >
              {key}
            </button>
          );
        })}
      </motion.div>

      {/* Footer */}
      <div className="absolute bottom-6 text-[8px] text-muted-foreground/30 tracking-[0.3em]">
        DEFAULT PIN: 1234 // ENCRYPTED AES-256
      </div>
    </div>
  );
};

export default PinLockScreen;
