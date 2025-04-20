import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import axios from "axios";
import "../styles/ChatBox.css";
import Ping from "./Ping";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

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

  const speakText = (text) => {
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
      }, { timeout: 5000 });

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
        speakText(botResponse.answer); // 🔊 Speak the response
        setMessages([...newMessages, { sender: "ai", text: botResponse.answer }]);
      }
    } catch (err) {
      setMessages([...newMessages, { sender: "ai", text: "Error connecting to AI server." }]);
    } finally {
      setTyping(false);
    }
  };

  const [listening, setListening] = useState(false);

  const handleVoiceInput = () => {
    if (!recognition) {
      alert("Your browser doesn't support voice input.");
      return;
    }
  
    recognition.start();
    setListening(true); // Start mic animation
  
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserMessage(transcript);
    };
  
    recognition.onend = () => {
      setListening(false); // Stop mic animation
    };
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
          <button  type="submit" disabled={typing}>Send</button>
          </div>
          </div>
        </form>
        <p className="creation-label">Designed by Lishoni Aswin</p>
      </div>
    </div>
  );
};

export default ChatBox;
