import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import {
    Navbar as HeroUINavbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/nav/theme-switch";
import { SearchIcon } from "@/components/nav/icons";
import DropDownComponent from "./drop-down";
import { useTmdbDetails } from "@/hooks/use-tmdb-details";
import { useEffect, useState } from "react";
import NavTipTool from "@/components/nav/nav-tip-tool";
import MediaSearchResult from "../media/media-search-result";
import { MediaItem } from "@/types";

export const Navbar = () => {
    const [searchResults, setSearchResults] = useState<MediaItem[]>([]);
    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const { fetchTmdbSearchData } = useTmdbDetails();

    const handleLoadMore = () => {
        setPage((prev) => prev + 1);
    };
    useEffect(() => {
        searchValue !== ""
            ? fetchTmdbSearchData(searchValue, 1).then(
                  (results: MediaItem[]) => {
                      setPage(1);
                      setSearchResults(results);
                  },
              )
            : setSearchResults([]);
    }, [searchValue]);

    useEffect(() => {
        if (searchValue) {
            fetchTmdbSearchData(searchValue, page).then((results) =>
                setSearchResults((prev) => [...prev, ...results]),
            );
        }
    }, [page]);

    const searchInput = (
        <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            aria-label="Search"
            classNames={{
                inputWrapper: "bg-default-100",
                input: "text-sm",
            }}
            labelPlacement="outside"
            placeholder="Search..."
            startContent={
                <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
            }
            type="search"
        />
    );

    return (
        <>
            {searchResults.length >= 1 && (
                <MediaSearchResult
                    results={searchResults}
                    onReset={setSearchValue}
                    onLoadMore={handleLoadMore}
                />
            )}
            <HeroUINavbar maxWidth="xl" position="sticky" className="z-20">
                <NavbarContent
                    className="basis-1/5 sm:basis-full"
                    justify="start"
                >
                    <NavbarBrand className="gap-3 max-w-fit">
                        <Link
                            className="flex justify-start items-center gap-1"
                            color="foreground"
                            href="/"
                        >
                            <img
                                src="./logo.png"
                                className={
                                    "hover:scale-105 w-8 h-8 border-4 border-[#181a2f]" +
                                    "object-fit rounded-full ease-in duration-300 animation-spin"
                                }
                            />
                            <p className="font-bold text-lg py-1 px-2">
                                FilmHub
                            </p>
                        </Link>
                    </NavbarBrand>
                    <div className="hidden sm:flex  gap-4 justify-start ml-4 ring-1 ring-[#26233A] rounded-xl px-4 p-2">
                        {siteConfig.navItems.map((item) => (
                            <NavbarItem
                                key={item.href}
                                className={
                                    "hover:scale-110 hover:ring-1 px-2 py-1 bg-secondgrey ring-[#2C647C]  rounded-lg  ease-out duration-200 "
                                }
                            >
                                <Link
                                    className={clsx(
                                        linkStyles({ color: "foreground" }),
                                        "data-[active=true]:text-primary text-md  ease-in duration-200 data-[active=true]:font-medium",
                                    )}
                                    color="foreground"
                                    href={item.href}
                                >
                                    {item.label}
                                </Link>
                            </NavbarItem>
                        ))}
                    </div>
                </NavbarContent>

                <NavbarContent
                    className="hidden sm:flex basis-1/5 sm:basis-full"
                    justify="end"
                >
                    <NavbarItem className="hidden sm:flex gap-2">
                        <NavTipTool
                            tipContent={"Click to see options"}
                            children={<DropDownComponent />}
                        />
                        <ThemeSwitch />
                    </NavbarItem>
                    <NavbarItem className="hidden md:flex">
                        {searchInput}
                    </NavbarItem>
                </NavbarContent>

                <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
                    <DropDownComponent />
                    <ThemeSwitch />
                    <NavbarMenuToggle />
                </NavbarContent>

                <NavbarMenu>
                    {searchInput}
                    <div className="mx-4 mt-2 flex flex-col gap-2">
                        {siteConfig.navMenuItems.map((item, index) => (
                            <NavbarMenuItem key={`${item}-${index}`}>
                                <Link
                                    color={
                                        index === 2
                                            ? "primary"
                                            : index ===
                                                siteConfig.navMenuItems.length -
                                                    1
                                              ? "danger"
                                              : "foreground"
                                    }
                                    href={item.href}
                                    size="lg"
                                >
                                    {item.label}
                                </Link>
                            </NavbarMenuItem>
                        ))}
                    </div>
                </NavbarMenu>
            </HeroUINavbar>
        </>
    );
};
