import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "智能实验助手",
  description: "Front End Of Smart Lab ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
