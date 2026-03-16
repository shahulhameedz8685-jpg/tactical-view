const Crosshairs = () => {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {/* Center crosshair */}
      <div className="relative w-20 h-20">
        {/* Horizontal line */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-primary opacity-60" />
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 h-full w-px bg-primary opacity-60" />
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary" />
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 bg-primary" />
      </div>

      {/* Outer frame corners */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-primary opacity-40" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-primary opacity-40" />
      <div className="absolute bottom-20 left-4 w-8 h-8 border-b border-l border-primary opacity-40" />
      <div className="absolute bottom-20 right-4 w-8 h-8 border-b border-r border-primary opacity-40" />
    </div>
  );
};

export default Crosshairs;
