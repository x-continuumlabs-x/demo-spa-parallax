# Demo SPA Parallax

A modern, high-performance single-page application showcasing advanced parallax scrolling effects, smooth animations, and responsive design. Built with Next.js 15, GSAP, and Tailwind CSS 4.

## Features

### Advanced Animations

-   **Parallax Scrolling** - Multi-layer depth effects with variable scroll speeds
-   **Image Sequence Animation** - Canvas-based frame-by-frame animations synchronized with scroll position
-   **SVG Path Drawing** - Animated timeline paths with GSAP DrawSVG
-   **Text Reveals** - Character-by-character text animations with split effects
-   **Scroll-Triggered Animations** - Context-aware animations that activate based on viewport position

### Interactive Sections

#### Hero Section

-   Animated contact form with expand/collapse functionality
-   Split text animations for smooth transitions
-   Responsive image handling (landscape/portrait)
-   Auto-scroll to form when expanded

#### Services Section

-   Tab-based service showcase with smooth transitions
-   Synchronized image gallery with scroll-driven animations
-   Auto-tab switching based on scroll progress
-   Manual tab selection with smooth scroll positioning

#### About Section

-   Timeline component with animated SVG curve
-   Milestone markers that fade in/out during scroll
-   Pinned content area on desktop
-   Configurable milestone positioning system

#### Expertise Section

-   Parallax background images
-   Pinned card showcase
-   Responsive image switching (landscape/portrait orientations)

#### Highlights Section

-   Canvas-based image sequence animation (157 frames)
-   Pinned section with extended scroll duration
-   Animated heading with custom letter shapes using CSS
-   Mask reveal animations for progressive text display

### Technical Highlights

-   **Component Architecture** - Modular, reusable components with TypeScript interfaces
-   **Performance Optimized** - Constants extraction, helper functions, minimal re-renders
-   **Responsive Design** - Mobile-first approach with breakpoint-specific layouts
-   **Clean Code** - Refactored codebase with extracted constants and DRY principles
-   **Smooth Scrolling** - GSAP ScrollSmoother integration for native-like smooth scrolling

## Tech Stack

### Core

-   **Next.js 15.5.4** - React framework with Turbopack
-   **React 19.1.0** - UI library
-   **TypeScript 5** - Type safety

### Styling

-   **Tailwind CSS 4** - Utility-first CSS framework
-   **HeroUI** - Component library for tabs, cards, inputs, and buttons

### Animation

-   **GSAP 3.13.0** - Professional-grade animation library
    -   ScrollTrigger - Scroll-based animations
    -   ScrollSmoother - Smooth scrolling
    -   SplitText - Text animation effects
    -   DrawSVG - SVG path animations
-   **@gsap/react** - GSAP React hooks integration
-   **Framer Motion** - Additional animation utilities

## Getting Started

### Prerequisites

-   Node.js 20 or higher
-   npm or yarn

### Installation

1. Clone the repository:

```bash
cd demo-spa-parallax/frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/
│   ├── components/
│   │   ├── about/
│   │   │   ├── section.tsx         # About timeline section
│   │   │   ├── Milestone.tsx       # Reusable milestone component
│   │   │   └── TimelineMarker.tsx  # Timeline marker SVG
│   │   ├── hero/
│   │   │   └── section.tsx         # Hero with contact form
│   │   ├── services/
│   │   │   └── section.tsx         # Tabbed services showcase
│   │   ├── expertise/
│   │   │   └── section.tsx         # Expertise with cards
│   │   ├── highlights/
│   │   │   └── section.tsx         # Image sequence animation
│   │   └── footer/
│   │       └── section.tsx         # Footer section
│   ├── lib/
│   │   └── gsap.ts                 # GSAP configuration & exports
│   ├── layout.tsx                  # Root layout with ScrollSmoother
│   └── page.tsx                    # Main page composition
├── public/
│   ├── headings/                   # SVG heading assets
│   ├── images/               # Images and frame sequences
│   │   └── frames/                 # Canvas animation frames
│   └── *.png                       # Icons and logos
└── types/
    └── index.ts                    # TypeScript type definitions
```

## Key Implementation Details

### Constants Pattern

All magic numbers are extracted to constants at the top of each component:

```typescript
const ANIMATION_DURATIONS = {
	fadeIn: 0.3,
	fadeOut: 0.2,
} as const;

const SCROLL_TRIGGER_SETTINGS = {
	scrub: 1,
	start: "top center",
	end: "bottom center",
} as const;
```

### Helper Functions

Reusable animation logic is extracted to helper functions:

```typescript
const animateMilestoneOnProgress = (
	milestone: HTMLDivElement | null,
	progress: number,
	threshold: number
) => {
	if (!milestone) return;
	const currentOpacity = gsap.getProperty(milestone, "opacity") as number;

	if (progress >= threshold && currentOpacity < 1) {
		gsap.to(milestone, {
			opacity: 1,
			duration: ANIMATION_DURATIONS.fadeIn,
		});
	} else if (progress < threshold && currentOpacity > 0) {
		gsap.to(milestone, {
			opacity: 0,
			duration: ANIMATION_DURATIONS.fadeOut,
		});
	}
};
```

### Responsive Design

Mobile-first approach with tailwind breakpoints:

-   Default: Mobile (<640px)
-   `sm:` Desktop (≥640px)
-   `lg:` Large desktop (≥1024px)

Portrait-specific styles using Tailwind's `portrait:` modifier for device orientation.

### GSAP Integration

GSAP is configured with premium plugins and integrated via `useGSAP` hook:

```typescript
import { gsap, ScrollTrigger, ScrollSmoother, SplitText } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";

useGSAP(
	() => {
		// Animations here
	},
	{ scope: wrapperRef }
);
```

## Configuration

### Milestone Variants

The About section uses a variant-based milestone system:

-   `left-left` - Text left, marker left of curve
-   `right-right` - Text right, marker right of curve
-   `left-right` - Text left, marker right of curve
-   `right-left` - Text right, marker left of curve

### Image Sequence

The Highlights section uses 157 frames (frame_00036 to frame_00192):

-   Format: WebP
-   Resolution: 1280x720
-   Location: `/public/images/frames/`

## Performance Considerations

-   Images are optimized with Next.js Image component
-   Animations use GSAP's efficient rendering pipeline
-   Canvas animations are hardware-accelerated
-   ScrollSmoother provides 60fps smooth scrolling
-   Components use TypeScript for compile-time optimization

## Browser Support

-   Chrome/Edge 90+
-   Firefox 88+
-   Safari 14+
-   Mobile Safari 14+
-   Chrome Mobile 90+

## License

This is a demo project for portfolio purposes.

## Credits

Built with modern web technologies and best practices for creating immersive scrolling experiences.
