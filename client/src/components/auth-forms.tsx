import React, { useState } from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useAuth } from "@/hooks/use-auth";

const AuthForms = () => {
    const { login } = useAuth();
    const [hasAccount, setHasAccount] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [messege, setMessege] = useState<string | null>(null);
    const resetFormData = () => {
        setFormData({
            email: "",
            password: "",
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setMessege(null);
            const authType = hasAccount ? "login" : "register";
            const res = await fetch(`/api/v1/${authType}`, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: { "Content-Type": "application/json" },
            });
            if (!res.ok) {
                let msg = "";
                console.log(res);

                hasAccount
                    ? (msg = "Login failed!" + res)
                    : (msg = "Unsuccessful registration.");
                setMessege(msg);
                return;
            }

            const data = await res.json();
            const { token } = data;

            if (token && authType === "login") {
                login(token);
            } else {
                setMessege("Account created! Log in to continue.");
            }
            setHasAccount(true);
        } catch (err) {
            console.error(err);
            setMessege("Error processing request... Try again!");
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Form
            className="w-full max-w-md flex flex-col gap-4 ring-1 p-8 rounded-lg"
            validationBehavior="native"
            onReset={resetFormData}
            onSubmit={handleSubmit}
        >
            <h2 className="w-full text-xl mx-auto">
                {hasAccount ? "Login" : "Register"}
            </h2>

            <Input
                isRequired
                errorMessage="Please enter a valid email"
                label="Email"
                labelPlacement="outside"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                type="email"
                onChange={handleChange}
            />
            <Input
                isRequired
                errorMessage="Please enter a valid password"
                label="Password"
                labelPlacement="outside"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                type="password"
                onChange={handleChange}
            />
            <div className="relative w-full mx-auto flex flex-col items-center">
                {messege && <p className="absolute text-sm"> {messege} </p>}
            </div>

            <div className="flex items-center mx-auto gap-2 mt-4">
                <Button color="primary" type="submit">
                    {hasAccount ? "Sing in" : "Sign up"}
                </Button>
            </div>
            <div className="flex flex-col mx-auto items-center">
                <p className="mb-4">
                    {" "}
                    {hasAccount
                        ? "Do you have an account already?"
                        : "You don't have and account yet?"}
                </p>
                <Button
                    color="default"
                    onPress={() => {
                        setHasAccount(!hasAccount);
                        setMessege(null);
                    }}
                >
                    {!hasAccount ? "Sign In" : "Create Account"}
                </Button>
            </div>
        </Form>
    );
};

export default AuthForms;
