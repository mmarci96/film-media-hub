import { ListType, MediaItem } from "@/types";
import { useEffect, useState } from "react";

export const useAnime = (listType: ListType, page: number) => {
    const [animeList, setAnimeList] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getAnimeList = async (
        listType: ListType,
        page: number,
    ): Promise<void> => {
        setLoading(true);
        try {
            const res = await fetch(
                `/api/v1/anime?type=${listType}&page=${page}`,
            );
            const data = await res.json();
            if (!res) {
                setError("Unexpected error happenned!");
            }

            const list: MediaItem[] = data;
            setAnimeList(list);
        } catch (err) {
            setError("Unexpected error happenned during collecting anime!!");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getAnimeList(listType, page);
    }, [page, listType]);

    return { animeList, error, loading };
};
