import { ListType, MediaItem, Genre } from "@/types"
import { useEffect, useState } from "react"

const BASE_URL = 'https://api.jikan.moe/v4'
interface AnimeItem {
    mal_id: number;
    title?: string;
    title_english?: string;
    title_japanese?: string;
    title_synonyms?: string[];
    overview?: string;
    synopsis?: string;
    genres?: Genre[];
    release_date?: string;
    aired?: {
        from?: string;
        to?: string;
        string?: string;
    };
    runtime?: string;
    episodes?: number;
    score?: number;
    scored_by?: number;
    popularity?: number;
    rank?: number;
    members?: number;
    favorites?: number;
    status?: string;
    season?: string;
    year?: number;
    source?: string;
    rating?: string;
    duration?: string;
    studios?: { mal_id: number; name: string }[];
    producers?: { mal_id: number; name: string }[];
    licensors?: { mal_id: number; name: string }[];
    themes?: { mal_id: number; name: string }[];
    explicit_genres?: { mal_id: number; name: string }[];
    background?: string;
    trailer?: {
        youtube_id?: string;
        url?: string;
        embed_url?: string;
    };
    images?: {
        jpg?: {
            image_url: string;
            small_image_url: string;
            large_image_url: string;
        };
    };
    broadcast?: {
        day?: string;
        time?: string;
        timezone?: string;
    };
}


export const useAnime = (listType: ListType, page: number) => {
    const [animeList, setAnimeList] = useState<MediaItem[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null);

    const getAnimeList = async (
        listType: ListType, page: number
    ): Promise<void> => {
        setLoading(true)
        try {
            let apiUrl = `${BASE_URL}/top/anime`
            if (listType === 'popular') {
                apiUrl += `?order_by=popularity`;
            } else if (listType === "on_the_air") {
                apiUrl += `?filter=airing`;
            } else {
                apiUrl += `?filter=${listType}`
            }

            const res = await fetch(`${apiUrl}?page=${page}`)
            const { data } = await res.json();
            if (!res.ok) {
                console.log(res);
                setError("Unexpected error happenned!")
            }
            console.log(data)
            const list: MediaItem[] = data.map((anime: AnimeItem) => {
                console.log(anime)
                const animeItem: MediaItem = {
                    id: anime.mal_id,
                    title: anime?.title,
                    name: anime?.title_english,
                    overview: anime?.synopsis,
                    poster_path: anime?.images?.jpg?.large_image_url,
                    backdrop_path: anime?.background
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


