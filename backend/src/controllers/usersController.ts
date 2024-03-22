import pool from "../models/DB";
import { RowDataPacket, FieldPacket } from 'mysql2/promise';

async function registerUser(Nmecanografico: string, email: string, password: string, licenciatura: number) {
    try {
        const [rows, fields] = await pool.query('INSERT INTO Users (IDUser , NMecanografico, email, password, Licenciatura) VALUES (NULL, ?, ?, ?, ?)', [Nmecanografico, email, password, licenciatura]);
        return rows;
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
