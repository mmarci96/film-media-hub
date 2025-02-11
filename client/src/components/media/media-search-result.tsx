import { MediaItem } from "@/types"
import { Card, CardHeader, CardBody, Button, Image } from "@heroui/react"
import { Link } from "react-router-dom";


const MediaSearchResult = (
    { results, onReset, onLoadMore }:
        { results: MediaItem[], onReset: (res: string) => void, onLoadMore: () => void }
) => {
    return (
        <Card
            isBlurred
            className="fixed z-20 py-4 bg-background/60 bg-foreground flex flex-col items-center w-[82vw] top-16 h-[88vh] m-4 rounded-xl ring-1 left-[50%] translate-x-[-50%] overflow-scroll">
            <div
                className="absolute ring-2 text-xl pl-3 z-40 right-1 top-1 rounded-full w-8 h-8 cursor-pointer hover:bg-foreground ease-in duration-200 hover:text-background hover:bg-opacity-60"
                onClick={() => onReset('')}
            >
                x
            </div>
            {results?.map(media => (
                <div key={media.id} className="w-full mx-auto my-1">
                    <Card
                        isBlurred
                        className="w-[80vw] shadow-xl m-1  mx-auto bg-background/80 bg-background"
                    >
                        <CardHeader className="flex justify-start bg-background bg-opacity-60">
                            <Image
                                alt={media.title}
                                height={40}
                                radius="sm"
                                src={media?.poster_path}
                                width={40}
                                className="object-cover"
                            />
                            <h3 className="text-lg mx-2">{media?.name || media.title}</h3>
                            <Link
                                to={`/${media.mediaType}/${media.id}`}
                                className="ml-auto mr-0"
                            >
                                <Button variant="faded" className="bg-opacity-80">
                                    More info
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardBody className="bg-foreground bg-opacity-20">
                            <p className="text-sm truncate">
                                {media?.overview}
                            </p>
                        </CardBody>
                    </Card>
                </div>
            ))}
            <Button
                onPress={onLoadMore}
                variant="faded"
                className="h-[64px] mx-auto p-4 "
            >
                Load more
            </Button>
        </Card>
    )
}

export default MediaSearchResult;
