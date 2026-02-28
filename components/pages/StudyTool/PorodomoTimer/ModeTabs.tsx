import { Mode } from "@/hooks/tools/PorodomoTimer/usePomodoro";

type Props = {
  mode: Mode;
  onChange: (mode: Mode) => void;
};

const MODE_OPTIONS: { value: Mode; label: string }[] = [
  { value: "study", label: "Học" },
  { value: "shortBreak", label: "Nghỉ nhanh" },
  { value: "longBreak", label: "Nghỉ lâu" },
];

export default function ModeTabs({ mode, onChange }: Props) {
  return (
    <div className="flex gap-2 bg-gray-100 p-2 rounded-full">
      {MODE_OPTIONS.map((tab) => {
        const active = mode === tab.value;

        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`
              flex-1 py-2 rounded-full text-sm font-semibold
              transition-all duration-300 cursor-pointer
              ${
                active
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-200"
              }
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}