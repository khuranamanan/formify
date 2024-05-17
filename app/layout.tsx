import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { ModeToggle } from "@/components/mode-toggle";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Formify",
  description:
    "Formify is a form builder that helps you create beautiful forms and surveys.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/images/formify-favicon-black.png",
        href: "/images/formify-favicon-black.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/images/formify-favicon-white.png",
        href: "/images/formify-favicon-white.png",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster />
            {children}

            <div className="absolute top-4 right-4">
              <ModeToggle />
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
