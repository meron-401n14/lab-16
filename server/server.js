'use strict';

const net = require('net');
const alterFile = require('../file-changer/app.js');
const port = process.env.PORT || 3001;
const server = net.createServer();

server.listen(port, () => console.log(`Server up on ${port}`) );

let socketPool = {};

server.on('connection', (socket) => {
  const id = `Socket-${Math.random()}`;
  console.log('Socket connected!');
  socketPool.forEach(socket => {
    socket.write(alterFile({event:'file fetched', payload:'message'}));
  });
  socketPool.push(socket);
  socketPool[id] = socket;


  socket.on('data', (buffer) => dispatchEvent(buffer));

  socket.on('close', () => {
    delete socketPool[id];
  });
});

let dispatchEvent = (buffer) => {
  let text = buffer.toString().trim();
  for (let socket in socketPool) {
    socketPool[socket].write(`${file} ${text}`);
  }
};


