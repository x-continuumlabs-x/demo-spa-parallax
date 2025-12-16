"use client";

import { Props } from "@/types";
import Image from "next/image";
import { useRef, useState } from "react";
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
	const [isMobile, setIsMobile] = useState(false);
	const imgWidthLandscape = 3200;
	const imgHeightLandscape = 3274;
	const heightRatioLandscape = imgHeightLandscape / imgWidthLandscape;
	const imgWidthPortrait = 1170;
	const imgHeightPortrait = 2848;
	const heightRatioPortrait = imgHeightPortrait / imgWidthPortrait;

	useGSAP( () => {
		const startPosition = window.innerWidth < 640 ? 'top 40%' : 'center center';

		ScrollTrigger.create({
			trigger: '#cardsID',
			pin: true,
			start: startPosition,
			end: '+=450',
		});
		},
		{
			scope: wrapperRef,// Check if this is needed
		}
	);

	// Viewport detection for responsive data-speed values
	useGSAP(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 640);
		};
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => {
			window.removeEventListener('resize', checkMobile);
		};
	}, { scope: wrapperRef });

	return(
		<section ref={sectionRef} className="z-10 relative w-full overflow-hidden pt-[100px] sm:pt-0 bg-[#a39285]">
			<div className="relative w-full h-[var(--height-landscape)] portrait:h-[var(--height-portrait)]"
				style={{
					'--height-landscape': `calc(${heightRatioLandscape} * 135vw)`,
					'--height-portrait': `calc(${heightRatioPortrait} * 100vw)`,
				} as React.CSSProperties}
			>
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full sm:w-[135vw] h-full overflow-hidden">
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
			</div>

			<div className="absolute top-[-11vw] left-1/2 -translate-x-1/2 w-[100vw]" data-speed={isMobile ? "0.8" : "0.7"}>
				<h1 className="text-[35vw] sm:text-[30vw] text-[#b8bc92] uppercase font-nominee font-black tracking-[-0.08em] leading-[0.8em] text-center m-0 ml-[-0.08em]">Amet</h1>
			</div>

			<div className="absolute top-[30vw] sm:top-[27vw] sm:left-[8.7vw] px-[8%] sm:px-0 sm:w-[28%] text-center sm:text-left text-[#b8bc92]" data-speed={isMobile ? "0.8" : "0.6"}>
				<h3 className="font-nominee font-black text-[18px] tracking-[-0.06em] uppercase">Magna Aliqua</h3>
				<p className="text-[18px] leading-[1.2em]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim</p>
			</div>

			<div
				ref={cards} id="cardsID"
				className="absolute top-[200vw] sm:top-[105vw] w-full"
				data-speed={isMobile ? "0.8" : "0.6"}
			>
				<div className="cards-inner flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center px-[8%]">
					<Card ref={card3Ref} className="items-stretch flex-row sm:items-start sm:flex-col w-[100%] sm:min-w-[180px] sm:max-w-[300px] p-0 rounded-xl overflow-hidden bg-[#2b2827]">
						<Card.Header className="flex flex-col items-start sm:min-h-[130px] pb-4 sm:pb-0 pt-3 sm:pt-7 px-6 leading-[1em]">
							<Card.Title className="font-nominee font-black text-[16px] sm:text-[18px] tracking-[-0.06em] text-[#d7cec4] uppercase mb-[3px]">AI-Enhancement</Card.Title>
							<Card.Description className="sm:w-7/8 text-[14px] text-[#d7cec4]/60 leading-[1.1em]">Lorem ipsum dolor sit amet, consectetur adipiscing elit</Card.Description>
						</Card.Header>
						<div className="hidden sm:block">
							<Image
								src="/local-images/card-ai.jpg"
								alt="Card 2"
								width={400}
								height={300}
								className="w-full h-auto object-cover"
							/>
						</div>
					</Card>
					<Card ref={card1Ref} className="items-stretch flex-row sm:items-start sm:flex-col w-[100%] sm:min-w-[180px] sm:max-w-[300px] p-0 rounded-xl overflow-hidden bg-[#2b2827]">
						<Card.Header className="flex flex-col items-start sm:min-h-[130px] pb-4 sm:pb-0 pt-3 sm:pt-7 px-6 leading-[1em]">
							<Card.Title className="font-nominee font-black text-[16px] sm:text-[18px] tracking-[-0.06em] text-[#d7cec4] uppercase mb-[3px]">Casting</Card.Title>
							<Card.Description className="sm:w-7/8 text-[14px] text-[#d7cec4]/60 leading-[1.1em]">Lorem ipsum dolor sit amet, consectetur adipiscing elit</Card.Description>
						</Card.Header>
						<div className="hidden sm:block">
							<Image
								src="/local-images/card-casting.jpg"
								alt="Card 2"
								width={400}
								height={300}
								className="w-full h-auto object-cover"
							/>
						</div>
					</Card>
					<Card ref={card2Ref} className="items-stretch flex-row sm:items-start sm:flex-col w-[100%] sm:min-w-[180px] sm:max-w-[300px] p-0 rounded-xl overflow-hidden bg-[#2b2827]">
						<Card.Header className="flex flex-col items-start sm:min-h-[130px] pb-4 sm:pb-0 pt-3 sm:pt-7 px-6 leading-[1em]">
							<Card.Title className="font-nominee font-black text-[16px] sm:text-[18px] tracking-[-0.06em] text-[#d7cec4] uppercase mb-[3px]">Lighting 101</Card.Title>
							<Card.Description className="sm:w-7/8 text-[14px] text-[#d7cec4]/60 leading-[1.1em]">Lorem ipsum dolor sit amet, consectetur adipiscing elit</Card.Description>
						</Card.Header>
						<div className="hidden sm:block">
							<Image
								src="/local-images/card-lighting.jpg"
								alt="Card 2"
								width={400}
								height={300}
								className="w-full h-auto object-cover"
							/>
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}