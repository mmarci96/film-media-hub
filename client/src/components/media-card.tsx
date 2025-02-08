import { MediaItem, MediaType } from "@/types";
import { Card, CardBody } from "@heroui/card";
import MediaPopup from "./media-popup";

interface MediaCardProps {
    media: MediaItem;
    mediaType: MediaType;
}

const MediaCard: React.FC<MediaCardProps> = ({ media, mediaType }) => {
    return (
        <MediaPopup media={media} mediaType={mediaType}
            children={
                <Card key={media.id} className="rounded-lg my-4 mx-1 max-w-[320px] h-[420px] text-elipsis overflow-hidden shadow-md ring-2 hover:scale-105 cursor-pointer">
                    <CardBody className="p-0 text-elipsis overflow-hidden">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
                            alt={media.title || "Movie Poster"}
                            className="w-[320px] max-h-[380px] rounded-xl pb-0 p-1 object-cover"
                        />
                        <div className="flex justify-center p-2">
                            <h1 className="text-lg font-bold"> {media.name || media.title}
                            </h1>
                        </div>
                    </CardBody>
                </Card>}
        />
    )
}

export default MediaCard;
