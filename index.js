import express from "express";
import mysql from "mysql2";
import addSchool from "./routers/addSchool.js";
import listSchools from "./routers/listSchools.js";
import dotenv from "dotenv"

dotenv.config();
const PORT = process.env.PORT || 5500;

const app = express();
app.use(express.json());

//MYSQL CONNECTION
const db = mysql.createConnection({
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME
});

db.connect((err) => {
  app.set("db", db);
  if (err) {
    throw err;
  }
  console.log("MySQL Connected...");
});

app.get("/", (req, res) => {
     const sql = "SELECT * FROM school";
     req.app.get("db").query(sql, (err, data) => {
       if (err) return res.json("error");
       return res.json(data);
     });
   });

app.use(addSchool);
app.use(listSchools);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
