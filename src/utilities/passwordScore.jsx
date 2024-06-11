const atLeastMinimumLength = (password) => new RegExp(/(?=.{8,})/).test(password);
const atLeastOneUppercaseLetter = (password) => new RegExp(/(?=.*?[A-Z])/).test(password);
const atLeastOneLowercaseLetter = (password) => new RegExp(/(?=.*?[a-z])/).test(password);
const atLeastOneNumber = (password) => new RegExp(/(?=.*?[0-9])/).test(password);
const atLeastOneSpecialChar = (password) => new RegExp(/(?=.*?[#?!@$ %^&*-])/).test(password);

const passwordScore = password => {
    if (!password) return 0

    let points = 0;

    if (atLeastMinimumLength(password)) points += 1;
    if (atLeastOneUppercaseLetter(password)) points += 1

    if (atLeastOneLowercaseLetter(password)) points += 1
    if (atLeastOneNumber(password)) points += 1;

    if (atLeastOneSpecialChar(password)) points += 1;
    return points
}

export default passwordScore