import { title } from "@/components/primitives";
import { useFavorites } from "@/hooks/use-favorites";
import DefaultLayout from "@/layouts/default";
import { useEffect } from "react";

export default function FavoritesPage() {
    const { fetchFavorites, favoriteList } = useFavorites();

    useEffect(() => {
        fetchFavorites()
    }, [])

    useEffect(() => {
        console.log(
            favoriteList)
    }, [favoriteList])
    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="inline-block max-w-lg text-center justify-center">
                    <h1 className={title()}>Favorites Page</h1>
                </div>
            </section>
        </DefaultLayout>
    );
}
