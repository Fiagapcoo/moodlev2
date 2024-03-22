import pool from "../models/DB";
import {RowDataPacket, FieldPacket } from 'mysql2/promise';

async function registerUser(Nmecanografico: string, email: string, password: string, licenciatura: number) {
    const [rows, fields] = await pool.query('INSERT INTO Users (IDUser , NMecanografico, email, password, Licenciatura) VALUES (NULL, ?, ?, ?, ?)', [Nmecanografico, email, password, licenciatura]);
    return rows;
}

async function loginUser(Nmecanografico: string, password: string) {
    const [rows, fields] = await pool.query('SELECT * FROM Users WHERE NMecanografico = ? AND password = ?', [Nmecanografico, password]);
    return rows;
}

export {registerUser, loginUser};