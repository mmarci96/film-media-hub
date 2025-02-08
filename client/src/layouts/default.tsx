import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto px-2 flex-grow">
                {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
                <span className="text-default-600">Powered by{' '} </span>
                <p className="text-primary">CodeCool</p>
            </footer>
        </div>
    );
}
