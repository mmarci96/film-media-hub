import { Image } from "@heroui/image";
import GenreList from "@/components/media/media-genres";
import { MediaDetails, MediaItem } from "@/types";
import MediaStatistic from "./media-statistics";

interface PopupDetailsProps {
    mediaDetails: MediaDetails | null;
    media: MediaItem;
}

const PopupDetails: React.FC<PopupDetailsProps> = ({ mediaDetails, media }) => {

    return (
        <div className="flex items-center justify-start">
            <Image
                isBlurred
                className="m-1 object-cover ring-1 shadow-xl"
                height={360}
                src={media.poster_path}
                width={240}
            />
            <div className="flex flex-col items-start gap-2 mx-auto ml-8">
                {mediaDetails && <MediaStatistic mediaDetails={mediaDetails} />}
                <GenreList genres={mediaDetails?.genres} />
            </div>
        </div>
    );
};

export default PopupDetails;
