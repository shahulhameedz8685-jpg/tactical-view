import type { GeoPosition } from "@/hooks/useTacticalData";

interface CompassDisplayProps {
  position: GeoPosition;
}

const CompassDisplay = ({ position }: CompassDisplayProps) => {
  const heading = Math.round(position.heading);
  const cardinals = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const cardinal = cardinals[Math.round(heading / 45) % 8];

  return (
    <div className="absolute top-3 right-3 text-right font-mono text-[10px] tracking-widest">
      <div className="border border-primary/20 p-2 bg-background/80">
        <div className="text-primary glow-green text-xs mb-1">
          {heading.toString().padStart(3, "0")}° {cardinal}
        </div>
        <div className="text-muted-foreground">
          LAT {position.lat.toFixed(6)}
        </div>
        <div className="text-muted-foreground">
          LNG {position.lng.toFixed(6)}
        </div>
        <div className="text-muted-foreground mt-1">
          ALT {Math.round(position.altitude)}m
        </div>
      </div>
    </div>
  );
};

export default CompassDisplay;
