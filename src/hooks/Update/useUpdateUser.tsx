import { updateProfile, User } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useGetUserDataById } from "../Read/useGetUserDataById";

type UserProps = {
    avatar?: string,
    displayName?: string,
    profileDescription?: string,
    username?: string
}

export const useUpdateUser = (userToUpdate: User) => {

    const {user} = useGetUserDataById(userToUpdate.uid)


    const updateUser = async ({avatar, displayName, profileDescription, username}:UserProps) => {
        let isError: boolean = false;
        try{
            await updateProfile(userToUpdate, {
                photoURL: avatar?.length? avatar : userToUpdate.photoURL,
                displayName: displayName?.length? displayName : userToUpdate.displayName
            })

            await updateDoc(doc(db, "users", userToUpdate.uid), {
                avatar: avatar?.length? avatar : userToUpdate.photoURL,
                displayName: displayName?.length? displayName: userToUpdate.displayName,
                profileDescription: profileDescription?.length? profileDescription : user?.profileDescription,
                username: username?.length ? username : user?.username,
            })

            isError = false;
        }catch(e){
            console.log(e)
            isError = true;
        }

        return isError
    }

    return {updateUser}

}