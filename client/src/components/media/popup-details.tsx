import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";
import { FaStar, FaClock, FaThumbsUp, FaCalendarAlt } from "react-icons/fa";
import GenreList from "@/components/media/media-genres";
import { MediaDetails, MediaItem } from "@/types";

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
                src={media.poster_path?.startsWith('https') ?
                    media.poster_path :
                    `https://image.tmdb.org/t/p/w500/${media.poster_path}`}
                width={240}
            />
            <div className="flex flex-col items-start gap-2 mx-auto ml-8">
                <Chip className="p-2 h-12 bg-90/100 shadow-xl mx-1 rounded-lg flex items-center">
                    <p className="text-lg flex">
                        <FaStar className="m-1 mr-4" color="yellow" />
                        Average vote: {mediaDetails?.vote_average?.toString() ?? "N/A"}
                    </p>
                </Chip>
                <Chip className="p-2 h-12 bg-90/100 shadow-xl mx-1 rounded-lg flex items-center">
                    <p className="text-lg flex">
                        <FaClock className="m-1 mr-4" color="cyan" />
                        Runtime:{" "}
                        {mediaDetails?.runtime ? `${mediaDetails.runtime} min` : "N/A"}
                    </p>
                </Chip>
                <Chip className="p-2 h-12 bg-90/100 shadow-xl mx-1 rounded-lg flex items-center">
                    <p className="text-lg flex">
                        <FaThumbsUp className="m-1 mr-4" color="#639EB8" />
                        Popularity: {mediaDetails?.popularity?.toString() ?? "N/A"}
                    </p>
                </Chip>

                <Chip className="p-2 h-12 bg-90/100 shadow-xl mx-1 rounded-lg flex items-center">
                    <p className="text-lg flex">
                        <FaCalendarAlt className="m-1 mr-4" color="grey" />
                        Release: {mediaDetails?.release_date ?? "N/A"}
                    </p>
                </Chip>
                <GenreList genres={mediaDetails?.genres} />
            </div>
        </div>
    );
};

export default PopupDetails;
