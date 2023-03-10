import {
  doc,
  DocumentData,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";

export const useGetUserDataById = (id: string | null) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<DocumentData | null>();

  const getUser = async () => {
    try {
      setLoading(true);
      if (id) {
        onSnapshot(doc(db, "users", id), (doc) => {
          if(doc){
            setUser(doc.data());
          }else{
            setUser(null)
          }
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
