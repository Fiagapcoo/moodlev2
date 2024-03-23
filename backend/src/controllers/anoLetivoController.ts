import pool from "../models/DB";
import { RowDataPacket, FieldPacket } from 'mysql2/promise';

async function getAnosLetivos() {
    try {
        const [rows] = await pool.query('SELECT * FROM AnoLetivo');
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getAnoLetivoAtual() {
    try {
        const [rows] = await pool.query('SELECT AnoLetivo FROM AnoLetivo WHERE ID_Ano >= ( SELECT MAX(ID_Ano) FROM AnoLetivo );');
        return rows;
    } catch (error) {
        throw error;
    }
}


async function addAnoLetivo(AnoLetivo: string) {
    try {
        const [result] = await pool.query('INSERT INTO AnoLetivo (ID_Ano, AnoLetivo) VALUES (NULL, ?);', [AnoLetivo]);
        if((result as RowDataPacket).insertId){
            return "Ano Letivo added";
        }else{
            return "Error adding Ano Letivo";
        }
    } catch (error) {
        throw error;
    }
}

export { getAnosLetivos, addAnoLetivo, getAnoLetivoAtual };