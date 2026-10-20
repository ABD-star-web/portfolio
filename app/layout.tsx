import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PROFILE } from "@/lib/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const NAME = PROFILE.name;
const TITLE = `${NAME} | ${PROFILE.title}`;
const DESCRIPTION = `${PROFILE.title} from ${PROFILE.location}. I build AI-powered web apps through vibe coding with Next.js, DeepSeek and modern AI tools.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [NAME, "AI enthusiast", "vibe coding", "AI apps Pakistan", "college student Faisalabad"],
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
