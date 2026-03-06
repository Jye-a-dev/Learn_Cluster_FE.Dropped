type Props = {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
};

export default function ControlButtons({
  isRunning,
  onStart,
  onStop,
  onReset,
}: Props) {
  return (
    <div className="flex justify-center gap-4 mt-6">
      {!isRunning ? (
        <button
          onClick={onStart}
          className="px-6 py-2 rounded-xl bg-emerald-500 text-white font-semibold"
        >
          Start
        </button>
      ) : (
        <button
          onClick={onStop}
          className="px-6 py-2 rounded-xl bg-yellow-500 text-white font-semibold"
        >
          Stop
        </button>
      )}

      <button
        onClick={onReset}
        className="px-6 py-2 rounded-xl bg-red-500 text-white font-semibold"
      >
        Reset
      </button>
    </div>
  );
}