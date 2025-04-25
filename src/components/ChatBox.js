import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/ChatBox.css";
import Ping from "./Ping";
import Message from "./Message"; // Importing the Message component

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
  }, [messages]); // Re-run the effect every time the messages state changes

  useEffect(() => {
    // Load the stored messages from localStorage
    const storedMessages = JSON.parse(localStorage.getItem("messages"));
    const timestamp = localStorage.getItem("timestamp");

    console.log("Loaded messages:", storedMessages);
    console.log("Loaded timestamp:", timestamp);

    if (storedMessages && timestamp) {
      const currentTime = Date.now();
      const timeDifference = currentTime - Number(timestamp); // Difference in milliseconds
      console.log("Time difference:", timeDifference);

      if (timeDifference < 24 * 60 * 60 * 1000) { // Less than 24 hours
        setMessages(storedMessages);
      } else {
        console.log("Clearing messages: Expired");
        // Clear the messages if they are older than 24 hours
        localStorage.removeItem("messages");
        localStorage.removeItem("timestamp");
      }
    }
  }, []);

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

      const updatedMessages = [...newMessages, { sender: "ai", text: botText }];
      setMessages(updatedMessages);

      console.log("Saving messages:", updatedMessages);
      // Save the messages and timestamp to localStorage
      localStorage.setItem("messages", JSON.stringify(updatedMessages));
      localStorage.setItem("timestamp", Date.now().toString());
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

  const clearChat = () => {
    setMessages([]); // Clear the messages state
    localStorage.removeItem("messages"); // Remove messages from localStorage
    localStorage.removeItem("timestamp"); // Remove timestamp from localStorage
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
        <button className="clear-chat" onClick={clearChat}>
          Clear Chat
        </button>
      </div>

      <div className={`chatbox ${darkMode ? "dark" : ""}`}>
        <div className="chat-messages">
          <Ping />
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

        <p style={{fontSize: "8px" }} className="creation-label">
          Developed by <strong style={{ color: "black"}}>Aswin</strong>
        </p>
        <p style={{"color":'grey', fontSize:"10px", textAlign:"center", marginTop:"-20px"}}>Powered By <strong style={{"color":'black'}}>Azh</strong><strong style={{"color":'goldenrod'}}>Studio</strong></p>
      </div>
    </div>
  );
};

export default ChatBox;
