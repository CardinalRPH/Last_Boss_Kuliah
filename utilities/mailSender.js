import mailTransport from "../config/mailConfig.js";

export default async (to, purpose, { userName, payload }) => {
    try {
        const result = mailTransport.sendMail({
            from: `no-reply_smart_Vertical_Garden<${process.env.MAIL_EMAIL_AUTH}>`,
            to, suject: purpose === 'verify' ? 'Verify Email' : 'Reset Password',
            html: purpose === 'verify' ? verifyEmailHtml(userName, payload) : resetPasswordHtml(userName, payload)
        });
        return result.response;
    } catch (error) {
        console.error('Failed to Send Mail', error);
        throw error
    }
}
const verifyEmailHtml = (userName, urlVerif) => {
    return ` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2>Email Verification</h2>
    <p>Dear ${userName},</p>
    <p>Thank you for registering. To complete your registration, please use the following verification link:</p>
    <a href=${urlVerif} style="background-color: #f0f0f0; padding: 10px; border-radius: 5px; display: inline-block;">Verify Email</a>
    <p>The verification code will expire within 5 minutes of receiving this message</p>
    <p>If you didn't register, please ignore this email.</p>
    <p>Best regards,<br>Smart Vertical Garden Team</p>
</div>
`
}

const resetPasswordHtml = (userName, urlPass) => {
    return ` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2>Password Reset</h2>
    <p>Dear ${userName},</p>
    <p>Click the link below to reset your password:</p>
    <a href=${urlPass} style="background-color: #f0f0f0; padding: 10px; border-radius: 5px; display: inline-block;">Reset Password</a>
    <p>The reset link will expire within 10 minutes of receiving this message</p>
    <p>If you didn't request a password reset, you can ignore this email.</p>
    <p>Best regards,<br>Smart Vertical Garden Team</p>
</div>
`
}