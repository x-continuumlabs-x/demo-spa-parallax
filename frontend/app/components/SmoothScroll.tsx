"use client";

import { useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

interface SmoothScrollProps {
	children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
	const smoothWrapper = useRef<HTMLDivElement>(null);
	const smoothContent = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		// Register plugins inside hook to ensure window exists
		gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

		const smoother = ScrollSmoother.create({
			wrapper: smoothWrapper.current!,
			content: smoothContent.current!,
			smooth: 1.0,
			effects: true,
			smoothTouch: 0.1,
		});

		return () => {
			smoother.kill();
		};
	}, []);

	return (
		<div ref={smoothWrapper} id="smooth-wrapper">
			<div ref={smoothContent} id="smooth-content">
				{children}
			</div>
		</div>
	);
}