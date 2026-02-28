type Props = {
  progress: number; // 0 - 100
};

export default function ProgressCircle({ progress }: Props) {
  const radius = 90;
  const stroke = 10;

  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;

  // Clamp progress
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  const strokeDashoffset =
    circumference - (safeProgress / 100) * circumference;

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      className="transform -rotate-90"
    >
      {/* Background circle */}
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />

      {/* Progress circle */}
      <circle
        stroke="#6366f1"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        className="transition-[stroke-dashoffset] duration-500 ease-linear"
      />
    </svg>
  );
}