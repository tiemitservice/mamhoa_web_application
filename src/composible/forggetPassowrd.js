import { projectAuth } from "@/config/config";
import { sendPasswordResetEmail } from "firebase/auth";
import { ref } from "vue";

const error = ref(null);
const isPending = ref(false);

const resetPassword = async (email) => {
    error.value = null;
    isPending.value = true;

    try {
        await sendPasswordResetEmail(projectAuth, email);
        isPending.value = false;

        return { success: true, message: "Password reset email sent successfully." };
    } catch (err) {
        console.log("err", err);
        error.value = err.message;
        isPending.value = false;

        return { success: false, message: err.message };
    }
};

const useResetPassword = () => {
    return { error, resetPassword, isPending };
};

export default useResetPassword;