import type { SystemHealth } from "@/hooks/useTacticalData";
import { Battery, Wifi, Cpu, Monitor } from "lucide-react";

interface SystemHealthDisplayProps {
  health: SystemHealth;
}

const SystemHealthDisplay = ({ health }: SystemHealthDisplayProps) => {
  const batteryColor = health.battery > 30 ? "text-primary" : "text-destructive";
  const tempColor = health.aiTemp > 70 ? "text-destructive" : health.aiTemp > 55 ? "text-tactical-amber" : "text-primary";

  return (
    <div className="absolute top-3 left-3 font-mono text-[10px] tracking-widest">
      <div className="border border-primary/20 p-2 bg-background/80 space-y-1">
        <div className="text-muted-foreground text-[8px] mb-1">SYS HEALTH</div>
        <div className={`flex items-center gap-1.5 ${batteryColor}`}>
          <Battery size={10} />
          <span>{Math.round(health.battery)}%</span>
        </div>
        <div className="flex items-center gap-1.5 text-primary">
          <Wifi size={10} />
          <span>{Math.round(health.signal)}%</span>
        </div>
        <div className={`flex items-center gap-1.5 ${tempColor}`}>
          <Cpu size={10} />
          <span>{Math.round(health.aiTemp)}°C</span>
        </div>
        <div className="flex items-center gap-1.5 text-primary">
          <Monitor size={10} />
          <span>{Math.round(health.fps)} FPS</span>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthDisplay;
