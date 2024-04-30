import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Warehouse Simulator",
  description: "Tools for logistics students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/cube.svg"></link>
        <meta property="og:image" content="/assets/screenshot.jpg"></meta>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
