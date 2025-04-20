import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-card">
        <h1 className="about-title">About LIX</h1>
        <p className="about-tagline">Smart. Fast. Reliable. Your personal AI companion.</p>

        <div className="about-section">
          <h2>🚀 What is LIX?</h2>
          <p>
            LIX is an intelligent assistant built to provide quick, accurate, and human-like responses
            to your queries. Whether you're asking questions, exploring topics, or looking for creative help,
            LIX is always ready to assist—24/7.
          </p>
        </div>

        <div className="about-section">
          <h2>💡 Key Features</h2>
          <ul>
            <li>• Real-time search if answer not found in database</li>
            <li>• Admin-controlled custom responses</li>
            <li>• Smooth typing animations & dark mode support</li>
            <li>• Clean interface with fast performance</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>🛠 Built With</h2>
          <p>
            Powered by React, Node.js, PostgreSQL, and advanced AI techniques, LIX is optimized for
            both speed and scalability.
          </p>
        </div>

        <div className="about-footer">Made with 🤍 by <a className="azh-studio" href="https://azhstudioofficial.netlify.app/">Azh Studio</a></div>
      </div>
    </div>
  );
};

export default About;
