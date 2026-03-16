import { useState, useEffect, useCallback } from "react";

// Simulated detection targets
export interface Detection {
  id: string;
  type: "Person" | "Vehicle" | "Drone" | "Unknown";
  confidence: number;
  x: number;
  y: number;
  w: number;
  h: number;
  threat: boolean;
  timestamp: Date;
}

export interface SystemHealth {
  battery: number;
  signal: number;
  aiTemp: number;
  fps: number;
}

export interface GeoPosition {
  lat: number;
  lng: number;
  heading: number;
  altitude: number;
}

const TARGETS = ["Person", "Vehicle", "Drone", "Unknown"] as const;

function randomDetection(): Detection {
  const type = TARGETS[Math.floor(Math.random() * TARGETS.length)];
  const confidence = 60 + Math.random() * 39;
  const threat = type === "Drone" || (type === "Vehicle" && confidence > 85);
  return {
    id: crypto.randomUUID(),
    type,
    confidence: Math.round(confidence),
    x: 10 + Math.random() * 60,
    y: 10 + Math.random() * 60,
    w: 8 + Math.random() * 15,
    h: 8 + Math.random() * 20,
    threat,
    timestamp: new Date(),
  };
}

export function useTacticalData() {
  const [detections, setDetections] = useState<Detection[]>([]);
  const [missionLog, setMissionLog] = useState<Detection[]>([]);
  const [health, setHealth] = useState<SystemHealth>({ battery: 87, signal: 92, aiTemp: 42, fps: 60 });
  const [position, setPosition] = useState<GeoPosition>({ lat: 34.0522, lng: -118.2437, heading: 45, altitude: 150 });
  const [threatActive, setThreatActive] = useState(false);
  const [thermalMode, setThermalMode] = useState<"off" | "green" | "hot" | "blue">("off");

  // Simulate detections
  useEffect(() => {
    const interval = setInterval(() => {
      const count = 1 + Math.floor(Math.random() * 3);
      const newDetections = Array.from({ length: count }, randomDetection);
      setDetections(newDetections);

      const hasThreat = newDetections.some((d) => d.threat);
      if (hasThreat) {
        setThreatActive(true);
        setTimeout(() => setThreatActive(false), 500);
      }

      // Log detections
      setMissionLog((prev) => [...newDetections, ...prev].slice(0, 200));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Simulate position drift
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((p) => ({
        lat: p.lat + (Math.random() - 0.5) * 0.0001,
        lng: p.lng + (Math.random() - 0.5) * 0.0001,
        heading: (p.heading + (Math.random() - 0.5) * 5 + 360) % 360,
        altitude: p.altitude + (Math.random() - 0.5) * 2,
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate health fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setHealth((h) => ({
        battery: Math.max(0, Math.min(100, h.battery - Math.random() * 0.1)),
        signal: Math.max(50, Math.min(100, h.signal + (Math.random() - 0.5) * 3)),
        aiTemp: Math.max(30, Math.min(85, h.aiTemp + (Math.random() - 0.5) * 2)),
        fps: Math.max(24, Math.min(60, 58 + (Math.random() - 0.5) * 4)),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const cycleThermal = useCallback(() => {
    setThermalMode((m) => {
      const modes: typeof m[] = ["off", "green", "hot", "blue"];
      const idx = (modes.indexOf(m) + 1) % modes.length;
      return modes[idx];
    });
  }, []);

  return { detections, missionLog, health, position, threatActive, thermalMode, cycleThermal };
}
