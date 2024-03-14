import { cn } from "@lib/utils";
import { LastFmTrack } from "@lib/defintions";
import { inter } from "@/styles/fonts";
import Image from "next/image";

export function LastFmStatsCard({ tracks }: { tracks: LastFmTrack[] }) {
	// get user's scrobbling stats
	// * note: scrobble = one play of a song
	const totalScrobbles = tracks.reduce(
		(prev, curr) => prev + Number(curr.playcount),
		0
	);

	const totalMinutes = Math.floor(
		tracks.reduce(
			(prev, curr) =>
				prev + (Number(curr.duration) / 60) * Number(curr.playcount),
			0
		)
	);

	return (
		<div className="flex flex-col md:flex-row justify-around items-center py-8 gap-3 bg-sky-500/25 text-sky-950 border border-sky-800/20 rounded-xl shadow-md hover:scale-95 transition-transform duration-150 text-center ">
			<span>
				<p className={cn("font-bold text-5xl tracking-tight", inter.className)}>
					{totalScrobbles.toLocaleString()}
				</p>

				<p>scrobbles</p>
			</span>

			<Image src="/split.svg" alt="div splitter" width={40} height={40} />

			<span>
				<p className={cn("font-bold text-5xl tracking-tight", inter.className)}>
					{totalMinutes.toLocaleString()}
				</p>

				<p>minutes listened</p>
			</span>
		</div>
	);
}
