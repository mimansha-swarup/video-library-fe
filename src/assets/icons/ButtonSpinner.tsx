interface Props {
  size?: number;
  className?: string;
}

export default function ButtonSpinner({ size = 18, className = "" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      className={`animate-spin ${className}`}
    >
      <circle cx="9" cy="9" r="7.5" stroke="#D4A84B" strokeWidth="1.2" opacity="0.2" />
      <circle cx="9" cy="9" r="7.5" stroke="#D4A84B" strokeWidth="1.2" strokeDasharray="18 30" strokeLinecap="round" />
    </svg>
  );
}
