import fire from "../config/firestore.js"
import { encryptToUniqueCode } from "../security/aesManager.js"

const collectionName = 'users'
export const addNewUser = async ({ email, name, password }) => {
    const uniqueEmail = encryptToUniqueCode(email)
    const userCollection = fire.collection(collectionName)
    try {
        const snapshot = await userCollection.doc(uniqueEmail).get()
        if (snapshot.exists) {
            return false;
        }
        const createUser = await userCollection.doc(uniqueEmail).set({
            email, name, password,
            isVerified: false
        })
        return { id: uniqueEmail, data: createUser }
    } catch (error) {
        console.error("Firebase Error:", error);
        throw error;
    }
}

export const updateUser = async ({ email, name, password }) => {
    const uniqueEmail = encryptToUniqueCode(email)
    const userCollection = fire.collection(collectionName)
    try {
        const snapshot = await userCollection.doc(uniqueEmail).get()
        if (!snapshot.exists) {
            return false;
        }
        if (password === "") {
            const updatedUser = await userCollection.doc(uniqueEmail).update({ name })
            return { id: uniqueEmail, data: updatedUser }
        } else {
            const updatedUser = await userCollection.doc(uniqueEmail).update({ password })
            return { id: uniqueEmail, data: updatedUser }
        }
    } catch (error) {
        console.error("Firebase Error:", error);
        throw error;
    }
}
export const updateUserVerify = async ({ email, verified = false }) => {
    const uniqueEmail = encryptToUniqueCode(email)
    const userCollection = fire.collection(collectionName)
    try {
        const snapshot = await userCollection.doc(uniqueEmail).get()
        if (!snapshot.exists) {
            return false;
        }
        const updatedUser = await userCollection.doc(uniqueEmail).update({
            isVerified: verified
        })
        return { id: uniqueEmail, data: updatedUser }
    } catch (error) {
        console.error("Firebase Error:", error);
        throw error;
    }
}

export const deleteUser = async ({ email }) => {
    const uniqueEmail = encryptToUniqueCode(email)
    const userCollection = fire.collection(collectionName)
    try {
        const snapshot = await userCollection.doc(uniqueEmail).get()
        if (!snapshot.exists) {
            return false;
        }
        const deletedUser = await userCollection.doc(uniqueEmail).delete()
        return { id: uniqueEmail, data: deletedUser }
    } catch (error) {
        console.error("Firebase Error:", error);
        throw error;
    }
}

export const getAllUser = async () => {
    const userCollection = fire.collection(collectionName)
    try {
        const snapshot = await userCollection.get()
        if (snapshot.empty) {
            return false;
        }
        return snapshot
    } catch (error) {
        console.error("Firebase Error:", error);
        throw error;
    }
}

export const getUserbyId = async ({ email }) => {
    const uniqueEmail = encryptToUniqueCode(email)
    const userCollection = fire.collection(collectionName)
    try {
        const snapshot = await userCollection.doc(uniqueEmail).get()
        if (!snapshot.exists) {
            return false;
        }
        return { id: snapshot.id, data: snapshot.data() }
    } catch (error) {
        console.error("Firebase Error:", error);
        throw error;
    }
}

