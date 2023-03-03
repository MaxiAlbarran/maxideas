import {
  collection,
  DocumentData,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";

export const useGetPosts = () => {
  const [posts, setPosts] = useState<DocumentData[]>();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

        await onSnapshot(q, (querySnapshot) => {
          const posts: DocumentData[] = [];
          querySnapshot.forEach((doc) => {
            posts.push(doc.data());
          });

          setPosts(posts);
        });
      } catch (e) {
        console.log(e);
      }
    };
    getPosts();
  }, []);

  return { posts };
};
