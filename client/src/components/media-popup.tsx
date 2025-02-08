import { Drawer } from "@heroui/drawer";
import { DrawerContent } from "@heroui/drawer";
import { DrawerHeader } from "@heroui/drawer";
import { DrawerBody } from "@heroui/drawer";
import { DrawerFooter } from "@heroui/drawer";
import { Button } from "@heroui/button";
import { MediaItem, MediaType } from "@/types";
import { useDisclosure } from "@/hooks/use-disclosure";
import React, { useEffect, useState } from "react";
import { useTmdbDetails } from "@/hooks/use-tmdb-details";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Image } from "@heroui/image";

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
        handleMediaDetailsPage();
        fetchMediaDetails(media.id, mediaType)
    }, [])


    if (!media) return null;
    return (
        <>
            <div onClick={onOpen}>{children}</div>

            <Drawer isOpen={isOpen} onOpenChange={onOpenChange} className="min-w-[80vw]">
                <DrawerContent>
                    <>
                        <DrawerHeader className="flex flex-col gap-1">{media.title || "No Title Available"}</DrawerHeader>

                        <DrawerBody className="flex flex-col items-start relative bg-black">
                            {media.poster_path && (
                                <div
                                    className="absolute inset-0 w-full h-full max-h-[480px] bg-cover bg-center"
                                    style={{
                                        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url(https://image.tmdb.org/t/p/w780${media.backdrop_path})`,
                                    }}
                                />)}
                            <h3 className="text-xl italic wider z-10"> Synopsis: </h3>
                            <p className="text-md italic z-10">{media.overview || "No description available."}</p>
                            <Image
                                isBlurred
                                width={240}
                                height={360}
                                src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
                                className="m-4 object-cover ring-1 shadow-xl"
                            />
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

