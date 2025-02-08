import { useState } from "react";

export interface DisclosureHandler {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onOpenChange: () => void;
}

export const useDisclosure = (): DisclosureHandler => {
    const [isOpen, setOpen] = useState(false);

    const onOpen = (): void => setOpen(true);
    const onClose = (): void => setOpen(false);
    const onOpenChange = (): void => setOpen(!isOpen);

    return {
        isOpen,
        onOpen,
        onClose,
        onOpenChange,
    };
};
