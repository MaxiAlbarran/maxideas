import { User } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../config/firebase";
import { useGetUserDataById } from "../Read/useGetUserDataById";

type UserProps = {
    avatar?: File | null | undefined,
    displayName?: string,
    profileDescription?: string,
    username?: string
}

export const useUpdateUser = (userToUpdate: User) => {

    const {user} = useGetUserDataById(userToUpdate.uid)


    const updateUser = async ({avatar, displayName, profileDescription, username}:UserProps) => {
        let isError: boolean = false;
        try{
            const docRef = doc(db, "users", userToUpdate.uid)
            await updateDoc(docRef, {
                displayName: displayName?.length? displayName: user?.displayName,
                profileDescription: profileDescription?.length? profileDescription : user?.profileDescription,
                username: username?.length ? username : user?.username,
            })

            if(avatar){
                const storageRef = ref(storage, `users/${userToUpdate.uid}`);
                await uploadBytes(storageRef, avatar);
                const URL = await getDownloadURL(storageRef);

                await updateDoc(docRef, {avatar: URL})
            }

            isError = false;
        }catch(e){
            console.log(e)
            isError = true;
        }

        return isError
    }

    return {updateUser}

}