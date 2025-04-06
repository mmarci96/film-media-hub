import { MediaDetails } from "@/types";
import { FaQuestionCircle, FaRegStar, FaStar } from "react-icons/fa";
import MediaGenres from "@/components/media/media-genres";
import { Card, Image, Chip, Avatar, CardBody, Divider } from "@heroui/react";
import MediaStatistic from "./media-statistics";
import { useFavorites } from "@/hooks/use-favorites";
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";

interface MediaFullPageProps {
    mediaDetails: MediaDetails;
}

const MediaFullPage: React.FC<MediaFullPageProps> = ({ mediaDetails }) => {
    const [favorite, setFavorite] = useState(false);
    const { favoriteIds, addToFavorite, removeFavorite, fetchFavorites } =
        useFavorites();

    const formatCurrency = (value: number | undefined) => {
        return value
            ? new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
              }).format(value)
            : "N/A";
    };

    const handleAdd = () => {
        addToFavorite(mediaDetails.id, mediaDetails.mediaType);
    };

    const handleRemove = () => {
        removeFavorite(mediaDetails.id);
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    useEffect(() => {
        const savedTmdbId = favoriteIds?.map((fav) => fav.tmdb_id);

        savedTmdbId && savedTmdbId.includes(mediaDetails.id)
            ? setFavorite(true)
            : setFavorite(false);
    }, [fetchFavorites]);

    return (
        <div className="p-4 pt-0 m-2 mt-1">
            <div
                className="absolute inset-0 w-full h-full max-h-[480px] bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 1)), url(${mediaDetails.backdrop_path})`,
                }}
            />
            <div className="!px-0">
                <Card
                    isBlurred
                    className="border-none bg-background/60 dark:bg-default-100/50 w-full m-2 p-3"
                    shadow="sm"
                >
                    <div className="flex w-[80vw] justify-between flex-col sm:flex-row sm:mx-auto">
                        <div className="flex justify-center sm:justify-normal">
                            <Image
                                src={mediaDetails.poster_path}
                                alt={mediaDetails.title}
                                className="rounded-xl shadow-2xl object-cover max-w-[400px] w-[40vw] min-w-[280px] sm:mx-auto"
                            />
                        </div>
                        <div className="flex flex-col mx-auto items-center w-full">
                            <h1 className="text-2xl font-bold mx-auto">
                                {mediaDetails.title}
                            </h1>
                            <h2 className="text-lg italic opacity-90">
                                {mediaDetails.tagline || "N/A"}
                            </h2>
                            <div className="mx-2 ml-6">
                                <MediaStatistic mediaDetails={mediaDetails} />
                                {mediaDetails?.genres && (
                                    <MediaGenres genres={mediaDetails.genres} />
                                )}
                            </div>
                            <div className="m-4 mt-auto mb-2">
                                {favorite ? (
                                    <Button
                                        color="warning"
                                        onPress={handleRemove}
                                    >
                                        Remove favorite <FaStar />
                                    </Button>
                                ) : (
                                    <Button color="success" onPress={handleAdd}>
                                        Add to favorites <FaRegStar />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 md:col-span-8 lg:col-span-9 space-y-6">
                        <Card>
                            <CardBody className="gap-1 flex flex-row justify-between">
                                <div className="flex">
                                    <Chip
                                        variant="flat"
                                        className="text-lg p-3"
                                    >
                                        Budget
                                    </Chip>
                                    <p className="p-1 italic text-md">
                                        {formatCurrency(mediaDetails.budget)}
                                    </p>
                                </div>

                                <div className="flex">
                                    <Chip
                                        variant="flat"
                                        className="text-lg p-3"
                                    >
                                        Revenue
                                    </Chip>
                                    <p className="p-1 italic text-md">
                                        {mediaDetails.revenue !== undefined
                                            ? mediaDetails.revenue
                                            : "N/A"}
                                    </p>
                                </div>

                                <div className="flex">
                                    <Chip
                                        variant="flat"
                                        className="text-lg p-3"
                                    >
                                        Status
                                    </Chip>
                                    <p className="p-1 italic text-md">
                                        {mediaDetails.status || "N/A"}
                                    </p>
                                </div>
                            </CardBody>
                        </Card>

                        <Divider />

                        <Chip variant="flat" className="text-lg p-3">
                            Overview
                        </Chip>
                        <p className="text-md p-4">
                            {mediaDetails.overview || "No overview available"}
                        </p>

                        <div className="pb-8">
                            <Chip variant="flat" className="text-lg p-2 my-4">
                                Production Companies
                            </Chip>
                            <div className="flex flex-wrap gap-4 justify-evenly">
                                {mediaDetails.production_companies?.length ? (
                                    mediaDetails.production_companies.map(
                                        (company) => (
                                            <Card
                                                isBlurred
                                                key={company.id}
                                                className="flex items-center min-w-[200px]  gap-2 bg-background/60 dark:bg-default-100/50 rounded-xl p-4"
                                            >
                                                {company.logo_path ? (
                                                    <Avatar
                                                        src={`https://image.tmdb.org/t/p/w400${company.logo_path}`}
                                                        alt={company.name}
                                                        size="lg"
                                                    />
                                                ) : (
                                                    <FaQuestionCircle
                                                        size={64}
                                                    />
                                                )}
                                                <Chip
                                                    className="mt-auto mb-0"
                                                    variant="bordered"
                                                >
                                                    {company.name || "N/A"}
                                                </Chip>
                                            </Card>
                                        ),
                                    )
                                ) : (
                                    <p>No production companies available</p>
                                )}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default MediaFullPage;
