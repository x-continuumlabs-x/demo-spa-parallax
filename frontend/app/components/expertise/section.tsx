"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { Card, CardHeader, CardBody } from "@heroui/react";

export default function Expertise(){
	const cards = useRef<HTMLDivElement>(null);
	const card1Ref = useRef<HTMLDivElement>(null); // Lighting 101
	const card2Ref = useRef<HTMLDivElement>(null); // Image Enhancement
	const card3Ref = useRef<HTMLDivElement>(null); // Casting
	const sectionRef = useRef<HTMLElement>(null);
	const expertiseImgRef = useRef<HTMLDivElement>(null);
	const imgWidthLandscape = 3200;
	const imgHeightLandscape = 3274;
	const heightRatioLandscape = imgHeightLandscape / imgWidthLandscape;
	const imgWidthPortrait = 3200;
	const imgHeightPortrait = 6197;
	const heightRatioPortrait = imgHeightPortrait / imgWidthPortrait;

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

		// Wait until ScrollSmoother exists
		const checkSmoother = () => {
			const smoother = ScrollSmoother.get();
			if (!smoother) {
			// try again on next frame
			requestAnimationFrame(checkSmoother);
			return;
			}

			// Slide up animation when coming into view
			// Using a wrapper approach to avoid conflicts with data-speed
			const cardsInner = cards.current?.querySelector('.cards-inner');
			if (cardsInner) {
				gsap.fromTo(cardsInner,
					{ y: 200, },
					{
						y: 0,
						ease: "power4.out",
						scrollTrigger: {
							trigger: cards.current,
							start: "top bottom-=100px",
							end: "top bottom-=1200px",
							scrub: 1,
						}
					}
				);
			}

			// // Pin animation for the container
			// ScrollTrigger.create({
			// 	trigger: cards.current,
			// 	// start: "top center",
			// 	start: "top bottom-=450px",
			// 	endTrigger: expertiseImgRef.current,
			// 	end: "bottom-=300px center",
			// 	pin: true,
			// 	pinSpacing: false,
			// 	markers: true,
			// });

			// // Refresh ScrollTrigger after everything is ready
			// ScrollTrigger.refresh();
		};

		checkSmoother();
	}, []);

	return(
		<section ref={sectionRef} className="z-10 relative w-full overflow-hidden top-[-20vw]">
			<div data-speed="1"
				className="relative w-full h-[var(--height-landscape)] portrait:h-[var(--height-portrait)]"
				style={{
					'--height-landscape': `calc(${heightRatioLandscape} * 100vw)`,
					'--height-portrait': `calc(${heightRatioPortrait} * 100vw)`,
				} as React.CSSProperties}
			>
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-full overflow-hidden">
					<div ref={expertiseImgRef} id="expertiseImg">
						{/* Landscape image */}
						<Image
							src="/local-images/section-bg-expertise.jpg"
							alt="Photo portrait of a young man"
							width={imgWidthLandscape}
							height={imgHeightLandscape}
							style={{
								width: '100%',
								height: 'auto',
							}}
							className="portrait:hidden"
							priority
						/>
						{/* Portrait image */}
						<Image
							src="/local-images/section-bg-expertise-portrait.jpg"
							alt="Photo portrait of a young man"
							width={imgWidthPortrait}
							height={imgHeightPortrait}
							style={{
								width: '100%',
								height: 'auto',
							}}
							className="hidden portrait:block"
							priority
						/>
					</div>
				</div>
				
				<div className="absolute top-[45vw] left-[10vw] w-1/5" data-speed="0.6">
					<p className="text-[15px] text-[#b8bc92] leading-[1.0em]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim</p>
				</div>
			</div>
			
			<div className="absolute top-[-11vw] left-1/2 -translate-x-1/2 w-[100vw]" data-speed="0.7">
				<h1 className="text-[30vw] text-[#b8bc92] uppercase font-nominee font-black tracking-[-0.08em] leading-[0.8em] text-center m-0 ml-[-0.08em]">Amet</h1>
			</div>

			<div
				ref={cards}
				className="absolute top-[68vw] w-full"
				data-speed="0.7"
			>
				<div className="cards-inner flex flex-row gap-4 justify-center">
					<div ref={card3Ref}>
						<Card className="min-w-[180px] max-w-[300px] rounded-xl overflow-hidden" style={{ backgroundColor: '#2b2827' }}>
							<CardHeader className="flex flex-col items-start min-h-[130px] pt-8 px-6 leading-[1em]">
								<h4 className="font-nominee font-black text-[18px] tracking-[-0.06em] text-[#d7cec4] uppercase mb-1">Image Enhancement</h4>
								<p className="text-[14px] text-[#d7cec4]/60">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
							</CardHeader>
							<CardBody className="p-0">
								<Image
									src="/local-images/temp-card-1.jpg"
									alt="Card 2"
									width={400}
									height={300}
									className="w-full h-auto object-cover"
								/>
							</CardBody>
						</Card>
					</div>
					<div ref={card2Ref}>
						<Card className="min-w-[180px] max-w-[300px] rounded-xl overflow-hidden" style={{ backgroundColor: '#2b2827' }}>
							<CardHeader className="flex flex-col items-start min-h-[130px] pt-8 px-6 leading-[1em]">
								<h4 className="font-nominee font-black text-[18px] tracking-[-0.06em] text-[#d7cec4] uppercase mb-1">Casting</h4>
								<p className="text-[14px] text-[#d7cec4]/60">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
							</CardHeader>
							<CardBody className="p-0">
								<Image
									src="/local-images/temp-card-1.jpg"
									alt="Card 3"
									width={400}
									height={300}
									className="w-full h-auto object-cover"
								/>
							</CardBody>
						</Card>
					</div>
					<div ref={card1Ref}>
						<Card className="min-w-[180px] max-w-[300px] rounded-xl" style={{ backgroundColor: '#2b2827' }}>
							<CardHeader className="flex flex-col items-start min-h-[130px] pt-8 px-6 leading-[1em]">
								<h4 className="font-nominee font-black text-[18px] tracking-[-0.06em] text-[#d7cec4] uppercase mb-1">Lighting 101</h4>
								<p className="text-[14px] text-[#d7cec4]/60">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
							</CardHeader>
							<CardBody className="p-0">
								<Image
									src="/local-images/temp-card-1.jpg"
									alt="Card 1"
									width={400}
									height={300}
									className="w-full h-auto object-cover"
								/>
							</CardBody>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}