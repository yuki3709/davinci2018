var socket_io = require('socket.io');

function socket(srv) {
  var io = socket_io.listen(srv);
  io.sockets.on('connection', function (socket) {
    io.sockets.socket(socket.id).emit('connected', socket.id);
    console.log('connected');
    socket.on('message', d => io.emit('receiveMessage', d));
    const id = socket.id;
    socket.on('demo' + id, d => io.emit('receive' + id, d))
  });
}

module.exports = socket;