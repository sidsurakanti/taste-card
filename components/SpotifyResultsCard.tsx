import { cookieStore } from "@lib/actions";
import { SpotifyAPI } from "@lib/spotify";
import { SpotifyTrackDisplay } from "@components/SpotifyTrack";
import { SpotifySelectPeriod } from "@components/SpotifySelectPeriod";

import type {
  SpotifyAuthToken,
  SpotifyTrack,
  SpotifyUser,
} from "@lib/defintions";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

import Image from "next/image";

// TODO: use middleware to check if user is authorized to access this page
export async function SpotifyResultsCard({
  period,
}: {
  period: "long_term" | "medium_term" | "short_term";
}) {
  // get access token from cookies
  const cookies: ReadonlyRequestCookies = cookieStore();
  const access_token = cookies.get("access_token")?.value as string;
  const refresh_token = cookies.get("refresh_token")?.value as string;
  const token: Partial<SpotifyAuthToken> = { access_token, refresh_token };
  // console.log(token)
  const spotify = new SpotifyAPI(token);

  const currentUser: SpotifyUser = await spotify.getUserDetails();
  const name: string = currentUser.display_name;
  const pfp: string = currentUser.images[1].url; // smaller pfp

  const topTracks: SpotifyTrack = await spotify.getUserTopTracks({
    limit: 5,
    time_range: period,
  });

  return (
    <>
      <SpotifySelectPeriod />
      <section className="max-w-3xl mx-auto flex-1 flex flex-col p-8 bg-gradient-to-b from-primary/95 via-primary/85 to-primary/75 rounded-2xl shadow-2xl">
        <span className="w-fit flex items-center rounded-full p-1 bg-rose-500/25 border border-rose-800/20 mb-5 shadow-md">
          <Image
            src={pfp ? pfp : "/grain.svg"}
            alt="user profile"
            width={64}
            height={64}
            className="rounded-full border border-rose-500/30"
            unoptimized // the optimized image type isn't supported when downloading the image
          />

          <p className="pr-5 pl-3 font-medium text-lg text-rose-950">{name}</p>
        </span>

        <ul className="flex flex-col gap-2">
          {topTracks.items.map((track, index) => (
            <SpotifyTrackDisplay
              key={track.id}
              track={track}
              index={index}
              instance={spotify}
            />
          ))}
        </ul>
      </section>
    </>
  );
}
