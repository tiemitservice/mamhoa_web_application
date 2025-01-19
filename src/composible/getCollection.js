import {
    collection,
    onSnapshot,
    query,
    getDocs,
    where,
    orderBy,
    startAt,
    endAt,
} from "firebase/firestore";
import { projectFirestore } from "../config/config";

export const getCollectionQuery = async (
    collectionName,
    whereDoc = [],
    callback,
    useSnapshot = false,
    searchField = null,
    searchTerm = ""
) => {
    const collectionRef = collection(projectFirestore, collectionName);

    // Initialize the query reference
    let queryRef = collectionRef;

    // Apply where clauses if provided
    if (Array.isArray(whereDoc) && whereDoc.length > 0) {
        queryRef = query(collectionRef, ...whereDoc);
    }

    // Apply search functionality if both field and term are provided
    if (searchField && typeof searchTerm === "string" && searchTerm.trim() !== "") {
        queryRef = query(
            queryRef,
            orderBy(searchField),
            startAt(searchTerm),
            endAt(searchTerm + "\uf8ff")
        );
    }

    try {
        if (useSnapshot) {
            // Real-time updates using onSnapshot
            const unsubscribe = onSnapshot(
                queryRef,
                (snapshot) => {
                    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                    try {
                        if (callback) callback(data);
                    } catch (callbackError) {
                        console.error("Error in callback execution:", callbackError);
                    }
                },
                (error) => {
                    console.error("Real-time snapshot error:", error);
                }
            );

            return unsubscribe; // Caller should handle unsubscribe
        } else {
            // One-time fetch
            const snapshot = await getDocs(queryRef);
            const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

            try {
                if (callback) callback(data);
            } catch (callbackError) {
                console.error("Error in callback execution:", callbackError);
            }
        }
    } catch (error) {
        console.error("Error in getCollectionQuery:", error);
    }
};