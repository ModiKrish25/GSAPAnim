import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Allura } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const allura = Allura({
  variable: "--font-allura",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Keshar Events & Decor — Venue Management & Event Spaces",
  description: "A modern, sustainable venue management solution built for efficiency—enhancing experiences, optimizing operations, and supporting greener, smarter events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${allura.variable} h-full`}
    >
      <body className="min-h-full bg-[#FDFBF7] text-[#1A1A1A] flex flex-col overflow-x-hidden antialiased">
        <main className="flex-grow relative z-10">{children}</main>
      </body>
    </html>
  );
}
