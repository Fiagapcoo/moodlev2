import pool from "../models/DB";
import { RowDataPacket, FieldPacket } from 'mysql2/promise';

async function registerUser(Nmecanografico: string, email: string, password: string, licenciatura: number) {
    try {
      // Check if the NMecanografico or email already exists
      const [rows] = await pool.query('SELECT IDUser FROM Users WHERE NMecanografico = ? OR email = ?', [Nmecanografico, email]);
      if ((rows as RowDataPacket[]).length > 0) {
        return "NMecanografico or email already exists";
      }
  
      // Insert the new user
      const [result] = await pool.query('INSERT INTO Users (NMecanografico, email, password, Licenciatura) VALUES (?, ?, ?, ?)', [Nmecanografico, email, password, licenciatura]);
      if((result as RowDataPacket).insertId){
        return "User registered";
      }else{
        return "Error registering user";
      }
    } catch (error) {
      throw error;
    }
  }
async function loginUser(Nmecanografico: string, password: string) {
    try {
        const [rows, fields] = await pool.query('SELECT COUNT(*) FROM Users WHERE NMecanografico = ? AND password = ?', [Nmecanografico, password]);
        if((rows as RowDataPacket[])[0]['COUNT(*)'] === 1) {
            //logged in add token
            return true;
        } else {
            //login failed
            return false;
        }

    } catch (error) {
        throw error;
    }
}

export { registerUser, loginUser };
