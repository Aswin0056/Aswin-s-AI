import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="homepage">
      {/* Header Navigation */}
      <nav className="header-nav">
        <div className="nav-logo">
          <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="logo" />
          <span>LIX</span>
        </div>

        {/* Hamburger Icon */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/chat" onClick={() => setMenuOpen(false)}>Chat</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <header className="homepage-header">
        <h1>Welcome to LIX</h1>
        <p>Your personal AI assistant ready to help you with any questions!</p>
        <p>LIX is not just logic — she expresses, understands, and connects.</p>
      </header>

      <section>
        <h2>AI Specifications</h2>
        <ul>
          <li>Powered by advanced language models.</li>
          <li>Can answer general questions and provide useful information.</li>
          <li>Learn more and get smarter as you interact.</li>
          <li>Available 24/7 for any query.</li>
        </ul>
      </section>

      <div className="chat-button-container">
        <Link to="/chat">
          <button className="chat-button">Start Chat</button>
        </Link>
      </div>



      {/* Download section */}

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
  <h2 style={{ marginBottom: '20px', fontSize: '24px', color: '#333' }}>
    📱 Install Our App on Your Android Device
  </h2>
  <a
    className="download-section"
    href="/LIX.apk"
    download
    style={{
      padding: '10px 20px',
      backgroundColor: '#4CAF50',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '8px',
      fontSize: '16px'
    }}
  >
    📥 Download Android App (APK)
  </a>
</div>



      <footer className="footer">
        <p>© 2025 LIX. All rights reserved.</p>
        <p style={{"color":'grey'}}>Powered By <strong style={{"color":'black'}}>Azh</strong><strong style={{"color":'goldenrod'}}>Studio</strong></p>
        <div className="footer-links">
          <a href="/">Privacy Policy</a>
          <a href="/">Contact</a>
          <a href="/" target="#">GitHub</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
