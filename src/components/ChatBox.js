import React, { useState, useEffect, useRef } from "react";
import Message from "./Message"; // Ensure this is your message bubble component
import axios from "axios";
import "../styles/ChatBox.css";
import Ping from "./Ping"; // Optional ping status component

const ChatBox = () => {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    const newMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);
    setUserMessage("");
    setTyping(true);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/chat`, {
        message: userMessage,
      });

      const botResponse = res.data;

      if (botResponse.redirect) {
        window.open(botResponse.redirect, "_blank");
      }

      if (botResponse.fallback) {
        const googleURL = botResponse.answer.match(/https?:\/\/[^ ]+/)?.[0];
        const fallbackMessage = googleURL ? (
          <span>
            I couldn’t find an answer. Try searching:{" "}
            <a href={googleURL} target="_blank" rel="noopener noreferrer">Google</a>
          </span>
        ) : (
          "I couldn’t find an answer. Try rephrasing your question."
        );
        setMessages([...newMessages, { sender: "ai", text: fallbackMessage }]);
      } else {
        setMessages([...newMessages, { sender: "ai", text: botResponse.answer }]);
      }
    } catch (err) {
      setMessages([...newMessages, { sender: "ai", text: "Error connecting to AI server." }]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className={`chatbox-wrapper ${darkMode ? "dark" : ""}`}>
      <div className="sidebar">
        <div className="chatbox-header">
          <h1>LIX</h1>
          <Ping />
        </div>
        <button className="dark-toggle" onClick={toggleDarkMode}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      <div className={`chatbox ${darkMode ? "dark" : ""}`}>
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <Message key={i} sender={msg.sender} text={msg.text} />
          ))}
          {typing && (
            <div className="typing-indicator">
              <span></span><span></span><span></span>
            </div>
          )}
          <div ref={chatEndRef}></div>
        </div>

        <form className="chat-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ask something to Aswin's AI..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          />
          <button type="submit" disabled={typing}>Send</button>
        </form>
        <p className="creation-label">created by Aswin</p>
      </div>
    </div>
  );
};

export default ChatBox;
