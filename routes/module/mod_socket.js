var socket_io = require('socket.io');

function socket(srv) {
  var io = socket_io.listen(srv);
  io.sockets.on('connection', function (socket) {
    console.log('connected');
    socket.on('message', d => io.emit('receiveMessage', d));
    for (let i = 0; i < 16; i++) {
      socket.on('demo' + i, d => io.emit('receive' + i, d))
    }
  });
}

module.exports = socket;