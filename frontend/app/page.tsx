"use client";

import { useRef } from "react";
import Hero from "@/app/components/hero/section";
import Services from "@/app/components/services/section";
import Expertise from "@/app/components/expertise/section";
import About from "@/app/components/about/section";
import Highlights from "@/app/components/highlights/section";
import Footer from "@/app/components/footer";

export default function Home() {
	const wRef = useRef<HTMLDivElement>(null);
	
	return (
		<div ref={wRef}>
		{/* <SmoothScroll> */}
			<Hero />
			<Expertise wrapperRef={wRef} />
			<Services />
			<About />
			<Highlights />
			<Footer />
		{/* </SmoothScroll> */}
		</div>
	);
}
