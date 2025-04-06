import { createContext, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { MediaType } from "@/types";
export interface FavoritesContentList {
    addToFavorite: (mediaId: number, mediaType: MediaType) => Promise<void>;
    removeFavorite: (mediaId: string | number) => Promise<void>;
    fetchFavorites: () => Promise<void>;
    favoriteIds: SavedFavoriteIdSet[];
}
export interface SavedFavoriteIdSet {
    id: number;
    tmdb_id: number;
    media_type: MediaType;
}

export interface SavedFavoriteData {
    id: number;
    tmdb_id: number;
    media_type: MediaType;
    status: string;
    updated_at: Date;
}

export const FavoritesContext = createContext<FavoritesContentList>({
    addToFavorite: async () => {},
    removeFavorite: async () => {},
    fetchFavorites: async () => {},
    favoriteIds: [],
});

export const FavoritesProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [favoriteIds, setFavoriteIds] = useState<SavedFavoriteIdSet[]>([]);
    const { token } = useAuth();

    const fetchFavorites = async (): Promise<void> => {
        try {
            const res = await fetch("/api/v1/favorites/id_list", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                const { favorite_ids } = await res.json();
                const favoritesList: SavedFavoriteIdSet[] = favorite_ids;

                if (favoritesList) {
                    setFavoriteIds(() => [...favoritesList]);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const addToFavorite = async (
        mediaId: number,
        mediaType: MediaType,
    ): Promise<void> => {
        try {
            const res = await fetch("/api/v1/favorites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id: mediaId,
                    media_type: mediaType,
                }),
            });
            if (!res.ok) {
                console.error(res);
                return;
            }
            const data: { id: number; tmdb_id: number } = await res.json();
            if (data) {
                setFavoriteIds((prev) => [
                    ...prev,
                    {
                        tmdb_id: data?.tmdb_id,
                        id: data.id,
                        media_type: mediaType,
                    },
                ]);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const removeFavorite = async (tmdbId: string | number): Promise<void> => {
        try {
            const saved = favoriteIds.find((saved) => saved.tmdb_id === tmdbId);
            if (!saved) {
                console.error("This is not a favorite");
                return;
            }

            const res = await fetch(`/api/v1/favorites/${saved.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                const clearedList = favoriteIds.filter(
                    (id) => id.tmdb_id !== tmdbId,
                );
                setFavoriteIds(clearedList);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <FavoritesContext.Provider
            value={{
                addToFavorite,
                removeFavorite,
                fetchFavorites,
                favoriteIds,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};
