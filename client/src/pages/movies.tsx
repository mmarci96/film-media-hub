import { title } from "@/components/primitives";
import { useEffect, useState } from "react";
import DefaultLayout from "@/layouts/default";
import MediaList from "@/components/media/media-list";
import { useTmdb } from "@/hooks/use-tmdb";
import { useAuth } from "@/hooks/use-auth";
import { ListType } from "@/types";

export default function MoviesPage() {
    const [page, setPage] = useState(1);
    const [listType, setListType] = useState<ListType>("popular");
    const mediaType = "movie";
    const { mediaList, error, loading } = useTmdb(mediaType, page, listType);
    const onLoadMore = (page: number) => {
        setPage(page);
    };

    const { token } = useAuth();
    const fetchMedia = async (token: string) => {
        const res = await fetch("/api/v1/media", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            console.error(res);
        }
        const { media } = await res.json();
        console.log(media);
    };

    useEffect(() => {
        token && fetchMedia(token);
    }, [token]);

    return (
        <DefaultLayout>
            <div className="hidden md:inline-block py-0 mt-6 w-8">
                <h1 className={title()}>Movies</h1>
            </div>

            <MediaList
                mediaType={mediaType}
                listType={listType}
                mediaList={mediaList}
                onLoadMore={onLoadMore}
                error={error}
                loading={loading}
                onSelectListType={setListType}
            />
        </DefaultLayout>
    );
}
