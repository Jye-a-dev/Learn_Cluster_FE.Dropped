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

export default function SettingsPanel({
  durations,
  onUpdate,
}: Props) {
  return (
    <div className="mt-8 p-4 bg-gray-50/50 rounded-2xl border border-gray-200">
      <h3 className="text-sm text-center font-semibold text-gray-700 mb-4">
        Cài đặt thời gian
      </h3>

      <div className="space-y-4">
        {SETTINGS.map((item) => {
          const valueInMinutes = durations[item.key] / 60;

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
                  type="number"
                  min={1}
                  value={valueInMinutes}
                  onChange={(e) =>
                    onUpdate({
                      ...durations,
                      [item.key]:
                        Number(e.target.value) * 60,
                    })
                  }
                  className="
                    w-20 px-3 py-1.5
                    text-center text-sm
                    border border-gray-800
                    rounded-xl
                    focus:outline-none
                    focus:ring-2 focus:ring-emerald-400
                    transition
                  "
                />
                <span className="text-xs text-gray-500">
                  phút
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}