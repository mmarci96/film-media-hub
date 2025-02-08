import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import MediaList from "@/components/media/media-list";

export default function MoviesPage() {
    const mediaType = 'movie'
    const listType = 'popular'

    return (
        <DefaultLayout>
            <div className="hidden md:inline-block py-0 mt-6 w-8">
                <h1 className={title()}>Movies:</h1>
            </div>

            <MediaList mediaType={mediaType} defaultListType={listType} />
        </DefaultLayout>
    );
}

