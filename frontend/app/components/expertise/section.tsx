"use client";

import { Props } from "@/types";
import Image from "next/image";
import { useRef } from "react";
import { ScrollTrigger } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Card } from "@heroui/react";

export default function Expertise({ wrapperRef }: Props){
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

	useGSAP( () => {
		ScrollTrigger.create({
			trigger: '#cardsID',
			pin: true,
			start: 'center center',
			end: '+=450',
		});
		},
		{
			scope: wrapperRef,// Check if this is needed
		}
	);

	// useEffect(() => {
	// 	gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

	// 	// Wait until ScrollSmoother exists
	// 	const checkSmoother = () => {
	// 		const smoother = ScrollSmoother.get();
	// 		if (!smoother) {
	// 		// try again on next frame
	// 		requestAnimationFrame(checkSmoother);
	// 		return;
	// 		}

	// 		// Slide up animation when coming into view
	// 		// Using a wrapper approach to avoid conflicts with data-speed
	// 		const cardsInner = cards.current?.querySelector('.cards-inner');
	// 		if (cardsInner) {
	// 			gsap.fromTo(cardsInner,
	// 				{ y: 200, },
	// 				{
	// 					y: 0,
	// 					ease: "power4.out",
	// 					scrollTrigger: {
	// 						trigger: cards.current,
	// 						start: "top bottom-=100px",
	// 						end: "top bottom-=500px",
	// 						scrub: 1,
	// 					}
	// 				}
	// 			);
	// 		}
	// 	};

	// 	checkSmoother();
	// }, []);

	return(
		<section ref={sectionRef} className="z-10 relative w-full overflow-hidden">
			<div data-speed="1"
				className="relative w-full h-[var(--height-landscape)] portrait:h-[var(--height-portrait)]"
				style={{
					'--height-landscape': `calc(${heightRatioLandscape} * 135vw)`,
					'--height-portrait': `calc(${heightRatioPortrait} * 100vw)`,
				} as React.CSSProperties}
			>
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[135vw] h-full overflow-hidden">
					<div ref={expertiseImgRef} id="expertiseImg">
						{/* Landscape image */}
						<Image
							src="/local-images/section-bg-expertise.jpg"
							alt="Photo portrait of a young man"
							width={imgWidthLandscape}
							height={imgHeightLandscape}
							style={{
								width: '150vw',
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
					<p className="text-[18px] text-[#b8bc92] leading-[1.2em]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim</p>
				</div>
			</div>
			
			<div className="absolute top-[-11vw] left-1/2 -translate-x-1/2 w-[100vw]" data-speed="0.7">
				<h1 className="text-[30vw] text-[#b8bc92] uppercase font-nominee font-black tracking-[-0.08em] leading-[0.8em] text-center m-0 ml-[-0.08em]">Amet</h1>
			</div>

			<div
				ref={cards} id="cardsID"
				className="absolute top-[130vw] sm:top-[105vw] w-full"
				data-speed="0.6"
			>
				<div className="cards-inner flex flex-row gap-4 justify-center">
					<div ref={card3Ref}>
						<Card className="min-w-[180px] max-w-[300px] p-0 rounded-xl overflow-hidden bg-[#2b2827]">
							<Card.Header className="flex flex-col items-start min-h-[130px] pt-7 px-6 leading-[1em]">
								<Card.Title className="font-nominee font-black text-[18px] tracking-[-0.06em] text-[#d7cec4] uppercase mb-[3px]">AI-Enhancement</Card.Title>
								<Card.Description className="w-7/8 text-[14px] text-[#d7cec4]/60 leading-[1.1em]">Lorem ipsum dolor sit amet, consectetur adipiscing elit</Card.Description>
							</Card.Header>
							<Image
								src="/local-images/temp-card-1.jpg"
								alt="Card 2"
								width={400}
								height={300}
								className="w-full h-auto object-cover"
							/>
						</Card>
					</div>
					<div ref={card2Ref}>
						<Card className="min-w-[180px] max-w-[300px] p-0 rounded-xl overflow-hidden bg-[#2b2827]">
							<Card.Header className="flex flex-col items-start min-h-[130px] pt-7 px-6 leading-[1em]">
								<Card.Title className="font-nominee font-black text-[18px] tracking-[-0.06em] text-[#d7cec4] uppercase mb-[3px]">Casting</Card.Title>
								<Card.Description className="w-7/8 text-[14px] text-[#d7cec4]/60 leading-[1.1em]">Lorem ipsum dolor sit amet, consectetur adipiscing elit</Card.Description>
							</Card.Header>
							<Image
								src="/local-images/temp-card-1.jpg"
								alt="Card 2"
								width={400}
								height={300}
								className="w-full h-auto object-cover"
							/>
						</Card>
					</div>
					<div ref={card1Ref}>
						<Card className="min-w-[180px] max-w-[300px] p-0 rounded-xl overflow-hidden bg-[#2b2827]">
							<Card.Header className="flex flex-col items-start min-h-[130px] pt-7 px-6 leading-[1em]">
								<Card.Title className="font-nominee font-black text-[18px] tracking-[-0.06em] text-[#d7cec4] uppercase mb-[3px]">Lighting 101</Card.Title>
								<Card.Description className="w-7/8 text-[14px] text-[#d7cec4]/60 leading-[1.1em]">Lorem ipsum dolor sit amet, consectetur adipiscing elit</Card.Description>
							</Card.Header>
							<Image
								src="/local-images/temp-card-1.jpg"
								alt="Card 2"
								width={400}
								height={300}
								className="w-full h-auto object-cover"
							/>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}