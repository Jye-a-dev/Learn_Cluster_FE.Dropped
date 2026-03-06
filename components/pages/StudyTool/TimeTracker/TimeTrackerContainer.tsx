"use client";

import { useTimeTracker } from "@/hooks/tools/TimeTracker/useTimeTracker";
import TimerDisplay from "./TimerDisplay";
import ControlButtons from "./ControlButtons";
import PomodoroBackground from "../Background/PomodoroBackground";

export default function TimeTrackerContainer() {
  const { time, isRunning, setIsRunning, reset } = useTimeTracker();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden rounded-2xl">

      <PomodoroBackground />

      <div className="relative z-10 max-w-md w-full p-6 backdrop-blur-lg bg-emerald-200/40 shadow-2xl rounded-3xl text-center">

        <h2 className="text-2xl font-bold mb-6">
          Study Time Tracker
        </h2>

        <TimerDisplay time={time} />

        <ControlButtons
          isRunning={isRunning}
          onStart={() => setIsRunning(true)}
          onStop={() => setIsRunning(false)}
          onReset={reset}
        />
      </div>
    </div>
  );
}