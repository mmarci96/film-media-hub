import AuthForms from "@/components/auth-forms";
import { useAuth } from "@/hooks/use-auth";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { Link } from "react-router-dom";

export default function IndexPage() {
    const { isAuthenticated } = useAuth();

    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center py-2 md:py-4">
                {isAuthenticated ?
                    <div>Welcome !
                        <Button variant="ghost" >
                            <Link to={"/favorites"} >
                                Lets see your favortites!
                            </Link>
                        </Button>
                    </div> :
                    <AuthForms />}
            </section>
        </DefaultLayout>
    );
}
