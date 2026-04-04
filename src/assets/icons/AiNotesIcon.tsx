interface Props {
  size?: number;
  className?: string;
}

export default function AiNotesIcon({ size = 14, className = "" }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
      <path
        d="M7 1.5C4 1.5 2 3.5 2 6c0 1.5.8 2.8 2 3.6V12l2-1.2c.3.1.6.2 1 .2 3 0 5-2 5-4.5S10 1.5 7 1.5Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path d="M5 6h4M5 8h2.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  );
}
