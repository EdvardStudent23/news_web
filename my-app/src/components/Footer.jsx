import facebookIcon from "../assets/facebook.svg";
import twitterIcon from "../assets/twitter.svg";
import instagramIcon from "../assets/instagram.svg";
import telegramIcon from "../assets/telegram.svg";
import linkedinIcon from "../assets/linkedin.svg";
import githubIcon from "../assets/github.svg";
import './Footer.css';
import { useState } from "react";


export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

const handleSubscribe = async () => {
  if (!email) {
    setMessage("❗ Input your gmail");
    return;
  }

  // Перевірка, чи це Gmail
  if (!email.endsWith("@gmail.com")) {
    setMessage("❗ Input your Gmail");
    return;
  }

  try {
    const response = await fetch("http://localhost:3001/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(`❌ ${data.error || "Error"}`);
    } else {
      setMessage("✅ You have successfully subscribed");
      setEmail("");
    }
  } catch (err) {
    setMessage("❌ Subscription error");
    console.error(err);
  }
};


  const socialLinks = [
    { name: "Facebook", icon: facebookIcon, url: "https://facebook.com" },
    { name: "Twitter", icon: twitterIcon, url: "https://twitter.com" },
    { name: "Instagram", icon: instagramIcon, url: "https://instagram.com" },
    { name: "Telegram", icon: telegramIcon, url: "https://telegram.org" },
    { name: "LinkedIn", icon: linkedinIcon, url: "https://linkedin.com" },
    { name: "GitHub", icon: githubIcon, url: "https://github.com/EdvardStudent23/news_web.git" },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          {/* Newsletter Section */}
          <div className="newsletter-section">
            <h3>Stay Updated</h3>
            <div className="newsletter-group">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="newsletter-input"
              />
              <button onClick={handleSubscribe}>
                Subscribe
              </button>
              {message && <p className="newsletter-message">{message}</p>}
            </div>
          </div>

          {/* Social Icons */}
          <div className="social-section">
            <div className="social-icons">
              {socialLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img src={link.icon} alt={link.name} className="social-icon" />
                </a>
              ))}
            </div>
          </div>

          {/* Copyright & Links */}
          <div className="legal-section">
            <p>© 2025 HermesNews</p>
            <div className="legal-links">
              <a href="#privacy">Privacy</a>
              <a href="#terms">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}