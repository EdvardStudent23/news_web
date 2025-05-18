import { useState } from "react";
import axios from "axios"; // для запитів на бекенд
import "./Footer.css"; // якщо стилі загальні

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubscribe = async () => {
    if (!email) return setStatus("❗ Enter your email");

    try {
      await axios.post("http://localhost:3001/api/subscribe", { email });
      setStatus("✅ Subscribed successfully!");
      setEmail("");
    } catch (err) {
      setStatus("❌ Subscription failed");
      console.error(err);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h5>Subscribe to our newsletter</h5>
      <p>Monthly digest of what's new and exciting from us.</p>
      <div className="footer-search-section-mini">
        <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
        <input
          id="newsletter1"
          type="email"
          className="form-control"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn btn-primary" type="button" onClick={handleSubscribe}>
          Subscribe
        </button>
      </div>
      {status && <p style={{ marginTop: "8px" }}>{status}</p>}
    </form>
  );
}
