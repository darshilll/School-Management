import express from "express";
const router = express.Router();

router.get("/listSchools",(req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLong = parseFloat(req.query.longitude);

  if (isNaN(userLat) || isNaN(userLong)) {
    return res.status(400).json({ error: "Invalid coordinates" });
  }

  const sql = "SELECT * FROM schools";

  req.app.get('db').query(sql, (err, results) => {
    if (err) throw err;


    results.forEach((school) => {
      school.distance = getDistance(
        userLat,
        userLong,
        school.latitude,
        school.longitude
      );
    });

    results.sort((a, b) => a.distance - b.distance);

    res.json(results);
  });
});

function getDistance(lat1, long1, lat2, long2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLong = deg2rad(long2 - long1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export default router;
