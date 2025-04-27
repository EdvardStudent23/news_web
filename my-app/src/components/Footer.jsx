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


      <div className="footer-search">
        <div class="row">
          <div class="footer-column-section">
            <h5>Section</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Home</a></li>
              <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Features</a></li>
              <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Pricing</a></li>
              <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">FAQs</a></li>
              <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">About</a></li>
            </ul>
          </div>

          <div class="footer-column-section">
            <h5>Section</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Home</a></li>
              <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Features</a></li>
              <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Pricing</a></li>
              <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">FAQs</a></li>
              <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">About</a></li>
            </ul>
          </div>

          <div class="footer-column-section">
            <h5>Section</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Home</a></li>
              <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Features</a></li>
              <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Pricing</a></li>
              <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">FAQs</a></li>
              <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">About</a></li>
            </ul>
          </div>

          <div class="footer-search-section">
            <form>
              <h5>Subscribe to our newsletter</h5>
              <p>Monthly digest of what's new and exciting from us.</p>
              <div class="footer-search-section-mini">
                <label for="newsletter1" class="visually-hidden">Email address</label>
                <input id="newsletter1" type="email" class="form-control" placeholder="Email address"/>
                <button class="btn btn-primary" type="button">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
    </footer>
  );
}






