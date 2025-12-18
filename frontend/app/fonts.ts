import localFont from "next/font/local";
import { Albert_Sans } from "next/font/google";

export const mainfont = localFont({
  src: [
    {
      path: "../public/fonts/Mainfont-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Mainfont-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-mainfont",
  weight: "500",
});

export const albertSans = Albert_Sans({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-albert-sans",
});
