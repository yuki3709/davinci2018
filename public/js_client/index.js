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
  var go = document.getElementById('go');
  go.addEventListener('click',function(){
    prop.command.push('{"go":"10"}');
  });
  var send = document.getElementById('send');
  send.addEventListener('click',function(d){
    socket.emit('message', JSON.stringify(prop));
  });
};
