import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const API =  "http://ws.audioscrobbler.com/2.0/"
const apiKey = "YOUR_API_KEY"

async function getTopTracks(user: string) {
    const endpoint : string = `${API}?method=user.gettoptracks&user=${user}&api_key=${apiKey}&period=7day&limit=5&format=json`
	const response = await fetch(endpoint)
	const data = await response.json()
    console.log(data)
	return data["toptracks"]["track"]
}	


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


interface TracksProp {
    user: string
}

export default function Tracks({ user }: TracksProp) {
    const [tracks, setTracks] = useState<Track[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tracks = await getTopTracks(user);
                const albumImgPromise = tracks.map((track: Track) => 
                getAlbumImg(track.artist.name, track.name)
                );
                const albumImgs = await Promise.all(albumImgPromise);
                const tracksWithImgs = tracks.map((track: Track, index: number) => ({
                ...track,
                albumImg: albumImgs[index]
              }));
              setTracks(tracksWithImgs);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
        
          fetchData();
    }, [user])

    const getAlbumImg = async (artistName: string, songName: string) => {
        try {
            const endpoint: string = `${API}?method=track.getinfo&artist=${artistName}&track=${songName}&api_key=${apiKey}&autocorrect=1&format=json`;
            const response = await fetch(endpoint);
            const data = await response.json();
        
            const albumImage = data.track.album.image.find(
              (image: { size: string }) => image.size === 'large'
            );
        
            if (albumImage && albumImage['#text']) {
              return albumImage['#text'];
            } else {
              return null; // or return an empty string: ''
            }
        } catch (error) {
            console.error('Error fetching album image:', error);
            return null; // or return an empty string: ''
        }
    };

    return (
        <div className="bg-white rounded-xl w-2/4">
            <ul
             className="space-y-2"
            >
                {tracks.map((track, index) => (
                    <>
                        <li key={index}
                            className="rounded-xl w-2/5 p-3 text-black"
                        >
                            {track.albumImg ? (
                                <Image
                                    src={track.albumImg}
                                    alt="Album Image"
                                    width={90}
                                    height={90}
                                    className="rounded-xl"
                                />
                                ) : (
                                <></>
                            )}
                            {track.name}
                            <br></br>
                            {track.artist.name}
                            <br></br>
                            {track.playcount} plays
                        </li>
                    </>
                ))}
            </ul>
        </div>
    )
}


