import { title } from "@/components/primitives";
import MediaList from "@/components/media/media-list";
import DefaultLayout from "@/layouts/default";
import { useTmdb } from "@/hooks/use-tmdb";
import { useState } from "react";
import { ListType } from "@/types";

export default function SeriesPage() {
    const [page, setPage] = useState(1);
    const [listType, setListType] = useState<ListType>('popular')
    const mediaType = 'tv'

    const { mediaList, error, loading } = useTmdb(mediaType, page, listType);
    const onLoadMore = (page: number) => {
        setPage(page);
    }

    return (
        <DefaultLayout>
            <div className="hidden md:inline-block py-0 mt-6 w-8">
                <h1 className={title()}>Series</h1>
            </div>
            <MediaList
                mediaList={mediaList}
                mediaType={mediaType}
                listType={listType}
                onLoadMore={onLoadMore}
                error={error}
                loading={loading}
                onSelectListType={setListType}
            />
        </DefaultLayout>
    );
}
