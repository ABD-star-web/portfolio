import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Keep in sync with PROFILE in app/page.tsx
const NAME = "Your Name";
const TITLE = `${NAME} — AI Builder & Full-Stack Developer`;
const DESCRIPTION =
  "AI builder and full-stack developer from Faisalabad, Pakistan. I build AI-powered web apps with Next.js, DeepSeek and modern tools.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["AI builder", "full-stack developer", "Next.js developer Pakistan", "vibe coding", "freelance developer Faisalabad"],
  authors: [{ name: NAME }],
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}>
      <body className="bg-neutral-950 text-neutral-100">{children}</body>
    </html>
  );
}
