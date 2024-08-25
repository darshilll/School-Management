import express from "express";
const router = express.Router();

router.post("/addSchool", (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (
      !name ||
      !address ||
      typeof latitude !== "number" ||
      typeof longitude !== "number"
    ) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const school = { name, address, latitude, longitude };
    const sql = "INSERT INTO school SET ?";

    req.app.get("db").query(sql, school, (err, result) => {
      if (err) return res.json("error");
      return res.json({
        message: "School added successfully",
        id: result.insertId,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interal server error" });
  }
});

export default router;
