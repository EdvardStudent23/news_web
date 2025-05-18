const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const subscribeRoute = require("./routes/subscribe");
const sendNews = require("./mailer/sendNews");
const cron = require("node-cron");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/subscribe", subscribeRoute);

// Щоденна розсилка о 9:00 ранку
cron.schedule("* * * * *", sendNews);

app.listen(3001, () => {
  console.log("✅ Server running on http://localhost:3001");
});
