"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "study_tracker";

type TrackerState = {
  time: number;
  isRunning: boolean;
  lastTimestamp: number | null;
};

function loadInitialState(): TrackerState {
  if (typeof window === "undefined") {
    return { time: 0, isRunning: false, lastTimestamp: null };
  }

  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return { time: 0, isRunning: false, lastTimestamp: null };
  }

  try {
    const data = JSON.parse(saved);

    let time = data.time || 0;
    const isRunning = data.isRunning || false;
    const lastTimestamp = data.lastTimestamp || null;

    if (isRunning && lastTimestamp) {
      const diff = Math.floor((Date.now() - lastTimestamp) / 1000);
      time += diff;
    }

    return { time, isRunning, lastTimestamp };
  } catch {
    return { time: 0, isRunning: false, lastTimestamp: null };
  }
}

export function useTimeTracker() {
  const initial = loadInitialState();

  const [time, setTime] = useState(initial.time);
  const [isRunning, setIsRunning] = useState(initial.isRunning);

  const lastRef = useRef<number | null>(initial.lastTimestamp);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /* Timer */
  useEffect(() => {
    if (isRunning) {
      lastRef.current = Date.now();

      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  /* Save state */
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        time,
        isRunning,
        lastTimestamp: lastRef.current,
      })
    );
  }, [time, isRunning]);

  const reset = () => {
    setTime(0);
    setIsRunning(false);
    lastRef.current = null;
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    time,
    isRunning,
    setIsRunning,
    reset,
  };
}