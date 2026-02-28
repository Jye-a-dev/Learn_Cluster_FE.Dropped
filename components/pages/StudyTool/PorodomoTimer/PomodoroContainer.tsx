"use client";

import { usePomodoro } from "@/hooks/tools/PorodomoTimer/usePomodoro";
import ModeTabs from "./ModeTabs";
import TimerDisplay from "./TimerDisplay";
import ProgressCircle from "./ProgressCircle";
import ControlButtons from "./ControlButtons";
import SessionCounter from "./SessionCounter";
import SettingsPanel from "./SettingsPanel";
import PomodoroBackground from "../Background/PomodoroBackground";

export default function PomodoroContainer() {
  const {
    mode,
    timeLeft,
    isRunning,
    count,
    durations,
    totalTime,
    setMode,
    setIsRunning,
    reset,
    updateDurations,
  } = usePomodoro();

  const progress =
    totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden rounded-2xl">
      
      {/* Background riêng */}
      <PomodoroBackground />

      {/* Main Card */}
      <div className="relative z-10 max-w-md w-full p-6 backdrop-blur-lg bg-emerald-200/40 shadow-2xl rounded-3xl">
        <ModeTabs mode={mode} onChange={setMode} />

        <div className="relative flex items-center justify-center my-6">
          <ProgressCircle progress={progress} />
          <TimerDisplay timeLeft={timeLeft} mode={mode} />
        </div>

        <ControlButtons
          isRunning={isRunning}
          onStart={() => setIsRunning(true)}
          onPause={() => setIsRunning(false)}
          onReset={reset}
        />

        <SessionCounter count={count} />

        <SettingsPanel
          durations={durations}
          onUpdate={updateDurations}
        />
      </div>
    </div>
  );
}