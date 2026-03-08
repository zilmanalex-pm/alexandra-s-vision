interface WaveDividerProps {
  from?: string;
  to?: string;
  flip?: boolean;
}

const WaveDivider = ({ from = "hsl(0,0%,10.2%)", to = "hsl(0,0%,10.2%)", flip = false }: WaveDividerProps) => (
  <div className="relative w-full overflow-hidden leading-[0]" style={{ transform: flip ? "scaleY(-1)" : undefined }}>
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className="w-full h-[60px] md:h-[80px] lg:h-[100px]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`wave-grad-${flip ? "flip" : "norm"}-${from.replace(/[^a-z0-9]/gi, "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <path
        d="M0,40 C240,100 480,0 720,60 C960,120 1200,20 1440,80 L1440,120 L0,120 Z"
        fill={to}
      />
      <path
        d="M0,60 C360,10 600,110 900,50 C1100,10 1300,70 1440,40 L1440,120 L0,120 Z"
        fill={to}
        opacity="0.5"
      />
    </svg>
  </div>
);

export default WaveDivider;
