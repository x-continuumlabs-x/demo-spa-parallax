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
			<Hero wrapperRef={wRef} />
			<Hero wrapperRef={wRef} />
			<Hero wrapperRef={wRef} />
			<Hero wrapperRef={wRef} />
			{/* <Expertise wrapperRef={wRef} />
			<Services wrapperRef={wRef} />
			<About wrapperRef={wRef} />
			<Highlights wrapperRef={wRef} /> */}
			<Footer />
		</div>
	);
}
