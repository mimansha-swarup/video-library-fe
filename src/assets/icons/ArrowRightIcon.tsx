interface Props {
  className?: string;
}

export default function ArrowRightIcon({ className = "" }: Props) {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className={className}>
      <path d="M0 4H10M7 1L10 4L7 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
