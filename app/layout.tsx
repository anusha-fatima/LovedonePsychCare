import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import { AuthProvider } from "../context/AuthContext";
import { ChatProvider } from "../context/ChatContext";
import { Navbar } from "../components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK"],
});

const jameelNoori = localFont({
  src: "./fonts/JameelNooriNastaleeq.ttf",
  variable: "--font-urdu",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LovedOne PsyCare — Mental Health, Rooted in Pakistan",
  description:
    "Talk to an AI guide or a licensed psychologist in a private, culturally-aware space. LovedOne PsyCare is mental health care for Pakistan.",
  icons: {
    icon: "/icon.ico",
    shortcut: "/logo.ico",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jameelNoori.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans bg-canvas text-ink-900 antialiased">
        <LanguageProvider>
          <AuthProvider>
            <ChatProvider>
              <Navbar />
              <main className="min-h-screen">{children}</main>
            </ChatProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
