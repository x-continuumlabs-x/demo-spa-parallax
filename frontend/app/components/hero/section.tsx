"use client";

import { Props } from "@/types";
import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero({ wrapperRef }: Props) {
	const imageContainerRef = useRef<HTMLDivElement>(null);
	const ctaFormBgRef = useRef<HTMLDivElement>(null);
	const imgWidthLandscape = 3200;
	const imgHeightLandscape = 2883;
	const heightRatioLandscape = imgHeightLandscape / imgWidthLandscape;
	const imgWidthPortrait = 3200;
	const imgHeightPortrait = 5803;
	const heightRatioPortrait = imgHeightPortrait / imgWidthPortrait;

	useGSAP(() => {
		gsap.fromTo(
		imageContainerRef.current,
		{ width: "107vw" },
		{ width: "100vw", duration: 3.5, ease: "expo.out" }
		);
	}, { scope: wrapperRef });

	const handleCtaClick = () => {
		if (ctaFormBgRef.current) {
			gsap.to(ctaFormBgRef.current, {
				width: 530,
				height: 500,
				duration: 0.4,
				ease: "power4.inOut"
			});
		}
	};

  return (
    <section className="w-full overflow-hidden" data-speed="0.9">
      <div
        className="relative w-full h-[var(--height-landscape)] portrait:h-[var(--height-portrait)]"
        style={
          {
            "--height-landscape": `calc(${heightRatioLandscape} * 100vw)`,
            "--height-portrait": `calc(${heightRatioPortrait} * 100vw)`,
          } as React.CSSProperties
        }
      >
        <div
          ref={imageContainerRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-full"
        >
          <Image
            src="/local-images/section-bg-hero.jpg"
            alt="Hero"
            width={imgWidthLandscape}
            height={imgHeightLandscape}
            style={{ width: "100%", height: "auto" }}
            className="portrait:hidden"
            priority
          />
          <Image
            src="/local-images/section-bg-hero-portrait.jpg"
            alt="Hero portrait"
            width={imgWidthPortrait}
            height={imgHeightPortrait}
            style={{ width: "100%", height: "auto" }}
            className="hidden portrait:block"
            priority
          />
        </div>

        <div
          className="absolute top-[-13vh] left-0 w-full"
          data-speed="0.7"
        >
          <h1 className="text-[30vw] text-[#b082db] uppercase font-nominee font-black tracking-[-0.08em] leading-[0.6em] text-center m-0 ml-[-0.08em]">
            Nomin
          </h1>
        </div>

		<div className="absolute top-[35vw] left-[10vw] w-1/5" data-speed="0.5">
			<p className="text-[15px] text-[#b082db] leading-[1.0em]">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit,
				sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
			</p>
			<div className="relative">

					<div id="ctaFormBg" ref={ctaFormBgRef} className="absolute bg-[#2b2827] w-[220px] h-[76px] rounded-[20px]"></div>
					<div className="absolute w-[220px] h-[76px] flex items-center">
						<h3>Contact Us</h3>
						<div className="icon"></div>
					</div>
					<div id="ctaClick" onClick={handleCtaClick} className="absolute w-[220px] h-[76px] cursor-pointer"></div>
					<div className="form">
						<div className="fieldName"></div>
						<div className="fieldEmail"></div>
						<div className="fieldCta"></div>
					</div>

			</div>
		</div>
      </div>
    </section>
  );
}