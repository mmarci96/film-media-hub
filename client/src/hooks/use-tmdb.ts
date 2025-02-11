import { useEffect, useState } from "react";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

import { UseTmdbResult, MediaType, MediaItem, ListType } from "@/types";
const PREFIX_800 = 'https://image.tmdb.org/t/p/w780'
const PREFIX_400 = 'https://image.tmdb.org/t/p/w400'
export const useTmdb = (
    type: MediaType,
    page: number,
    list: ListType,
): UseTmdbResult => {
    const [mediaList, setMediaList] = useState<MediaItem[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const updateIdList = (list: MediaItem[]): number[] => {
        return list.map((movie) => movie.id);
    };

    const checkMediaListForDuplicates = (list: MediaItem[]): MediaItem[] => {
        const idList = updateIdList(list);

        return list
            .filter((movie, index) => idList.indexOf(movie.id) === index)
            .map(movie => ({
                ...movie,
                ['backdrop_path']: PREFIX_800 + movie['backdrop_path'],
                ['poster_path']: PREFIX_400 + movie['poster_path'],
                ['mediaType']: type
            }));
    };

    const fetchMedia = async (
        type: MediaType,
        currentPage: number,
        tmdbList: ListType,
    ) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/${type}/${tmdbList}?language=en-US&page=${currentPage}`,
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
            const mediaListed = checkMediaListForDuplicates(
                data.results as MediaItem[],
            );

            setMediaList((prevList) =>
                currentPage === 1 ? mediaListed : [...(prevList || []), ...mediaListed],
            );
        } catch (err) {
            if (err instanceof Error) {
                console.error("Failed to fetch movie list:", err.message);
                setError(err.message);
            } else {
                console.error("Unexpected error:", err);
                setError("An unknown error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedia(type, page, list);
    }, [type, page, list]);

    return { mediaList, error, loading };
};
