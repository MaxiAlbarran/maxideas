import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";

export const useGetUserPosts = (id: string) => {
  const [userPosts, setUserPosts] = useState<DocumentData[]>();
  const [loadingUserPosts, setLoadingUserPosts] = useState(true);

  useEffect(() => {
    const getPostsById = async () => {
      try {
        setLoadingUserPosts(true)
        const q = query(
          collection(db, "posts"),
          orderBy("createdAt", "desc"),
          where("userRef", "==", id)
        );

        await onSnapshot(q, (querySnapshot) => {
          const posts: DocumentData[] = [];

          querySnapshot.forEach((snapshot) => {
            posts.push({...snapshot.data(), id: snapshot.id});
          });

          setUserPosts(posts);
        });
        setLoadingUserPosts(false);
      } catch (e) {
        console.log(e);
        setLoadingUserPosts(false);
      }
    };

    getPostsById();
  }, [id]);

  return { userPosts, loadingUserPosts };
};
