import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import getPath from "@/helpers/path";

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
        <link
          rel="icon"
          type="image/svg+xml"
          href={getPath('/cube.svg')}
        ></link>

        <meta property="og:image" content={getPath('/assets/screenshot.jpg')}></meta>

        <link rel="preload" href={getPath('/assets/warehouse.hdr')} as="image" />
        <link rel="preload" href={getPath('/assets/plank-texture.jpg')} as="image" />
        <link rel="preload" href={getPath('/assets/box-texture.jpg')} as="image" />

      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
