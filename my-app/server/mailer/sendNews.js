const fs = require("fs").promises;
const path = require("path");
const nodemailer = require("nodemailer");
const axios = require("axios");

const dataPath = path.join(__dirname, "../data/subscribers.json");

// Створюємо транспортер для надсилання email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "testposhta123456@gmail.com",
    pass: "vjbtubwbjuujiwlx", // App Password
  },
});

// Отримати HTML розмітку останніх новин з NewsAPI
async function getLatestNewsHTML() {
  try {
    const res = await axios.get(
      'https://newsapi.org/v2/top-headlines?country=us&pageSize=1&apiKey=ce23d938880c4e8e86014cafd957603b'
    );
    const articles = res.data.articles || [];

    if (!articles.length) {
      return "<p>Сьогодні новин немає.</p>";
    }

    const listItems = articles
      .map(
        (a) => `<li><a href="${a.url}" target="_blank">${a.title}</a></li>`
      )
      .join("\n");

    return `
      <h2>📰 Сьогоднішні новини</h2>
      <ul>
        ${listItems}
      </ul>
    `;
  } catch (error) {
    console.error("❌ Помилка при отриманні новин:", error.message);
    return "<p>Не вдалося отримати новини.</p>";
  }
}

// Основна функція для надсилання новин
async function sendNews() {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const subscribers = JSON.parse(data);

    if (!Array.isArray(subscribers) || subscribers.length === 0) {
      console.warn("⚠️ Немає підписників для надсилання.");
      return;
    }

    const html = await getLatestNewsHTML();

    for (const email of subscribers) {
      try {
        await transporter.sendMail({
          from: '"News Digest" <testposhta123456@gmail.com>',
          to: email,
          subject: "Щоденні новини",
          html,
        });
        console.log(`✅ News sent to ${email}`);
      } catch (err) {
        console.error(`❌ Failed to send to ${email}:`, err.message);
      }
    }
  } catch (err) {
    console.error("❌ Помилка при читанні файлу підписників:", err.message);
  }
}

module.exports = sendNews;
