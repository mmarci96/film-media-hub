import { createContext, useState, useEffect } from "react";

interface AuthContextType {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    currentUser: CurrentUser | null;
}

interface CurrentUser {
    user_id: number;
    email: string;
    username?: string;
}

export const AuthContext = createContext<AuthContextType>({
    token: null,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    currentUser: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(() =>
        localStorage.getItem("authToken"),
    );
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
    const updateCurrentUserData = async (token: string) => {
        try {
            const res = await fetch("/api/v1/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                console.log("request err");
                return;
            }
            const data = await res.json();
            if (data) {
                const currentUser: CurrentUser = data;
                setCurrentUser(currentUser);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (token) updateCurrentUserData(token);
    }, [token]);

    useEffect(() => {
        if (token) {
            localStorage.setItem("authToken", token);
        } else {
            localStorage.removeItem("authToken");
        }
    }, [token]);

    const login = (newToken: string) => {
        setToken(newToken);
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                login,
                logout,
                isAuthenticated: !!token,
                currentUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
