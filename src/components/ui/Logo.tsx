interface LogoProps {
  size?: number;
  corners?: boolean;
  className?: string;
}

export default function Logo({ size = 28, corners = true, className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
      <circle cx="14" cy="14" r="13" stroke="#D4A84B" strokeWidth="1.2" opacity="0.6"/>
      <circle cx="14" cy="14" r="5"  stroke="#D4A84B" strokeWidth="1.2" opacity="0.9"/>
      <circle cx="14" cy="5"  r="2"  fill="#D4A84B" opacity="0.7"/>
      <circle cx="14" cy="23" r="2"  fill="#D4A84B" opacity="0.7"/>
      <circle cx="5"  cy="14" r="2"  fill="#D4A84B" opacity="0.7"/>
      <circle cx="23" cy="14" r="2"  fill="#D4A84B" opacity="0.7"/>
      {corners && (
        <>
          <circle cx="7.5"  cy="7.5"  r="1.5" fill="#D4A84B" opacity="0.5"/>
          <circle cx="20.5" cy="7.5"  r="1.5" fill="#D4A84B" opacity="0.5"/>
          <circle cx="7.5"  cy="20.5" r="1.5" fill="#D4A84B" opacity="0.5"/>
          <circle cx="20.5" cy="20.5" r="1.5" fill="#D4A84B" opacity="0.5"/>
        </>
      )}
    </svg>
  );
}
