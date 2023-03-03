import { addDoc, collection, FieldValue } from "firebase/firestore";
import { db } from "../../config/firebase";

type Post = {
  userRef: string | undefined;
  text: string;
  image: string;
  createdAt: FieldValue;
};

export const useCreatePost = (coll: string) => {
  const createPost = async ({ userRef, text, image, createdAt }: Post) => {
    let isError: boolean;
    try {
      await addDoc(collection(db, coll), {
        userRef: userRef,
        text: text,
        image: image,
        createdAt: createdAt,
      });

      isError = false;
    } catch (e) {
      isError = true;
    }

    return isError;
  };

  return createPost;
};
