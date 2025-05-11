/*
 - pg module
*/
import { Pool } from 'pg';
// env variables
import dotenv from 'dotenv';
// connect databse
dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});