import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import '../styles/Pages.css'

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
      <Helmet><title>Sign in</title></Helmet>
      <main>
        <h1>Sign in</h1>
        <span>Don't have an account?</span>
        <a href="/registration">Sign up</a>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="email" required />
          <br />
          <label>Password:</label>
          <input type="password" required />
          <br />
          <button type="submit">Sign in</button>
        </form>
        <button className="home" onClick={handleHomeClick}>Home</button>
      </main>
    </>
  );
}
