import pool from "../models/DB";
import {RowDataPacket, FieldPacket } from 'mysql2/promise';

async function getLicenciaturas() {
    const [rows, fields] = await pool.query('SELECT * FROM licenciatura')
    return rows;

}

async function addLicenciatura(nome: string, enabled: string) {
    const [rows, fields] = await pool.query('INSERT INTO licenciatura (ID_licenciatura, Nome_licenciatura, Enabled) VALUES (NULL, ?, ?)', [nome, enabled]);
    return rows;
}


export {getLicenciaturas, addLicenciatura};