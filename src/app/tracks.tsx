import React, { useEffect, useState } from 'react'

const API =  "http://ws.audioscrobbler.com/2.0/"
const apiKey = "YOUR_API_KEY"

async function getTopTracks(user: string) {
    const endpoint : string = `${API}?method=user.gettoptracks&user=${user}&api_key=${apiKey}&period=7day&limit=5&format=json`
	const response = await fetch(endpoint)
	const data = await response.json()
    console.log(data)
	return data["toptracks"]["track"]
}	

async function getBgImage(artistName: string, albumName: string) {
    const endpoint : string = `${API}?method=album.getinfo&artist=${artistName}&album=${albumName}&api_key=${apiKey}&autocorrect=1&format=json`
    const response = await fetch(endpoint)
    const data = await response.json()
    console.log(data)
    return 
}

async function getAlbumName(artistName: string, songName: string) {
    const endpoint : string = `${API}?method=track.getinfo&artist=${artistName}&track=${songName}&api_key=${apiKey}&autocorrect=1&format=json`
    const response = await fetch(endpoint)
    const data = await response.json()
    console.log(data)
    return 
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
}

interface TracksProp {
    user: string
}

export default function Tracks({ user }: TracksProp) {
    const [tracks, setTracks] = useState<Track[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const tracks = await getTopTracks(user)
            setTracks(tracks)
        };

        fetchData();
    }, [user])

    return (
        <div className="bg-white rounded-xl w-2/4">
            <ul className="space-y-2">
                {tracks.map((track, index) => (
                    <li key={index}
                        className="bg-gray-400 rounded-xl w-2/5 p-3 text-black"
                    >
                        {track.name}
                        <br></br>
                        {track.artist.name}
                        <br></br>
                        {track.playcount} plays
                    </li>
                ))}
            </ul>
        </div>
    )
}


