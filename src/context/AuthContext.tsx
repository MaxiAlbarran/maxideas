import { User } from "firebase/auth";
import { createContext, Dispatch, SetStateAction } from "react";

export type AuthContextProps = {
    userData: User | null,
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
