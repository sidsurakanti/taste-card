const lastFmEndpoint = "http://ws.audioscrobbler.com/2.0/";
const apiKey = process.env.LAST_FM_API_KEY as string;

export async function fetchTopTracks({
	username,
	period,
	limit,
}: {
	username: string;
	period: "overall" | "7day" | "1month" | "3month" | "6month" | "12month";
	limit: number;
}) {
	// create search params to pass to fetch
	const queries = new URLSearchParams({
		method: "user.gettoptracks",
		api_key: apiKey,
		user: username,
		period: period,
		limit: limit.toString(),
		format: "json",
	});
	const url = `${lastFmEndpoint}?${queries}`;
	// console.log(url);

	try {
		const res = await fetch(url);
		// console.log(res);

		if (!res.ok) {
			throw new Error(res.statusText);
		}

		const { toptracks } = await res.json()
		const tracks = toptracks.track.map((track: any) => {
			return {
				name: track.name,
				artist: track.artist.name,
				playcount: track.playcount,
				// image: fetchSpotifyImage(track.artist.name, track.name),
			};
		});
		console.log(toptracks)


	} catch (error) {
		console.log("COULDN'T FETCH TOP TRACKS FOR USER", username);
		throw error;
	}
}

