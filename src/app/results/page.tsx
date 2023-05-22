"use client"

import domtoimage from "dom-to-image"

import { saveAs } from "file-saver"
import { useRef } from "react"
import { useSearchParams } from "next/navigation"

import { InfoCard } from "@/components/InfoCard"


export default function Results() {
	const searchParams = useSearchParams()
	const username = searchParams.get('username')
	const period = searchParams.get('period')

	const img = useRef<HTMLDivElement>(null)

	const downloadImage = () => {
		// @ts-ignore
        domtoimage.toBlob(img.current)
            .then(function (blob) {
                saveAs(blob, 'img.png')
            });
    };	

	return (
		<main>
			<section className="flex flex-col my-8 mx-32 space-y-5">
				<div ref={img}>
					{/* @ts-ignore */}
					<InfoCard user={username} period={period}/>
				</div>
				<div>
				<button
					className="bg-[rgba(0,0,0,.5)]
							   w-40 p-3 
							   text-white text-lg
							   rounded-xl"
					onClick={downloadImage}
				>
					Download
				</button>
				</div>
			</section>
		</main>
	)
}
