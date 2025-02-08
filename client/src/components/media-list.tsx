import { Card } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import { Button } from "@heroui/button";
import MediaCard from "@/components/media-card";
import { useTmdb } from "@/hooks/use-tmdb";
import React, { useState } from "react"
import { ListType, MediaType } from "@/types";

interface MediaListProps {
    mediaType: MediaType;
    listType: ListType;
}

const MediaList: React.FC<MediaListProps> = ({ mediaType, listType }) => {
    const [page, setPage] = useState(1);
    const { mediaList, error, loading } = useTmdb(mediaType, page, listType);

    return (
        <section className="flex flex-col items-center justify-center py-2 md:py-4">

            {loading && (
                <div className="flex flex-wrap justify-evenly">
                    {Array.from({ length: 12 }).map((_, index) => (
                        <Card className="rounded-lg my-4 mx-2 w-[264px] h-[420px] overflow-hidden shadow-md ring-2 radius-lg" >
                            <Skeleton key={index} className=" w-[250px] mx-2 my-2 h-[420px] rounded-lg" />
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

            <div className="flex flex-wrap justify-between w-[92vw]">
                {mediaList?.map((movie) => (
                    <div key={movie.id} >
                        <MediaCard media={movie} mediaType={mediaType} />
                    </div>
                ))}
            </div>

            <div className="mt-6 flex gap-4">
                <Button onPress={() => setPage((prev) => prev + 1)}>Show More</Button>
            </div>
        </section>)
}

export default MediaList
