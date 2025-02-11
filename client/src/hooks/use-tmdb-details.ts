import { useState } from "react";
import { MediaDetails, MediaType } from "@/types";
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const PREFIX_800 = 'https://image.tmdb.org/t/p/w780/'
const PREFIX_400 = 'https://image.tmdb.org/t/p/w400/'
export const useTmdbDetails = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchMediaDetails = async (
        id: number, type: MediaType
    ): Promise<MediaDetails | void> => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/${type}/${id}?language=en-US`,
                {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${TMDB_API_KEY}`,
                    },
                },
            );
            if (!response.ok) {
                setError("Unextected error")
            }

            const data = await response.json();
            const details: MediaDetails = data
            details['poster_path'] = PREFIX_400 + details['poster_path'];
            details['backdrop_path'] = PREFIX_800 + details['backdrop_path'];
            details.mediaType = type;
            return details;
        } catch (err) {
            setLoading(false);
            setError(err instanceof Error ? err.message : "Could not load details.");
        }
    };

    return { fetchMediaDetails, error, loading };
};
