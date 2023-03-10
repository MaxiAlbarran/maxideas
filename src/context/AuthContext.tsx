import { User } from "firebase/auth";
import { createContext, Dispatch, SetStateAction } from "react";

export type AuthContextProps = {
    userUid: string | null,
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
