import { Card } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import MediaCard from "@/components/media/media-card";
import React, { useState, useEffect } from "react"
import { ListType, MediaItem, MediaType } from "@/types";

interface MediaListProps {
    mediaType: MediaType;
    listType: ListType;
    mediaList: MediaItem[] | null;
    error: string | null;
    loading: boolean;
    onLoadMore: (page: number) => void;
    onSelectListType: (listType: ListType) => void;
}

const MediaList: React.FC<MediaListProps> = (
    { mediaType, listType, mediaList, error, loading, onLoadMore, onSelectListType }
) => {
    const [page, setPage] = useState(1);
    //const [listType, setListType] = useState<ListType>(defaultListType);

    useEffect(() => {
        onLoadMore(page);
    }, [page, onLoadMore]);

    const listOptions: ListType[] = [
        "popular",
        "top_rated",
    ];
    if (mediaType === 'movie') {
        listOptions.push("upcoming", "now_playing")
    }
    if (mediaType === 'tv') {
        listOptions.push('on_the_air', 'airing_today')
    }

    const handleListTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        //setListType(e.target.value as ListType);
        onSelectListType(e.target.value as ListType)
        onLoadMore(1);
    };

    return (
        <section className="flex flex-col items-center justify-center py-2 md:py-4 -mt-16">
            <div className="mb-4">
                <Select
                    className="min-w-[320px] w-[52vw]"
                    label="Select List:"
                    value={listType}
                    placeholder="Select list to show..."
                    onChange={handleListTypeChange}
                >
                    {listOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                            {option[0].toUpperCase() + option.split("_").join(" ").substring(1)}
                        </SelectItem>
                    ))}
                </Select>
            </div>

            {loading && (
                <div className="flex flex-wrap justify-center">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <Card key={index} className="rounded-lg my-4 mx-2 w-[320px] h-[440px] overflow-hidden shadow-md ring-2 radius-lg" >
                            <Skeleton className="w-[302px] mx-2 my-2 h-[420px] rounded-lg" />
                            <div>
                                <Skeleton className="w-4/5 m-2 rounded-lg">
                                    <div className="h-4 w-full rounded-lg bg-default-200" />
                                </Skeleton>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {error && <p className="text-red-500 font-medium">{error}</p>}

            <div className="flex flex-wrap justify-center w-[92vw]">
                {mediaList?.map((media) => (
                    <div key={media.id}>
                        <MediaCard media={media} mediaType={mediaType} />
                    </div>
                ))}
            </div>

            <div className="mt-6 flex gap-4">
                <Button onPress={() => setPage((prevPage) => prevPage + 1)}>Show More</Button>
            </div>
        </section>
    );
};

export default MediaList;

