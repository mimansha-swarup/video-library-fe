interface Props {
  size?: number;
}

export default function ModuleDocIcon({ size = 10 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <rect x="1" y="1" width="8" height="8" rx="1" stroke="#D4A84B" strokeWidth="1" />
      <path d="M3 4H7M3 6H5" stroke="#D4A84B" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}
