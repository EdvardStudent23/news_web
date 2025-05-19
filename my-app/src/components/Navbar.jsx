import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../assets/logo.svg';

export default function Navbar({ onSearch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

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

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setIsOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo-link" onClick={() => setIsOpen(false)}>
          <img src={logo} alt="Logo" className="logo" />
        </Link>

        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <ul>
            <li><Link to="/" onClick={() => setIsOpen(false)}>Main</Link></li>
            <li><Link to="/sport" onClick={() => setIsOpen(false)}>Sport</Link></li>
            <li><Link to="/politics" onClick={() => setIsOpen(false)}>Politics</Link></li>
            <li><Link to="/business" onClick={() => setIsOpen(false)}>Business</Link></li>
            <li><Link to="/crypto" onClick={() => setIsOpen(false)}>Crypto</Link></li>
          </ul>
          {location.pathname === '/' && (
            <input
              type="text"
              placeholder="Search news..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
            />
          )}
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