interface Props {
  size?: number;
}

export default function CheckCircleIcon({ size = 14 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" stroke="#D4A84B" strokeWidth="1" />
      <path d="M4.5 7L6.5 9L9.5 5" stroke="#D4A84B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
