import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "@/providers/SessionProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SportConnect - Find Your Training Partner",
  description: "Connect with runners and cyclists in your area",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
