"use client";

import { useRef, ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother, gsap } from "@/app/lib/gsap";
import { isTouchLowPowerDevice } from "@/app/utils/deviceCapability";

interface SmoothScrollProps {
	children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
	const smoothWrapper = useRef<HTMLDivElement>(null);
	const smoothContent = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		if (isTouchLowPowerDevice()) {
			// const sections = Array.from(
			// 	document.querySelectorAll<HTMLElement>("[data-parallax-section]")
			// );

			// const items = sections.map(section => {
			// 	const rect = section.getBoundingClientRect();
			// 	const top = rect.top + window.scrollY;
			// 	const height = rect.height;

			// 	const elements = Array.from(section.querySelectorAll<HTMLElement>("[data-parallax]")).map(el => {
			// 		const speed = parseFloat(el.dataset.speedMobile || el.dataset.speed || "1");
			// 		return { el, speed };
			// 	});

			// 	return { top, height, elements };
			// });

			// let ticking = false;

			// const update = () => {
			// 	const scrollY = window.scrollY;
			// 	const vh = window.innerHeight;

			// 	for (let i = 0; i < items.length; i++) {
			// 		const section = items[i];
			// 		const progress =
			// 			(scrollY + vh - section.top) / (section.height + vh);

			// 		if (progress <= 0 || progress >= 1) continue;

			// 		for (let j = 0; j < section.elements.length; j++) {
			// 			const { el, speed } = section.elements[j];
			// 			el.style.transform = `translate3d(0, ${progress * (1 - speed) * 100}px, 0)`;
			// 		}
			// 	}
			// 	ticking = false;
			// };

			// const onScroll = () => {
			// 	if (!ticking) {
			// 		ticking = true;
			// 		requestAnimationFrame(update);
			// 	}
			// };
			// window.addEventListener("scroll", onScroll, { passive: true });

		} else {
			// Desktop: Use ScrollSmoother
			const smoother = ScrollSmoother.create({
				wrapper: smoothWrapper.current!,
				content: smoothContent.current!,
				smooth: 1.0,
				effects: true,
			});

			return () => {
				smoother.kill();
			};
		}
	}, []);

	return (
		<div ref={smoothWrapper} id="smooth-wrapper">
			<div ref={smoothContent} id="smooth-content">
				{children}
			</div>
		</div>
	);
}