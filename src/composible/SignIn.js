// src/composible/SignIn.js
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function useSignIn() {
    const error = ref(null);
    const isPending = ref(false);

    const signin = async (email, password) => {
        error.value = null;
        isPending.value = true;

        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);
            isPending.value = false;
            return true;
        } catch (err) {
            error.value = err.message;
            isPending.value = false;
            return false;
        }
    };

    return { error, isPending, signin };
}