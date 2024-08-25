import express from "express";
import mysql from "mysql2";
import addSchool from "./routers/addSchool.js";
import listSchools from "./routers/listSchools.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 5500;

const app = express();
app.use(express.json());

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Middleware to make pool available in requests
app.use((req, res, next) => {
  req.db = pool;
  next();
});

// Test Route
app.get("/", (req, res) => {
  const sql = "SELECT * FROM school";
  req.db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    return res.json(data);
  });
});

// Routers
app.use(addSchool);
app.use(listSchools);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
