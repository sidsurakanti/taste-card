import type { LastFmTrack, LastFmUser, LastFmTrackInfo } from "@lib/defintions";

const LASTFM_API_KEY = process.env.LAST_FM_API_KEY as string;
const lastFmEndpoint = "http://ws.audioscrobbler.com/2.0/";

export async function fetchTopTracks({
  username,
  period,
  limit,
}: {
  username: string;
  period: "overall" | "7day" | "1month" | "3month" | "6month" | "12month";
  limit: number;
}): Promise<LastFmTrack[]> {
  // create search params to pass to fetch
  const queries = new URLSearchParams({
    method: "user.gettoptracks",
    api_key: LASTFM_API_KEY,
    user: username,
    period: period,
    limit: limit.toString(),
    format: "json",
  });

  try {
    const res = await fetch(`${lastFmEndpoint}?${queries.toString()}`);
    const data = await res.json();
    console.log(
      "FETCHED LAST.FM TOP TRACKS FOR USER",
      res.status,
      res.statusText,
    );

    const tracks: LastFmTrack[] = data.toptracks.track;
    // console.log(tracks);

    return tracks;
  } catch (error) {
    console.error("COULDN'T FETCH TOP TRACKS FOR USER", username);
    throw error;
  }
}

export async function getUserProfile(username: string): Promise<LastFmUser> {
  const queries = new URLSearchParams({
    method: "user.getinfo",
    api_key: LASTFM_API_KEY,
    user: username,
    format: "json",
  });

  // console.log(
  // 	"FETCHING LAST.FM USER",
  // 	`${lastFmEndpoint}?${queries.toString()}`
  // );
  const res = await fetch(`${lastFmEndpoint}?${queries.toString()}`);
  console.log("FINISHED FETCHING LAST.FM USER", res.status, res.statusText);

  const { user }: { user: LastFmUser } = await res.json();
  return user;
}

export async function getLastFmTrackInfo(
  track: LastFmTrack,
): Promise<LastFmTrackInfo> {
  const queries = new URLSearchParams({
    method: "track.getInfo",
    api_key: LASTFM_API_KEY,
    artist: track.artist.name,
    track: track.name,
    autocorrect: "1",
    format: "json",
  });

  const res = await fetch(`${lastFmEndpoint}?${queries.toString()}`);
  const data = await res.json();
  const trackInfo: LastFmTrackInfo = data.track;
  return trackInfo;
}
