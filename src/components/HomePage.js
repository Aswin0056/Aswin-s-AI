import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; // or wherever you saved the CSS file

const HomePage = () => {
  return (
    <div className="homepage">
      <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="logo" className="home-logo" />
      <header>
        <h1>Welcome to Aswin's AI Chat Application</h1>
        <p>Your personal AI assistant ready to help you with any questions!</p>
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

      <footer class="footer">
  <p>© 2025 Aswin's AI Chat. All rights reserved.</p>
  <div class="footer-links">
    <a href="/privacy">Privacy Policy</a>
    <a href="/contact">Contact</a>
    <a href="https://github.com/your-repo" target="#">GitHub</a>
  </div>
</footer>


    </div>
  );
};

export default HomePage;
