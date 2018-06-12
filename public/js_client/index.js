var prop = {
  "id":"",
	"command":[]
};

window.onload = function () {
  var go = document.getElementById('go');
  go.addEventListener('click',function(){
    prop.command.push('{"go":"10"}');
  });
  var roll = document.getElementById('roll');
  roll.addEventListener('click',function(){
    prop.command.push('{"roll":"10"}');
  });
  var name = document.getElementById('message');
  var reset = document.getElementById('reset');
  reset.addEventListener('click',function(){
    name.value = '';
    prop.id = "";
    prop.command = [];
  })
  var send = document.getElementById('send');
  send.addEventListener('click',function(d){
    prop.id = name.value;
    console.log(prop);
    socket.emit('message', JSON.stringify(prop));
  });
};
