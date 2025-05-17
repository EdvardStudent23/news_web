import facebookIcon from "../assets/facebook.svg";
import twitterIcon from "../assets/twitter.svg";
import instagramIcon from "../assets/instagram.svg";
import telegramIcon from "../assets/telegram.svg";
import linkedinIcon from "../assets/linkedin.svg";
import githubIcon from "../assets/github.svg";
import './Footer.css';

export default function Footer() {
  const socialLinks = [
    { name: "Facebook", icon: facebookIcon, url: "https://facebook.com" },
    { name: "Twitter", icon: twitterIcon, url: "https://twitter.com" },
    { name: "Instagram", icon: instagramIcon, url: "https://instagram.com" },
    { name: "Telegram", icon: telegramIcon, url: "https://telegram.org" },
    { name: "LinkedIn", icon: linkedinIcon, url: "https://linkedin.com" },
    { name: "GitHub", icon: githubIcon, url: "https://github.com" },
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
                placeholder="Enter your email" 
                className="newsletter-input"
              />
              <button className="subscribe-button">
                Subscribe
              </button>
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
            <p>© 2025 NewsWebsite</p>
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