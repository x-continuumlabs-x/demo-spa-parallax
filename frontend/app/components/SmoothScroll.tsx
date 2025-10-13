"use client";

import { useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface SmoothScrollProps {
	children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
	const smoothWrapper = useRef<HTMLDivElement>(null);
	const smoothContent = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		// Create ScrollSmoother instance
		const smoother = ScrollSmoother.create({
			wrapper: smoothWrapper.current!,
			content: smoothContent.current!,
			smooth: 1.0, // seconds it takes to "catch up" to native scroll position
			effects: true, // look for data-speed and data-lag attributes on elements
			smoothTouch: 0.1, // smooth scrolling on touch devices
		});

		return () => {
			smoother.kill();
		};
	});

	return (
		<div ref={smoothWrapper} id="smooth-wrapper">
			<div ref={smoothContent} id="smooth-content">
				{children}
			</div>
		</div>
	);
}
