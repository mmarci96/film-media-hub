import { Drawer } from "@heroui/drawer";
import { DrawerContent } from "@heroui/drawer";
import { DrawerHeader } from "@heroui/drawer";
import { DrawerBody } from "@heroui/drawer";
import { DrawerFooter } from "@heroui/drawer";
import { CardBody, Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { MediaItem, MediaType } from "@/types";
import { useDisclosure } from "@/hooks/use-disclosure";
import React, { useEffect, useState } from "react";
import { useTmdbDetails } from "@/hooks/use-tmdb-details";
import { FaStar, FaRegStar } from "react-icons/fa";
import PopupDetails from "./media/popup-details";

interface MediaPopupProps {
    media: MediaItem;
    children: any;
    mediaType: MediaType;
}

const MediaPopup: React.FC<MediaPopupProps> = ({ media, children, mediaType }) => {
    const [favorite, setFavorite] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { mediaDetails, fetchMediaDetails, loading, error } = useTmdbDetails();

    const handleMediaDetailsPage = () => {
        console.log("handle details to:", media.id);
        console.log(mediaDetails);
    }

    useEffect(() => {
        isOpen && fetchMediaDetails(media.id, mediaType)
    }, [isOpen])

    if (!media) return null;

    return (
        <>
            <div onClick={onOpen}>{children}</div>

            <Drawer isOpen={isOpen} onOpenChange={onOpenChange} className="min-w-[80vw] overflow-hidden">
                <DrawerContent className="overflow-hidden">
                    <>
                        <DrawerHeader className="flex flex-col gap-1 overflow-hidden">{media.title || "No Title Available"}</DrawerHeader>

                        <DrawerBody className="flex flex-col overflow-hidden items-start relative bg-black">
                            {media.poster_path && (
                                <div
                                    className="absolute inset-0 w-full h-full max-h-[480px] bg-cover bg-center"
                                    style={{
                                        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/w780${media.backdrop_path})`,
                                    }}
                                />)}
                            <h3 className="text-xl italic wider z-10"> Synopsis: </h3>
                            <p className="text-md italic z-10" >
                                {mediaDetails?.overview || "No description available."}
                            </p>
                            <Card
                                isBlurred
                                className="border-none bg-background/60 dark:bg-default-100/50 w-full m-2"
                                shadow="sm"
                            >
                                <CardBody>
                                    <PopupDetails mediaDetails={mediaDetails} media={media} />
                                </CardBody>
                            </Card>
                        </DrawerBody>
                        <DrawerFooter>
                            {favorite ?
                                <Button color="success" >
                                    Remove Favorite <FaStar />
                                </Button>
                                :
                                <Button color="success">
                                    Save to Favorites <FaRegStar />
                                </Button>}
                            <Button color="primary" onPress={handleMediaDetailsPage}>
                                Watch Now
                            </Button>
                        </DrawerFooter>
                    </>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default MediaPopup;

