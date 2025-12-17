export default function TimelineMarker() {
	return (
		<svg
			version="1.2"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 46 46"
			width="22"
			height="22"
		>
			<style>
				{`
				.marker-a { fill: #d7cec4; }
				.marker-b {
					fill: none;
					stroke: #d7cec4;
					stroke-miterlimit: 100;
					stroke-width: 2;
				}
				`}
			</style>

			<path
				fillRule="evenodd"
				className="marker-a"
				d="m23.2 38.5c-8.4 0-15.2-6.8-15.2-15.3 0-8.4 6.8-15.2 15.2-15.2 8.5 0 15.3 6.8 15.3 15.2 0 8.5-6.8 15.3-15.3 15.3z"
			/>
			<path
				fillRule="evenodd"
				className="marker-b"
				d="m23 45c-12.2 0-22-9.8-22-22 0-12.2 9.8-22 22-22 12.2 0 22 9.8 22 22 0 12.2-9.8 22-22 22z"
			/>
		</svg>
	);
}
