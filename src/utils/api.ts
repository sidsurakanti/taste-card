import { Dispatch, SetStateAction } from "react"

const API =  "http://ws.audioscrobbler.com/2.0/"
const apiKey = "e0e89b5cfe9a4e2788c1cc83a083348d"

export async function getUserProfile(user: string) {
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
    const endpoint: string = `${API}?method=user.gettoptracks&user=${user}&api_key=${apiKey}&period=12month&limit=5&format=json`
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
    setTracks: Dispatch<SetStateAction<Track[]>>
}

export async function fetchData({user, setTracks}: fetchDataProps) {
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
