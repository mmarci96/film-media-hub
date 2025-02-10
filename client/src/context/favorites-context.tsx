import { createContext, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { MediaType } from "@/types";
interface FavoritesContentList {
    favoriteList: FavoriteElement[];
    addToFavorite: (mediaId: string | number, mediaType: MediaType) => Promise<void>;
    removeFavorite: (mediaId: string | number) => Promise<void>;
    fetchFavorites: () => Promise<void>;
    favoriteIds: string[];
}
interface FavoriteElement {
    _id: string;
    createdAt: string;
    mediaId: string;
    mediaType: MediaType;
}

export const FavoritesContext = createContext<FavoritesContentList>({
    favoriteList: [],
    addToFavorite: async () => { },
    removeFavorite: async () => { },
    fetchFavorites: async () => { },
    favoriteIds: []
});

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
    const [favoriteList, setFavoriteList] = useState<FavoriteElement[]>([])
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
    const { token } = useAuth()

    const fetchFavorites = async (): Promise<void> => {
        try {
            const res = await fetch('/api/favorites', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            })
            if (res.ok) {
                const { data } = await res.json()
                const favorites: FavoriteElement[] = data;
                console.log("Favorite list: ", favorites);
                setFavoriteList(favorites)

                const idList = favorites.map(favorite => favorite.mediaId);
                console.log("favrite ids: ", idList);
                setFavoriteIds(idList);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const addToFavorite = async (mediaId: string | number, mediaType: MediaType): Promise<void> => {
        try {
            const res = await fetch('/api/favorites', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ mediaId: mediaId.toString(), mediaType })
            })
            if (res) {
                const { data } = await res.json()
                console.log("Favorite added: ", data);

            }
        } catch (err) {
            console.error(err);
        }
    }

    const removeFavorite = async (mediaId: string | number): Promise<void> => {
        try {
            const res = await fetch('/api/users/favorites', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ mediaId: mediaId.toString() })
            })
            if (res.ok) {
                await res.json()
            }
        } catch (err) {
            console.error(err);
        }

    }

    return (
        <FavoritesContext.Provider
            value={{ favoriteList, addToFavorite, removeFavorite, fetchFavorites, favoriteIds }}
        >
            {children}
        </FavoritesContext.Provider>
    )

}

