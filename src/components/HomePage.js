import React from 'react';
import { Link } from 'react-router-dom';
import '../components/HomePage.css'; // or wherever you saved the CSS file

const HomePage = () => {
  return (
    <div className="homepage">
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
    </div>
  );
};

export default HomePage;
