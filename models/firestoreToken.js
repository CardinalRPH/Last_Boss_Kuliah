import fire from "../config/firestore.js"
import { encryptToUniqueCode } from "../security/aesManager.js"

const collectionName = 'tokens'
export const getUserToken = async ({ email }) => {
    const uniqueEmail = encryptToUniqueCode(email)
    const tokenCollection = fire.collection(collectionName)
    try {
        const snapshot = await tokenCollection.doc(uniqueEmail).get()
        if (!snapshot.exists) {
            return false
        }
        return { id: snapshot.id, data: snapshot.data() }
    } catch (error) {
        console.error("Firebase Error:", error);
        throw error;
    }
}

export const addUpdateUserToken = async ({ email, token, expireMinutes = 5 }) => {
    const uniqueEmail = encryptToUniqueCode(email)
    const tokenCollection = fire.collection(collectionName)

    //define expire token
    const currentTime = new Date();
    const expirationDate = new Date(currentTime.getTime() + (expireMinutes * 60000));
    try {
        const addUpdateToken = await tokenCollection.doc(uniqueEmail).set({
            token,
            expire: expirationDate.toISOString()
        })
        return { id: uniqueEmail, data: addUpdateToken }
    } catch (error) {
        console.error("Firebase Error:", error);
        throw error;
    }
}

export const deleteUserToken = async ({ email }) => {
    const uniqueEmail = encryptToUniqueCode(email)
    const tokenCollection = fire.collection(collectionName)
    try {
        const snapshot = await tokenCollection.doc(uniqueEmail).get()
        if (!snapshot.exists) {
            return false
        }
        const deletedToken = await tokenCollection.doc(uniqueEmail).delete()
        return { id: uniqueEmail, data: deletedToken }
    } catch (error) {
        console.error("Firebase Error:", error);
        throw error;
    }
}