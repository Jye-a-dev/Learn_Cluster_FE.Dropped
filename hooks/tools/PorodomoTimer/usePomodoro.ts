import { useEffect, useState, useCallback } from "react";

export type Mode = "study" | "shortBreak" | "longBreak";

type Durations = {
	study: number;
	shortBreak: number;
	longBreak: number;
};

const STORAGE_KEY = "pomodoro_state_v1";

function getInitialState() {
	if (typeof window === "undefined") {
		return null;
	}

	const saved = localStorage.getItem(STORAGE_KEY);
	if (!saved) return null;

	const data = JSON.parse(saved);

	if (data.isRunning) {
		const elapsed = Math.floor((Date.now() - data.lastUpdated) / 1000);
		data.timeLeft = Math.max(data.timeLeft - elapsed, 0);
		data.isRunning = data.timeLeft > 0;
	}

	return data;
}

export function usePomodoro() {
	const initial = getInitialState();

	const [mode, setMode] = useState<Mode>(initial?.mode ?? "study");

	const [durations, setDurations] = useState<Durations>(
		initial?.durations ?? {
			study: 1500,
			shortBreak: 300,
			longBreak: 900,
		},
	);

	const [timeLeft, setTimeLeft] = useState<number>(initial?.timeLeft ?? 1500);

	const [isRunning, setIsRunning] = useState<boolean>(initial?.isRunning ?? false);

	const [count, setCount] = useState<number>(initial?.count ?? 0);

	const totalTime = durations[mode];

	/* ===========================
     SAVE TO LOCAL STORAGE
  ============================*/
	useEffect(() => {
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({
				mode,
				durations,
				timeLeft,
				count,
				isRunning,
				lastUpdated: Date.now(),
			}),
		);
	}, [mode, durations, timeLeft, count, isRunning]);

	/* ===========================
     TIMER LOGIC
  ============================*/
	const handleComplete = useCallback(() => {
		if (mode === "study") {
			const newCount = count + 1;
			setCount(newCount);

			if (newCount % 4 === 0) {
				setMode("longBreak");
				setTimeLeft(durations.longBreak);
			} else {
				setMode("shortBreak");
				setTimeLeft(durations.shortBreak);
			}
		} else {
			setMode("study");
			setTimeLeft(durations.study);
		}
	}, [mode, count, durations]);

	useEffect(() => {
		if (!isRunning) return;

		const interval = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					handleComplete();
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [isRunning, handleComplete]);

	const reset = () => {
		setIsRunning(false);
		setTimeLeft(durations[mode]);
		setCount(0);
	};
	const changeMode = (newMode: Mode) => {
		setMode(newMode);
		setTimeLeft(durations[newMode]);
		setIsRunning(false); 
	};
	const updateDurations = (d: Durations) => {
		setDurations(d);
		setTimeLeft(d[mode]);
	};

	return {
		mode,
		timeLeft,
		isRunning,
		count,
		durations,
		totalTime,
		setMode: changeMode, 
		setIsRunning,
		reset,
		updateDurations,
	};
}
