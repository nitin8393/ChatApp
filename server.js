const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  socket.on('join', (username) => {
    socket.username = username;
    console.log(username + ' joined the chat');
  });

  socket.on('message', (data) => {
    console.log(data.user + ': ' + data.text);
    io.emit('message', data);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Chat server running at http://localhost:${PORT}`);
});