import "./globals.css";
import Head from "next/head";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, intial-scale=1.0"/>
        <title>Notoria</title>
      </Head>
      <body>
        {children}
      </body>
    </html> 
  );
}
