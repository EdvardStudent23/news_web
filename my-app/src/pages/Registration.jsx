import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import '../styles/Registration.css';

export default function Registration() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/sign-in');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <>
      <Helmet><title>Registration</title></Helmet>
      <section className="registration-background">
        <div className="registration-overlay">
          <div className="registration-container">
            <div className="registration-card">
              <div className="registration-card-body">
                <h2 className="registration-title">Create an account</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Email:</label>
                    <input type="email" className="form-control" required />
                  </div>
                  <div className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control" required />
                  </div>
                  <div className="form-group">
                    <label>Confirm Password:</label>
                    <input type="password" className="form-control" required />
                  </div>
                  <div className="form-check">
                    <input type="checkbox" id="terms" className="form-check-input" required />
                    <label htmlFor="terms" className="form-check-label">
                      I agree to the <a href="#!">Terms of Service</a>
                    </label>
                  </div>
                  <div className="button-wrapper">
                    <button type="submit" className="btn-submit">Register</button>
                  </div>
                  <p className="login-link">Already have an account? <a href="/signin">Login here</a></p>
                </form>
                <button className="btn-home" onClick={handleHomeClick}>Home</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
