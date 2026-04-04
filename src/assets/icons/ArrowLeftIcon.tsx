interface Props {
  className?: string;
}

export default function ArrowLeftIcon({ className = "" }: Props) {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className={className}>
      <path d="M12 4H2M5 1L2 4L5 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
