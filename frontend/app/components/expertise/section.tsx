"use client";

import { Props } from "@/types";
import Image from "next/image";
import { useRef } from "react";
import { ScrollTrigger } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Card } from "@heroui/react";

const MOBILE_BREAKPOINT = 640;

const IMAGE_DIMENSIONS = {
	landscape: { width: 3200, height: 3274 },
	portrait: { width: 1170, height: 2848 },
} as const;

const SCROLL_TRIGGER_SETTINGS = {
	pinEndDistance: 450,
	startPositionMobile: 'top 40%',
	startPositionDesktop: 'center center',
} as const;

const CARD_IMAGE_DIMENSIONS = {
	width: 400,
	height: 300,
} as const;

export default function Expertise({ wrapperRef }: Props){
	const cards = useRef<HTMLDivElement>(null);

	const heightRatioLandscape = IMAGE_DIMENSIONS.landscape.height / IMAGE_DIMENSIONS.landscape.width;
	const heightRatioPortrait = IMAGE_DIMENSIONS.portrait.height / IMAGE_DIMENSIONS.portrait.width;

	useGSAP( () => {
		const startPosition = window.innerWidth < MOBILE_BREAKPOINT
			? SCROLL_TRIGGER_SETTINGS.startPositionMobile
			: SCROLL_TRIGGER_SETTINGS.startPositionDesktop;
		ScrollTrigger.create({
			trigger: '#cardsID',
			pin: true,
			start: startPosition,
			end: `+=${SCROLL_TRIGGER_SETTINGS.pinEndDistance}`,
		});
	}, { scope: wrapperRef });

	return(
		<section className="z-10 relative w-full overflow-hidden pt-[100px] sm:pt-0 bg-[#a39285]">
			<div className="relative w-full h-[var(--height-landscape)] portrait:h-[var(--height-portrait)]"
				style={{
					'--height-landscape': `calc(${heightRatioLandscape} * 135vw)`,
					'--height-portrait': `calc(${heightRatioPortrait} * 100vw)`,
				} as React.CSSProperties}
			>
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full sm:w-[135vw] h-full overflow-hidden">
					<div id="expertiseImg">
						{/* Landscape image */}
						<Image
							src="/images/preloaded/section-bg-expertise.jpg"
							alt="Photo portrait of a young man"
							width={IMAGE_DIMENSIONS.landscape.width}
							height={IMAGE_DIMENSIONS.landscape.height}
							style={{
								width: '150vw',
								height: 'auto',
							}}
							className="portrait:hidden"
							priority
						/>
						{/* Portrait image */}
						<Image
							src="/images/preloaded/section-bg-expertise-portrait.jpg"
							alt="Photo portrait of a young man"
							width={IMAGE_DIMENSIONS.portrait.width}
							height={IMAGE_DIMENSIONS.portrait.height}
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

			<div className="absolute top-[-11vh] sm:top-[-11vw] left-1/2 -translate-x-1/2 w-[100vw]" data-speed="0.7" data-speed-mobile="0.7">
				<h1 className="text-[35vw] sm:text-[30vw] text-[#b8bc92] uppercase font-mainfont font-black tracking-[-0.08em] leading-[0.8em] text-center m-0 ml-[-0.08em]">Amet</h1>
			</div>

			<div className="absolute top-[5vh] sm:top-[27vw] sm:left-[8.7vw] px-[8%] sm:px-0 sm:w-[28%] text-center sm:text-left text-[#b8bc92]" data-speed="0.6" data-speed-mobile="0.6">
				<h3 className="font-mainfont font-black text-[18px] tracking-[-0.06em] uppercase">Magna Aliqua</h3>
				<p className="text-[16px] sm:text-[18px] leading-[1.2em]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim</p>
			</div>

			<div
				ref={cards} id="cardsID"
				className="absolute top-[79vh] sm:top-[105vw] w-full"
				data-speed="0.6"
				data-speed-mobile="0.8"
			>
				<div className="cards-inner flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center px-[8%]">
					<Card className="items-stretch flex-row sm:items-start sm:flex-col w-[100%] sm:min-w-[180px] sm:max-w-[300px] p-0 rounded-xl overflow-hidden bg-[#2b2827]">
						<Card.Header className="flex flex-col items-start sm:min-h-[130px] pb-4 sm:pb-0 pt-3 sm:pt-7 px-6 leading-[1em]">
							<Card.Title className="font-mainfont font-black text-[16px] sm:text-[18px] tracking-[-0.06em] text-[#d7cec4] uppercase mb-[3px]">AI-Enhancement</Card.Title>
							<Card.Description className="sm:w-7/8 text-[14px] text-[#d7cec4]/60 leading-[1.1em]">Lorem ipsum dolor sit amet, consectetur adipiscing elit</Card.Description>
						</Card.Header>
						<div className="hidden sm:block">
							<Image
								src="/images/preloaded/card-ai.jpg"
								alt="Card 2"
								width={CARD_IMAGE_DIMENSIONS.width}
								height={CARD_IMAGE_DIMENSIONS.height}
								className="w-full h-auto object-cover"
							/>
						</div>
					</Card>
					<Card className="items-stretch flex-row sm:items-start sm:flex-col w-[100%] sm:min-w-[180px] sm:max-w-[300px] p-0 rounded-xl overflow-hidden bg-[#2b2827]">
						<Card.Header className="flex flex-col items-start sm:min-h-[130px] pb-4 sm:pb-0 pt-3 sm:pt-7 px-6 leading-[1em]">
							<Card.Title className="font-mainfont font-black text-[16px] sm:text-[18px] tracking-[-0.06em] text-[#d7cec4] uppercase mb-[3px]">Casting</Card.Title>
							<Card.Description className="sm:w-7/8 text-[14px] text-[#d7cec4]/60 leading-[1.1em]">Lorem ipsum dolor sit amet, consectetur adipiscing elit</Card.Description>
						</Card.Header>
						<div className="hidden sm:block">
							<Image
								src="/images/preloaded/card-casting.jpg"
								alt="Card 2"
								width={CARD_IMAGE_DIMENSIONS.width}
								height={CARD_IMAGE_DIMENSIONS.height}
								className="w-full h-auto object-cover"
							/>
						</div>
					</Card>
					<Card className="items-stretch flex-row sm:items-start sm:flex-col w-[100%] sm:min-w-[180px] sm:max-w-[300px] p-0 rounded-xl overflow-hidden bg-[#2b2827]">
						<Card.Header className="flex flex-col items-start sm:min-h-[130px] pb-4 sm:pb-0 pt-3 sm:pt-7 px-6 leading-[1em]">
							<Card.Title className="font-mainfont font-black text-[16px] sm:text-[18px] tracking-[-0.06em] text-[#d7cec4] uppercase mb-[3px]">Lighting 101</Card.Title>
							<Card.Description className="sm:w-7/8 text-[14px] text-[#d7cec4]/60 leading-[1.1em]">Lorem ipsum dolor sit amet, consectetur adipiscing elit</Card.Description>
						</Card.Header>
						<div className="hidden sm:block">
							<Image
								src="/images/preloaded/card-lighting.jpg"
								alt="Card 2"
								width={CARD_IMAGE_DIMENSIONS.width}
								height={CARD_IMAGE_DIMENSIONS.height}
								className="w-full h-auto object-cover"
							/>
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}