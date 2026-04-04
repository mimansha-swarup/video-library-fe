interface Props {
  size?: number;
  className?: string;
  fill?: string;
}

export default function PlayIcon({ size = 14, className = "", fill = "#D4A84B" }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
      <path d="M3 2L11 7L3 12V2Z" fill={fill} />
    </svg>
  );
}
