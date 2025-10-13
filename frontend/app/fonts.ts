import localFont from "next/font/local";
import { Albert_Sans } from "next/font/google";

export const nominee = localFont({
  src: [
    {
      path: "../public/fonts/Nominee-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Nominee-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-nominee",
  weight: "500",
});

export const albertSans = Albert_Sans({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-albert-sans",
});
