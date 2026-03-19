"use client";

type Props = {
  open: boolean;
  title: string;
  width?: string;
  onClose: () => void;
  children: React.ReactNode;

  // mode
  form?: boolean;

  // form props
  onSubmit?: () => void;
  submitText?: string;

  className?: string;
};

export default function BaseTeacherModal({
  open,
  title,
  width = "max-w-lg",
  onClose,
  children,
  form = false,
  onSubmit,
  submitText,
  className = "",
}: Props) {
  if (!open) return null;

  const modalStyle = form
    ? "bg-white border-gray-200"
    : "bg-emerald-900/95 border-emerald-700";

  const titleStyle = form ? "text-gray-800" : "text-cyan-200";
  const contentStyle = form ? "bg-white" : "text-emerald-200";

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
          ${modalStyle}
          border rounded-2xl shadow-2xl
          max-h-[80vh] overflow-y-auto
          p-6 m-2
          ${className}
        `}
      >
        {/* header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className={`text-lg font-semibold ${titleStyle}`}>
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-emerald-300 hover:text-white transition text-lg"
          >
            ✕
          </button>
        </div>

        {/* content */}
        <div className={`p-2 border-2 rounded-2xl ${contentStyle}`}>
          {form ? (
            <div className="space-y-4">
              {children}

              <button
                onClick={onSubmit}
                className="w-full py-2 bg-blue-600 text-white rounded"
              >
                {submitText}
              </button>
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
}