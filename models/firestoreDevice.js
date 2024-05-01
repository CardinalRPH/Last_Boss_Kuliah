import fire from "../config/firestore.js"
import { encryptToUniqueCode } from "../security/aesManager.js"

const collectionName = 'tokens'
const subcollectionName = 'userDevices'

export const getAllUserDevice = async ({ email }) => {
    const uniqueEmail = encryptToUniqueCode(email)
    const deviceCollection = fire.collection(collectionName)
    try {
        const snapshot = await deviceCollection.doc(uniqueEmail).collection(subcollectionName).get()
        if (snapshot.empty) {
            return false
        }
        return {
            id: uniqueEmail,
            data: snapshot
        }
    } catch (error) {
        console.error("Firebase Error:", error);
        throw error;
    }
}

export const getUserDevicebyId = async ({ email, deviceId }) => {
    const uniqueEmail = encryptToUniqueCode(email)
    const deviceCollection = fire.collection(collectionName)
    try {
        const snapshot = await deviceCollection.doc(uniqueEmail).collection(subcollectionName).doc(deviceId).get()
        if (!snapshot.exists) {
            return false
        }
        return { id: snapshot.id, data: snapshot.data() }
    } catch (error) {
        console.error("Firebase Error:", error);
        throw error;
    }
}

export const addNewDevice = async ({ email, deviceId, deviceData = {} }) => {
    const uniqueEmail = encryptToUniqueCode(email)
    const deviceCollection = fire.collection(collectionName)
    try {
        const snapshot = await deviceCollection.doc(uniqueEmail).collection(subcollectionName).doc(deviceId).get()
        if (snapshot.exists) {
            return false
        }
        const createDevice = await deviceCollection.doc(uniqueEmail).collection(subcollectionName).doc(deviceId).set(deviceData)
        return {
            id: uniqueEmail,
            data: createDevice
        }
    } catch (error) {
        console.error("Firebase Error:", error);
        throw error;
    }
}

export const updateDevice = async ({ email, deviceId, deviceData }) => {
    const uniqueEmail = encryptToUniqueCode(email)
    const deviceCollection = fire.collection(collectionName)
    try {
        const snapshot = await deviceCollection.doc(uniqueEmail).collection(subcollectionName).doc(deviceId).get()
        if (!snapshot.exists) {
            return false
        }

        const updatedDevice = await deviceCollection.doc(uniqueEmail).collection(subcollectionName).doc(deviceId).update(deviceData(snapshot.data()))
        return { id: uniqueEmail, data: updatedDevice }
    } catch (error) {
        console.error("Firebase Error:", error);
        throw error;
    }
}

export const deleteDevice = async ({ email, deviceId }) => {
    const uniqueEmail = encryptToUniqueCode(email)
    const deviceCollection = fire.collection(collectionName)
    try {
        const snapshot = await deviceCollection.doc(uniqueEmail).collection(subcollectionName).doc(deviceId).get()
        if (!snapshot.exists) {
            return false
        }

        const deletedDevice = await deviceCollection.doc(uniqueEmail).collection(subcollectionName).doc(deviceId).delete()
        return { id: uniqueEmail, data: deletedDevice }
    } catch (error) {
        console.error("Firebase Error:", error);
        throw error;
    }
}