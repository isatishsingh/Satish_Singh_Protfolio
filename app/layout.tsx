import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeetcodeStoreProvider } from "@/components/providers/LeetcodeStoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Satish Singh",
  description:
    "Portfolio of Satish Singh — software engineer focused on backend systems, REST APIs, and modern web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} overflow-x-hidden min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <LeetcodeStoreProvider>
          <CustomCursor />
          <Header />
          <main>{children}</main>
          <Footer />
        </LeetcodeStoreProvider>
      </body>
    </html>
  );
}
