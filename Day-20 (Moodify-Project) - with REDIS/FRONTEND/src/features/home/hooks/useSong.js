import { getSong } from "../service/song.api"
import { useContext } from "react"
import { songContext } from "../context/song.context"

export const useSong = () => {
    const context = useContext(songContext)
    const { song, setSong, loading, setLoading } = context

    const handleGetSong = async ({ mood }) => {
        setLoading(true)
        const data = await getSong({ mood })
        setSong(data.song[0])
        setLoading(false)
    }

    return {
        loading, song, handleGetSong
    }
}