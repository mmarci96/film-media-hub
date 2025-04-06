import { ScrollShadow } from "@heroui/scroll-shadow";
import { Drawer } from "@heroui/drawer";
import { DrawerContent } from "@heroui/drawer";
import { DrawerHeader } from "@heroui/drawer";
import { DrawerBody } from "@heroui/drawer";
import { DrawerFooter } from "@heroui/drawer";
import { CardBody, Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/react";
import { MediaItem, MediaType } from "@/types";
import React, { useEffect, useState } from "react";
import { useTmdbDetails } from "@/hooks/use-tmdb-details";
import { FaStar, FaRegStar } from "react-icons/fa";
import PopupDetails from "@/components/media/popup-details";
import { useFavorites } from "@/hooks/use-favorites";
import { useAnimeDetails } from "@/hooks/use-anime-details";
import { MediaDetails } from "@/types";
import { Link } from "react-router-dom";

interface MediaPopupProps {
    media: MediaItem;
    children: any;
    mediaType: MediaType;
}

const MediaPopup: React.FC<MediaPopupProps> = ({
    media,
    children,
    mediaType,
}) => {
    const [currentId, setCurrentId] = useState<number | null>(null);
    const [favorite, setFavorite] = useState(false);
    const { addToFavorite, removeFavorite, fetchFavorites, favoriteIds } =
        useFavorites();
    const [mediaDetails, setMediaDetails] = useState<MediaDetails | null>(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { fetchAnimeDetails } = useAnimeDetails();
    const { fetchMediaDetails } = useTmdbDetails();
    const handleOpen = (id: number) => {
        console.log("Current: ", id);
        setCurrentId(id);
        onOpen();
    };
    const handleSave = (id: number, mediaType: MediaType) => {
        addToFavorite(id, mediaType);
    };
    const handleRemove = (id: number) => {
        removeFavorite(id);
    };

    const getMediaDetails = async (mediaId: number, mediaType: MediaType) => {
        if (mediaType === "anime") {
            const details = await fetchAnimeDetails(mediaId.toString());
            details && setMediaDetails(details);
        } else {
            const details = await fetchMediaDetails(mediaId, mediaType);
            details && setMediaDetails(details);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchFavorites();
            getMediaDetails(media.id, mediaType);
        }
    }, [currentId]);
    useEffect(() => {
        if (currentId) {
            const savedTmdbId = favoriteIds?.map((fav) => fav.tmdb_id);
            console.log("curr", currentId, "list", savedTmdbId);

            savedTmdbId && savedTmdbId.includes(currentId)
                ? setFavorite(true)
                : setFavorite(false);
        }
    }, [currentId, handleRemove, handleSave]);

    if (!media) return null;

    return (
        <>
            <div onClick={() => handleOpen(media.id)}>{children}</div>

            <Drawer
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                className="drawer-styles"
            >
                <DrawerContent className="overflow-hidden">
                    <DrawerHeader className="drawer-header-styles">
                        {media.title || "No Title Available"}
                    </DrawerHeader>

                    <DrawerBody className="drawer-body-styles">
                        {media.poster_path && (
                            <div
                                className="absolute inset-0 w-full h-full max-h-[480px] bg-cover bg-center"
                                style={{
                                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 1)), url(${media.backdrop_path})`,
                                }}
                            />
                        )}
                        <Card
                            isBlurred
                            className="border-none bg-background/60 dark:bg-default-100/50 w-full m-2"
                            shadow="sm"
                        >
                            <CardBody>
                                <PopupDetails
                                    mediaDetails={mediaDetails}
                                    media={media}
                                />
                            </CardBody>
                        </Card>
                        <ScrollShadow
                            className="w-full h-36 z-10"
                            hideScrollBar
                        >
                            <p className="text-md italic z-10">
                                Synopsis:{" "}
                                {mediaDetails?.overview ||
                                    "No description available."}
                            </p>
                        </ScrollShadow>
                    </DrawerBody>
                    <DrawerFooter>
                        {favorite ? (
                            <Button
                                color="warning"
                                onPress={() => handleRemove(media.id)}
                            >
                                Remove Favorite <FaStar />
                            </Button>
                        ) : (
                            <Button
                                onPress={() => handleSave(media.id, mediaType)}
                                color="success"
                            >
                                Save to Favorites <FaRegStar />
                            </Button>
                        )}
                        <Button color="primary">
                            <Link to={`/${mediaType}/${media.id}`}>
                                Watch Now
                            </Link>
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default MediaPopup;
