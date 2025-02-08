import React from "react";
import { Chip } from "@heroui/chip";
import { Genre } from "@/types";

interface GenreListProps {
    genres: Genre[] | undefined;
}

const GenreList: React.FC<GenreListProps> = ({ genres }) => {
    return (
        <section className="flex flex-wrap gap-2">
            {genres && genres.map((genre) => (
                <Chip key={genre.id} className="p-2 h-12 bg-90/100 shadow-xl mx-1 rounded-lg">
                    {genre.name}
                </Chip>
            ))}
        </section>
    );
};

export default GenreList;

