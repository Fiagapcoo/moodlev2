import exp from "constants";
import pool from "../models/DB";
import { RowDataPacket, FieldPacket } from "mysql2/promise";

async function getAssignments() {
  try {
    const [rows] = await pool.query("SELECT * FROM assignments");
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAssignmentsFromDisciplina(Disciplina: number) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM assignments WHERE Disciplina = ?;",
      [Disciplina]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function addAssignment(Assignment: string, Disciplina: number, DataEntrega: string) {
  try {
    const [result] = await pool.query(
      "INSERT INTO assignments (ID_assignment, Nome_assignment, Disciplina, DueDate) VALUES (NULL, ?, ?, ?);",
      [Assignment, Disciplina, DataEntrega]
    );
    if ((result as RowDataPacket).insertId) {
      return "Assignment added";
    } else {
      return "Error adding Assignment";
    }
  } catch (error) {
    throw error;
  }
}

export { getAssignments, addAssignment, getAssignmentsFromDisciplina};
