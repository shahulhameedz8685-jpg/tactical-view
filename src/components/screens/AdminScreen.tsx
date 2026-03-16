import type { SystemHealth } from "@/hooks/useTacticalData";
import { motion } from "framer-motion";
import { Battery, Wifi, Cpu, Monitor, Shield, Lock, Radio, Database } from "lucide-react";

interface AdminScreenProps {
  health: SystemHealth;
}

const AdminScreen = ({ health }: AdminScreenProps) => {
  const configItems = [
    { label: "AI MODEL", value: "SentinelNet v3.2.1", icon: Cpu },
    { label: "DETECTION MODE", value: "MULTI-CLASS", icon: Monitor },
    { label: "CONFIDENCE THRESH", value: "60%", icon: Shield },
    { label: "SCAN INTERVAL", value: "3000ms", icon: Radio },
    { label: "DATA ENCRYPTION", value: "AES-256", icon: Lock },
    { label: "UPLINK STATUS", value: "CONNECTED", icon: Database },
  ];

  return (
    <div className="relative w-full h-full bg-background overflow-auto p-4 pb-20">
      <div className="font-mono text-xs tracking-widest text-muted-foreground mb-5">
        SYSTEM ADMINISTRATION
      </div>

      {/* System status */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-primary/20 p-4 mb-4"
      >
        <div className="text-[10px] tracking-widest text-muted-foreground mb-3">SYSTEM STATUS</div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "BATTERY", value: `${Math.round(health.battery)}%`, ok: health.battery > 20, icon: Battery },
            { label: "SIGNAL", value: `${Math.round(health.signal)}%`, ok: health.signal > 50, icon: Wifi },
            { label: "AI CORE", value: `${Math.round(health.aiTemp)}°C`, ok: health.aiTemp < 70, icon: Cpu },
            { label: "FPS", value: `${Math.round(health.fps)}`, ok: health.fps > 30, icon: Monitor },
          ].map((item) => (
            <div key={item.label} className="border border-primary/10 p-3 flex items-center gap-3">
              <item.icon size={16} className={item.ok ? "text-primary" : "text-destructive"} />
              <div>
                <div className="text-[9px] text-muted-foreground">{item.label}</div>
                <div className={`text-sm font-semibold ${item.ok ? "text-primary glow-green" : "text-destructive glow-red"}`}>
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="border border-primary/20 p-4"
      >
        <div className="text-[10px] tracking-widest text-muted-foreground mb-3">CONFIGURATION</div>
        <div className="space-y-1">
          {configItems.map((item) => (
            <div key={item.label} className="flex items-center gap-3 py-2.5 border-b border-primary/5 last:border-0">
              <item.icon size={14} className="text-muted-foreground/50" />
              <span className="text-xs text-muted-foreground flex-1">{item.label}</span>
              <span className="text-xs text-primary">{item.value}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Version */}
      <div className="mt-6 text-center font-mono text-[8px] text-muted-foreground/30 tracking-widest">
        TACTICAL SENTINEL // BUILD 2026.03.16 // CLASSIFIED
      </div>
    </div>
  );
};

export default AdminScreen;
