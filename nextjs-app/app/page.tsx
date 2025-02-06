import prisma from '@/lib/prisma'

export default async function Home() {
    const users = await prisma.user.findMany();
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
                    <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
                        Superblog
                    </h1>
                    <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)]">
                        {users.map((user) => (
                            <li key={user.id} className="mb-2">
                                {user.name}
                            </li>
                        ))}
                    </ol>
                </div>

            </main>
            <footer> </footer>
        </div>
    );
}
