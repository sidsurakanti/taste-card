'use client'

import domtoimage from 'dom-to-image';

import { saveAs } from 'file-saver';
import { useRef } from 'react';
import { useSearchParams } from 'next/navigation';

import Tracks from "@/components/TrackList"


export default function Results() {
	const searchParams = useSearchParams()
	const username = searchParams.get('username')
	const period = searchParams.get('period')

	console.log(username)
	console.log(period)

	const img = useRef<HTMLDivElement>(null);

	const downloadImage = () => {
		// @ts-ignore
        domtoimage.toBlob(img.current)
            .then(function (blob) {
                saveAs(blob, 'img.png');
            });
    };	

	return (
		<>
			<section className="my-8 mx-28">
				<div ref={img}>
					{/* @ts-ignore */}
					<Tracks user={username} period={period}/>
				</div>
			</section>
			<button
				className="bg-[rgba(0,0,0,.5)] w-40 mx-28 p-3 text-white text-lg rounded-xl"
				onClick={downloadImage}
			>
				Download
			</button>
		</>
	)
}
