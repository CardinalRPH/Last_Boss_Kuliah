import { compare, hash } from "bcrypt"

export const Bhash = async (password, saltRound = 10) => {
    return await hash(password, saltRound)
}

export const Bcompare = async (password, hashedPassword) => {
    return await compare(password, hashedPassword)
}