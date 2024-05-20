import { createContext, useContext } from "react";
import { useStorageState } from "./useStorageState";
import { ReactNode } from "react";
import { router } from "expo-router";

// face to face :v
interface Context {
  handleLogin: (value: string) => void;
  handleLogout: () => void;
  access_token?: string | null;
  isLoading: boolean;
}

// global state => autentikasi
const AuthContext = createContext<Context>({
  handleLogin: () => null,
  handleLogout: () => null,
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

  return (
    <AuthContext.Provider
      value={{
        handleLogin: (value) => {
          // console.log(value, "<== Value on login")
          setAccess_token(value);
          return router.replace("/");
        },
        handleLogout: () => {
          console.log("Success logout < ==");
          setAccess_token(null);
          return router.replace("/");
        },
        access_token,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
