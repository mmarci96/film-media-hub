import React, { useState } from "react";
import { Form } from "@heroui/form"
import { Input } from "@heroui/input"
import { Button } from "@heroui/button";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "@/hooks/use-theme";

const AuthForms = () => {
    const [hasAccount, setHasAccount] = useState(false)
    const { theme } = useTheme();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        theme
    })
    const { login } = useAuth();
    const resetFormData = () => {
        setFormData({
            username: '',
            email: '',
            password: '',
            theme
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            formData.theme = theme;
            const authType = !hasAccount ? "login" : "signup";
            const res = await fetch(`/api/auth/${authType}`, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' },
            })
            if (!res.ok) {
                console.error('res not ok')
            }

            const data = await res.json();
            const { token } = data;
            console.log("data:", data);

            if (token && authType === "login") {
                console.log("token:", token);

                login(token);
            }
            setHasAccount(true)
        } catch (err) {
            console.error(err);
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
            {hasAccount &&
                <Input
                    isRequired
                    errorMessage="Please enter a valid username"
                    label="Username"
                    labelPlacement="outside"
                    name="username"
                    placeholder="Enter your username"
                    type="text"
                    onChange={handleChange}
                    value={formData.username}
                />}

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
            <div className="flex items-center mx-auto gap-2">
                <Button color="primary" type="submit">
                    Submit
                </Button>
                <Button type="reset" variant="flat">
                    Reset
                </Button>
            </div>
            <div className="flex flex-col mx-auto items-center">
                <p className="mb-4"> {hasAccount ? "Do you have an account already?" : "No account yet?"}</p>
                <Button color="default" onPress={() => setHasAccount(!hasAccount)}>
                    {hasAccount ? "Sign In" : "Create Account"}
                </Button>
            </div>

        </Form>
    );
}

export default AuthForms;
