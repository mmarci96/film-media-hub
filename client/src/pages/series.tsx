import { title } from "@/components/primitives";
import MediaList from "@/components/media-list";
import DefaultLayout from "@/layouts/default";

export default function SeriesPage() {
    const mediaType = 'tv'
    const listType = 'popular'

    return (
        <DefaultLayout>
            <div className="inline-block max-w-lg text-center justify-center">
                <h1 className={title()}>Series</h1>
            </div>
            <MediaList mediaType={mediaType} defaultListType={listType} />
        </DefaultLayout>
    );
}
