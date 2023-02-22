import { createContext } from "react";

export type AuthContextProps = {
    isUserActive: boolean
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
