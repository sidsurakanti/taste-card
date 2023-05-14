import Image from 'next/image'

interface Track {
    name: string;
    artist: {
      name: string;
      mbid: string;
    };
    playcount: number;
    image: {
        size: string;
        "#text": string;
    }[];
    albumImg: string;
}

interface TrackProps {
    track: Track
    index: number
}

export default function CreateTrack ({ track, index}: TrackProps) {
    return (
        <li 
            key={index}
            className="rounded-xl p-3 text-black flex flex-row space-x-5"
        >
            <div>
                <Image
                    src={track.albumImg ? track.albumImg : "/filler.jpg"}
                    alt="Album Image"
                    width={100}
                    height={100}
                    className="rounded-xl"
                    priority={true}
                    unoptimized={true}
                />
            </div>
            <div className="flex flex-col font-sans font-medium antialiased">
                <p className="text-lg font-bold antialiased">{track.name.toUpperCase()}</p>
                <p>{track.artist.name.toUpperCase()}</p>
                <p>{track.playcount} PLAYS</p>
            </div>
        </li>
    )
}