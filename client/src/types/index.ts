import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};


export interface MediaItem {
    id: number;
    title?: string;
    name?: string;
    overview?: string;
    poster_path?: string;
    backdrop_path?: string;
}

export interface MediaDetails {
    id: number;
    title?: string;
    overview?: string;
    genres?: { id: number; name: string }[];
    release_date?: string;
    runtime?: number;
    vote_average?: number;
    poster_path?: string;
    backdrop_path?: string;
}


export interface UseTmdbResult {
    mediaList: MediaItem[] | null;
    error: string | null;
    loading: boolean;
}

export type MediaType = "movie" | "tv" | "anime";
export type ListType = "popular" | "top_rated" | "on_the_air" | "upcoming" | "now_playing" | "airing_today";


