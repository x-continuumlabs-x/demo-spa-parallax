import type { Metadata } from "next";
import { mainfont, albertSans } from "./fonts";
import "./globals.css";
import '@heroui/styles';
import { Providers } from "./providers";
import SmoothScroll from "./components/SmoothScroll";

export const metadata: Metadata = {
	title: "Single Page Parallax App",
	description: "Exploration of SPA smooth scroll, pinning and scroll trigger sequence animation",
};

export default function RootLayout({
	children,
	}: Readonly<{
		children: React.ReactNode;
	}>) {
	return (
		<html lang="en">
			<body
			className={`${albertSans.variable} ${mainfont.variable} antialiased`}>
				<Providers>
					<SmoothScroll>
						{children}
					</SmoothScroll>
				</Providers>
			</body>
		</html>
	);
}
