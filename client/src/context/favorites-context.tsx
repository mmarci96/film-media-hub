import { createContext, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
interface FavoritesContentList {
    favoriteList: string[];
    addToFavorite: (mediaId: string | number) => Promise<void>;
    removeFavorite: (mediaId: string | number) => Promise<void>;
    fetchFavorites: () => Promise<void>;
}

export const FavoritesContext = createContext<FavoritesContentList>({
    favoriteList: [],
    addToFavorite: async () => { },
    removeFavorite: async () => { },
    fetchFavorites: async () => { }
});

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
    const [favoriteList, setFavoriteList] = useState<string[]>([])
    const { token } = useAuth()

    const fetchFavorites = async (): Promise<void> => {
        try {
            const res = await fetch('/api/users/favorites', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            })
            if (res.ok) {
                const { data } = await res.json()
                const favorites = data;
                setFavoriteList(favorites)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const addToFavorite = async (mediaId: string | number): Promise<void> => {
        try {
            const res = await fetch('/api/users/favorites', {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ mediaId: mediaId.toString() })
            })
            if (res.ok) {
                const data = await res.json()
                setFavoriteList(prev => ([...prev, mediaId.toString()]))
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
            value={{ favoriteList, addToFavorite, removeFavorite, fetchFavorites }}
        >
            {children}
        </FavoritesContext.Provider>
    )

}

