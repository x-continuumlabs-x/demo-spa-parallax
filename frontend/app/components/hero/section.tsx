"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
	const fullWidth = 3200;
	const fullHeight = 2196;
	const heightRatio = fullHeight / fullWidth;
	const imageContainerRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		gsap.fromTo(
			imageContainerRef.current,
			{ width: "110vw" },
			{ width: "100vw", duration: 3.5, ease: "power4.out" }
		);
	});

	return (
		<section className="relative w-full overflow-hidden">
			<div className="relative w-full" style={{ height: `calc(${heightRatio} * 100vw)` }}>
				<div ref={imageContainerRef} className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-full">
					<Image
						src="/local-images/section-bg-hero.jpg"
						alt="Photo portrait of a young woman"
						width={fullWidth}
						height={fullHeight}
						style={{
							width: '100%',
							height: 'auto',
						}}
						priority
					/>
				</div>
				<div className="absolute top-0 left-0 w-full">
					<h1 className="text-[30vw] text-[#b082db] uppercase font-nominee font-black tracking-[-0.08em] leading-[0.6em] text-center m-0 ml-[-0.08em]">Nomin</h1>
				</div>
				<div className="absolute top-[30vw] left-[10vw] w-1/5">
					<p className="text-[16px] text-[#b082db] leading-[1.0em]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim</p>
				</div>
			</div>
		</section>
	);
}