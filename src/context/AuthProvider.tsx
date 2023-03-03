import { onAuthStateChanged, User } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { AuthContext } from "./AuthContext";

type Props = {
    children: ReactNode;
}

export const AuthProvider = ({children}: Props) => {

  const [userData, setUserData] = useState<User | null>(null)

  useEffect(()=>{
    onAuthStateChanged(auth, user => {
      if(user){
        setUserData(user);
      }else{
        setUserData(null);
      }
    })    
  },[])

  return (
    <AuthContext.Provider value={{userData}}>
      {children}
    </AuthContext.Provider>
  )
}

