import React, { useEffect, useState } from "react";
import axios from "axios";

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

  const getDotColor = () => {
    switch (status) {
      case "connected":
        return "green";
      case "error":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: getDotColor(),
            display: "inline-block",
          }}
        ></span>
        <span>
          AI:{" "}
          {status === "connected"
            ? "Online"
            : status === "error"
            ? "Offline"
            : "Checking..."}
        </span>
      </div>
    </div>
  );
};

export default Ping;
