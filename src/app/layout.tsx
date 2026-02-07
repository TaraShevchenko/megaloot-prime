import "./globals.css";

import { Cinzel, Source_Serif_4 } from "next/font/google";
import type { ReactNode } from "react";

import { Providers } from "./providers";

const display = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700"],
});

const body = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "600"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} dark`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
