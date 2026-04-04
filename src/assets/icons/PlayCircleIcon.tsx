interface Props {
  size?: number;
  className?: string;
}

export default function PlayCircleIcon({ size = 48, className = "" }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="23" stroke="#D4A84B" strokeWidth="1.2" />
      <path d="M18 16L32 24L18 32V16Z" fill="#D4A84B" />
    </svg>
  );
}
