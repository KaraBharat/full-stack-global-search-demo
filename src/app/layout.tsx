import type { Metadata } from "next";
import { QueryProviders } from "@/providers/query.provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import AboutInfo from "@/components/about-info/about-info";

import { Inter } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";

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
          <body className={`${inter.className} antialiased`}>
            {children}
            <div
              className={cn(
                "mx-auto my-2 w-fit md:absolute md:bottom-2 md:right-4",
              )}
            >
              <AboutInfo />
            </div>
          </body>
        </TooltipProvider>
      </QueryProviders>
    </html>
  );
}
