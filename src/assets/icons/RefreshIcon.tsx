interface Props {
  size?: number;
  className?: string;
}

export default function RefreshIcon({ size = 14, className = "" }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
      <path d="M12.5 7A5.5 5.5 0 1 1 9.4 2.1" stroke="#D4A84B" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M9 1v3.5H12.5" stroke="#D4A84B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
