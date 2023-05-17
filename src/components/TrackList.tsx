import React, { useEffect, useState } from 'react'
import CreateTrack from './CreateTrack'
import CreateProfile from './CreateProfile'
import { Track, getUserProfile, fetchData} from "../utils/api"


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
    const [userProfile, setUserProfile] = useState<userProfile>();

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
        <div className="bg-tracklist rounded-3xl w-3/5 flex flex-row justify-between">
            <ul
             className="space-y-3 py-2 px-3"
            >
                {tracks.map((track, index) => (
                    <CreateTrack key={index} track={track} index={index}/>
                ))}
            </ul>

            <CreateProfile username={userProfile?.username} realname={userProfile?.realname} profile_url={userProfile?.profile_url}/>
        </div>
    )
}