"use client";

import { Props } from "@/types";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";

export default function About({ wrapperRef }: Props) {
	const pathRef = useRef<SVGPathElement>(null);
	const sectionRef = useRef<HTMLDivElement>(null);
	const milestone1 = useRef<HTMLDivElement>(null);
	const milestone2 = useRef<HTMLDivElement>(null);
	const milestone3 = useRef<HTMLDivElement>(null);
	const milestone4 = useRef<HTMLDivElement>(null);
	const milestone5 = useRef<HTMLDivElement>(null);
	const milestone6 = useRef<HTMLDivElement>(null);
	const bodyCopyRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		if (!pathRef.current || !sectionRef.current) return;

		// Start with path not drawn and milestones hidden
		gsap.set(pathRef.current, { drawSVG: "0%" });
		gsap.set(
			[
				milestone1.current,
				milestone2.current,
				milestone3.current,
				milestone4.current,
				milestone5.current,
				milestone6.current,
			],
			{ opacity: 0 }
		);

		// Pin bodyCopyRef for lg breakpoint and above
		gsap.matchMedia().add("(min-width: 1024px)", () => {
			if (!bodyCopyRef.current || !sectionRef.current) return;

			ScrollTrigger.create({
				trigger: sectionRef.current,
				start: "top-=10% top",
				end: "bottom bottom",
				pin: bodyCopyRef.current,
			});
		});

		// Animate the path drawing as user scrolls
		gsap.to(pathRef.current, {
			drawSVG: "100%",
			ease: "none",
			scrollTrigger: {
				trigger: sectionRef.current,
				start: "top center",
				end: "bottom center",
				scrub: 1,
				onUpdate: (self) => {
					const progress = self.progress;

					// Milestone 1: fade in at 17%, fade out below 17%
					if (milestone1.current) {
						const currentOpacity = gsap.getProperty(milestone1.current, "opacity") as number;
						if (progress >= 0.07 && currentOpacity < 1) {
							gsap.to(milestone1.current, { opacity: 1, duration: 0.3 });
						} else if (progress < 0.07 && currentOpacity > 0) {
							gsap.to(milestone1.current, { opacity: 0, duration: 0.2 });
						}
					}

					// Milestone 2: fade in at 25%, fade out below 25%
					if (milestone2.current) {
						const currentOpacity = gsap.getProperty(milestone2.current, "opacity") as number;
						if (progress >= 0.30 && currentOpacity < 1) {
							gsap.to(milestone2.current, { opacity: 1, duration: 0.3 });
						} else if (progress < 0.30 && currentOpacity > 0) {
							gsap.to(milestone2.current, { opacity: 0, duration: 0.2 });
						}
					}

					// Milestone 3: fade in at 40%, fade out below 40%
					if (milestone3.current) {
						const currentOpacity = gsap.getProperty(milestone3.current, "opacity") as number;
						if (progress >= 0.45 && currentOpacity < 1) {
							gsap.to(milestone3.current, { opacity: 1, duration: 0.3 });
						} else if (progress < 0.45 && currentOpacity > 0) {
							gsap.to(milestone3.current, { opacity: 0, duration: 0.2 });
						}
					}

					if (milestone4.current) {
						const currentOpacity = gsap.getProperty(milestone4.current, "opacity") as number;
						if (progress >= 0.68 && currentOpacity < 1) {
							gsap.to(milestone4.current, { opacity: 1, duration: 0.3 });
						} else if (progress < 0.68 && currentOpacity > 0) {
							gsap.to(milestone4.current, { opacity: 0, duration: 0.2 });
						}
					}

					if (milestone5.current) {
						const currentOpacity = gsap.getProperty(milestone5.current, "opacity") as number;
						if (progress >= 0.80 && currentOpacity < 1) {
							gsap.to(milestone5.current, { opacity: 1, duration: 0.3 });
						} else if (progress < 0.80 && currentOpacity > 0) {
							gsap.to(milestone5.current, { opacity: 0, duration: 0.2 });
						}
					}
					if (milestone6.current) {
						const currentOpacity = gsap.getProperty(milestone6.current, "opacity") as number;
						if (progress >= 0.90 && currentOpacity < 1) {
							gsap.to(milestone6.current, { opacity: 1, duration: 0.3 });
						} else if (progress < 0.90 && currentOpacity > 0) {
							gsap.to(milestone6.current, { opacity: 0, duration: 0.2 });
						}
					}
				},
			}
		});
	}, { scope: wrapperRef });

	return(
		<section className="relative w-full pt-[8vw] pb-[17vw]">
			<div ref={sectionRef} className="flex flex-col-reverse items-center lg:items-start lg:justify-evenly lg:flex-row">
				<div className="w-full lg:w-1/3 flex items-center flex-col">
					<div className="relative w-2/5 md:w-[30%] overflow-visible" style={{ aspectRatio: '240 / 1480' }}>
						<svg
							version="1.2"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 295 1866"
							width="100%"
							height="100%"
							preserveAspectRatio="xMidYMid meet"
							overflow="visible"
						>
							<style>
								{`
								.curve-a {
									fill: none;
									stroke: #959493;
									stroke-miterlimit: 100;
									stroke-width: 5;
									stroke-dasharray: 2065.36, 0.1;
								}
								`}
							</style>
							<path
								ref={pathRef}
								fillRule="evenodd"
								className="curve-a"
								d="m3 0.8v323.1c0 0 0.9 33.9 32.9 33.9h222.8c0 0 32.9 0.1 32.9 33.2v597.5c0 0 0 32.6-32.9 32.6h-222.9c0 0-32.9 1.4-32.9 33.2v407.6c0 0 1.3 32.7 32.9 32.7h222.8c0 0 32.9 1 32.9 33.2v338"
							/>
						</svg>
						<div className="absolute flex flex-row top-[5%] left-[-11px]" ref={milestone1}>
							<div className="w-[22px] h-[22px] flex-shrink-0">
								<svg
									version="1.2"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 46 46"
									width="22"
									height="22"
									>
									<style>
										{`
										.marker-a { fill: #d7cec4; }
										.marker-b {
											fill: none;
											stroke: #d7cec4;
											stroke-miterlimit: 100;
											stroke-width: 2;
										}
										`}
									</style>

									<path
										fillRule="evenodd"
										className="marker-a"
										d="m23.2 38.5c-8.4 0-15.2-6.8-15.2-15.3 0-8.4 6.8-15.2 15.2-15.2 8.5 0 15.3 6.8 15.3 15.2 0 8.5-6.8 15.3-15.3 15.3z"
									/>
									<path
										fillRule="evenodd"
										className="marker-b"
										d="m23 45c-12.2 0-22-9.8-22-22 0-12.2 9.8-22 22-22 12.2 0 22 9.8 22 22 0 12.2-9.8 22-22 22z"
									/>
								</svg>
							</div>
							<div className="pt-[0.04em] px-[0.7em] w-[250px]">
								<h3 className="mb-[0.3em] text-[22px] uppercase font-nominee font-black tracking-[-0.03em] leading-[0.8em]">2016</h3>
								<p className="text-[14px] leading-[1.2em]">Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.</p>
							</div>
						</div>
						<div className="absolute flex flex-row-reverse top-[25%] right-[-11px]" ref={milestone2}>
							<div className="w-[22px] h-[22px] flex-shrink-0">
								<svg
									version="1.2"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 46 46"
									width="22"
									height="22"
									>
									<style>
										{`
										.marker-a { fill: #d7cec4; }
										.marker-b {
											fill: none;
											stroke: #d7cec4;
											stroke-miterlimit: 100;
											stroke-width: 2;
										}
										`}
									</style>

									<path
										fillRule="evenodd"
										className="marker-a"
										d="m23.2 38.5c-8.4 0-15.2-6.8-15.2-15.3 0-8.4 6.8-15.2 15.2-15.2 8.5 0 15.3 6.8 15.3 15.2 0 8.5-6.8 15.3-15.3 15.3z"
									/>
									<path
										fillRule="evenodd"
										className="marker-b"
										d="m23 45c-12.2 0-22-9.8-22-22 0-12.2 9.8-22 22-22 12.2 0 22 9.8 22 22 0 12.2-9.8 22-22 22z"
									/>
								</svg>
							</div>
							<div className="pt-[0.04em] px-[0.7em] w-[250px] text-right">
								<h3 className="mb-[0.3em] text-[22px] uppercase font-nominee font-black tracking-[-0.03em] leading-[0.8em]">2019</h3>
								<p className="text-[14px] leading-[1.2em]">Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.</p>
							</div>
						</div>
						<div className="absolute flex flex-row top-[40%] left-[calc(100%-11px)]" ref={milestone3}>
							<div className="w-[22px] h-[22px] flex-shrink-0">
								<svg
									version="1.2"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 46 46"
									width="22"
									height="22"
									>
									<style>
										{`
										.marker-a { fill: #d7cec4; }
										.marker-b {
											fill: none;
											stroke: #d7cec4;
											stroke-miterlimit: 100;
											stroke-width: 2;
										}
										`}
									</style>

									<path
										fillRule="evenodd"
										className="marker-a"
										d="m23.2 38.5c-8.4 0-15.2-6.8-15.2-15.3 0-8.4 6.8-15.2 15.2-15.2 8.5 0 15.3 6.8 15.3 15.2 0 8.5-6.8 15.3-15.3 15.3z"
									/>
									<path
										fillRule="evenodd"
										className="marker-b"
										d="m23 45c-12.2 0-22-9.8-22-22 0-12.2 9.8-22 22-22 12.2 0 22 9.8 22 22 0 12.2-9.8 22-22 22z"
									/>
								</svg>
							</div>
							<div className="pt-[0.04em] px-[0.7em] w-[250px]">
								<h3 className="mb-[0.3em] text-[22px] uppercase font-nominee font-black tracking-[-0.03em] leading-[0.8em]">2020</h3>
								<p className="text-[14px] leading-[1.2em]">Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.</p>
							</div>
						</div>
						<div className="absolute flex flex-row-reverse top-[59%] right-[calc(100%-11px)]" ref={milestone4}>
							<div className="w-[22px] h-[22px] flex-shrink-0">
								<svg
									version="1.2"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 46 46"
									width="22"
									height="22"
									>
									<style>
										{`
										.marker-a { fill: #d7cec4; }
										.marker-b {
											fill: none;
											stroke: #d7cec4;
											stroke-miterlimit: 100;
											stroke-width: 2;
										}
										`}
									</style>

									<path
										fillRule="evenodd"
										className="marker-a"
										d="m23.2 38.5c-8.4 0-15.2-6.8-15.2-15.3 0-8.4 6.8-15.2 15.2-15.2 8.5 0 15.3 6.8 15.3 15.2 0 8.5-6.8 15.3-15.3 15.3z"
									/>
									<path
										fillRule="evenodd"
										className="marker-b"
										d="m23 45c-12.2 0-22-9.8-22-22 0-12.2 9.8-22 22-22 12.2 0 22 9.8 22 22 0 12.2-9.8 22-22 22z"
									/>
								</svg>
							</div>
							<div className="pt-[0.04em] px-[0.7em] w-[220px] text-right">
								<h3 className="mb-[0.3em] text-[22px] uppercase font-nominee font-black tracking-[-0.03em] leading-[0.8em]">2022</h3>
								<p className="text-[14px] leading-[1.2em]">Ut labore et dolore magna aliqua. Ut enim ad.</p>
							</div>
						</div>
						<div className="absolute flex flex-row top-[71%] left-[-11px]" ref={milestone5}>
							<div className="w-[22px] h-[22px] flex-shrink-0">
								<svg
									version="1.2"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 46 46"
									width="22"
									height="22"
									>
									<style>
										{`
										.marker-a { fill: #d7cec4; }
										.marker-b {
											fill: none;
											stroke: #d7cec4;
											stroke-miterlimit: 100;
											stroke-width: 2;
										}
										`}
									</style>

									<path
										fillRule="evenodd"
										className="marker-a"
										d="m23.2 38.5c-8.4 0-15.2-6.8-15.2-15.3 0-8.4 6.8-15.2 15.2-15.2 8.5 0 15.3 6.8 15.3 15.2 0 8.5-6.8 15.3-15.3 15.3z"
									/>
									<path
										fillRule="evenodd"
										className="marker-b"
										d="m23 45c-12.2 0-22-9.8-22-22 0-12.2 9.8-22 22-22 12.2 0 22 9.8 22 22 0 12.2-9.8 22-22 22z"
									/>
								</svg>
							</div>
							<div className="pt-[0.04em] px-[0.7em] w-[250px]">
								<h3 className="mb-[0.3em] text-[22px] uppercase font-nominee font-black tracking-[-0.03em] leading-[0.8em]">2023</h3>
								<p className="text-[14px] leading-[1.2em]">Incididunt ut labore et dolore.</p>
							</div>
						</div>
						<div className="absolute flex flex-row-reverse top-[85%] right-[-11px]" ref={milestone6}>
							<div className="w-[22px] h-[22px] flex-shrink-0">
								<svg
									version="1.2"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 46 46"
									width="22"
									height="22"
									>
									<style>
										{`
										.marker-a { fill: #d7cec4; }
										.marker-b {
											fill: none;
											stroke: #d7cec4;
											stroke-miterlimit: 100;
											stroke-width: 2;
										}
										`}
									</style>

									<path
										fillRule="evenodd"
										className="marker-a"
										d="m23.2 38.5c-8.4 0-15.2-6.8-15.2-15.3 0-8.4 6.8-15.2 15.2-15.2 8.5 0 15.3 6.8 15.3 15.2 0 8.5-6.8 15.3-15.3 15.3z"
									/>
									<path
										fillRule="evenodd"
										className="marker-b"
										d="m23 45c-12.2 0-22-9.8-22-22 0-12.2 9.8-22 22-22 12.2 0 22 9.8 22 22 0 12.2-9.8 22-22 22z"
									/>
								</svg>
							</div>
							<div className="pt-[0.04em] px-[0.7em] w-[250px] text-right">
								<h3 className="mb-[0.3em] text-[22px] uppercase font-nominee font-black tracking-[-0.03em] leading-[0.8em]">2026</h3>
								<p className="text-[14px] leading-[1.2em]">Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.</p>
							</div>
						</div>
					</div>
				</div>
				<div ref={bodyCopyRef} className="w-2/3 lg:w-[28%]">
					<h1 className="text-[5vw] uppercase font-nominee font-black tracking-[-0.08em] leading-[0.8em] mb-[0.5em]">Ut enim <br />ad minim <br />veniam</h1>

					<p className="leading-[1.3em] mb-[1.4em]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

					<p className="leading-[1.3em] mb-[1.4em]">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				
					<h2 className="text-[2vw] font-nominee font-medium tracking-[-0.03em] leading-[1.0em] mt-[1.5em] mb-[0.5em]">Ullamco Laboris</h2>

					<p className="leading-[1.3em] mb-[1.4em]">Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occa ecat cupidatat non proident, sunt in culpa qui officia deserunt.</p>
				</div>
			</div>
		</section>
	);
}