import { Crosshair, Map, FileText, Settings, Eye } from "lucide-react";

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
    <div className="absolute bottom-0 left-0 right-0 h-14 bg-background/90 border-t border-primary/20 flex items-center justify-around px-2 z-50">
      {navItems.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 font-mono text-[9px] tracking-widest transition-none ${
            active === id
              ? "text-primary glow-green"
              : "text-muted-foreground hover:text-primary"
          }`}
        >
          <Icon size={16} strokeWidth={1.5} />
          <span>{label}</span>
        </button>
      ))}
      <button
        onClick={onThermalCycle}
        className={`flex flex-col items-center gap-0.5 px-3 py-1 font-mono text-[9px] tracking-widest transition-none ${
          thermalMode !== "off"
            ? "text-tactical-amber"
            : "text-muted-foreground hover:text-primary"
        }`}
      >
        <Eye size={16} strokeWidth={1.5} />
        <span>THERMAL</span>
      </button>
    </div>
  );
};

export default TacticalNav;
