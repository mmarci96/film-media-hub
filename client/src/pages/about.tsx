import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function DocsPage() {
    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="inline-block max-w-lg text-center justify-center">
                    <h1 className={title()}>About</h1>
                </div>
                <div className="flex flex-col text-lg items-center justify-center mx-4 gap-4">
                    <h3>
                        Welcome to FilmHub, your ultimate destination for
                        discovering movies and TV series. Whether you're looking
                        for the latest blockbusters, classic favorites, or
                        hidden gems, our platform provides a seamless experience
                        to explore a vast collection of entertainment content.
                    </h3>

                    <h3>
                        With our user-friendly interface, you can browse and
                        save your favorite movies and shows for later. Stay
                        organized by creating personal watchlists, ensuring you
                        never forget a title you want to see. Our smart search
                        and filtering options help you find exactly what you're
                        looking for with ease.
                    </h3>

                    <h3>
                        We also keep you updated with release dates, streaming
                        platform availability, and the latest news in the world
                        of film and television. No more wondering where to watch
                        your favorite content—[Your Website Name] has you
                        covered. Start exploring today and elevate your viewing
                        experience!
                    </h3>
                </div>
            </section>
        </DefaultLayout>
    );
}
