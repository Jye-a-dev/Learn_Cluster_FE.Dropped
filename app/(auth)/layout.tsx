"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthSetup from "@/components/layouts/auth/AuthSetup";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <AuthSetup>{children}</AuthSetup>
    </GoogleOAuthProvider>
  );
}