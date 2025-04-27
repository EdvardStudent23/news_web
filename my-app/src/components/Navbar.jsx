import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.svg';



export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li  class="image-link"><Link to="/"><img src={logo} alt="Logo" className="logo" /></Link></li>
        <li><Link to="/">Main</Link></li>
        <li><Link to="/sport">Sport</Link></li>
        <li><Link to="/politics">Politics</Link></li>
        <li><Link to="/business">Business</Link></li>
        <li><Link to="/crypto">Crypto</Link></li>
        <li><Link to="/registration">Registration</Link></li>
        <li><Link to="/signin">SignIn</Link></li>
      </ul>
    </nav>
    
  );
}
