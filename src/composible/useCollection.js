import { projectFirestore } from "@/config/config";
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    setDoc,
    where,
} from "firebase/firestore";

const useCollection = (collectionName) => {
    let collectionRef = collection(projectFirestore, collectionName); //items

    const addDocs = async (formDoc) => {
        return await addDoc(collectionRef, formDoc);
    };

    const setDocs = async (id, formDoc) => {
        return await setDoc(doc(collectionRef, id), formDoc);
    };


    const removeDoc = async (id) => {
        try {
            await deleteDoc(doc(collectionRef, id));
            return true;
        } catch (err) {
            console.log("Failed to delete data", err);
            return false;
        }
    };


    const updateDocs = async (id, formDoc) => {
        try {
            console.log("Updating document with ID:", id);
            console.log("Updated data:", formDoc);
            await updateDoc(doc(collectionRef, id), formDoc);
            console.log("Document updated successfully");
            return true;
        } catch (error) {
            console.error("Error updating document:", error);
            return false;
        }
    };
    const addUser = async (userData) => {
        try {
            const result = await addDocs(userData);
            console.log("User added successfully with ID:", result.id);
            return result.id;
        } catch (error) {
            console.error("Error adding user:", error);
            return null;
        }
    };
    const DeleteByUser = async (userId) => {
        const conditions = [where("userId", "==", userId)];
        await deleteDoc(conditions);
    };

    return { addDocs, setDocs, removeDoc, updateDocs, addUser, DeleteByUser };
};

export default useCollection;