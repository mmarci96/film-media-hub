import { MediaDetails } from "@/types";
import { useState } from "react";
import { AnimeItem } from "@/types";


export const useAnimeDetails = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>(null)
    const fetchAnimeDetails = async (animeId: string): Promise<MediaDetails | void> => {
        setLoading(true)
        try {
            const res = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/full`);
            const { data } = await res.json()
            if (!res.ok) {
                setLoading(false)
                setError("No response from server...")
            }
            const details: AnimeItem = data;
            const date = details?.aired?.from
                ? new Date(details.aired.from).toDateString()
                : "N/A";

            const mediaDetails: MediaDetails = {
                id: details.mal_id,
                mediaType: 'anime',
                title: details.title,
                original_title: details.title_japanese,
                overview: details.synopsis,
                genres: details.genres,
                release_date: date,
                runtime: details?.episodes + "Ep x20",
                vote_average: details.score,
                backdrop_path: details?.images?.jpg?.large_image_url,
                poster_path: details?.images?.jpg?.image_url,
                popularity: details.popularity,
                video: true,
            }

            setLoading(false)
            return mediaDetails;
        } catch (err) {
            setLoading(false)
            setError(err)
        }
    }

    return { fetchAnimeDetails, error, loading };
}

