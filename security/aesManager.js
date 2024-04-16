import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'

export const encrypt = (text) => {
    const adjustedKey = process.env.ENCRYPTION_KEY.padEnd(32, '0').slice(0, 32);

    const iv = randomBytes(16); // Menghasilkan IV secara acak
    const cipher = createCipheriv('aes-256-cbc', Buffer.from(adjustedKey), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + encrypted;
}

export const decrypt = (encryptedText) => {
    const adjustedKey = process.env.ENCRYPTION_KEY.padEnd(32, '0').slice(0, 32);

    try {
        const iv = Buffer.from(encryptedText.slice(0, 32), 'hex'); // Ambil IV dari string terenkripsi
        const encryptedData = encryptedText.slice(32); // Ambil data terenkripsi dari string terenkripsi
        const decipher = createDecipheriv('aes-256-cbc', Buffer.from(adjustedKey), iv);
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (error) {
        return false
    }
}