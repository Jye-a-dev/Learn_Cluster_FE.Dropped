// app/layout.tsx (RootLayout)
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import PublicSetup from "@/components/layouts/public/PublicSetup"; // import layout public

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LearnCluster",
  description: "Ứng dụng học tập, chia sẻ kiến thức, study date.",
  icons: {
    icon: "/assets/LCLogo.png",
    shortcut: "/assets/LCLogo.png",
    apple: "/assets/LCLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        {/* Bao layout public */}
        <PublicSetup>
          {children}
        </PublicSetup>
      </body>
    </html>
  );
}
