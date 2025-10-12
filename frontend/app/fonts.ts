import localFont from "next/font/local";

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
