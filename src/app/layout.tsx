import type { Metadata } from "next";
import { QueryProviders } from "@/providers/query.provider";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Global Search UI Demo",
  description:
    "A demonstration of a global search interface with filter and infinite scrolling functionality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryProviders>
        <TooltipProvider>
          <body className={`${inter.className} antialiased`}>{children}</body>
        </TooltipProvider>
      </QueryProviders>
    </html>
  );
}
