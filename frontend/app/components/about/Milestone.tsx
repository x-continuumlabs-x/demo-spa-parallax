import { RefObject } from "react";
import TimelineMarker from "./TimelineMarker";

type MilestoneVariant =
	| "left-left"    // text left, marker left of curve (milestone1)
	| "right-right"  // text right, marker right of curve (milestone2)
	| "left-right"   // text left, marker right of curve (milestone3)
	| "right-left";  // text right, marker left of curve (milestone4)

interface MilestoneProps {
	title: string;
	description: string;
	widthClasses: string; // e.g., "w-[160px] sm:w-[250px]"
	variant: MilestoneVariant;
	position: string;
	milestoneRef: RefObject<HTMLDivElement | null>;
}

export default function Milestone({
	title,
	description,
	widthClasses,
	variant,
	position,
	milestoneRef
}: MilestoneProps) {
	// Determine layout based on variant
	const isFlexReverse = variant === "right-right" || variant === "right-left";
	const isTextRight = variant === "right-right" || variant === "right-left";

	// Determine positioning based on variant
	const getPositionClasses = () => {
		switch (variant) {
			case "left-left":
				return "left-[-11px]";
			case "right-right":
				return "right-[-11px]";
			case "left-right":
				return "left-[calc(100%-11px)]";
			case "right-left":
				return "right-[calc(100%-11px)]";
		}
	};

	return (
		<div
			className={`absolute flex ${isFlexReverse ? 'flex-row-reverse' : 'flex-row'} ${getPositionClasses()}`}
			style={{ top: position }}
			ref={milestoneRef}
		>
			<div className="w-[22px] h-[22px] flex-shrink-0">
				<TimelineMarker />
			</div>
			<div className={`pt-[0.04em] px-[0.7em] ${widthClasses} ${isTextRight ? 'text-right' : ''}`}>
				<h3 className="mb-[0.3em] text-[22px] uppercase font-nominee font-black tracking-[-0.03em] leading-[0.8em]">
					{title}
				</h3>
				<p className="text-[14px] leading-[1.2em]">
					{description}
				</p>
			</div>
		</div>
	);
}
