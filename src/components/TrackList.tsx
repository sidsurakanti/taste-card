import React, { useEffect, useState } from 'react'
import CreateTrack from './CreateTrack'
import CreateProfile from './CreateProfile'
import { Track, getUserProfile, fetchData} from "../utils/api"


interface TracksProp {
    user: string,
    period: string,
}

interface userProfile {
    username: string;
    realname: string;
    profile_url: string;
}

export default function Tracks({ user, period }: TracksProp) {
    const [tracks, setTracks] = useState<Track[]>([])
    const [userProfile, setUserProfile] = useState<userProfile>();

    // fetch top 5 tracks for user synchronously
    useEffect(() => {
        fetchData({user, period, setTracks});

        getUserProfile(user)
            .then((result: userProfile) => setUserProfile(result))
            .catch((error) => {
                console.error("Error fetching user profile picture:", error);
            });
    }, [user, period])

    return (
        <div className="bg-tracklist rounded-3xl w-3/5 flex flex-row justify-between">
            <ul
             className="space-y-3 py-2 px-3"
            >
                {tracks.map((track, index) => (
                    <CreateTrack 
                        key={index}
                        track={track}
                        index={index}
                    />
                ))}
            </ul>

            <CreateProfile 
                username={userProfile?.username}
                realname={userProfile?.realname}
                profile_url={userProfile?.profile_url}
            />
        </div>
    )
}