"use client";

import { Props } from "@/types";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";
import Milestone from "./Milestone";

const ANIMATION_DURATIONS = {
	fadeIn: 0.3,
	fadeOut: 0.2,
} as const;

const SCROLL_TRIGGER_SETTINGS = {
	scrub: 1,
	start: "top center",
	end: "bottom center",
} as const;

const PIN_SETTINGS = {
	start: "top-=10% top",
	end: "bottom bottom",
	breakpoint: "(min-width: 1024px)",
} as const;

const SVG_CURVE_STYLE = `
	.curve-a {
		fill: none;
		stroke: #959493;
		stroke-miterlimit: 100;
		stroke-width: 5;
		stroke-dasharray: 2065.36, 0.1;
	}
`;

const animateMilestoneOnProgress = (
	milestone: HTMLDivElement | null,
	progress: number,
	threshold: number
) => {
	if (!milestone) return;

	const currentOpacity = gsap.getProperty(milestone, "opacity") as number;

	if (progress >= threshold && currentOpacity < 1) {
		gsap.to(milestone, { opacity: 1, duration: ANIMATION_DURATIONS.fadeIn });
	} else if (progress < threshold && currentOpacity > 0) {
		gsap.to(milestone, { opacity: 0, duration: ANIMATION_DURATIONS.fadeOut });
	}
};

export default function About({ wrapperRef }: Props) {
	const pathRefDesktop = useRef<SVGPathElement>(null);
	const pathRefMobile = useRef<SVGPathElement>(null);
	const sectionRef = useRef<HTMLDivElement>(null);
	const milestone1 = useRef<HTMLDivElement>(null);
	const milestone2 = useRef<HTMLDivElement>(null);
	const milestone3 = useRef<HTMLDivElement>(null);
	const milestone4 = useRef<HTMLDivElement>(null);
	const milestone5 = useRef<HTMLDivElement>(null);
	const milestone6 = useRef<HTMLDivElement>(null);
	const bodyCopyRef = useRef<HTMLDivElement>(null);

	const milestoneConfig = [
		{ ref: milestone1, threshold: 0.07 },
		{ ref: milestone2, threshold: 0.30 },
		{ ref: milestone3, threshold: 0.45 },
		{ ref: milestone4, threshold: 0.68 },
		{ ref: milestone5, threshold: 0.80 },
		{ ref: milestone6, threshold: 0.90 },
	];

	useGSAP(() => {
		if (!sectionRef.current) return;
		if (!pathRefDesktop.current && !pathRefMobile.current) return;

		// Start with paths not drawn and milestones hidden
		if (pathRefDesktop.current) {
			gsap.set(pathRefDesktop.current, { drawSVG: "0%" });
		}
		if (pathRefMobile.current) {
			gsap.set(pathRefMobile.current, { drawSVG: "0%" });
		}
		gsap.set(
			milestoneConfig.map(m => m.ref.current),
			{ opacity: 0 }
		);

		// Pin bodyCopyRef for lg breakpoint and above
		gsap.matchMedia().add(PIN_SETTINGS.breakpoint, () => {
			if (!bodyCopyRef.current || !sectionRef.current) return;

			ScrollTrigger.create({
				trigger: sectionRef.current,
				start: PIN_SETTINGS.start,
				end: PIN_SETTINGS.end,
				pin: bodyCopyRef.current,
			});
		});

		// Animate the path drawing as user scrolls (both desktop and mobile)
		const pathTargets = [pathRefDesktop.current, pathRefMobile.current].filter(Boolean);
		gsap.to(pathTargets, {
			drawSVG: "100%",
			ease: "none",
			scrollTrigger: {
				trigger: sectionRef.current,
				start: SCROLL_TRIGGER_SETTINGS.start,
				end: SCROLL_TRIGGER_SETTINGS.end,
				scrub: SCROLL_TRIGGER_SETTINGS.scrub,
				onUpdate: (self) => {
					const progress = self.progress;
					milestoneConfig.forEach(({ ref, threshold }) => {
						animateMilestoneOnProgress(ref.current, progress, threshold);
					});
				},
			}
		});
	}, { scope: wrapperRef });

	return(
		<section className="relative w-full pt-[8vw] pb-[17vw]">
			<div ref={sectionRef} className="flex flex-col-reverse items-center lg:items-start lg:justify-evenly lg:flex-row">
				<div className="w-full lg:w-1/3 flex items-center flex-col">
					<div
						className="relative w-[15%] sm:w-[30%] overflow-visible aspect-[95/1866] sm:aspect-[295/1866]"
					>
						{/* Desktop SVG - shown on sm and above */}
						<svg
							version="1.2"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 295 1866"
							width="100%"
							height="100%"
							preserveAspectRatio="xMidYMid meet"
							overflow="visible"
							className="hidden sm:block"
						>
							<style>{SVG_CURVE_STYLE}</style>
							<path
								ref={pathRefDesktop}
								fillRule="evenodd"
								className="curve-a"
								d="m3 0.8v323.1c0 0 0.9 33.9 32.9 33.9h222.8c0 0 32.9 0.1 32.9 33.2v597.5c0 0 0 32.6-32.9 32.6h-222.9c0 0-32.9 1.4-32.9 33.2v407.6c0 0 1.3 32.7 32.9 32.7h222.8c0 0 32.9 1 32.9 33.2v338"
							/>
						</svg>
						{/* Mobile SVG - shown below sm breakpoint */}
						<svg
							version="1.2"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 95 1866"
							width="100%"
							height="100%"
							preserveAspectRatio="xMidYMid meet"
							overflow="visible"
							className="block sm:hidden"
						>
							<style>{SVG_CURVE_STYLE}</style>
							<path
								ref={pathRefMobile}
								fillRule="evenodd"
								className="curve-a"
								d="m3 0.8v323.1c0 0 0.9 33.9 32.9 33.9h22.8c0 0 32.9 0.1 32.9 33.2v597.5c0 0 0 32.6-32.9 32.6h-22.9c0 0-32.9 1.4-32.9 33.2v407.6c0 0 1.3 32.7 32.9 32.7h22.8c0 0 32.9 1 32.9 33.2v338"
							/>
						</svg>
						<Milestone
							title="2016"
							description="Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad."
							widthClasses="w-[160px] sm:w-[250px]"
							variant="left-left"
							position="5%"
							milestoneRef={milestone1}
						/>
						<Milestone
							title="2019"
							description="Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad."
							widthClasses="w-[160px] sm:w-[250px]"
							variant="right-right"
							position="25%"
							milestoneRef={milestone2}
						/>
						<Milestone
							title="2020"
							description="Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad."
							widthClasses="w-[150px] sm:w-[250px]"
							variant="left-right"
							position="40%"
							milestoneRef={milestone3}
						/>
						<Milestone
							title="2022"
							description="Ut labore et dolore magna aliqua. Ut enim ad."
							widthClasses="w-[160px] sm:w-[220px]"
							variant="right-left"
							position="59%"
							milestoneRef={milestone4}
						/>
						<Milestone
							title="2023"
							description="Incididunt ut labore et dolore."
							widthClasses="w-[160px] sm:w-[250px]"
							variant="left-left"
							position="71%"
							milestoneRef={milestone5}
						/>
						<Milestone
							title="2026"
							description="Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad."
							widthClasses="w-[160px] sm:w-[250px]"
							variant="right-right"
							position="85%"
							milestoneRef={milestone6}
						/>
					</div>
				</div>
				<div ref={bodyCopyRef} className="w-[88%] lg:w-[28%]">
					<h1 className="text-[34px] sm:text-[5vw] uppercase font-mainfont font-black tracking-[-0.08em] leading-[0.8em] mb-[0.5em]">Ut enim <br className="hidden sm:inline" />ad minim <br className="hidden sm:inline" />veniam</h1>

					<p className="text-[16px] sm:text-[18px] opacity-60 leading-[1.3em] mb-[1.4em]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>

					<p className="text-[16px] sm:text-[18px] opacity-60 leading-[1.3em] mb-[1.4em]">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.</p>
				
					<h2 className="text-[24px] sm:text-[2vw] font-mainfont font-medium tracking-[-0.03em] leading-[1.0em] mt-[1.5em] mb-[0.5em]">Ullamco Laboris</h2>

					<p className="text-[16px] sm:text-[18px] opacity-60 leading-[1.3em] mb-[1.4em]">Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
				</div>
			</div>
		</section>
	);
}