import { randomBytes } from 'crypto'
export default () => {
    const OTP = randomBytes(32).toString('hex')
    return OTP
}