import { FavoritesContext } from "@/context/favorites-context"
import { useContext } from "react"

export const useFavorites = () => {
    return useContext(FavoritesContext);
}
