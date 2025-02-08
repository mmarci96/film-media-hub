import { useState } from "react";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

import { MediaDetails, MediaType } from "@/types";

export const useTmdbDetails = () => {
    const [error, setError] = useState<string | null>(null);
    const [mediaDetails, setMediaDetails] = useState<MediaDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const fetchMediaDetails = async (id: number, type: MediaType) => {
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
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            setMediaDetails(data as MediaDetails);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not load details.");
        } finally {
            setLoading(false);
        }
    };

    return { fetchMediaDetails, mediaDetails, error, loading };
};
