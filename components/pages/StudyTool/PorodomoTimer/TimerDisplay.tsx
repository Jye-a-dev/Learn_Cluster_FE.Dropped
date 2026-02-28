import { Mode } from "@/hooks/tools/PorodomoTimer/usePomodoro";

type Props = {
  timeLeft: number;
  mode: Mode;
};

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s
    .toString()
    .padStart(2, "0")}`;
}

export default function TimerDisplay({ timeLeft, mode }: Props) {
  const isEnding = timeLeft <= 5;

  const modeStyles = {
    study:
      "text-emerald-300 drop-shadow-[0_0_10px_rgba(7, 245, 166, 0.4)]",
    shortBreak:
      "text-teal-400 drop-shadow-[0_0_10px_rgba(13,148,136,0.4)]",
    longBreak:
      "text-blue-3  00 drop-shadow-[0_0_10px_rgba(37,99,235,0.4)]",
  }[mode];

  const endingStyle =
    "text-red-600 animate-pulse drop-shadow-[0_0_15px_rgba(220,38,38,0.6)]";

  return (
    <div
      className={`
        absolute
        text-4xl
        font-bold
        tracking-widest
        transition-all duration-300
        ${isEnding ? endingStyle : modeStyles}
      `}
    >
      {formatTime(timeLeft)}
    </div>
  );
}