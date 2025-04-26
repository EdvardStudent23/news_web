import facebookIcon from "../assets/facebook.svg";
import twitterIcon from "../assets/twitter.svg";
import instagramIcon from "../assets/instagram.svg";
import telegramIcon from "../assets/telegram.svg";
import linkedinIcon from "../assets/linkedin.svg";
import githubIcon from "../assets/github.svg";
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <section className="footer-social">
          <a href="#!" className="social-link">
            <img src={facebookIcon} alt="Facebook" className="social-icon" />
          </a>
          <a href="#!" className="social-link">
            <img src={twitterIcon} alt="Twitter" className="social-icon" />
          </a>
          <a href="#!" className="social-link">
            <img src={instagramIcon} alt="Instagram" className="social-icon" />
          </a>
          <a href="#!" className="social-link">
            <img src={telegramIcon} alt="Telegram" className="social-icon" />
          </a>
          <a href="#!" className="social-link">
            <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
          </a>
          <a href="#!" className="social-link">
            <img src={githubIcon} alt="GitHub" className="social-icon" />
          </a>
        </section>
      </div>

      <div className="footer-copyright">
        © 2025 Copyright:{" "}
        <a href="#!" className="footer-link">MyWebsite</a>
      </div>
    </footer>
  );
}
