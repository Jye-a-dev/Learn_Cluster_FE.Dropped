"use client";

import AuthSetup from "@/components/layouts/auth/AuthSetup";
import AuthGoogleProvider from "@/components/layouts/auth/AuthGoogleProvider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGoogleProvider>
      <AuthSetup>{children}</AuthSetup>
    </AuthGoogleProvider>
  );
}
