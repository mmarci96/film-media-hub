import { title } from "@/components/primitives";
import { useState } from "react";
import DefaultLayout from "@/layouts/default";
import MediaList from "@/components/media/media-list";
import { useTmdb } from "@/hooks/use-tmdb";
import { ListType } from "@/types";

export default function MoviesPage() {
    const [page, setPage] = useState(1);
    const [listType, setListType] = useState<ListType>("popular")
    const mediaType = 'movie'
    const { mediaList, error, loading } = useTmdb(mediaType, page, listType);
    const onLoadMore = (page: number) => {
        setPage(page);
    }

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

