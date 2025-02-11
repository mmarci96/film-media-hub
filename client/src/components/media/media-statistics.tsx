import { FaStar, FaClock, FaCalendarAlt, FaThumbsUp } from "react-icons/fa"
import { Chip } from "@heroui/chip"
import { MediaDetails } from "@/types"

interface MediaStatProps {
    mediaDetails: MediaDetails
}

const MediaStatistic: React.FC<MediaStatProps> = ({ mediaDetails }) => {

    return (
        <>
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
        </>
    )
}

export default MediaStatistic;
