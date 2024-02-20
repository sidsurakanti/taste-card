import { fetchTopTracks } from "@/lib/data"

export default function Overview() {
  const tracks = fetchTopTracks({ username: "shweeb_", period: "3month", limit: 2 })

  return (
    <>
    </>
  )
}