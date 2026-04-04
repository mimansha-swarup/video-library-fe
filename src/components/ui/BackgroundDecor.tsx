interface BackgroundDecorProps {
  position?: "absolute" | "fixed";
  linesOpacity?: string;
}

export default function BackgroundDecor({
  position = "absolute",
  linesOpacity,
}: BackgroundDecorProps) {
  return (
    <>
      <div
        className={`${position} inset-0 bg-hero-lines pointer-events-none${linesOpacity ? ` ${linesOpacity}` : ""}`}
      />
      <div className={`${position} inset-0 bg-radial-gold pointer-events-none`} />
    </>
  );
}
