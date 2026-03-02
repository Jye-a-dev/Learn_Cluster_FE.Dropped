type Durations = {
  study: number;
  shortBreak: number;
  longBreak: number;
};

type Props = {
  durations: Durations;
  onUpdate: (d: Durations) => void;
};

const SETTINGS = [
  { key: "study", label: "Thời gian học", color: "text-emerald-600" },
  { key: "shortBreak", label: "Nghỉ ngắn", color: "text-teal-600" },
  { key: "longBreak", label: "Nghỉ dài", color: "text-blue-600" },
] as const;

/* ================= Helpers ================= */

function secondsToMMSS(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");

  const s = (seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${m}:${s}`;
}

function isValidMMSS(value: string): boolean {
  return /^(\d{1,2}):([0-5]\d)$/.test(value);
}

function mmssToSeconds(value: string): number {
  const [m, s] = value.split(":").map(Number);
  return m * 60 + s;
}

/* ================= Component ================= */

import { useState } from "react";

export default function SettingsPanel({
  durations,
  onUpdate,
}: Props) {
  const [localValues, setLocalValues] = useState<
    Partial<Record<keyof Durations, string>>
  >({});

  return (
    <div className="mt-8 p-4 bg-gray-50/50 rounded-2xl border border-gray-200">
      <h3 className="text-sm text-center font-semibold text-gray-700 mb-4">
        Cài đặt thời gian
      </h3>

      <div className="space-y-4">
        {SETTINGS.map((item) => {
          const displayValue =
            localValues[item.key] ??
            secondsToMMSS(durations[item.key]);

          return (
            <div
              key={item.key}
              className="flex items-center justify-between"
            >
              <label
                className={`text-sm font-medium ${item.color}`}
              >
                {item.label}
              </label>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={displayValue}
                  placeholder="mm:ss"
                  onChange={(e) => {
                    const value = e.target.value;

                    setLocalValues((prev) => ({
                      ...prev,
                      [item.key]: value,
                    }));

                    if (isValidMMSS(value)) {
                      onUpdate({
                        ...durations,
                        [item.key]: mmssToSeconds(value),
                      });
                    }
                  }}
                  onBlur={() => {
                    // Khi rời input -> clear local override
                    setLocalValues((prev) => {
                      const updated = { ...prev };
                      delete updated[item.key];
                      return updated;
                    });
                  }}
                  className="
                    w-24 px-3 py-1.5
                    text-center text-sm
                    border border-gray-300
                    rounded-xl
                    focus:outline-none
                    focus:ring-2 focus:ring-emerald-400
                    transition
                  "
                />

                <span className="text-xs text-gray-500">
                  mm:ss
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}