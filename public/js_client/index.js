var prop = {
  "id":"nakamura",
	"command":[
			{"go":"10"},
		  {"go":"10"},
			{"roll":"10"},
			{"go":"10"}
		]
};

window.onload = function () {
  var go = document.getElementById('go');
  go.addEventListener('click',function(){
    prop.command.push('{"go":"10"}');
  });
  var roll =document.getElementById('roll');
  roll.addEventListener('click',function(){
    prop.command.push('{"roll":"10"}');
  });
  var name = document.getElementById('message');
  var onKeyPress = function(e){
    if (e.key !== 'Enter') return;
    if (e.shiftKey || e.ctrlKey || e.altKey) return;
    if (e.enterKey) {
      prop.id = name.value;
    }
  }
  name.addEventListener('keypress',onKeyPress);
  var send = document.getElementById('send');
  send.addEventListener('click',function(d){
    socket.emit('message', JSON.stringify(prop));
  });
};
