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
		const smoother = ScrollSmoother.create({
			wrapper: smoothWrapper.current!,
			content: smoothContent.current!,
			smooth: 1.0,
			effects: true,
			smoothTouch: false,
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