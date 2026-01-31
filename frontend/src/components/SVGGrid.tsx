export const SVGGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
      >
        <defs>
          <pattern
            id="grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="rgba(0, 255, 0, 0.1)"
              strokeWidth="1"
            />
          </pattern>
          
          <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 255, 255, 0.3)" />
            <stop offset="50%" stopColor="rgba(0, 255, 0, 0.1)" />
            <stop offset="100%" stopColor="rgba(255, 0, 255, 0.2)" />
          </linearGradient>

          <filter id="neon">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Grid Background */}
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Animated Circuit Lines */}
        <g className="animate-pulse">
          <path
            d="M0,100 L300,100 L300,300 L600,300 L600,200 L1000,200"
            stroke="rgba(0, 255, 255, 0.5)"
            strokeWidth="2"
            fill="none"
            filter="url(#neon)"
          />
          <path
            d="M0,400 L200,400 L200,600 L800,600 L800,100 L1000,100"
            stroke="rgba(255, 0, 255, 0.4)"
            strokeWidth="1.5"
            fill="none"
            filter="url(#neon)"
          />
        </g>

        {/* Floating Particles */}
        <g>
          {[...Array(20)].map((_, i) => (
            <circle
              key={i}
              cx={Math.random() * 1000}
              cy={Math.random() * 1000}
              r="1"
              fill="rgba(0, 255, 0, 0.8)"
              className="animate-ping"
              style={{
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};