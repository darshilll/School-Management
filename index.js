import express from "express";
import mysql from "mysql2";
import addSchool from "./routers/addSchool.js";
import listSchools from "./routers/listSchools.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 5500;

const app = express();
app.use(express.json());


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


app.use((req, res, next) => {
  req.db = pool;
  next();
});


app.get("/", (req, res) => {
  const sql = "SELECT * FROM school";
  req.db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    return res.json(data);
  });
});


app.use(addSchool);
app.use(listSchools);


app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
