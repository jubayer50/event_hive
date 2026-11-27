import bcrypt from "bcrypt";

const makePasswordHash = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

const isPasswordSame = async (plainPassword: string, hashPassword: string) => {
  return await bcrypt.compare(plainPassword, hashPassword);
};

export const passwordHelper = {
  makePasswordHash,
  isPasswordSame,
};
