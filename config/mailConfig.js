import { createTransport } from "nodemailer";

const mailTransport = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_EMAIL_AUTH,
        pass: process.env.MAIL_PASS_AUTH
    }
});

export default mailTransport