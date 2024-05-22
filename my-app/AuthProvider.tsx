import { createContext, useContext, useState } from "react";
import { useStorageState } from "./useStorageState";
import { ReactNode } from "react";
import { router } from "expo-router";

// Interface for the context
interface Context {
  handleLogin: (value: string) => void;
  handleLogout: () => void;
  handleSetDetail: (value: any) => void;
  detailUser: any[];
  access_token?: string | null;
  isLoading: boolean;
  roleUser: string;
  setRoleUser: (value: string) => void;
}

// Global state for authentication
const AuthContext = createContext<Context>({
  handleLogin: () => null,
  handleLogout: () => null,
  handleSetDetail: (value) => null,
  detailUser: [],
  access_token: null,
  isLoading: false,
  roleUser: "", // Provide default value for roleUser
  setRoleUser: () => null, // Provide default function for setRoleUser
});

// Hook to use the context
export function AuthProperty() {
  const value = useContext(AuthContext);
  return value;
}

// Provider to wrap the application and provide context
export function AuthProvider({ children }: { children: ReactNode }) {
  const [[isLoading, access_token], setAccess_token] =
    useStorageState("access_token");
  const [detailUser, setDetailUser] = useState<any[]>([]);
  const [roleUser, setRoleUser] = useState<string>("");

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
          setDetailUser(value);
        },
        detailUser,
        roleUser,
        setRoleUser,
        access_token,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
