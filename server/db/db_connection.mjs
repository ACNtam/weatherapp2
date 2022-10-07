// server/db/db-connection.js;
import pgPromise from 'pg-promise';

// Create Database Connection
const pgp = pgPromise({});

const db = pgp('postgres://localhost:5432/weather');

export default db;