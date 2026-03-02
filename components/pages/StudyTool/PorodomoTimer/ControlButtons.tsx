type Props = {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
};

type ButtonConfig = {
  label: string;
  onClick: () => void;
  className: string;
};

export default function ControlButtons({
  isRunning,
  onStart,
  onPause,
  onReset,
}: Props) {
  const buttons = [
    !isRunning && {
      label: "Start",
      onClick: onStart,
      className: "bg-green-600",
    },
    isRunning && {
      label: "Pause",
      onClick: onPause,
      className: "bg-yellow-500",
    },
    {
      label: "Reset",
      onClick: onReset,
      className: "bg-red-500",
    },
  ].filter((btn): btn is ButtonConfig => Boolean(btn));

  return (
    <div className="flex justify-center gap-4 mt-4">
      {buttons.map((btn, index) => (
        <button
          key={index}
          onClick={btn.onClick}
          className={`px-6 py-2 text-white rounded-xl border-white/80 border-2 cursor-pointer ${btn.className}`}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}