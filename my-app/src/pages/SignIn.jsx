import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import '../styles/SignIn.css';

export default function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <>
      <Helmet><title>Sign In</title></Helmet>
      <section className="signin-background">
        <div className="signin-overlay">
          <div className="signin-container">
            <div className="signin-card">
              <div className="signin-card-body">
                <h2 className="signin-title">Welcome back</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Email:</label>
                    <input type="email" className="form-control" required />
                  </div>
                  <div className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control" required />
                  </div>
                  <div className="button-wrapper">
                    <button type="submit" className="btn-submit">Sign In</button>
                  </div>
                  <p className="register-link">
                    Don't have an account? <a href="/registration">Register here</a>
                  </p>
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
