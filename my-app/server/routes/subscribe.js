const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dataPath = path.join(__dirname, "../data/subscribers.json");

router.post("/", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  let subscribers = [];
  if (fs.existsSync(dataPath)) {
    subscribers = JSON.parse(fs.readFileSync(dataPath));
  }

  if (!subscribers.includes(email)) {
    subscribers.push(email);
    fs.writeFileSync(dataPath, JSON.stringify(subscribers, null, 2));
    console.log("Subscribed:", email);
  }

  res.status(200).json({ message: "Subscribed successfully" });
});

module.exports = router;
