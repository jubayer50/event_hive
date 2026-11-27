import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import { config } from "../config/config";

const generateToken = (payload: JwtPayload) => {
  return jwt.sign(payload, config.jwt_refresh_secret, {
    expiresIn: config.jwt_expire_in as SignOptions["expiresIn"],
  });
};

export const jwtHelper = {
  generateToken,
};
