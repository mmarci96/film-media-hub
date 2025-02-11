import { MediaItem } from "@/types"


const MediaSearchResult = ({ results }: { results: MediaItem[] }) => {
    return (
        <div className="absolute z-30 bg-background/80 flex flex-col items-center w-screen h-screen top-[50%] ">
            {results?.map(media => (
                <div key={media.id} className="w-full">
                    <p>{media?.name || media.title}</p>
                </div>
            ))}
        </div>
    )
}

export default MediaSearchResult;
