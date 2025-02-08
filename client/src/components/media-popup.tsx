import { Drawer } from "@heroui/drawer";
import { DrawerContent } from "@heroui/drawer";
import { DrawerHeader } from "@heroui/drawer";
import { DrawerBody } from "@heroui/drawer";
import { DrawerFooter } from "@heroui/drawer";
import { Button } from "@heroui/button";
import { MediaItem, MediaType } from "@/types";
import { useDisclosure } from "@/hooks/use-disclosure";
import React, { useEffect } from "react";
import { useTmdbDetails } from "@/hooks/use-tmdb-details";
interface MediaPopupProps {
    media: MediaItem;
    children: any;
    mediaType: MediaType;
}

const MediaPopup: React.FC<MediaPopupProps> = ({ media, children, mediaType }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { mediaDetails, fetchMediaDetails, loading, error } = useTmdbDetails();

    const handleMediaDetailsPage = () => {
        console.log("handle details to:", media.id);
    }
    useEffect(() => {
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

                        <DrawerBody className="flex flex-wrap items-start gap-4">
                            {media.poster_path && (
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
                                    alt={media.title}
                                    className="w-full max-w-[320px] max-h-[500px] rounded-lg object-contain"
                                />
                            )}
                            <h3 className="text-xl italic wider"> Synopsis: </h3>
                            <p className="text-md italic">{media.overview || "No description available."}</p>
                        </DrawerBody>
                        <DrawerFooter>
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

