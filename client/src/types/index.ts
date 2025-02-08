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
    runtime?: number | string;
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

export interface AnimeItem {
    mal_id: number;
    title?: string;
    title_english?: string;
    title_japanese?: string;
    title_synonyms?: string[];
    overview?: string;
    synopsis?: string;
    genres?: Genre[];
    release_date?: string;
    aired?: {
        from?: string;
        to?: string;
        string?: string;
    };
    runtime?: number;
    episodes?: number;
    score?: number;
    scored_by?: number;
    popularity?: number;
    rank?: number;
    members?: number;
    favorites?: number;
    status?: string;
    season?: string;
    year?: number;
    source?: string;
    rating?: string;
    duration?: string;
    studios?: { mal_id: number; name: string }[];
    producers?: { mal_id: number; name: string }[];
    licensors?: { mal_id: number; name: string }[];
    themes?: { mal_id: number; name: string }[];
    explicit_genres?: { mal_id: number; name: string }[];
    background?: string;
    trailer?: {
        youtube_id?: string;
        url?: string;
        embed_url?: string;
    };
    images?: {
        jpg?: {
            image_url: string;
            small_image_url: string;
            large_image_url: string;
        };
    };
    broadcast?: {
        day?: string;
        time?: string;
        timezone?: string;
    };
}



