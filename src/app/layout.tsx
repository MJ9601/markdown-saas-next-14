import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/general/theme.provider";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/general/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "markdown blog sass clone",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="max-w-7x1 mx-auto p-10 space-y-10">
            <Navbar />
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
