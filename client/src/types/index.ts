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

export interface Genre {
    id: number;
    name: string;
}

export interface MediaDetails {
    id: number;
    title?: string;
    original_title?: string;
    overview?: string;
    genres?: Genre[];
    release_date?: string;
    runtime?: number;
    vote_average?: number;
    vote_count?: number;
    poster_path?: string;
    backdrop_path?: string;
    popularity?: number;
    budget?: number;
    revenue?: number;
    status?: string;
    tagline?: string;
    homepage?: string;
    imdb_id?: string;
    adult?: boolean;
    belongs_to_collection?: {
        id: number;
        name: string;
        poster_path?: string;
        backdrop_path?: string;
    };
    production_companies?: {
        id: number;
        name: string;
        logo_path?: string;
        origin_country: string;
    }[];
    production_countries?: {
        name: string;
    }[];
    spoken_languages?: {
        name: string;
        english_name: string;
    }[];
    origin_country?: string[];
    original_language?: string;
    video?: boolean;
}

export interface UseTmdbResult {
    mediaList: MediaItem[] | null;
    error: string | null;
    loading: boolean;
}

export type MediaType = "movie" | "tv" | "anime";
export type ListType =
    | "popular"
    | "top_rated"
    | "on_the_air"
    | "upcoming"
    | "now_playing"
    | "airing_today";
