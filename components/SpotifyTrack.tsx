import type { SpotifyTrackItem, SpotifyArtist } from "@lib/defintions";
import { cn } from "@lib/utils";
import Image from "next/image";
import { inter } from "@/styles/fonts";
import { SpotifyAPI } from "@lib/spotify";

export async function SpotifyTrackDisplay({
	track,
	index,
	instance,
}: {
	track: SpotifyTrackItem;
	index: number;
	instance: SpotifyAPI;
}) {
	const { name, artists, album } = track;
	const artist: SpotifyArtist = await instance.getArtistWithUrl(
		artists[0].href
	);

	// get artist and album images
	const artistImage: string = artist.images[0].url;
	const albumImage: string = album.images[1].url;

	// set the artist image as the background img for the card
	const bgImageStyling = {
		backgroundImage: `url(${artistImage})`,
		backgroundSize: "cover",
		backgroundRepest: "no-repeat",
		backgroundPosition: "center",
	};

	return (
		<li className="group relative bg-black text-white p-5 rounded-2xl overflow-hidden shadow-md hover:scale-[.98]">
			<span
				style={bgImageStyling}
				className="absolute h-full w-full z-0 top-0 left-0 right-0 bottom-0 opacity-60 group-hover:opacity-30 transition-opacity duration-100 ease-in-out"
			/>

			{/* card content */}
			<section className="w-full flex items-center justify-between">
				<div className="flex items-center gap-5 group-hover:md:translate-x-20 transition-transform duration-500">
					{/* we can't use next/image here because something doesn't work when we're downloading it */}
					{/* the performance downgrade is negligable */}
					<Image
						src={albumImage}
						alt="album image"
						width={90}
						height={90}
						className="z-20 relative rounded-xl"
						unoptimized // the optimized image type isn't supported when downloading the image
					/>

					<span className="z-10 relative">
						<p className="font-medium text-lg">{name}</p>
						<p>{artists.map((artist): string => artist.name).join(", ")}</p>
					</span>
				</div>

				<p className={cn("text-5xl font-bold", inter.className)}>{index + 1}</p>
			</section>
		</li>
	);
}
