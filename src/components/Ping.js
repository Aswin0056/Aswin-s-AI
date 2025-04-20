import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Ping.css"; // Import the CSS file

const Ping = () => {
  const [status, setStatus] = useState("checking"); // checking | connected | error

  useEffect(() => {
    const checkBackend = async () => {
      try {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/ping`);
        setStatus("connected");
      } catch (err) {
        setStatus("error");
      }
    };

    checkBackend();
  }, []);

    
  setInterval(() => {
    fetch('https://ai-backend-gqxc.onrender.com/api/ping');
  }, 15 * 60 * 1000); // 15 minutes
  


  const getDotClass = () => {
    switch (status) {
      case "connected":
        return "dot green";
      case "error":
        return "dot red";
      default:
        return "dot gray pulse";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "connected":
        return "Online";
      case "error":
        return "Offline";
      default:
        return "Checking...";
    }
  };

  return (
    <div className="ping-container">
      <div className="ping-box">
        <span className={getDotClass()}></span>
        <span className="ping-text">LIX: {getStatusText()}</span>
      </div>
    </div>
  );
};

export default Ping;
