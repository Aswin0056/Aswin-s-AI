import React, { useState } from "react";
import Message from "./Message";
import axios from "axios";
import "../styles/ChatBox.css";

const ChatBox = () => {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    const newMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);
    setUserMessage("");

    try {
      const res = await axios.post("https://ai-backend-gqxc.onrender.com/api/chat", {
        message: userMessage,
      });
      setMessages([
        ...newMessages,
        { sender: "ai", text: res.data.answer },
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { sender: "ai", text: "Error connecting to AI server." },
      ]);
    }
  };

  return (
    <div className="chatbox">
    <h1>Chat with Aswin's AI</h1>
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <Message key={i} sender={msg.sender} text={msg.text} />
        ))}
      </div>
      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask something to Aswin's AI..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;
