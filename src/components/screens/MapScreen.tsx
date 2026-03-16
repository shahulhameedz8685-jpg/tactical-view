import type { GeoPosition } from "@/hooks/useTacticalData";

interface MapScreenProps {
  position: GeoPosition;
}

const MapScreen = ({ position }: MapScreenProps) => {
  return (
    <div className="relative w-full h-full bg-background overflow-auto p-4">
      <div className="font-mono text-[10px] tracking-widest text-muted-foreground mb-3">
        TACTICAL MAP // SECTOR 7-G
      </div>

      {/* Simulated tactical map */}
      <div className="relative w-full aspect-square max-w-lg mx-auto border border-primary/20 bg-tactical-surface">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--tactical-green) / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--tactical-green) / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "10% 10%",
          }}
        />

        {/* Position marker */}
        <div
          className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2"
          style={{ left: "50%", top: "50%" }}
        >
          <div className="w-full h-full border border-primary rotate-45" />
          <div className="absolute inset-0 border border-primary/30 rotate-45 scale-[2] animate-ping" />
        </div>

        {/* Simulated waypoints */}
        {[
          { x: 30, y: 25, label: "ALPHA" },
          { x: 70, y: 40, label: "BRAVO" },
          { x: 45, y: 75, label: "CHARLIE" },
        ].map((wp) => (
          <div
            key={wp.label}
            className="absolute flex flex-col items-center"
            style={{ left: `${wp.x}%`, top: `${wp.y}%` }}
          >
            <div className="w-1.5 h-1.5 bg-primary" />
            <span className="text-[8px] text-primary/60 mt-0.5">{wp.label}</span>
          </div>
        ))}

        {/* Range rings */}
        <div className="absolute inset-[15%] border border-primary/10 rounded-full" />
        <div className="absolute inset-[30%] border border-primary/10 rounded-full" />

        {/* Heading line */}
        <div
          className="absolute top-1/2 left-1/2 w-px h-[20%] bg-primary/40 origin-bottom"
          style={{ transform: `translate(-50%, -100%) rotate(${position.heading}deg)` }}
        />
      </div>

      {/* Coordinates */}
      <div className="mt-4 font-mono text-[10px] text-center space-y-1">
        <div className="text-primary glow-green">
          {position.lat.toFixed(6)}°N / {Math.abs(position.lng).toFixed(6)}°W
        </div>
        <div className="text-muted-foreground">
          HDG {Math.round(position.heading).toString().padStart(3, "0")}° | ALT {Math.round(position.altitude)}m
        </div>
      </div>
    </div>
  );
};

export default MapScreen;
