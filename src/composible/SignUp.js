import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref } from "vue";
import { projectAuth, timestamp } from "@/config/config";
import useCollection from "@/composible/useCollection";

const error = ref(null);
const isPending = ref(false);

const signup = async (email, password, displayName, role, phoneNumber, imageUrl) => {
    const { setDocs } = useCollection("users");
    try {
        isPending.value = true;

        console.log("Attempting to sign up with:", { email, password, displayName, role, phoneNumber });

        // Create user in Firebase Authentication
        const response = await createUserWithEmailAndPassword(projectAuth, email, password);
        if (!response) {
            throw new Error("Could not complete the signup");
        }

        console.log("User created in Firebase Auth:", response.user);

        // Update the user's profile with display name
        await updateProfile(response.user, { displayName });

        // Prepare user data for Firestore
        const userData = {
            id: response.user.uid,
            username: displayName,
            email: email,
            phoneNumber: phoneNumber,
            role: role || "manager", // Default role if not provided
            //image default null
            image: imageUrl ? imageUrl : null, //
            createdAt: timestamp(),
        };

        console.log("Saving user data to Firestore:", userData);

        // Save additional user data in Firestore
        await setDocs(response.user.uid, userData);

        console.log("User data successfully saved to Firestore.");

        return response;
    } catch (err) {
        error.value = err.message;
        console.error("Signup error:", err); // Log the error details
    } finally {
        isPending.value = false;
    }
};

const useSignUp = () => {
    return { error, isPending, signup };
};

export default useSignUp;