import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import CreateTrack from './CreateTrack'
import Image from 'next/image'

const API =  "http://ws.audioscrobbler.com/2.0/"
const apiKey = "YOUR_LAST_FM_API_KEY"

async function getUserProfile(user: string) {
    const endpoint: string = `${API}?method=user.getinfo&user=${user}&api_key=${apiKey}&format=json`
    const response = await fetch(endpoint)
	const data = await response.json()
    console.log(data.user)
    const res = {
        username: data.user.name,
        realname: data.user.realname,
        profile_url:  data.user.image[3]["#text"]
    }
    return res
}

async function getTopTracks(user: string) {
    const endpoint: string = `${API}?method=user.gettoptracks&user=${user}&api_key=${apiKey}&period=7day&limit=5&format=json`
	const response = await fetch(endpoint)
	const data = await response.json()
    console.log(data.toptracks)
	return data.toptracks.track
}

async function getAlbumImg(artistName: string, songName: string) {
    try {
        const endpoint: string = `${API}?method=track.getinfo&artist=${artistName}&track=${songName}&api_key=${apiKey}&autocorrect=1&format=json`
        const response = await fetch(endpoint)
        const data = await response.json()
        console.log(data)
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
        const albumImgPromise = tracks.map((track: Track) => getAlbumImg(track.artist.name, track.name))
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

interface userProfile {
    username: string;
    realname: string;
    profile_url: string;
}

export default function Tracks({ user }: TracksProp) {
    const [tracks, setTracks] = useState<Track[]>([])
    const [userProfile, setUserProfile] = useState<userProfile[]>([]);

    // fetch top 5 tracks for user synchronously
    useEffect(() => {
        fetchData({user, setTracks});

        // fetch user profile 
        getUserProfile(user)
            .then((result: userProfile) => setUserProfile(result))
            .catch((error) => {
                // handle error if the user profile picture cannot be fetched
                console.error("Error fetching user profile picture:", error);
        });
    }, [user])

    return (
        <div className="bg-tracklist rounded-3xl w-2/4 flex flex-row justify-between">
            <ul
             className="space-y-3 py-2 px-3"
            >
                {tracks.map((track, index) => (
                    <CreateTrack key={index} track={track} index={index}/>
                ))}
            </ul>
            <div className="w-2/5 min-w-max">
                <span className="bg-gray-400 rounded-3xl flex flex-row justify-center gap-4 my-3 mx-3 p-4">
                    <Image 
                            src={userProfile.profile_url}
                            alt="User profile picture"
                            width={90}
                            height={90}
                            className="rounded-full"
                            priority={true}
                            unoptimized={true}
                    />
                    
                    <div className="p-3 space-y-0.5">
                        <p className="text-xl font-bold">{userProfile.realname}</p>
                        <p className="text-lg text-gray-700 font-medium">@{userProfile.username}</p>
                    </div>
                </span>
            </div>
        </div>
    )
}