import type { Detection } from "@/hooks/useTacticalData";

interface LogScreenProps {
  missionLog: Detection[];
}

const LogScreen = ({ missionLog }: LogScreenProps) => {
  return (
    <div className="relative w-full h-full bg-background overflow-auto p-4 pb-16">
      <div className="font-mono text-[10px] tracking-widest text-muted-foreground mb-3 flex items-center justify-between">
        <span>MISSION LOG</span>
        <span className="text-primary/40">{missionLog.length} ENTRIES</span>
      </div>

      <div className="space-y-1">
        {missionLog.slice(0, 50).map((entry) => (
          <div
            key={entry.id}
            className={`border p-2 font-mono text-[10px] flex items-center gap-3 ${
              entry.threat
                ? "border-destructive/30 bg-destructive/5"
                : "border-primary/10 bg-tactical-surface/50"
            }`}
          >
            {/* Threat indicator */}
            <div className={`w-1.5 h-1.5 flex-shrink-0 ${entry.threat ? "bg-destructive" : "bg-primary"}`} />

            {/* Time */}
            <span className="text-muted-foreground w-16 flex-shrink-0">
              {entry.timestamp.toLocaleTimeString("en-US", { hour12: false })}
            </span>

            {/* Type */}
            <span className={`w-16 flex-shrink-0 tracking-wider ${entry.threat ? "text-destructive" : "text-primary"}`}>
              {entry.type.toUpperCase()}
            </span>

            {/* Confidence */}
            <div className="flex items-center gap-1 flex-1">
              <div className="w-16 h-1 bg-secondary">
                <div
                  className={`h-full ${entry.threat ? "bg-destructive" : "bg-primary"}`}
                  style={{ width: `${entry.confidence}%` }}
                />
              </div>
              <span className="text-muted-foreground">{entry.confidence}%</span>
            </div>

            {/* Threat label */}
            {entry.threat && (
              <span className="text-destructive text-[8px] tracking-widest glow-red">THREAT</span>
            )}
          </div>
        ))}
      </div>

      {missionLog.length === 0 && (
        <div className="text-center text-muted-foreground font-mono text-[10px] mt-20">
          NO DETECTIONS LOGGED
        </div>
      )}
    </div>
  );
};

export default LogScreen;
