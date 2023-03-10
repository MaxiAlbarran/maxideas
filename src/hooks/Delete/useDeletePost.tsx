import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../../config/firebase";

export const useDeletePost = (id: string, isImageStoraged: boolean) => {

    const deletePost = async () => {
        try{
            await deleteDoc(doc(db, "posts", id));

            if(isImageStoraged){
                await deleteObject(ref(storage, `posts/${id}`))
            }

            return false
        }catch(e){
            console.log(e);
            return true
        }
    }

    return deletePost;
}