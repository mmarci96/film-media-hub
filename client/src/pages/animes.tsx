import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import MediaList from "@/components/media/media-list";
import { useAnime } from "@/hooks/use-anime";
import { useState } from "react";
import { ListType } from "@/types";

export default function AnimePage() {
    const [page, setPage] = useState(1);
    const [currentListType, setCurrentListType] = useState<ListType>("popular");
    const { loading, error, animeList } = useAnime(currentListType, page);
    const mediaType = "anime";
    const onLoadMore = (page: number) => {
        setPage(page);
    };
    const handleListSelect = (selectList: ListType) => {
        setCurrentListType(selectList);
    };

    return (
        <DefaultLayout>
            <div className="hidden md:inline-block py-0 mt-6 w-8">
                <h1 className={title()}>Anime</h1>
            </div>
            <MediaList
                mediaType={mediaType}
                listType={currentListType}
                onSelectListType={handleListSelect}
                mediaList={animeList}
                loading={loading}
                error={error}
                onLoadMore={onLoadMore}
            />
        </DefaultLayout>
    );
}
