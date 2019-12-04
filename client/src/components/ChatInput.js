import React from "react";

import "./ChatInput.css";

const ChatInput = ({ setMessage, sendMessage, message }) => {
  return (
    <form className="form">
      <input
        className="chatInput"
        type="text"
        placeholder="Your message here..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={event =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />
      <button className="sendButton" onClick={(event) => sendMessage(event) } type="button">Send</button>
    </form>
  );
};

export default ChatInput;
