import React, { useState, useEffect, useRef } from "react";
// import Message from "./Message";
import axios from "axios";
import "../styles/ChatBox.css";
import Ping from "./Ping";
import ReactMarkdown from "react-markdown";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

const ChatBox = () => {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [listening, setListening] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const speakText = (text) => {
    if (speechSynthesis.speaking) speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
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
        history: newMessages
      }, { timeout: 10000 });

      const botResponse = res.data;

      if (botResponse.redirect) {
        window.open(botResponse.redirect, "_blank");
      }

      const botText = botResponse.fallback
        ? botResponse.answer.match(/https?:\/\/[^ ]+/)
          ? <span>I couldn’t find an answer. Try searching: <a href={botResponse.answer.match(/https?:\/\/[^ ]+/)[0]} target="_blank" rel="noreferrer">Google</a></span>
          : "I couldn’t find an answer. Try rephrasing your question."
        : botResponse.answer;

      if (typeof botText === "string") speakText(botText);

      setMessages((prev) => [...prev, { sender: "ai", text: botText }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "ai", text: "Error connecting to AI server. Please try again." }]);
    } finally {
      setTyping(false);
    }
  };

  const handleVoiceInput = () => {
    if (!recognition) return alert("Your browser doesn't support voice input.");

    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserMessage(transcript);
    };

    recognition.onend = () => setListening(false);
  };

  return (
    <div className={`chatbox-wrapper ${darkMode ? "dark" : ""}`}>
      <div className="sidebar">
        <div className="chatbox-header">
          <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="logo" />
        </div>
        <button className="dark-toggle" onClick={toggleDarkMode}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      <div className={`chatbox ${darkMode ? "dark" : ""}`}>
        <div className="chat-messages">
          <Ping />
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.sender}`}>
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
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
            placeholder="Ask something to LIX..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          />
          <div className="SM-buttons">
            <div className={`mic ${listening ? "listening" : ""}`}>
              <button type="button" onClick={handleVoiceInput}>🎙️</button>
            </div>
            <div className="sub">
              <button type="submit" disabled={typing}>Send</button>
            </div>
          </div>
        </form>

        <p className="creation-label">
          Designed by <strong style={{ color: "grey" }}>Aswin</strong>
        </p>
      </div>
    </div>
  );
};

export default ChatBox;
