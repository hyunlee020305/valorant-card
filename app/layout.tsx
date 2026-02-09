import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "@/components/ui/toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VALOCARD - AI Valorant Profile Cards",
  description: "Enter your Riot ID and let AI generate your unique Valorant profile card.",
  openGraph: {
    title: "VALOCARD - AI Valorant Profile Cards",
    description: "Create your own AI-powered Valorant profile card!",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VALOCARD - AI Valorant Profile Cards",
    description: "Create your own AI-powered Valorant profile card!",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#0a0a0a]`}
      >
        <SessionProvider>
          {children}
          <ToastContainer />
        </SessionProvider>
      </body>
    </html>
  );
}
