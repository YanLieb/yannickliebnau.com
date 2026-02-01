import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yannick Liebnau",
  description: "Yannick Liebnau Web Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased dark:bg-gray-250`}
      >
        {children}
      </body>
    </html>
  );
}
