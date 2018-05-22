var socket_io = require('socket.io');

function socket(srv) {
  var io = socket_io.listen(srv);
  io.sockets.on('connection', function (socket) {
    console.log('connected');
    socket.on('message', function (d) {
      io.emit('receiveMessage', d);
    });
  });
}
module.exports = socket;