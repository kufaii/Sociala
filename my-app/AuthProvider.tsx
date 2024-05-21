import { createContext, useContext, useState } from "react";
import { useStorageState } from "./useStorageState";
import { ReactNode } from "react";
import { router } from "expo-router";

// face to face :v
interface Context {
    handleLogin: (value: string) => void;
    handleLogout: () => void;
    handleSetDetail: (value) => void;
    detailUser: [];
    access_token?: string | null;
    isLoading: boolean;
}

// global state => autentikasi
const AuthContext = createContext<Context>({
    handleLogin: () => null,
    handleLogout: () => null,
    handleSetDetail: (value) => null,
    detailUser: null,
    access_token: null,
    isLoading: false,
});

// kirim tiap context
export function AuthProperty() {
    const value = useContext(AuthContext);

    return value;
}

// Profider yang akan digunakan untuk mengakses context
export function AuthProvider({ children }: { children: ReactNode }) {
    const [[isLoading, access_token], setAccess_token] =
        useStorageState("access_token");
    const [detailUser, setDetailUser] = useState([])

    return (
        <AuthContext.Provider
            value={{
                handleLogin: (value) => {
                    setAccess_token(value);
                    return router.replace("/");
                },
                handleLogout: () => {
                    setAccess_token(null);
                    return router.replace("/");
                },
                handleSetDetail: (value) => {
                    setDetailUser(value)
                },
                detailUser,
                access_token,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
