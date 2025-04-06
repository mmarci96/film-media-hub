import React from "react";
import { Chip } from "@heroui/chip";
import { Genre } from "@/types";

interface GenreListProps {
    genres: Genre[] | undefined;
}

const GenreList: React.FC<GenreListProps> = ({ genres }) => {
    return (
        <section className="flex flex-wrap justify-start gap-2 my-2">
            <p className="italix text-lg italic p-2"> Genres: </p>
            {genres &&
                genres.map((genre, index) => (
                    <Chip
                        key={genre.id + index.toString()}
                        className="p-2 h-12 ring-1 bg-90/100 shadow-xl mx-1 rounded-xl"
                    >
                        {genre.name}
                    </Chip>
                ))}
        </section>
    );
};

export default GenreList;
