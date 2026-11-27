import { Pool } from "pg";
import { config } from "../config/config";

export const pool = new Pool({
  connectionString: config.database_url,
});

export const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(255) DEFAULT 'attendee',

      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      );
      `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS events(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(255) NOT NULL,
        date TIMESTAMP NOT NULL,
        location TEXT NOT NULL,
        total_seats INT NOT NULL CHECK(total_seats>0),
        available_seats INT NOT NULL CHECK(available_seats>=0 AND available_seats<=total_seats),
        price DECIMAL(10,2) NOT NULL CHECK(price>=0),
        organizer_id INT REFERENCES userS(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `);

    console.log("Database connected successfully!!");
  } catch (error) {
    console.log(error);
  }
};
