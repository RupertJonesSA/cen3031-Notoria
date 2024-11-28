import "./globals.css";
import { Toaster } from "sonner";
import { Metadata } from "next";
import { ThemeProvider } from "../components/theme-provider";
import { ModelProvider } from "@/components/provider/model-provider";

export const metadata: Metadata = {
  title: "Notoria",
  description: "testing this out lol",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/icon-light.ico",
        href: "/icon-light.ico",
        sizes: "16x16",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/icon-dark.ico",
        href: "/icon-dark.ico",
        sizes: "16x16",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="notoria-theme"
        >
          <Toaster position="bottom-center" />
          <ModelProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
