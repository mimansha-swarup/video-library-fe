interface Props {
  size?: number;
}

export default function SignOutIcon({ size = 14 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M5 7h7M9 5l2 2-2 2" stroke="#D4A84B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 2H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4" stroke="#D4A84B" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
