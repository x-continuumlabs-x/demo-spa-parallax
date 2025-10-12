import Image from "next/image";
export default function Expertise(){
	return(
		<>
			<div className="relative w-full overflow-hidden">
				<Image
					src="/local-images/section-bg-expertise.jpg"
					alt="Photo portrait of a young man"
					width={3200}
					height={2863}
	
					style={{
						width: '100%',
						height: 'auto',
					}}
					priority
				/>
				<div className="absolute top-0 left-0">
					<h1>Amet</h1>
				</div>
			</div>
		</>);
}