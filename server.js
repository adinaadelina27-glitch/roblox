const io = require('socket.io')(process.env.PORT || 3000, {
  cors: { origin: "*" }
});

let players = {};

io.on('connection', (socket) => {
  console.log('Jucator nou conectat id:', socket.id);

  socket.on('move', (data) => {
    players[socket.id] = data;
    socket.broadcast.emit('playerMoved', { id: socket.id, ...data });
  });

  socket.on('disconnect', () => {
    console.log('Jucator deconectat:', socket.id);
    delete players[socket.id];
    io.emit('playerLeft', socket.id);
  });
});

console.log('Serverul a pornit cu succes!');
