import type { CSSProperties } from "react";

interface Props {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export default function SpinnerIcon({ size = 36, className = "", style }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      className={`animate-spin ${className}`}
      style={style}
    >
      <circle cx="18" cy="18" r="16" stroke="#D4A84B" strokeWidth="1" opacity="0.2" />
      <circle cx="18" cy="18" r="16" stroke="#D4A84B" strokeWidth="1" strokeDasharray="40 60" strokeLinecap="round" />
      <circle cx="18" cy="18" r="6"  stroke="#D4A84B" strokeWidth="1" opacity="0.5" />
      <circle cx="18" cy="4"  r="2.5" fill="#D4A84B" opacity="0.6" />
      <circle cx="18" cy="32" r="2.5" fill="#D4A84B" opacity="0.6" />
      <circle cx="4"  cy="18" r="2.5" fill="#D4A84B" opacity="0.6" />
      <circle cx="32" cy="18" r="2.5" fill="#D4A84B" opacity="0.6" />
    </svg>
  );
}
