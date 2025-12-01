import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

// Register all GSAP plugins once at app initialization
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, DrawSVGPlugin);

export { gsap, ScrollTrigger, ScrollSmoother, DrawSVGPlugin };
