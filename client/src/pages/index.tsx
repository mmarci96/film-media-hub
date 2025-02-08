import AuthForms from "@/components/auth-forms";
import { useAuth } from "@/hooks/use-auth";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
    const { isAuthenticated } = useAuth();

    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center py-2 md:py-4">
                {isAuthenticated ?
                    <div>Welcome !</div> :
                    <AuthForms />}
            </section>
        </DefaultLayout>
    );
}
