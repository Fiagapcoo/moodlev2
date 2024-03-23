import pool from "../models/DB";
import { RowDataPacket, FieldPacket } from 'mysql2/promise';


async function getDisciplinas() {
    try {
        const [rows] = await pool.query('SELECT * FROM disciplinas');
        return rows;
    } catch (error) {
        throw error;
    }
}


async function addDisciplina(Disciplina: string, Docentes: string, Licenciatura: number) {
    try {
        const [result] = await pool.query('INSERT INTO disciplinas (ID_disciplina, Nome_disciplina, Docentes, licenciatura) VALUES (NULL, ?, ?, ?);', [Disciplina, Docentes, Licenciatura]);
        if((result as RowDataPacket).insertId){
            return "Disciplina added";
        }else{
            return "Error adding Disciplina";
        }
    } catch (error) {
        throw error;
    }
}


export { getDisciplinas, addDisciplina };