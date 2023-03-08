import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../../config/firebase"

type Props = {
    email: string,
    password: string,
    displayName: string,
    username: string;
}

export const useCreateUser = () => {

    const [loading, setLoading] = useState<boolean>(false)

    const createNewUser = async({email, password, displayName, username}:Props) =>{
        let isError: boolean
        try{
            setLoading(true)
            const newUser = await createUserWithEmailAndPassword(auth, email, password);

            await setDoc(doc(db, 'users', newUser.user.uid), {
                displayName: displayName,
                username: username,
                email: email,
                avatar: newUser.user.photoURL,
                profileDescription: "",
            })
            isError = false
            setLoading(false)
        }catch(e){
            isError = true
            setLoading(false)

            console.log(e)
        }

        return isError;
    }


    return {createNewUser, loading};

}