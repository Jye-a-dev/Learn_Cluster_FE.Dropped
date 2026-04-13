import LoginForm from "@/components/pages/LoginPage/LoginForm";
import DirectLoginForm from "@/components/pages/LoginPage/DirectLoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 ">
      <div className="w-full max-w-md bg-white/30 rounded-2xl shadow-lg p-8 space-y-6">

        {/* Form login bình thường */}
        <LoginForm />

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400">Hoặc</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Board login Google */}
        <div className="flex justify-center">
          <DirectLoginForm />
        </div>

      </div>
    </div>
  );
}
