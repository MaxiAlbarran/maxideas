import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { AuthContext } from "./AuthContext";

type Props = {
    children: ReactNode;
}

export const AuthProvider = ({children}: Props) => {

  const [isUserActive, setisUserActive] = useState(false);

  useEffect(()=>{
    onAuthStateChanged(auth, user => {
      user? setisUserActive(true) : setisUserActive(false);
    })
  },[])

  return (
    <AuthContext.Provider value={{isUserActive}}>
      {children}
    </AuthContext.Provider>
  )
}

