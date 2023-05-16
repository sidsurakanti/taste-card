'use client';

import Tracks from "./tracks"
import NavBar from "./NavBar";
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { useRef } from 'react';


export default function Main() {
	const img = useRef<HTMLDivElement>(null);

	const downloadImage = () => {
        domtoimage.toBlob(img.current)
            .then(function (blob) {
                saveAs(blob, 'img.png');
            });
    };	

	return (
		<>
			<header className="m-10">
				<NavBar/>
			</header>
			<section className="m-10">
				<div ref={img}>
					<Tracks user="shweeb_"/>
				</div>
			</section>
			<button
				className="mx-10 bg-gray-300 p-3 font-medium rounded-full"
				onClick={downloadImage}
			>
				Download
			</button>
		</>
	)
}
