import { randomInt } from 'crypto'
export default () => {
    const OTP = randomInt(100000, 999999)
    return OTP
}