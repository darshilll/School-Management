import express from "express";
const router = express.Router();

router.get("/schools", (req, res) => {
  const sql = "SELECT * FROM schools";
  req.app.get("db").query(sql, (err, data) => {
    if (err) return res.json("error");
    return res.json(data);
  });
});

export default router;
