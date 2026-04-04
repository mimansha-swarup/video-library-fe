interface Props {
  size?: number;
}

export default function TickIcon({ size = 7 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 7 7" fill="none">
      <path d="M1 3.5L3 5.5L6 1.5" stroke="#D4A84B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
