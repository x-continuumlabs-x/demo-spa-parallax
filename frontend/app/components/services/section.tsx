"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default function Services(){
	const sectionRef = useRef<HTMLElement>(null);
	const imgWrapperRef = useRef<HTMLDivElement>(null);
	const imgContainerRef = useRef<HTMLDivElement>(null);
	const img2Ref = useRef<HTMLDivElement>(null);
	const img3Ref = useRef<HTMLDivElement>(null);

	const imgWidthLandscape = 2665;
	const imgHeightLandscape = 1468;
	const imgWidthPortrait = 2235;
	const imgHeightPortrait = 1468;
	const heightRatioLandscape = imgHeightLandscape / imgWidthLandscape;
	const heightRatioPortrait = imgHeightPortrait / imgWidthPortrait;

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

		// Wait until ScrollSmoother exists
		const checkSmoother = () => {
			const smoother = ScrollSmoother.get();
			if (!smoother) {
				requestAnimationFrame(checkSmoother);
				return;
			}

			// Calculate animation durations
			const wrapperHeight = imgWrapperRef.current?.offsetHeight || 2000;
			const animationDuration = wrapperHeight / 2; // Each image animates over half the wrapper height
			const totalDuration = animationDuration * 2; // Total pin duration for both animations

			// Animate img2 scrolling up to reveal
			gsap.fromTo(img2Ref.current,
				{ y: "100%" },
				{
					y: "0%",
					ease: "none",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top top",
						end: () => `+=${animationDuration}`,
						scrub: 1,
					}
				}
			);

			// Animate img3 scrolling up to reveal
			gsap.fromTo(img3Ref.current,
				{ y: "100%" },
				{
					y: "0%",
					ease: "none",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: () => `top+=${animationDuration} top`,
						end: () => `+=${animationDuration}`,
						scrub: 1,
					}
				}
			);

			// Pin the Services section until img3 finishes
			ScrollTrigger.create({
				trigger: sectionRef.current,
				start: "top top",
				end: () => `+=${totalDuration}`,
				pin: true,
				pinSpacing: true,
			});

			ScrollTrigger.refresh();
		};

		checkSmoother();
	}, []);

	return(
		<section ref={sectionRef} className="top-[-20.5vw] relative w-full overflow-hidden flex justify-end py-[50px]">
			<div
				ref={imgWrapperRef}
				id="img-wrapper"
				className="relative w-[70vw] h-[var(--height-landscape)] portrait:h-[var(--height-portrait)] overflow-hidden"
				style={{
					'--height-landscape': `calc(${heightRatioLandscape} * 70vw)`,
					'--height-portrait': `calc(${heightRatioPortrait} * 70vw)`,
				} as React.CSSProperties}
			>
				<div ref={imgContainerRef} id="img-container" className="absolute top-0 right-0 w-full h-full">
					<div id="img1">
						{/* Landscape image */}
						<Image
							src="/local-images/section-bg-services-desktop.jpg"
							alt="Photo portrait of an old man"
							width={imgWidthLandscape}
							height={imgHeightLandscape}
							style={{
								width: 'auto',
								height: 'auto',
								// maxWidth: '80vw',
								// maxHeight: '70vh',
								opacity: '0.5',
							}}
							className="portrait:hidden"
							priority
						/>
						{/* Portrait image */}
						<Image
							src="/local-images/section-bg-services.jpg"
							alt="Photo portrait of an old man"
							width={imgWidthPortrait}
							height={imgHeightPortrait}
							style={{
								width: 'auto',
								height: 'auto',
								// maxWidth: '80vw',
								// maxHeight: '70vh',
								opacity: '0.5',
							}}
							className="hidden portrait:block"
							priority
						/>
					</div>
				
					<div ref={img2Ref} id="img2" className="absolute top-0 left-0 w-full h-full">
						{/* Landscape image */}
						<Image
							src="/local-images/section-bg-services-desktop.jpg"
							alt="Photo portrait of an old man"
							width={imgWidthLandscape}
							height={imgHeightLandscape}
							style={{
								width: 'auto',
								height: 'auto',
								opacity: '0.5',
							}}
							className="portrait:hidden"
							priority
						/>
						{/* Portrait image */}
						<Image
							src="/local-images/section-bg-services.jpg"
							alt="Photo portrait of an old man"
							width={imgWidthPortrait}
							height={imgHeightPortrait}
							style={{
								width: 'auto',
								height: 'auto',
								opacity: '0.5',
							}}
							className="hidden portrait:block"
							priority
						/>
					</div>

					<div ref={img3Ref} id="img3" className="absolute top-0 left-0 w-full h-full">
						{/* Landscape image */}
						<Image
							src="/local-images/section-bg-services-desktop.jpg"
							alt="Photo portrait of an old man"
							width={imgWidthLandscape}
							height={imgHeightLandscape}
							style={{
								width: 'auto',
								height: 'auto',
								opacity: '0.5',
							}}
							className="portrait:hidden"
							priority
						/>
						{/* Portrait image */}
						<Image
							src="/local-images/section-bg-services.jpg"
							alt="Photo portrait of an old man"
							width={imgWidthPortrait}
							height={imgHeightPortrait}
							style={{
								width: 'auto',
								height: 'auto',
								opacity: '0.5',
							}}
							className="hidden portrait:block"
							priority
						/>
					</div>
				</div>
			</div>
			<div className="absolute top-[20vh] left-[15vw]" data-speed="0.9">
				<h1 className="text-[3vw] uppercase font-nominee font-black tracking-[-0.08em] leading-[1.0em] mb-[15px]">$599 Ut <br />architecto <br />voluptatem</h1>
				<p className="w-[25vw] max-w-[410px] text-[15px] leading-[1.0em] opacity-60">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.</p>
			</div>
		</section>
	);
}