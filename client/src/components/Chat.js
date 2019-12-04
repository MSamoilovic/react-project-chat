import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import ChatBar from "./ChatBar";
import ChatInput from "./ChatInput";
import MessageDisplay from './MessageDisplay'
import ChatContainer from './ChatContainer'

import './Chat.css'

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const endPoint = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    //console.log(location)
    //console.log(name)
    //console.log(room)

    socket = io(endPoint);
    setName(name);
    setRoom(room);

    //console.log(socket)
    //socket.emit("join", { name, room }, () => {});


    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [endPoint, location.search]);

  //drugi useEffect za hendlovanje poruka

  useEffect(() => {
    socket.on("message", message => {
      setMessages([...messages, message]);
    });

    socket.on('roomData', ({users}) => {
      setUsers(users)
    })

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [messages]);

  //funkcija za slanje poruka

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log(messages);

  return (
    <div className="outerChatContainer">
      <div className="innerChatContainer">
        <ChatBar room={room} />
        <MessageDisplay messages={messages} name={name}/>
        <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
      <ChatContainer users={users}/>
    </div>
  );
};

export default Chat;
