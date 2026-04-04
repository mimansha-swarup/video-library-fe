export default function ReelWatermarkIcon() {
  return (
    <svg width="480" height="480" viewBox="0 0 480 480" fill="none">
      <circle cx="240" cy="240" r="238" stroke="#D4A84B" strokeWidth="2" />
      <circle cx="240" cy="240" r="160" stroke="#D4A84B" strokeWidth="2" />
      <circle cx="240" cy="240" r="80"  stroke="#D4A84B" strokeWidth="2" />
      <circle cx="240" cy="240" r="30"  stroke="#D4A84B" strokeWidth="2" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <circle
          key={deg}
          cx={240 + 160 * Math.cos((deg * Math.PI) / 180)}
          cy={240 + 160 * Math.sin((deg * Math.PI) / 180)}
          r="18"
          fill="#D4A84B"
        />
      ))}
    </svg>
  );
}
