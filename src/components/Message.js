import React from "react";
import "../styles/Message.css";

const Message = ({ sender, text }) => {
  return (
    <div className={`message ${sender}`}>
      <p>{text}</p>
    </div>
  );
};

export default Message;
