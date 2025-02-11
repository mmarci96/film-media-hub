import DefaultLayout from "@/layouts/default";
import { MediaType, MediaDetails } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAnimeDetails } from "@/hooks/use-anime-details";
import { useTmdbDetails } from "@/hooks/use-tmdb-details";
import MediaFullPage from "@/components/media/media-full-page";

const MediaPage = () => {
    const [mediaData, setMediaData] = useState<MediaDetails | null>(null)
    const { fetchMediaDetails } = useTmdbDetails();
    const { fetchAnimeDetails } = useAnimeDetails()
    const { id, mediaType = 'tv' as MediaType } = useParams()
    const handleMedia = async (id: string, mediaType: MediaType) => {
        if (mediaType === 'anime') {
            const data = await fetchAnimeDetails(id)
            data && setMediaData(data)
        } else {
            const data = await fetchMediaDetails(parseInt(id), mediaType)
            data && setMediaData(data)
        }
    }

    useEffect(() => {
        id && handleMedia(id, mediaType as MediaType)
    }, [])
    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">

                {mediaData && <MediaFullPage mediaDetails={mediaData} />}
            </section>
        </DefaultLayout>
    );
}
export default MediaPage;
