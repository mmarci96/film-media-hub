import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { User } from "@heroui/user";
import { PlusIcon } from "./icons";
import { useAuth } from "@/hooks/use-auth";
import { IoSettings } from "react-icons/io5";
import ModalForm from "./modal-form";
import { MdAccountCircle } from "react-icons/md";
import { useEffect } from "react";

export default function DropDownComponent() {
    const { logout, isAuthenticated, currentUser } = useAuth();
    useEffect(() => {
        console.log(currentUser);
    }, [currentUser])

    return (
        <Dropdown
            showArrow
            classNames={{
                base: "before:bg-default-200", // change arrow background
                content: "p-0 border-small border-divider bg-background",
            }}
            radius="sm"
        >
            {isAuthenticated ? (
                <DropdownTrigger>
                    <Button disableRipple variant="ghost">
                        <IoSettings /> Account
                    </Button>
                </DropdownTrigger>
            ) : (
                <Button variant="ghost" >
                    <ModalForm />
                </Button>
            )}
            <DropdownMenu
                aria-label="Custom item styles"
                className="p-3"
                disabledKeys={["profile"]}
                itemClasses={{
                    base: [
                        "rounded-md",
                        "text-default-500",
                        "transition-opacity",
                        "data-[hover=true]:text-foreground",
                        "data-[hover=true]:bg-default-100",
                        "dark:data-[hover=true]:bg-default-50",
                        "data-[selectable=true]:focus:bg-default-50",
                        "data-[pressed=true]:opacity-70",
                        "data-[focus-visible=true]:ring-default-500",
                    ],
                }}
            >
                <DropdownSection showDivider aria-label="Profile & Actions">
                    <DropdownItem key="profile" isReadOnly className="h-14 gap-2 opacity-100">
                        <User
                            avatarProps={{
                                size: "sm",
                                icon: <MdAccountCircle size={32} />
                            }}
                            classNames={{
                                name: "text-default-600",
                                description: "text-default-500",
                            }}
                            description={currentUser?.email}
                            name={currentUser?.username}
                        />
                    </DropdownItem>
                    <DropdownItem key="dashboard">Dashboard</DropdownItem>
                    <DropdownItem key="settings">Settings</DropdownItem>
                    <DropdownItem key="new_project" endContent={<PlusIcon className="text-large" />}>
                        New Project
                    </DropdownItem>
                </DropdownSection>

                <DropdownSection aria-label="Help & Feedback">
                    <DropdownItem onPress={() => console.log('not implemented')} key="help_and_feedback">Help & Feedback</DropdownItem>
                    <DropdownItem onPress={logout} key="logout">Log Out</DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    );
}
