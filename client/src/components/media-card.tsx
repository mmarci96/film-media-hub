import { MediaItem, MediaType } from "@/types";
import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import MediaPopup from "./media-popup";

interface MediaCardProps {
    media: MediaItem;
    mediaType: MediaType;
}

const MediaCard: React.FC<MediaCardProps> = ({ media, mediaType }) => {
    return (
        <MediaPopup media={media} mediaType={mediaType}
            children={
                <Card className="rounded-lg my-4 mx-2 max-w-[320px] h-[440px] text-elipsis overflow-hidden shadow-md ring-2 hover:scale-105 cursor-pointer">
                    <CardBody className="p-0 text-elipsis overflow-hidden">
                        <Image
                            fallbackSrc="https://via.placeholder.com/312x432"
                            width={320}
                            height={400}
                            src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
                            alt={media.title || "Movie Poster"}
                            className="rounded-xl pb-0 p-1 object-cover"
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
