import AuthForms from "@/components/auth-forms";
import { useAuth } from "@/hooks/use-auth";
import DefaultLayout from "@/layouts/default";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { useTmdb } from "@/hooks/use-tmdb";
import { MediaItem } from "@/types";
import { useEffect, useState } from "react";
import MediaCard from "@/components/media/media-card";

export default function IndexPage() {
    const [topPlaying, setTopPlaying] = useState<MediaItem[]>([]);
    const { isAuthenticated } = useAuth();
    const { mediaList } = useTmdb("movie", 1, "now_playing");
    useEffect(() => {
        mediaList && setTopPlaying(mediaList.slice(0, 4));
    }, [mediaList]);

    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center ">
                {isAuthenticated ? (
                    <div
                        className="flex flex-col items-center justify-center object-cover w-screen h-[640px]"
                        style={{
                            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 1)), url(./bg-cover.jpg)`,
                            objectFit: "fill",
                        }}
                    >
                        <Card
                            isBlurred
                            className="w-[92%] bg-background/60 flex flex-col items-center my-4"
                        >
                            <CardHeader className="bg-background">
                                <h1 className="text-xl my-2 font-bold tracking-wider">
                                    {" "}
                                    Welcome to FilmHub!
                                </h1>
                            </CardHeader>
                            <CardBody className="h-[92vh]">
                                <h2 className="text-lg italic bg-background/60 ml-2 mr-auto p-2 px-4 rounded-xl">
                                    Movies Playing right now:
                                </h2>
                                <div className="flex justify-evenly gap-2 flex-wrap sm:flex-box">
                                    {topPlaying.length >= 1 &&
                                        topPlaying.map((mediaItem) => (
                                            <div
                                                key={mediaItem.id}
                                                className="w-[280px]"
                                            >
                                                <MediaCard
                                                    media={mediaItem}
                                                    mediaType="movie"
                                                />
                                            </div>
                                        ))}
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                ) : (
                    <AuthForms />
                )}
            </section>
        </DefaultLayout>
    );
}
