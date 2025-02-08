import { ListType, MediaItem } from "@/types"
import { useEffect, useState } from "react"
import { AnimeItem } from "@/types"

const BASE_URL = 'https://api.jikan.moe/v4'

export const useAnime = (listType: ListType, page: number) => {
    const [animeList, setAnimeList] = useState<MediaItem[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null);

    const getAnimeList = async (
        listType: ListType, page: number
    ): Promise<void> => {
        setLoading(true)
        try {
            let apiUrl = ''
            if (listType === 'popular') {
                apiUrl = `${BASE_URL}/top/anime?filter=bypopularity`;
                apiUrl = 'https://api.jikan.moe/v4/top/anime?filter=bypopularity'
            } else if (listType === "on_the_air") {
                apiUrl = `https://api.jikan.moe/v4/top/anime?filter=airing`;
            } else if (listType === 'now_playing') {
                apiUrl = `https://api.jikan.moe/v4/top/anime?filter=favorite`
            } else {
                apiUrl = `https://api.jikan.moe/v4/top/anime?filter=upcoming`
            }

            const res = await fetch(`${apiUrl}&page=${page}`)
            const { data } = await res.json();
            if (!res) {
                setError("Unexpected error happenned!")
            }

            const list: MediaItem[] = data.map((anime: AnimeItem) => {
                console.log(anime)
                const animeItem: MediaItem = {
                    id: anime.mal_id,
                    title: anime?.title,
                    name: anime?.title_english,
                    overview: anime?.overview,
                    poster_path: anime?.images?.jpg?.image_url,
                    backdrop_path: anime?.images?.jpg?.large_image_url
                }
                return animeItem;
            })
            setAnimeList(list)
        } catch (err) {
            setError("Unexpected error happenned during collecting anime!!")
            console.error(err);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getAnimeList(listType, page)
    }, [page, listType])

    return { animeList, error, loading }

}


