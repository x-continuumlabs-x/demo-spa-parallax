"use client";

import { useRef, ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "@/app/lib/gsap";

interface SmoothScrollProps {
	children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
	const smoothWrapper = useRef<HTMLDivElement>(null);
	const smoothContent = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		// Detect if mobile device
		const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

		// Only create ScrollSmoother on desktop
		if (isMobile) return;

		const smoother = ScrollSmoother.create({
			wrapper: smoothWrapper.current!,
			content: smoothContent.current!,
			smooth: 1.0,
			effects: true,
		});

		return () => {
			smoother.kill();
		};
	}, []);

	// Always render wrapper divs for consistent DOM structure
	return (
		<div ref={smoothWrapper} id="smooth-wrapper">
			<div ref={smoothContent} id="smooth-content">
				{children}
			</div>
		</div>
	);
}