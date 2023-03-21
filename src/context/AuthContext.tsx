import { createContext } from "react";

export type AuthContextProps = {
    userUid: string | null,
    loadingUser: boolean
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
