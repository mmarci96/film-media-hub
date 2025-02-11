import { MediaDetails } from "@/types";
import { FaQuestionCircle } from "react-icons/fa";
import MediaGenres from '@/components/media/media-genres'
import {
    Card,
    Image,
    Chip,
    Avatar,
    CardBody,
    Divider
} from "@heroui/react";
import MediaStatistic from "./media-statistics";

interface MediaFullPageProps {
    mediaDetails: MediaDetails;
}

const MediaFullPage: React.FC<MediaFullPageProps> = ({ mediaDetails }) => {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="p-4 pt-0 m-2 mt-1">
            {/* Backdrop Image */}
            <div
                className="absolute inset-0 w-full h-full max-h-[480px] bg-cover bg-center"
                style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 1)), url(${mediaDetails.backdrop_path})`, }}
            />

            <div className="!px-0">
                <Card
                    isBlurred
                    className="border-none bg-background/60 dark:bg-default-100/50 w-full m-2 p-3"
                    shadow="sm"
                >
                    <div className="flex w-[86vw] justify-between flex-col sm:flex-row sm:mx-auto" >

                        <div className="flex justify-center sm:justify-normal">
                            <Image
                                src={mediaDetails.poster_path}
                                alt={mediaDetails.title}
                                className="rounded-xl shadow-2xl object-cover max-w-[400px] w-[40vw] min-w-[280px] sm:mx-auto"
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <h1 className="text-2xl font-bold mx-auto"> {mediaDetails.title} </h1>
                            <h2 className="text-lg italic opacity-70">
                                {mediaDetails.tagline}
                            </h2>
                            <div className="mx-2">
                                <MediaStatistic mediaDetails={mediaDetails} />
                                {mediaDetails?.genres &&
                                    <MediaGenres genres={mediaDetails.genres} />}
                            </div>

                        </div>
                    </div>
                    <div className="col-span-12 mt-4 md:col-span-8 lg:col-span-9 space-y-6">
                        <Card >
                            <CardBody className="gap-1 flex flex-row justify-between" >
                                {mediaDetails.budget &&
                                    <div className="flex">
                                        <Chip variant="shadow" className=" text-lg p-2">
                                            Budget
                                        </Chip>
                                        <p className="p-1 italic text-md">{formatCurrency(mediaDetails.budget)}
                                        </p>
                                    </div>}

                                <div className="flex">
                                    <Chip variant="shadow" className=" text-lg p-2">
                                        Revenue
                                    </Chip>
                                    <p className="p-1 italic text-md">{mediaDetails.revenue}</p>
                                </div>
                                <div className="flex">
                                    <Chip variant="shadow" className=" text-lg p-2">
                                        Status
                                    </Chip>
                                    <p className="p-1 italic text-md">{mediaDetails.status}</p>
                                </div>
                            </CardBody>
                        </Card>

                        <Divider />

                        <Chip variant="shadow" className=" text-lg p-2">
                            Overview
                        </Chip>
                        <p className="text-md p-4">
                            {mediaDetails.overview}
                        </p>
                        <div className="pb-8">

                            <Chip variant="shadow" className=" text-lg p-2 my-4">
                                Production Companies</Chip>
                            <div className="flex flex-wrap gap-4 justify-around">
                                {mediaDetails.production_companies?.map((company) => (
                                    <Card
                                        isBlurred
                                        key={company.id}
                                        className="flex  items-center gap-2 bg-background/60  dark:bg-default-100/50 rounded-xl p-2"
                                    >
                                        {company.logo_path ? (
                                            <Avatar
                                                src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                                                alt={company.name}
                                                size="sm"
                                            />
                                        ) : <FaQuestionCircle size={32} />}
                                        <Chip variant="bordered">{company.name}</Chip>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>
            </div >
        </div >
    );
};

export default MediaFullPage;
