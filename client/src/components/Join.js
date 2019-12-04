import React, { useState } from "react";
import { Link } from "react-router-dom";

import './Join.css';

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="joinContainerOutter">
      <div className="joinContainerInner">
        <h1 className="header">Join the Chat Room</h1>
        <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
        <div><input placeholder="Room" className="joinInput m20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
        <Link to={`/chat?name=${name}&room=${room}`} onClick={event => (!name || !room) ? event.preventDefault(): null}>
            <button className="submitButton" type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
