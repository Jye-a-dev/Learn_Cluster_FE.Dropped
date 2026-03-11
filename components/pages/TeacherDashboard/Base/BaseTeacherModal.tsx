"use client";

type Props = {
  open: boolean;
  title: string;
  width?: string;
  onClose: () => void;
  children: React.ReactNode;
};

export default function BaseTeacherModal({
  open,
  title,
  width = "max-w-lg",
  onClose,
  children,
}: Props) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal */}
      <div
        className={`
          relative w-full ${width}
          bg-emerald-900/95
          border border-emerald-700
          rounded-2xl
          shadow-2xl
          max-h-[80vh]
          overflow-y-auto
          p-6
        `}
      >

        {/* header */}
        <div className="flex justify-between items-center mb-5">

          <h2 className="text-lg font-semibold text-cyan-200">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              text-emerald-300
              hover:text-white
              transition
              text-lg
            "
          >
            ✕
          </button>

        </div>

        {/* content */}
        <div className="text-emerald-800">
          {children}
        </div>

      </div>

    </div>
  );
}