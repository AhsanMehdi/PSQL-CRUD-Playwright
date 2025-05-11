/*
 - pg module
*/
import { Pool } from 'pg';

// connect databse
const pool = new Pool({
  user: 'dev',
  host: '35.225.166.131',
  database: 'dev',
  password: 'dev',
  port: 5432,
});

// create table to database
export async function create_facilities_table() {
  await pool.query(`
    CREATE SCHEMA IF NOT EXISTS cd;

    CREATE TABLE IF NOT EXISTS cd.facilities (
      facid INTEGER PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      membercost NUMERIC NOT NULL,
      guestcost NUMERIC NOT NULL,
      initialoutlay NUMERIC NOT NULL,
      monthlymaintenance NUMERIC NOT NULL
    );
  `);
}

// define to insert into facility
export async function insert_facility(facility: {
  facid: number;
  name: string;
  membercost: number;
  guestcost: number;
  initialoutlay: number;
  monthlymaintenance: number;
}) {
  const { facid, name, membercost, guestcost, initialoutlay, monthlymaintenance } = facility;

  // Insert the facility and skip if the facid already exists (using ON CONFLICT)
  /*
    - in order to avoid the SQL Injection the placeholders are used instead of direct value
    - like $1, $2 e.t.c
  */
  await pool.query(
    `INSERT INTO cd.facilities 
     (facid, name, membercost, guestcost, initialoutlay, monthlymaintenance)
     VALUES ($1, $2, $3, $4, $5, $6) 
     ON CONFLICT (facid) DO NOTHING`,
    [facid, name, membercost, guestcost, initialoutlay, monthlymaintenance]
  );
}
// read data from facility table
export async function read_facility(facid: number) {
  const result = await pool.query(`SELECT * FROM cd.facilities WHERE facid = $1`, [facid]);
  return result.rows[0]; 
}
// update data in facility table
export async function update_facility_name(facid: number, new_name: string) {
  await pool.query(`UPDATE cd.facilities SET name = $1 WHERE facid = $2`, [new_name, facid]);
}
// delete data in facility table
export async function delete_facility(facid: number) {
  await pool.query(`DELETE FROM cd.facilities WHERE facid = $1`, [facid]);
}
// disconnect
export async function disconnect_db() {
  await pool.end();
}
