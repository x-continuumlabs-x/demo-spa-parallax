/**
 * Detects touch-enabled or low-power devices
 * Used to determine which GSAP animation system to initialize
 * Must be called client-side only (inside useEffect/useGSAP)
 */
export function isTouchLowPowerDevice(): boolean {
	if (typeof window === "undefined") return false;

	const hasTouch =
		"ontouchstart" in window ||
		navigator.maxTouchPoints > 0;

	const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

	const prefersReducedMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)"
	).matches;

	return hasTouch || isCoarsePointer || prefersReducedMotion;
}
