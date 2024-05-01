import { configDotenv } from "dotenv"
import admin from "firebase-admin"
configDotenv()

const fsCreds = JSON.parse(process.env.FIRESTORE_CERDS)

admin.initializeApp({
    credential:admin.credential.cert(fsCreds),
})

const fire = admin.firestore()
export default fire