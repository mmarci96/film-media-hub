import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import MediaList from "@/components/media-list";

export default function MoviesPage() {
    const mediaType = 'movie'
    const listType = 'popular'

    return (
        <DefaultLayout>
            <div className="inline-block max-w-lg text-center">
                <h1 className={title()}>Movies:</h1>
            </div>

            <MediaList mediaType={mediaType} defaultListType={listType} />
        </DefaultLayout>
    );
}

