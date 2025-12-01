"use client";

import { Props } from "@/types";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "@/app/lib/gsap";

export default function About({ wrapperRef }: Props) {
	const pathRef = useRef<SVGPathElement>(null);
	const sectionRef = useRef<HTMLElement>(null);

	useGSAP(() => {
		if (!pathRef.current || !sectionRef.current) return;

		// Start with path not drawn
		gsap.set(pathRef.current, { drawSVG: "0%" });

		// Animate the path drawing as user scrolls
		gsap.to(pathRef.current, {
			drawSVG: "100%",
			ease: "none",
			scrollTrigger: {
				trigger: sectionRef.current,
				start: "top bottom",
				end: "bottom top",
				scrub: 1,
			}
		});
	}, { scope: wrapperRef });

	return(
		<section ref={sectionRef} className="relative w-full overflow-hidden">
			<div className="flex justify-evenly">
				<div className="w-1/3 flex items-center flex-col">
					<div className="w-[30%]">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 234 1474"
							width="100%"
							// height="1474"
							>
							<path
								ref={pathRef}
								fillRule="evenodd"
								d="M3 0.8v255.2s0.7 26.8 26 26.8h176s26 0.1 26 26.2v472s0 25.8-26 25.8H55s-26 1.1-26 26.2v322s1 25.8 26 25.8h176s26 0.8 26 26.2v267"
								style={{
								fill: "none",
								stroke: "#959493",
								strokeMiterlimit: 100,
								strokeWidth: 5,
								}}
							/>
						</svg>
					</div>
					<div>
						<h3 className="text-[22px] uppercase font-nominee font-black tracking-[-0.03em] leading-[0.8em]">2016</h3>
						<p>Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.</p>
					</div>
					<div>
						<h3 className="text-[22px] uppercase font-nominee font-black tracking-[-0.03em] leading-[0.8em]">2016</h3>
						<p>Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.</p>
					</div>
					<div>
						<h3 className="text-[22px] uppercase font-nominee font-black tracking-[-0.03em] leading-[0.8em]">2016</h3>
						<p>Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.</p>
					</div>
					<div>
						<h3 className="text-[22px] uppercase font-nominee font-black tracking-[-0.03em] leading-[0.8em]">2016</h3>
						<p>Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.</p>
					</div>
				</div>
				<div className="w-1/3">
					<h1 className="text-[5vw] uppercase font-nominee font-black tracking-[-0.08em] leading-[0.8em] mb-[15px]">Ut enim <br />ad minim <br />veniam</h1>

					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

					<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				
					<h2 className="text-[2vw] font-nominee font-medium tracking-[-0.03em] leading-[1.0em] mb-[15px]">Ullamco Laboris</h2>

					<p>Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				</div>
			</div>
		</section>
	);
}