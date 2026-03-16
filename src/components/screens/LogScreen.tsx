import type { Detection } from "@/hooks/useTacticalData";
import { motion } from "framer-motion";

interface LogScreenProps {
  missionLog: Detection[];
}

const LogScreen = ({ missionLog }: LogScreenProps) => {
  return (
    <div className="relative w-full h-full bg-background overflow-auto p-4 pb-20">
      <div className="font-mono text-xs tracking-widest text-muted-foreground mb-4 flex items-center justify-between">
        <span>MISSION LOG</span>
        <span className="text-primary/40">{missionLog.length} ENTRIES</span>
      </div>

      <div className="space-y-2">
        {missionLog.slice(0, 50).map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15, delay: i * 0.02 }}
            className={`border p-3 font-mono text-xs ${
              entry.threat
                ? "border-destructive/30 bg-destructive/5"
                : "border-primary/10 bg-tactical-surface/50"
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Threat indicator */}
              <div className={`w-2 h-2 flex-shrink-0 ${entry.threat ? "bg-destructive" : "bg-primary"}`} />

              {/* Type */}
              <span className={`font-semibold tracking-wider flex-1 ${entry.threat ? "text-destructive" : "text-primary"}`}>
                {entry.type.toUpperCase()}
              </span>

              {/* Confidence */}
              <span className="text-muted-foreground">{entry.confidence}%</span>

              {/* Threat label */}
              {entry.threat && (
                <span className="text-destructive text-[9px] tracking-widest glow-red border border-destructive/30 px-1.5 py-0.5">
                  THREAT
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 mt-2">
              {/* Time */}
              <span className="text-muted-foreground/60 text-[10px]">
                {entry.timestamp.toLocaleTimeString("en-US", { hour12: false })}
              </span>

              {/* Confidence bar */}
              <div className="flex-1 h-1 bg-secondary">
                <div
                  className={`h-full transition-all ${entry.threat ? "bg-destructive" : "bg-primary"}`}
                  style={{ width: `${entry.confidence}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {missionLog.length === 0 && (
        <div className="text-center text-muted-foreground font-mono text-xs mt-20 tracking-widest">
          NO DETECTIONS LOGGED
        </div>
      )}
    </div>
  );
};

export default LogScreen;
