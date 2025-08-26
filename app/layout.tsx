import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ex-trading.pro | Verify",
  description: "",
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
          type="image/png"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAS1BMVEVHcEz/3gL/3gL/3gL/3gL/3gL/3gL/3gL/3gL/3gL/3gIAAAD/4gL/6QLszgKtlwHavgIQDgDTuAEkHwCLeQHMsgFGPQBbTwFjVgHMmdHzAAAACnRSTlMAwxUW8TOH5j1gAEuywgAAANJJREFUKJGNk+sagyAIhrWTBWJ2sHb/VzrI1ZY1t+8XTy/iB5JSu+pGGwCjm1ql6io4VHUnVBg4yRRv1sJFbYYdtLhjALGyuYdm8xlje6HieeuBwDuykmKP1Ip7l9CtyOrJegzynXp0ALVqOHaIyzwjzjQijlaYwEZpzpvkEMGCgTyi3xgX0OzVBj4iAlzJ8tkXY798Y49TFCKB0MFFWxEOL6Xwo6xUPpeNhoIYeiw+MZRtJTuE7Pj2wV/V/XoyVeYeO7sm+QXjyulqlv8u9Zff4Qmi5xuAS66ToQAAAABJRU5ErkJggg=="
        />
      </head>
      <body className={`${inter.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
