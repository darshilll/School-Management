import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import addSchool from "./routers/addSchool.js";
import listSchools from "./routers/listSchools.js";
import allSchools from "./routers/allSchools.js";

const PORT = 5500;

const app = express();
app.use(bodyParser.json());

//MYSQL CONNECTION
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "darshil1234",
  database: "school",
});

db.connect((err) => {
  app.set("db", db);
  if (err) {
    throw err;
  }
  console.log("MySQL Connected...");
});

app.use(allSchools);
app.use(addSchool);
app.use(listSchools);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
