interface Props {
  size?: number;
  className?: string;
}

export default function ErrorCircleIcon({ size = 14, className = "" }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
      <circle cx="7" cy="7" r="6" stroke="#f87171" strokeWidth="1" />
      <path d="M7 4v3M7 9.5v.5" stroke="#f87171" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
