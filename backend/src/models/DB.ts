import exp from 'constants';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'moodle',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;