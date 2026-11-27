import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import { config } from "../config/config";

const generateToken = (payload: JwtPayload) => {
  return jwt.sign(payload, config.jwt_secret, {
    expiresIn: config.jwt_expire_in as SignOptions["expiresIn"],
  });
};

const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwt_secret);
};

export const jwtHelper = {
  generateToken,
  verifyToken,
};
