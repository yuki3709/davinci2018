var prop = {
	"command":[
			{"go":"10"},
		  {"go":"10"},
			{"roll":"10"},
			{"go":"10"}
		],
	"id":"中村"
};
window.onload = function () {
  var message = document.getElementById('message');
  var onKeyPress = function (e) {
    if (e.key !== 'Enter') return;
    if (e.shiftKey || e.ctrlKey || e.altKey) return;
    socket.emit('message', JSON.stringify(prop));
  };
  message.addEventListener('keypress', onKeyPress);
};
