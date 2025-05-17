import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Sport from './pages/Sport';
import Politics from './pages/Politics';
import Business from './pages/Business';
import Crypto from './pages/Crypto';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/sport" element={<Sport />} />
        <Route path="/politics" element={<Politics />} />
        <Route path="/business" element={<Business />} />
        <Route path="/crypto" element={<Crypto />} />
      </Routes>
    </Router>
  );
}

export default App;
