import { useState, useEffect, useCallback } from "react";
import { Camera, CameraOff, FlipHorizontal2, Aperture } from "lucide-react";
import Crosshairs from "@/components/hud/Crosshairs";
import BoundingBoxes from "@/components/hud/BoundingBoxes";
import CompassDisplay from "@/components/hud/CompassDisplay";
import SystemHealthDisplay from "@/components/hud/SystemHealthDisplay";
import { useCamera } from "@/hooks/useCamera";
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
  const { videoRef, cameraActive, cameraError, startCamera, stopCamera, flipCamera, captureFrame } = useCamera();
  const [lastCapture, setLastCapture] = useState<string | null>(null);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const handleCapture = useCallback(() => {
    const frame = captureFrame();
    if (frame) {
      setLastCapture(frame);
      // Auto-dismiss thumbnail after 3s
      setTimeout(() => setLastCapture(null), 3000);
    }
  }, [captureFrame]);

  const thermalClass =
    thermalMode === "green" ? "thermal-green" :
    thermalMode === "hot" ? "thermal-hot" :
    thermalMode === "blue" ? "thermal-blue" : "";

  return (
    <div className={`relative w-full h-full overflow-hidden ${threatActive ? "threat-flash" : ""}`}>
      {/* Camera feed / fallback */}
      <div className={`absolute inset-0 bg-tactical-surface ${thermalClass}`}>
        {/* Live camera video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          muted
          autoPlay
        />

        {/* Fallback grid when camera is off */}
        {!cameraActive && (
          <>
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
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <CameraOff size={32} className="text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-muted-foreground/40 text-[10px] tracking-widest">
                  {cameraError || "CAMERA OFFLINE"}
                </p>
              </div>
            </div>
          </>
        )}

        {/* Scanline overlay */}
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
      <div className="absolute top-3 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.3em] text-primary/60 flex items-center gap-3 bg-background/40 px-3 py-1">
        <span>SENTINEL v3.2.1</span>
        <span className="text-primary/30">|</span>
        <span>{time.toLocaleTimeString("en-US", { hour12: false })}</span>
        <span className="text-primary/30">|</span>
        <span className={detections.some(d => d.threat) ? "text-destructive blink glow-red" : ""}>
          {detections.some(d => d.threat) ? "⚠ THREAT DETECTED" : "SCANNING"}
        </span>
      </div>

      {/* Camera controls - right side */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30">
        <button
          onClick={cameraActive ? stopCamera : () => startCamera()}
          className={`w-11 h-11 border flex items-center justify-center transition-colors ${
            cameraActive
              ? "border-primary/40 text-primary bg-background/60"
              : "border-primary/20 text-muted-foreground bg-background/40 hover:text-primary"
          }`}
        >
          {cameraActive ? <Camera size={18} /> : <CameraOff size={18} />}
        </button>

        {cameraActive && (
          <>
            <button
              onClick={flipCamera}
              className="w-11 h-11 border border-primary/20 flex items-center justify-center text-muted-foreground bg-background/40 hover:text-primary transition-colors"
            >
              <FlipHorizontal2 size={18} />
            </button>

            <button
              onClick={handleCapture}
              className="w-11 h-11 border border-primary/20 flex items-center justify-center text-muted-foreground bg-background/40 hover:text-primary transition-colors"
            >
              <Aperture size={18} />
            </button>
          </>
        )}
      </div>

      {/* Capture thumbnail */}
      {lastCapture && (
        <div className="absolute bottom-20 left-3 z-30 border border-primary/40">
          <img src={lastCapture} alt="Capture" className="w-20 h-14 object-cover" />
          <div className="text-[8px] text-primary/60 text-center py-0.5 bg-background/80">CAPTURED</div>
        </div>
      )}

      {/* Bottom left detection count */}
      <div className="absolute bottom-2 left-3 font-mono text-[10px] text-primary/60 bg-background/40 px-2 py-1">
        <span>TARGETS: {detections.length}</span>
        <span className="mx-2 text-primary/20">|</span>
        <span className={detections.some(d => d.threat) ? "text-destructive" : ""}>
          THREATS: {detections.filter(d => d.threat).length}
        </span>
      </div>

      {/* Thermal mode indicator */}
      {thermalMode !== "off" && (
        <div className="absolute bottom-2 right-3 font-mono text-[10px] text-tactical-amber tracking-widest bg-background/40 px-2 py-1">
          THERMAL: {thermalMode.toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default ScanScreen;
