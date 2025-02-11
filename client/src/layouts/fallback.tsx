import { Spinner } from "@heroui/spinner"

const LoadingAnimation = () => {
    return (
        <div className="w-full h-full bg-background flex flex-col items-center mx-auto min-w-32">
            <Spinner size="lg" className="text-foreground mx-auto my-2" />
        </div>
    )
}

export default LoadingAnimation
