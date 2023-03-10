import { onAuthStateChanged, User } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { AuthContext } from "./AuthContext";

type Props = {
    children: ReactNode;
}

export const AuthProvider = ({children}: Props) => {

  const [userUid, setUserUid] = useState<string | null>(null)

  useEffect(()=>{
    onAuthStateChanged(auth, user => {
      if(user){
        setUserUid(user.uid);
      }else{
        setUserUid(null);
      }
    })    
  },[])

  return (
    <AuthContext.Provider value={{userUid}}>
      {children}
    </AuthContext.Provider>
  )
}

