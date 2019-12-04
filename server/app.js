import express from "express";
import socketio from "socket.io";
import http from "http";
import router from "./router";
import { addUser, getUser, getSpecificUsers, removeUser } from "./helper";

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", socket => {
  console.log("Connection is established!");

  socket.on("join", ({ name, room }, callback) => {
    console.log(name);
    console.log(room);
    const { error, user } = addUser({ id: socket.id, name, room });
    
    if (error) return callback(error);

    socket.emit("message", {
      user: "Administrator",
      text: `${user.name} welcome to the room ${user.room}`
    });

    socket.broadcast.to(user.room).emit("message", {
      user: "Administrator",
      text: `${user.name} has joined`
    });

    socket.join(user.room);

    io.to(user.room).emit('roomData', {room: user.room, users: getSpecificUsers(user.room)})

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    console.log(user)
    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    console.log("User had left!");

    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', {user: 'Administrator', text: `${user.name} has left the chat!`});
      io.to(user.room).emit('roomData', {room: user.room, users: getSpecificUsers(user.room)});
    }
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server is running on the ${PORT}`));
