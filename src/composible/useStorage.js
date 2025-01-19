import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { projectStorage } from '../config/config';


const useStorage = () => {
    const uploadImage = async (storagePath, imageFile) => {
        const imageRef = storageRef(projectStorage, storagePath);

        try {
            await uploadBytes(imageRef, imageFile);

            const imageURL = await getDownloadURL(imageRef);

            return imageURL;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    const removeImage = async (storagePath) => {
        const imageRef = storageRef(projectStorage, storagePath);

        try {
            await deleteObject(imageRef);

            console.log('Image deleted successfully.');
        } catch (error) {
            console.error('Error deleting image:', error);
            throw error;
        }
    };

    return { uploadImage, removeImage };
};

export default useStorage;