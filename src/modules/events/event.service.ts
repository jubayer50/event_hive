import { pool } from "../../db";
import type { IEvent } from "./event.interface";

const createEventIntoDB = async (payload: IEvent) => {
  const {
    title,
    description,
    category,
    date,
    location,
    total_seats,
    available_seats,
    price,
    organizer_id,
  } = payload;

  const result = await pool.query(
    `
    INSERT INTO events(
    title,
    description,
    category,
    date,
    location, 
    total_seats, 
    available_seats, 
    price, 
    organizer_id
    ) VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
    `,
    [
      title,
      description,
      category,
      date,
      location,
      total_seats,
      available_seats,
      price,
      organizer_id,
    ],
  );

  console.log("service", result);

  return result.rows[0];
};

const getAllEventsFromDB = async () => {
  const result = await pool.query(`
    SELECT * FROM events
    `);

  return result.rows;
};

export const eventService = {
  createEventIntoDB,
  getAllEventsFromDB,
};
