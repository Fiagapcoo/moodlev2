import pool from "../models/DB";
import {RowDataPacket, FieldPacket } from 'mysql2/promise';

async function getLicenciaturas() {
    const [rows, fields] = await pool.query('SELECT * FROM licenciatura')
    return rows;

}

async function addLicenciatura(nome: string) {
    const [rows, fields] = await pool.query('INSERT INTO licenciatura (ID_licenciatura, Nome_licenciatura, Ano_letivo) VALUES (NULL, ?, "24/25")', [nome]);
    return rows;
}


export {getLicenciaturas, addLicenciatura};