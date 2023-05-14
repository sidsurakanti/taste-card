import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import CreateTrack from './CreateTrack'

const API =  "http://ws.audioscrobbler.com/2.0/"
const apiKey = "YOUR_API_KEY"

async function getTopTracks(user: string) {
    const endpoint : string = `${API}?method=user.gettoptracks&user=${user}&api_key=${apiKey}&period=7day&limit=5&format=json`
	const response = await fetch(endpoint)
	const data = await response.json()
    console.log(data)
	return data["toptracks"]["track"]
}

async function getAlbumImg(artistName: string, songName: string) {
    try {
        const endpoint: string = `${API}?method=track.getinfo&artist=${artistName}&track=${songName}&api_key=${apiKey}&autocorrect=1&format=json`
        const response = await fetch(endpoint)
        const data = await response.json()

        const albumImage = data.track.album.image.find(
            (image: { size: string} ) => image.size === 'large'
        )
        
        if (albumImage && albumImage['#text']) {
            return albumImage['#text']
        } else {
            return null
        }
    } catch (error) {
        console.error('Error fetching album image:', error)
        return null
    }
}

interface fetchDataProps {
    user: string;
    setTracks: Dispatch<SetStateAction<Track[]>>
}

async function fetchData({user, setTracks}: fetchDataProps) {
    try {
        const tracks = await getTopTracks(user)

        // fetch album image for each track
        const albumImgPromise = tracks.map((track: Track) => getAlbumImg(track.artist.name, track.name)
        )
        const albumImgs = await Promise.all(albumImgPromise)

        // add .albumImg for each track
        const tracksWithImgs = tracks.map((track: Track, index: number) => ({
            ...track,
            albumImg: albumImgs[index]
        }))

        setTracks(tracksWithImgs)
    } catch (error) {
        console.error('Error fetching data:', error)
    }
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
    
    // fetch top 5 tracks for user
    useEffect(() => {
        fetchData({user, setTracks});
    }, [user])



    return (
        <div className="bg-tracklist rounded-3xl w-2/4">
            <ul
             className="space-y-3 py-2 px-3"
            >
                {tracks.map((track, index) => (
                    <CreateTrack key={index} track={track} index={index}/>
                ))}
            </ul>
        </div>
    )
}