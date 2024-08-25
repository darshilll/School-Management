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

    req.db.query(sql, school, (err, result) => {
      if (err) {
        console.error("Database error:", err); // Improved error logging
        return res.status(500).json({ error: "Database query failed" });
      }
      return res.json({
        message: "School added successfully",
        id: result.insertId,
      });
    });
  } catch (error) {
    console.error("Internal server error:", error); // Improved error logging
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
