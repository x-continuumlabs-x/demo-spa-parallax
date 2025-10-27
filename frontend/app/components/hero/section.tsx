"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default function Hero() {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const myDivRef = useRef<HTMLDivElement>(null);

  const imgWidthLandscape = 3200;
  const imgHeightLandscape = 2883;
  const heightRatioLandscape = imgHeightLandscape / imgWidthLandscape;
  const imgWidthPortrait = 3200;
  const imgHeightPortrait = 5803;
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

      gsap.fromTo(
        imageContainerRef.current,
        { width: "107vw" },
        { width: "100vw", duration: 3.5, ease: "expo.out" }
      );

      ScrollTrigger.create({
        trigger: myDivRef.current,
        start: "top 20%",
  		end: "+=50%",
        pin: true,
        pinSpacing: false,
        markers: true,
      });

      // Refresh ScrollTrigger after everything is ready
      ScrollTrigger.refresh();
    };

    checkSmoother();
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
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

		<div
		ref={myDivRef}
		id="myDiv"
		className="absolute top-[30vw] left-[10vw] w-1/5"
		// data-speed="0.5" // Removed: conflicts with pinning
		// data-lag="0"
		>
		<p className="text-[15px] text-[#b082db] leading-[1.0em]">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit,
			sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
		</p>
		</div>
      </div>
    </section>
  );
}