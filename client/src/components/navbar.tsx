import { Kbd } from "@heroui/kbd";
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
import { ThemeSwitch } from "@/components/theme-switch";
import {
    SearchIcon,
} from "@/components/icons";
import DropDownComponent from "./drop-down";

export const Navbar = () => {
    const searchInput = (
        <Input
            aria-label="Search"
            classNames={{
                inputWrapper: "bg-default-100",
                input: "text-sm",
            }}
            endContent={
                <Kbd className="hidden lg:inline-block" keys={["command"]}>
                    K
                </Kbd>
            }
            labelPlacement="outside"
            placeholder="Search..."
            startContent={
                <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
            }
            type="search"
        />
    );

    return (
        <HeroUINavbar maxWidth="xl" position="sticky" className="z-20">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand className="gap-3 max-w-fit">
                    <Link
                        className="flex justify-start items-center gap-1"
                        color="foreground"
                        href="/"
                    >
                        <img src="./logo.png"
                            className={"hover:scale-105 w-8 h-8 border-4 border-[#181a2f]" +
                                "object-fit rounded-full ease-in duration-300 animation-spin"} />
                        <p className="font-bold text-lg py-1 px-2">FilmHub</p>
                    </Link>
                </NavbarBrand>
                <div className="hidden md:flex gap-4 justify-start ml-4 ring-1 ring-[#26233A] rounded-xl px-4 p-2">
                    {siteConfig.navItems.map((item) => (
                        <NavbarItem key={item.href}
                            className={"hover:scale-110 hover:ring-1 bg-secondgrey ring-[#2C647C]  rounded-lg hover:px-2  hover:tracking-wider ease-in duration-200 "}
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
                    <DropDownComponent />
                    <ThemeSwitch />
                </NavbarItem>
                <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
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
                                        : index === siteConfig.navMenuItems.length - 1
                                            ? "danger"
                                            : "foreground"
                                }
                                href="#"
                                size="lg"
                            >
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </div>
            </NavbarMenu>
        </HeroUINavbar>
    );
};
