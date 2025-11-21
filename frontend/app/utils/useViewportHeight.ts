"use client";
import { useEffect, useState } from "react";

export function useViewportHeight() {
	const [vh, setVh] = useState<number>(0);

	useEffect(() => {
	function updateVh() {
		const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
		setVh(viewportHeight);
		document.documentElement.style.setProperty("--vh", `${viewportHeight * 0.01}px`);
	}

	updateVh();

	window.visualViewport?.addEventListener("resize", updateVh);
	window.addEventListener("resize", updateVh);

	return () => {
		window.visualViewport?.removeEventListener("resize", updateVh);
		window.removeEventListener("resize", updateVh);
	};
	}, []);

	return vh;
}