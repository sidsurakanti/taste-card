import { fetchTopTracks, getUserProfile } from "@lib/data";
import type { LastFmTrack, LastFmUser } from "@lib/defintions";
import { LastFmTrackCard } from "@components/LastFmTrackCard";
import { LastFmStatsCard } from "@components/LastFmStatsCard";
import { displayPeriod } from "@components/LastFmPeriodSelect";

import Image from "next/image";
import Link from "next/link";

export interface LastFmResultsCardProps {
  username: string;
  period: "overall" | "7day" | "1month" | "3month" | "6month" | "12month";
}

export async function LastFmResultsCard({
  username,
  period,
}: LastFmResultsCardProps) {
  // get user profile
  const userProfile: LastFmUser = await getUserProfile(username);
  const { name, realname }: { name: string; realname: string } = userProfile;
  const pfp: string = userProfile.image[1]["#text"];

  // get top tracks
  const tracks: LastFmTrack[] = await fetchTopTracks({
    username: username,
    period: period,
    limit: 5,
  });

  return (
    <section className="max-w-3xl mx-auto flex-1 flex flex-col p-8 bg-gradient-to-b from-primary/95 via-primary/85 to-primary/75 rounded-2xl shadow-2xl">
      <div className="flex flex-col gap-5 mb-5">
        <div className="flex justify-between items-center">
          <span className="w-fit flex items-center rounded-full p-1 bg-rose-500/25 border border-rose-800/20 shadow-md">
            <Image
              src={pfp ? pfp : "/grain.svg"}
              alt="user profile"
              width={64}
              height={64}
              className="rounded-full border border-rose-500/30"
              unoptimized // the optimized image type isn't supported when downloading the image
            />

            <span className="px-4 text-rose-950">
              <p className="font-medium text-lg">{realname}</p>

              <Link href={`https://last.fm/user/${name}`}>
                <p className="text-sm">/{name}</p>
              </Link>
            </span>
          </span>

          <h1 className="text-rose-950 text-3xl font-semibold px-4">
            {displayPeriod[period]}
          </h1>
        </div>

        <LastFmStatsCard tracks={tracks} />
      </div>

      <ul className="flex flex-col gap-2">
        {tracks.map((track, index) => {
          return (
            <LastFmTrackCard key={track.mbid} track={track} index={index} />
          );
        })}
      </ul>
    </section>
  );
}
