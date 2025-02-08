import React, { useState } from "react";
import { Form } from "@heroui/form"
import { Input } from "@heroui/input"
import { Button } from "@heroui/button";

const AuthForms = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })
    const resetFormData = () => {
        setFormData({
            username: '',
            email: '',
            password: ''
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <Form
            className="w-full max-w-xs flex flex-col gap-4"
            validationBehavior="native"
            onReset={resetFormData}
            onSubmit={handleSubmit}
        >
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
            />

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
                value={formData.email}
                type="password"
                onChange={handleChange}
            />
            <div className="flex gap-2">
                <Button color="primary" type="submit">
                    Submit
                </Button>
                <Button type="reset" variant="flat">
                    Reset
                </Button>
            </div>

        </Form>
    );
}

export default AuthForms;
