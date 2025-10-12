import Image from "next/image";
export default function Services(){
	return(
		<>
			<div className="relative w-full overflow-hidden">
				<Image
					src="/local-images/section-bg-highlights.jpg"
					alt="Photo portrait of a young woman"
					width={3200}
					height={3177}
					style={{
						width: '100%',
						height: 'auto',
					}}
					priority
				/>
				<div className="absolute top-0 left-0">
					<h1>$599 Ut architecto voluptatem</h1>
				</div>
			</div>
		</>);
}