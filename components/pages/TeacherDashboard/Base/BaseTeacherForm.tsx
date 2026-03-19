"use client";

type Props = {
  title: string;
  children: React.ReactNode;
  onSubmit: () => void;
  submitText: string;
  rightContent?: React.ReactNode;
  description?: string;
};

export default function BaseTeacherForm({
  title,
  children,
  onSubmit,
  submitText,
  rightContent,
  description,
}: Props) {
  return (
    <div className="bg-white/10 border border-gray-200 rounded-2xl p-6 shadow-md space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-start border-b pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {title}
          </h2>

          {description && (
            <p className="text-sm text-gray-900 mt-1">
              {description}
            </p>
          )}
        </div>

        {rightContent && (
          <div className="text-sm text-gray-900">
            {rightContent}
          </div>
        )}
      </div>

      {/* Fields */}
      <div className="space-y-5">{children}</div>

      {/* Actions */}
      <div className="pt-4 border-t flex justify-end">
        <button
          onClick={onSubmit}
          className="
            px-5 py-2.5 
            bg-blue-600 hover:bg-blue-700 
            cursor-pointer
            text-white font-semibold 
            rounded-lg 
            transition 
            shadow-sm
          "
        >
          {submitText}
        </button>
      </div>
    </div>
  );
}