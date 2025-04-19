import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import '../styles/Pages.css'

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
      <main>
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="email" required />
          <br />
          <label>Password:</label>
          <input type="password" required />
          <br />
          <label>Confirm Password:</label>
          <input type="password" required />
          <br />
          <button type="submit">Sign up</button>
        </form>
        <button className="home" onClick={handleHomeClick}>Home</button>
      </main>
    </>
  );
}
