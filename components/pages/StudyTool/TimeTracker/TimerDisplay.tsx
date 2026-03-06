export default function TimerDisplay({ time }: { time: number }) {
  const format = (t: number) => {
    const h = Math.floor(t / 3600);
    const m = Math.floor((t % 3600) / 60);
    const s = t % 60;

    return [h, m, s]
      .map((v) => v.toString().padStart(2, "0"))
      .join(":");
  };

  return (
    <div className="text-5xl font-bold text-center tracking-widest">
      {format(time)}
    </div>
  );
}