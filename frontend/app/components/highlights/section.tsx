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
				<div className="absolute top-0 left-0 w-full">
					<h1 className="text-[30vw] text-[#b0f3ee] uppercase font-nominee font-black tracking-[-0.08em] leading-[0.6em] text-center m-0 ml-[-0.08em]">Velit</h1>
				</div>
			</div>
		</>);
}