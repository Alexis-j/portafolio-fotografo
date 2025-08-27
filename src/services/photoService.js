import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db, storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadPhoto = async (file) => {
  const fileRef = ref(storage, `photos/${file.name}`);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  await addDoc(collection(db, "photos"), { url });
  return url;
};

export const getPhotos = async () => {
  const snapshot = await getDocs(collection(db, "photos"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const deletePhoto = async (id) => {
  await deleteDoc(doc(db, "photos", id));
};
