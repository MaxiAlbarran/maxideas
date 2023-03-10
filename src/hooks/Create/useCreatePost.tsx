import {
  addDoc,
  collection,
  doc,
  FieldValue,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../config/firebase";

type Post = {
  userRef: string | null;
  text: string;
  image: File | null | undefined;
  createdAt: FieldValue;
};

export const useCreatePost = (coll: string) => {
  const createPost = async ({ userRef, text, image, createdAt }: Post) => {
    let isError: boolean;
    try {
      const newDocument = await addDoc(collection(db, coll), {
        userRef: userRef,
        text: text,
        createdAt: createdAt,
        image: ""
      });

      if (image) {
        const storageRef = ref(storage, `posts/${newDocument.id}`);
        await uploadBytes(storageRef, image);

        const URL = await getDownloadURL(storageRef)

        await updateDoc(doc(db, "posts", newDocument.id), { image: URL});
      }

      isError = false;
    } catch (e) {
      console.log(e);
      isError = true;
    }

    return isError;
  };

  return createPost;
};
