"use client";

import { useRef, ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother, gsap } from "@/app/lib/gsap";

interface SmoothScrollProps {
	children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
	const smoothWrapper = useRef<HTMLDivElement>(null);
	const smoothContent = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		// Detect if mobile device
		const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

		if (isMobile) {
			// Mobile: Create manual parallax for data-speed elements
			const PARALLAX_INTENSITY = 0.5; // Adjust this value (0.1 = subtle, 1.0 = full viewport)
			const dataSpeedElements = document.querySelectorAll<HTMLElement>('[data-speed]');

			// Calculate total scrollable distance
			const pageHeight = document.body.scrollHeight;
			const viewportHeight = window.innerHeight;
			const scrollDistance = pageHeight - viewportHeight;

			dataSpeedElements.forEach((element) => {
				const speed = parseFloat(element.getAttribute('data-speed') || '1');

				// Calculate total movement over entire page scroll
				// Negative because we want to move up as we scroll down
				// speed < 1 = moves slower than scroll (background effect)
				// speed > 1 = moves faster than scroll (foreground effect)
				const movement = -(scrollDistance * (1 - speed) * PARALLAX_INTENSITY);

				gsap.to(element, {
					y: movement,
					ease: "none",
					scrollTrigger: {
						trigger: document.body,     // Use entire page as trigger
						start: "top top",            // Start of page
						end: "bottom bottom",        // End of page
						scrub: true,                 // Smooth scrubbing
						invalidateOnRefresh: true
					}
				});
			});
		} else {
			// Desktop: Use ScrollSmoother
			const smoother = ScrollSmoother.create({
				wrapper: smoothWrapper.current!,
				content: smoothContent.current!,
				smooth: 1.0,
				effects: true, // This handles data-speed on desktop
			});

			return () => {
				smoother.kill();
			};
		}
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