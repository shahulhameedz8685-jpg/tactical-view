import { useState, useEffect } from "react";
import Crosshairs from "@/components/hud/Crosshairs";
import BoundingBoxes from "@/components/hud/BoundingBoxes";
import CompassDisplay from "@/components/hud/CompassDisplay";
import SystemHealthDisplay from "@/components/hud/SystemHealthDisplay";
import type { Detection, GeoPosition, SystemHealth } from "@/hooks/useTacticalData";

interface ScanScreenProps {
  detections: Detection[];
  position: GeoPosition;
  health: SystemHealth;
  threatActive: boolean;
  thermalMode: "off" | "green" | "hot" | "blue";
}

const ScanScreen = ({ detections, position, health, threatActive, thermalMode }: ScanScreenProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const thermalClass =
    thermalMode === "green" ? "thermal-green" :
    thermalMode === "hot" ? "thermal-hot" :
    thermalMode === "blue" ? "thermal-blue" : "";

  return (
    <div className={`relative w-full h-full overflow-hidden ${threatActive ? "threat-flash" : ""}`}>
      {/* Simulated camera feed */}
      <div className={`absolute inset-0 bg-tactical-surface ${thermalClass}`}>
        {/* Grid pattern simulating feed */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--tactical-green) / 0.1) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--tactical-green) / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Noise texture */}
        <div className="absolute inset-0 scanline" />
      </div>

      {/* Threat border */}
      {threatActive && (
        <div className="absolute inset-0 border-2 border-destructive z-40 pointer-events-none" />
      )}

      {/* HUD overlays */}
      <Crosshairs />
      <BoundingBoxes detections={detections} />
      <SystemHealthDisplay health={health} />
      <CompassDisplay position={position} />

      {/* Top center status bar */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.3em] text-primary/60 flex items-center gap-3">
        <span>SENTINEL v3.2.1</span>
        <span className="text-primary/30">|</span>
        <span>{time.toLocaleTimeString("en-US", { hour12: false })}</span>
        <span className="text-primary/30">|</span>
        <span className={detections.some(d => d.threat) ? "text-destructive blink glow-red" : ""}>
          {detections.some(d => d.threat) ? "⚠ THREAT DETECTED" : "SCANNING"}
        </span>
      </div>

      {/* Bottom left detection count */}
      <div className="absolute bottom-16 left-3 font-mono text-[10px] text-primary/60">
        <span>TARGETS: {detections.length}</span>
        <span className="mx-2 text-primary/20">|</span>
        <span className={detections.some(d => d.threat) ? "text-destructive" : ""}>
          THREATS: {detections.filter(d => d.threat).length}
        </span>
      </div>

      {/* Thermal mode indicator */}
      {thermalMode !== "off" && (
        <div className="absolute bottom-16 right-3 font-mono text-[10px] text-tactical-amber tracking-widest">
          THERMAL: {thermalMode.toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default ScanScreen;
