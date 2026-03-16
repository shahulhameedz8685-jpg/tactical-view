import { Crosshair, Map, FileText, Settings, Eye } from "lucide-react";
import { motion } from "framer-motion";

type Screen = "scan" | "map" | "log" | "admin";

interface TacticalNavProps {
  active: Screen;
  onChange: (screen: Screen) => void;
  onThermalCycle: () => void;
  thermalMode: string;
}

const navItems: { id: Screen; label: string; icon: typeof Crosshair }[] = [
  { id: "scan", label: "SCAN", icon: Crosshair },
  { id: "map", label: "MAP", icon: Map },
  { id: "log", label: "LOG", icon: FileText },
  { id: "admin", label: "ADMIN", icon: Settings },
];

const TacticalNav = ({ active, onChange, onThermalCycle, thermalMode }: TacticalNavProps) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-background/95 border-t border-primary/20 flex items-center justify-around px-1 z-50 backdrop-blur-sm">
      {navItems.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`relative flex flex-col items-center gap-1 px-4 py-2 font-mono text-[10px] tracking-widest transition-colors min-w-[56px] ${
            active === id
              ? "text-primary"
              : "text-muted-foreground hover:text-primary/70"
          }`}
        >
          {active === id && (
            <motion.div
              layoutId="nav-indicator"
              className="absolute -top-px left-2 right-2 h-px bg-primary"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <Icon size={20} strokeWidth={1.5} />
          <span>{label}</span>
        </button>
      ))}
      <button
        onClick={onThermalCycle}
        className={`flex flex-col items-center gap-1 px-4 py-2 font-mono text-[10px] tracking-widest transition-colors min-w-[56px] ${
          thermalMode !== "off"
            ? "text-tactical-amber"
            : "text-muted-foreground hover:text-primary/70"
        }`}
      >
        <Eye size={20} strokeWidth={1.5} />
        <span>THERMAL</span>
      </button>
    </div>
  );
};

export default TacticalNav;
