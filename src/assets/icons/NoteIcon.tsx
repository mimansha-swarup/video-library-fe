interface Props {
  size?: number;
  className?: string;
}

export default function NoteIcon({ size = 14, className = "" }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
      <rect x="2" y="1" width="10" height="12" rx="1" stroke="#D4A84B" strokeWidth="1" />
      <path d="M4 4h6M4 7h6M4 10h3" stroke="#D4A84B" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  );
}
