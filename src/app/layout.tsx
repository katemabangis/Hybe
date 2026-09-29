import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "HYPERPOP — Botanical Craft Sodas with 3g Sugar & Real Zing",
  description: "Next-generation botanical sodas brewed with rare citrus, wild herbs, and prebiotic fiber. Zero guilt, electrifying flavor.",
  keywords: ["craft soda", "botanical beverage", "yuzu soda", "prebiotic soda", "hyperpop soda"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakartaSans.variable} ${spaceGrotesk.variable} scroll-smooth antialiased selection:bg-[#E9FE00] selection:text-[#0A0D08]`}
    >
      <body className="min-h-full bg-[#070906] text-[#E8ECE6] font-[family-name:var(--font-jakarta)] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
