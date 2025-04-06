import { useState } from "react";
import { MediaDetails, MediaItem, MediaSearchItem, MediaType } from "@/types";
const PREFIX_800 = "https://image.tmdb.org/t/p/w780/";
const PREFIX_400 = "https://image.tmdb.org/t/p/w400/";
export const useTmdbDetails = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchMediaDetails = async (
        id: number | string,
        type: MediaType,
    ): Promise<MediaDetails | void> => {
        setLoading(true);
        try {
            const response = await fetch(`/api/v1/tmdb_id/${type}/${id}`, {
                method: "GET",
                headers: {
                    accept: "application/json",
                },
            });
            if (!response.ok) {
                setError("Bad request error.");
            }
            const data = await response.json();
            const details: MediaDetails = data;
            details["poster_path"] = PREFIX_400 + details["poster_path"];
            details["backdrop_path"] = PREFIX_800 + details["backdrop_path"];
            details.mediaType = type;
            return details;
        } catch (err) {
            const msg = "There was an error fetching the data.";
            console.error(err);
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const fetchTmdbSearchData = async (
        searchTerm: string,
        page: number,
    ): Promise<MediaItem[]> => {
        try {
            const url = `/api/v1/tmdb/movie/popular?page=${page}&search=${searchTerm}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(
                    `Error: ${response.status} ${response.statusText}`,
                );
            }

            const data = await response.json();
            const results: MediaItem[] = data.results.map(
                (result: MediaSearchItem) => ({
                    id: result.id,
                    title: result?.name,
                    name: result?.title,
                    mediaType: result?.media_type,
                    overview: result?.overview,
                    backdrop_path: PREFIX_800 + result.backdrop_path,
                    poster_path: PREFIX_400 + result.poster_path,
                }),
            );

            return results;
        } catch (err: Error | any) {
            console.error("Failed to fetch data:", err);
            setError(err.message);
            return [];
        } finally {
            setLoading(false);
        }
    };

    return { fetchMediaDetails, error, loading, fetchTmdbSearchData };
};
