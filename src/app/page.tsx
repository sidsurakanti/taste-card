'use client';

import Tracks from "./tracks"
import NavBar from "./NavBar";

export default function Main() {
	return (
		<>
			<header className="m-10">
				<NavBar/>
			</header>
			<section className="m-10">
				<div>
					<Tracks user="shweeb_"/>
				</div>
			</section>
		</>
	)
}