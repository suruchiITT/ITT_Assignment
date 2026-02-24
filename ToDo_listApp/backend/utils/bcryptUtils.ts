import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (
  enteredPassword: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};
