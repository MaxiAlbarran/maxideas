import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";

export const useGetPosts = () => {
  const [posts, setPosts] = useState<DocumentData[]>();
  const [loadingPosts, setLoadingPosts] = useState(false)
  

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoadingPosts(true)
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        onSnapshot(q, (querySnapshot) => {
          const posts: DocumentData[] = [];
          querySnapshot.forEach((doc) => {
            posts.push({...doc.data(), id: doc.id});
          });

          setPosts(posts);
        });

        setLoadingPosts(false);
      } catch (e) {
        console.log(e);
        setLoadingPosts(false);
      }
    };
    getPosts();
  }, []);

  return { posts, loadingPosts };
};
