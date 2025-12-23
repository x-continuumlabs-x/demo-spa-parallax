"use client";

import { useRef, ReactNode, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "@/app/lib/gsap";

interface SmoothScrollProps {
	children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
	const smoothWrapper = useRef<HTMLDivElement>(null);
	const smoothContent = useRef<HTMLDivElement>(null);
	const [isMobile, setIsMobile] = useState(false);

	// Detect mobile on mount
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
		};
		checkMobile();
	}, []);

	useGSAP(() => {
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
	}, [isMobile]);

	// On mobile, just render children without ScrollSmoother wrapper
	if (isMobile) {
		return <>{children}</>;
	}

	// On desktop, use ScrollSmoother wrapper
	return (
		<div ref={smoothWrapper} id="smooth-wrapper">
			<div ref={smoothContent} id="smooth-content">
				{children}
			</div>
		</div>
	);
}