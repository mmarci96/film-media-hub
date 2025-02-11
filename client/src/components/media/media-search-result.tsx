import { MediaItem } from "@/types"
import { Card, CardHeader, CardBody, Button } from "@heroui/react"
import { Link } from "react-router-dom";


const MediaSearchResult = ({ results }: { results: MediaItem[] }) => {
    return (
        <Card
            isBlurred
            className="absolute z-30 pt-4 bg-background/20 bg-foreground flex flex-col items-center w-[82vw] top-16 h-[92vh] m-4 rounded-xl ring-1 left-[50%] translate-x-[-50%] overflow-scroll">
            {results?.map(media => (
                <div key={media.id} className="w-full mx-auto my-1">
                    <Card
                        isBlurred
                        className="w-full min-w-[80vw] max-w-[800px] m-1 p-4 mx-auto bg-background/60"
                    >
                        <CardHeader className="flex justify-between gap-3">
                            <h3 className="text-lg">{media?.name || media.title}</h3>
                            <Link to={`/${media.mediaType}/${media.id}`}>
                                <Button variant="faded" className="bg-opacity-80">
                                    More info
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardBody>
                            <p className="text-sm truncate">
                                {media?.overview}
                            </p>
                        </CardBody>

                    </Card>
                </div>
            ))}
        </Card>
    )
}

export default MediaSearchResult;
