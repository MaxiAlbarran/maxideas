import { onAuthStateChanged, User } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { AuthContext } from "./AuthContext";

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [userUid, setUserUid] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoadingUser(true);
        setUserUid(user.uid);
        setLoadingUser(false);
      } else {
        setLoadingUser(true);
        setUserUid(null);
        setLoadingUser(false);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ userUid, loadingUser }}>{children}</AuthContext.Provider>
  );
};
