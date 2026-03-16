import { useState } from "react";
import { useTacticalData } from "@/hooks/useTacticalData";
import TacticalNav from "@/components/TacticalNav";
import ScanScreen from "@/components/screens/ScanScreen";
import MapScreen from "@/components/screens/MapScreen";
import LogScreen from "@/components/screens/LogScreen";
import AdminScreen from "@/components/screens/AdminScreen";

type Screen = "scan" | "map" | "log" | "admin";

const Index = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>("scan");
  const { detections, missionLog, health, position, threatActive, thermalMode, cycleThermal } = useTacticalData();

  return (
    <div className="fixed inset-0 bg-background overflow-hidden font-mono">
      {/* Active screen */}
      <div className="absolute inset-0 pb-14">
        {activeScreen === "scan" && (
          <ScanScreen
            detections={detections}
            position={position}
            health={health}
            threatActive={threatActive}
            thermalMode={thermalMode}
          />
        )}
        {activeScreen === "map" && <MapScreen position={position} />}
        {activeScreen === "log" && <LogScreen missionLog={missionLog} />}
        {activeScreen === "admin" && <AdminScreen health={health} />}
      </div>

      {/* Navigation */}
      <TacticalNav
        active={activeScreen}
        onChange={setActiveScreen}
        onThermalCycle={cycleThermal}
        thermalMode={thermalMode}
      />
    </div>
  );
};

export default Index;
