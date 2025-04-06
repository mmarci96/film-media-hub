export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "Film Hub",
    description: "A website all about movies and TV series.",
    navItems: [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "Movies",
            href: "/movies",
        },
        {
            label: "Series",
            href: "/series",
        },
        {
            label: "Anime",
            href: "/animes",
        },
        {
            label: "About",
            href: "/about",
        },
    ],
    navMenuItems: [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "Movies",
            href: "/movies",
        },
        {
            label: "Series",
            href: "/series",
        },
        {
            label: "Anime",
            href: "/anime",
        },
        {
            label: "About",
            href: "/about",
        },
    ],
    links: {
        github: "https://github.com/mmarci96/film-media-hub",
    },
};
