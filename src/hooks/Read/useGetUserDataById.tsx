import {
  collection,
  doc,
  DocumentData,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";

type User = {
  avatar: string;
  displayName: string;
  username: string;
  profileDescription: string;
  userRef: string;
  email: string;
};

export const useGetUserDataById = (id: string | undefined) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<DocumentData>();

  const getUser = async () => {
    try {
      setLoading(true);
      if (id) {
        onSnapshot(doc(db, "users", id), (doc) => {
          setUser(doc.data());
        });
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);

  return { user, loading };
};
