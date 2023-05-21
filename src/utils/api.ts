import { Dispatch, SetStateAction } from "react"


const API =  "https://ws.audioscrobbler.com/2.0/"
const apiKey = process.env.NEXT_PUBLIC_LAST_FM_API_KEY

async function getTopTracks(user: string, period: string) {
    const endpoint: string = `${API}?method=user.gettoptracks&user=${user}&api_key=${apiKey}&period=${period}&limit=5&format=json`

    try {
        const response = await fetch(endpoint)

        if (!response.ok) {
            throw new Error(`HTTP error. ${response.status}`)
        }

        const data = await response.json()
        console.log(data.toptracks)
        return data.toptracks.track
    } catch (error) {
        console.error("Error fetching top tracks:", error)
        return null
    }	
}

async function getAlbumImg(artistName: string, songName: string) {
    const endpoint: string = `${API}?method=track.getinfo&artist=${artistName}&track=${songName}&api_key=${apiKey}&autocorrect=1&format=json`

    try {
        const response = await fetch(endpoint)

        if (!response.ok) {
            throw new Error(`HTTP error. ${response.status}`)
        }

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

export interface Track {
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

interface fetchDataProps {
    user: string;
    period: string;
    setTracks: Dispatch<SetStateAction<Track[]>>
}

export async function fetchData({user, period, setTracks}: fetchDataProps) {
    const tracks = await getTopTracks(user, period)

    // fetch album image for each track
    const albumImgPromise = tracks.map((track: Track) => getAlbumImg(track.artist.name, track.name))
    const albumImgs = await Promise.all(albumImgPromise)

    // add .albumImg for each track
    const tracksWithImgs = tracks.map((track: Track, index: number) => ({
        ...track,
        albumImg: albumImgs[index]
    }))

    setTracks(tracksWithImgs)
}

export async function getUserProfile(user: string) {
    const endpoint: string = `${API}?method=user.getinfo&user=${user}&api_key=${apiKey}&format=json`
    try {
        const response = await fetch(endpoint)

        if (!response.ok) {
            throw new Error(`HTTP error. ${response.status}`)
        }

        const data = await response.json()
        console.log(data.user)

        const res = {
            username: data.user.name,
            realname: data.user.realname,
            profile_url:  data.user.image[3]["#text"]
        }
        return res
    } catch (error) {
        console.error('Error fetching user profile:', error)
        return null
    }
}
