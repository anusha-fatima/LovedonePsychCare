import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { FloatingNav } from "../components/FloatingNav";
import Footer from "../components/Footer";
import CursorGlow from "../components/CursorGlow";
import { LanguageProvider } from "../context/LanguageContext";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jameelNoori = localFont({
  src: "./fonts/JameelNooriNastaleeq.ttf",
  variable: "--font-urdu",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LovePsychCare - Mental Health Care, Rooted in Pakistan",
  description:
    "Your mind matters. We're here to help with culturally-aware mental health support across Pakistan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jameelNoori.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans bg-ivory-white text-muted-taupe">
          <LanguageProvider>
          <CursorGlow />
          <ThemeProvider>
          <FloatingNav />
          <main className="min-h-screen">{children}</main>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}