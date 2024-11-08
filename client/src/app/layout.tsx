import "./globals.css";
import { Metadata } from "next";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
