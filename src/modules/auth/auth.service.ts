import { pool } from "../../db";
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

export const authService = {
  createUserIntoDB,
};
