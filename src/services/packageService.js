import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";

import { db } from "../config/firebase";

export const addPackage = async (name, price) => {
  await addDoc(collection(db, "packages"), { name, price });
};

export const getPackages = async () => {
  const snapshot = await getDocs(collection(db, "packages"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const deletePackage = async (id) => {
  await deleteDoc(doc(db, "packages", id));
};
