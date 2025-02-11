import { title } from "@/components/primitives";
import MediaCard from "@/components/media/media-card";
import { FavoriteElement } from "@/context/favorites-context";
import { useAnimeDetails } from "@/hooks/use-anime-details";
import { useFavorites } from "@/hooks/use-favorites";
import { useTmdbDetails } from "@/hooks/use-tmdb-details";
import DefaultLayout from "@/layouts/default";
import { MediaDetails, mediaDetailToItem, MediaItem, MediaType } from "@/types";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
    const [favoriteMediaList, setFavoriteMediaList] = useState<MediaItem[]>([])
    const { fetchFavorites, favoriteList } = useFavorites();
    const { fetchAnimeDetails } = useAnimeDetails();
    const { fetchMediaDetails } = useTmdbDetails();

    const fetchFavoriteData = async (mediaId: string, mediaType: MediaType): Promise<MediaDetails | null> => {
        try {
            if (mediaType === 'anime') {
                const data = await fetchAnimeDetails(mediaId);
                if (data) return data
            }
            const data = await fetchMediaDetails(parseInt(mediaId), mediaType);
            if (data) return data

            return null
        } catch (error) {
            console.error('Failed to fetch media details:', error);
            return null;
        }
    };
    useEffect(() => {
        fetchFavorites()
    }, [])

    useEffect(() => {
        const fetchMediaDataFromList = async (list: FavoriteElement[]) => {
            const promises: Promise<MediaDetails | null>[] = list.map((favorite) =>
                fetchFavoriteData(favorite.mediaId, favorite.mediaType)
            );

            const results = await Promise.all(promises);
            const validResults: MediaItem[] = results
                .filter((item): item is MediaDetails => item !== null && item !== undefined)
                .map((item): MediaDetails => mediaDetailToItem(item))

            setFavoriteMediaList(validResults);
            console.log(validResults);

        };

        if (favoriteList.length >= 1) {
            fetchMediaDataFromList(favoriteList);
        }
    }, [favoriteList]);

    useEffect(() => {
        console.log(favoriteList)
        console.log(favoriteMediaList);
    }, [favoriteList, favoriteMediaList])

    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="inline-block max-w-lg text-center justify-center">
                    <h1 className={title()}>Favorites Page</h1>
                </div>
                <div className="flex flex-wrap justify-center w-[92vw]">
                    {favoriteMediaList?.map((media) => (
                        <div key={media.id}>
                            <MediaCard media={media} mediaType={media?.mediaType || 'tv'} />
                        </div>
                    ))}
                </div>
            </section>
        </DefaultLayout>
    );
}
