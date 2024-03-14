import type { SpotifyArtist, LastFmTrack } from "@lib/defintions";
import {
  SpotifyOAuth,
  SpotifyAPI,
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  spotifyOAuth,
} from "@/lib/spotify";
import { cn } from "@lib/utils";
import { inter } from "@/styles/fonts";

export async function LastFmTrackCard({
  track,
  index,
}: {
  track: LastFmTrack;
  index: number;
}) {
  const { name, artist, playcount } = track;
  let artistImage: string;

  // const oAuth = new SpotifyOAuth(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

  try {
    const token = await spotifyOAuth.exchangeClientCredsForToken();
    const spotify = new SpotifyAPI({ access_token: token.access_token });

    const spotifyArtist: SpotifyArtist = await spotify.getArtistWithName(
      artist.name,
    );

    artistImage = spotifyArtist.images[0].url;
  } catch (e) {
    console.error(e);
    artistImage = "";
    return null;
  }

  // styling to the album image to the background of the card
  const bgImageStyling = {
    backgroundImage: `url(${artistImage})`,
    backgroundSize: "cover",
    backgroundRepest: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <li className="group relative bg-black text-white p-5 rounded-2xl overflow-hidden shadow-md hover:scale-[.98] transition-transform duration-300">
      {/* background image  */}
      <span
        style={bgImageStyling}
        className="absolute h-full w-full z-0 top-0 left-0 right-0 bottom-0 opacity-60 group-hover:opacity-30 transition-opacity duration-100 ease-in-out"
      />

      {/* card content */}
      <section className="w-full flex items-center justify-between">
        <div className="flex items-center gap-5 group-hover:translate-x-20 transition-transform duration-500">
          <span className="z-10 relative">
            <p className="font-semibold text-lg">{name}</p>
            <p>{artist.name}</p>
            <p className={inter.className}>{playcount} PLAYS</p>
          </span>
        </div>

        <p className={cn("text-5xl font-bold", inter.className)}>{index + 1}</p>
      </section>
    </li>
  );
}
