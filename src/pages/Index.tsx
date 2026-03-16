import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTacticalData } from "@/hooks/useTacticalData";
import TacticalNav from "@/components/TacticalNav";
import PinLockScreen from "@/components/PinLockScreen";
import ScanScreen from "@/components/screens/ScanScreen";
import MapScreen from "@/components/screens/MapScreen";
import LogScreen from "@/components/screens/LogScreen";
import AdminScreen from "@/components/screens/AdminScreen";

type Screen = "scan" | "map" | "log" | "admin";

const Index = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [activeScreen, setActiveScreen] = useState<Screen>("scan");
  const { detections, missionLog, health, position, threatActive, thermalMode, cycleThermal } = useTacticalData();

  if (!unlocked) {
    return <PinLockScreen onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <div className="fixed inset-0 bg-background overflow-hidden font-mono">
      {/* Active screen with transitions */}
      <div className="absolute inset-0 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="w-full h-full"
          >
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
          </motion.div>
        </AnimatePresence>
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
