import { Pool } from "pg";
import { config } from "../config/config";

export const pool = new Pool({
  connectionString: config.database_url,
});

export const initDB = async () => {
  try {
    await pool.query(``);

    console.log("Database connected successfully!!");
  } catch (error) {
    console.log(error);
  }
};
