# Demo SPA Parallax

Single-page application with parallax scrolling effects and animations. Built with Next.js 15, GSAP, and Tailwind CSS 4.

## Features

### Animations

-   Parallax scrolling with multi-layer depth effects
-   Canvas-based image sequence animation (157 frames)
-   SVG path drawing with GSAP DrawSVG
-   Text split animations
-   Scroll-triggered animations

### Sections

-   **Hero** - Contact form with expand/collapse, split text animations
-   **Services** - Tab-based showcase with auto-switching based on scroll
-   **About** - Timeline with animated SVG curve and milestone markers
-   **Expertise** - Parallax backgrounds with pinned cards
-   **Highlights** - Canvas image sequence animation with mask reveals

## Tech Stack

-   Next.js 15.5.4
-   React 19.1.0
-   TypeScript 5
-   Tailwind CSS 4
-   HeroUI (tabs, cards, inputs, buttons)
-   GSAP 3.13.0 (ScrollTrigger, ScrollSmoother, SplitText, DrawSVG)
-   @gsap/react

## Getting Started

### Requirements

Node.js 20+

### Installation

```bash
cd demo-spa-parallax/frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## Implementation Details

### Constants

Magic numbers are extracted to constants:

```typescript
const ANIMATION_DURATIONS = {
	fadeIn: 0.3,
	fadeOut: 0.2,
} as const;
```

## Configuration

### Milestone Variants

-   `left-left` - Text left, marker left of curve
-   `right-right` - Text right, marker right of curve
-   `left-right` - Text left, marker right of curve
-   `right-left` - Text right, marker left of curve

### Image Sequence

-   Format: WebP
-   Resolution: 1280x720
-   Location: `/public/images/frames/`

## Considerations

-   Before deploying this type of preloader to production and where the primary audince is non-wifi mobile consider reducing the total amount of aseets preloaded for performance reasons

## License

This project is source-available for educational purposes only.
See the LICENSE file for details.
