import { Tooltip, Button } from "@heroui/react";

const NavTipTool = ({ children, tipContent }: {
    children: React.ReactNode, tipContent: string
}) => {
    return (
        <Tooltip
            content={
                <div className="px-1 py-2">
                    <div className="text-small font-bold">{tipContent}</div>
                </div>
            }
        >
            <Button className="bg-opacity-0 ring-0 border-0 px-0 w-2">
                {children}
            </Button>
        </Tooltip>
    );
}

export default NavTipTool
