interface Props {
  size?: number;
  className?: string;
}

export default function ChevronDownIcon({ size = 12, className = "" }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" className={className}>
      <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
