import type { Detection } from "@/hooks/useTacticalData";

interface BoundingBoxesProps {
  detections: Detection[];
}

const BoundingBoxes = ({ detections }: BoundingBoxesProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {detections.map((d) => (
        <div
          key={d.id}
          className="absolute"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: `${d.w}%`,
            height: `${d.h}%`,
          }}
        >
          {/* Bounding box */}
          <div
            className={`absolute inset-0 border ${
              d.threat ? "border-destructive" : "border-primary"
            } opacity-80`}
          />
          {/* Corner accents */}
          <div className={`absolute -top-px -left-px w-2 h-2 border-t-2 border-l-2 ${d.threat ? "border-destructive" : "border-primary"}`} />
          <div className={`absolute -top-px -right-px w-2 h-2 border-t-2 border-r-2 ${d.threat ? "border-destructive" : "border-primary"}`} />
          <div className={`absolute -bottom-px -left-px w-2 h-2 border-b-2 border-l-2 ${d.threat ? "border-destructive" : "border-primary"}`} />
          <div className={`absolute -bottom-px -right-px w-2 h-2 border-b-2 border-r-2 ${d.threat ? "border-destructive" : "border-primary"}`} />

          {/* Label */}
          <div
            className={`absolute -top-6 left-0 flex items-center gap-2 text-[10px] font-mono tracking-wider ${
              d.threat ? "text-destructive glow-red" : "text-primary glow-green"
            }`}
          >
            <span>{d.threat ? "⚠ THREAT" : "TGT"}: {d.type}</span>
            <span className="opacity-70">|</span>
            <span>{d.confidence}%</span>
          </div>

          {/* Confidence bar */}
          <div className="absolute -bottom-3 left-0 w-full h-1 bg-secondary">
            <div
              className={`h-full ${d.threat ? "bg-destructive" : "bg-primary"}`}
              style={{ width: `${d.confidence}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoundingBoxes;
