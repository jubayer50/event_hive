import dotenv from "dotenv";
import type { SignOptions } from "jsonwebtoken";
import path from "node:path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export const config = {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL as string,
  jwt_secret: process.env.JWT_SECRET as string,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET as string,
  jwt_expire_in: process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  jwt_refresh_expire_in: process.env
    .JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"],
};
