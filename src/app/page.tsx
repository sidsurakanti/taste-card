'use client';

import Tracks from "../components/TrackList"
import NavBar from "../components/NavBar";
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { useRef } from 'react';
import "./styles.css"


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
			<header className="my-10 mx-20">
				<NavBar/>
			</header>
			<section className="my-10 mx-28">
				<div ref={img}>
					<Tracks user="shweeb_"/>
				</div>
			</section>
			<button
				className="button-gradiant w-44 mx-28 p-5 text-white rounded-3xl"
				onClick={downloadImage}
			>
				Download
			</button>
		</>
	)
}
