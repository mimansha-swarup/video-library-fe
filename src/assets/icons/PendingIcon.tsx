interface Props {
  size?: number;
  className?: string;
}

export default function PendingIcon({ size = 48, className = "" }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="23" stroke="#D4A84B" strokeWidth="1" opacity="0.3" />
      <circle cx="24" cy="24" r="14" stroke="#D4A84B" strokeWidth="1" opacity="0.5" />
      <path d="M24 16v9M24 29v2" stroke="#D4A84B" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
