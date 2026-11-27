import { pool } from "../../db";
import AppError from "../../utils/appError";
import { jwtHelper } from "../../utils/jwtHelper";
import { passwordHelper } from "../../utils/passwordHelper";
import type { IUser } from "./auth.interface";

const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, role } = payload;

  const hashPassword = await passwordHelper.makePasswordHash(password);

  if (typeof hashPassword !== "string") {
    throw new Error("Password hash problem!");
  }

  const result = await pool.query(
    `
    INSERT INTO users(name, email, password, role) VALUES
    ($1, $2, $3, COALESCE($4, 'attendee')) RETURNING *
    `,
    [name, email, hashPassword, role],
  );

  delete result.rows[0].password;
  return result.rows[0];
};

const loginUserFromDB = async (payload: {
  email: string;
  password: string;
}) => {
  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [payload.email],
  );

  const isPasswordSame = await passwordHelper.isPasswordSame(
    payload.password,
    userData.rows[0].password,
  );

  console.log(isPasswordSame);

  if (userData.rowCount === 0 || !isPasswordSame) {
    throw new AppError(401, "Invalid email or password!");
  }

  const user = userData.rows[0];
  delete user.password;
  delete user.created_at;
  delete user.updated_at;

  const jwtPayload = { ...user };

  const token = jwtHelper.generateToken(jwtPayload);

  return { token, user };
};

export const authService = {
  createUserIntoDB,
  loginUserFromDB,
};
