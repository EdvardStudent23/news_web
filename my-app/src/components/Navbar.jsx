import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../assets/logo.svg';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        
        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <ul>
            <li><Link to="/" onClick={() => setIsOpen(false)}>Main</Link></li>
            <li><Link to="/sport" onClick={() => setIsOpen(false)}>Sport</Link></li>
            <li><Link to="/politics" onClick={() => setIsOpen(false)}>Politics</Link></li>
            <li><Link to="/business" onClick={() => setIsOpen(false)}>Business</Link></li>
            <li><Link to="/crypto" onClick={() => setIsOpen(false)}>Crypto</Link></li>
            <li><Link to="/registration" onClick={() => setIsOpen(false)}>Registration</Link></li>
            <li><Link to="/signin" onClick={() => setIsOpen(false)}>SignIn</Link></li>
          </ul>
        </div>

        <div 
          className={`burger-menu ${isOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}