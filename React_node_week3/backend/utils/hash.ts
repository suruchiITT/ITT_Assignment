import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

 const hashPassword = async (password: string) => {

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    return hashedPassword;

};

 const comparePassword = async (password: string, hashedPassword: string) => {

    const isMatch = await bcrypt.compare(password, hashedPassword);

    return isMatch;

};

export {
    hashPassword,
    comparePassword
}