import type { SystemHealth } from "@/hooks/useTacticalData";

interface AdminScreenProps {
  health: SystemHealth;
}

const AdminScreen = ({ health }: AdminScreenProps) => {
  const configItems = [
    { label: "AI MODEL", value: "SentinelNet v3.2.1" },
    { label: "DETECTION MODE", value: "MULTI-CLASS" },
    { label: "CONFIDENCE THRESH", value: "60%" },
    { label: "SCAN INTERVAL", value: "3000ms" },
    { label: "VIDEO RES", value: "1920x1080" },
    { label: "ORIENTATION LOCK", value: "ENABLED" },
    { label: "HAPTIC FEEDBACK", value: "ENABLED" },
    { label: "DATA ENCRYPTION", value: "AES-256" },
    { label: "UPLINK STATUS", value: "CONNECTED" },
    { label: "MISSION ID", value: "TSK-" + Math.floor(Math.random() * 9000 + 1000) },
  ];

  return (
    <div className="relative w-full h-full bg-background overflow-auto p-4 pb-16">
      <div className="font-mono text-[10px] tracking-widest text-muted-foreground mb-4">
        SYSTEM ADMINISTRATION
      </div>

      {/* System status */}
      <div className="border border-primary/20 p-3 mb-4">
        <div className="text-[8px] tracking-widest text-muted-foreground mb-2">SYSTEM STATUS</div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "BATTERY", value: `${Math.round(health.battery)}%`, ok: health.battery > 20 },
            { label: "SIGNAL", value: `${Math.round(health.signal)}%`, ok: health.signal > 50 },
            { label: "AI CORE", value: `${Math.round(health.aiTemp)}°C`, ok: health.aiTemp < 70 },
            { label: "FPS", value: `${Math.round(health.fps)}`, ok: health.fps > 30 },
          ].map((item) => (
            <div key={item.label} className="border border-primary/10 p-2">
              <div className="text-[8px] text-muted-foreground">{item.label}</div>
              <div className={`text-xs ${item.ok ? "text-primary glow-green" : "text-destructive glow-red"}`}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Configuration */}
      <div className="border border-primary/20 p-3">
        <div className="text-[8px] tracking-widest text-muted-foreground mb-2">CONFIGURATION</div>
        <div className="space-y-1">
          {configItems.map((item) => (
            <div key={item.label} className="flex justify-between items-center py-1 border-b border-primary/5 last:border-0">
              <span className="text-[10px] text-muted-foreground">{item.label}</span>
              <span className="text-[10px] text-primary">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Version */}
      <div className="mt-4 text-center font-mono text-[8px] text-muted-foreground/40 tracking-widest">
        TACTICAL SENTINEL // BUILD 2026.03.16 // CLASSIFIED
      </div>
    </div>
  );
};

export default AdminScreen;
