type Props = {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
};

export default function ControlButtons({
  isRunning,
  onStart,
  onPause,
  onReset,
}: Props) {
  return (
    <div className="flex justify-center gap-4 mt-4">
      {!isRunning ? (
        <button
          onClick={onStart}
          className="px-6 py-2 bg-green-600 text-white rounded-xl"
        >
          Start
        </button>
      ) : (
        <button
          onClick={onPause}
          className="px-6 py-2 bg-yellow-500 text-white rounded-xl"
        >
          Pause
        </button>
      )}

      <button
        onClick={onReset}
        className="px-6 py-2 bg-red-500 text-white rounded-xl"
      >
        Reset
      </button>
    </div>
  );
}