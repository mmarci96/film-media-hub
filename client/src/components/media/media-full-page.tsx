import { MediaDetails } from "@/types";
import MediaGenres from '@/components/media/media-genres'
import {
    Card,
    Image,
    Chip,
    Badge,
    Avatar,
    CardBody,
    Divider
} from "@heroui/react";

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
                    <div className="flex justify-between" >
                        <h1> {mediaDetails.title} </h1>
                        <h2 className="text-gray-400">
                            {mediaDetails.tagline}
                        </h2>
                        <Image
                            src={mediaDetails.poster_path}
                            alt={mediaDetails.title}
                            className="rounded-xl shadow-2xl ml-auto mr-0 w-[40vw] min-w-[280px]"
                        />
                    </div>
                    <div className="col-span-12 md:col-span-8 lg:col-span-9 space-y-6">
                        {mediaDetails?.genres && <MediaGenres genres={mediaDetails.genres} />}
                        <Card className="gap-4">
                            <CardBody >
                                <div className="flex">
                                    <Chip variant="bordered">
                                        Release Date
                                    </Chip>
                                    <p>{mediaDetails?.release_date}</p>
                                </div>
                                {mediaDetails?.runtime &&
                                    <div className="flex">
                                        <Chip variant="bordered">
                                            Runtime
                                        </Chip>
                                        <p>{mediaDetails.runtime}
                                        </p>
                                    </div>}

                                {mediaDetails.budget &&
                                    <div className="flex">
                                        <Chip variant="bordered">
                                            Budget
                                        </Chip>
                                        <p>{formatCurrency(mediaDetails.budget)}
                                        </p>
                                    </div>}

                                <div className="flex">
                                    <Chip variant="bordered">
                                        Revenue
                                    </Chip>
                                    <p>{mediaDetails.revenue}</p>
                                </div>
                                <div className="flex">
                                    <Chip variant="bordered">
                                        Status
                                    </Chip>
                                    <p>{mediaDetails.status}</p>
                                </div>
                            </CardBody>
                        </Card>

                        <Divider />

                        <Chip variant="bordered" className="text-lg">
                            Overview
                        </Chip>
                        <p className="text-md p-4">
                            {mediaDetails.overview}
                        </p>
                        <div className="space-y-2">
                            <Chip variant="bordered">Production Companies</Chip>
                            <div className="flex flex-wrap gap-4">
                                {mediaDetails.production_companies?.map((company) => (
                                    <div
                                        key={company.id}
                                        className="flex items-center gap-2 bg-gray-800 rounded-lg p-2"
                                    >
                                        {company.logo_path && (
                                            <Avatar
                                                src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                                                alt={company.name}
                                                size="sm"
                                            />
                                        )}
                                        <Chip variant="bordered">{company.name}</Chip>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Ratings */}
                        <div className="flex items-center gap-4">
                            <Badge variant="flat">
                                ⭐ {mediaDetails?.vote_average?.toFixed(1)}
                            </Badge>
                            <Chip className="text-gray-400">
                                ({mediaDetails?.vote_count?.toLocaleString()} votes)
                            </Chip>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default MediaFullPage;
