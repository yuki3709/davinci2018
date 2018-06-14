var prop = {
  "id":"",
	"command":[]
};

window.onload = function () {
  var go = document.getElementById('go');
  go.addEventListener('click',function(){
    prop.command.push({go:10});
    document.getElementById('messageList').textContent = JSON.stringify(prop);
    console.log(prop);
  });
  var roll = document.getElementById('roll');
  roll.addEventListener('click',function(){
    prop.command.push({roll:10});
    document.getElementById('messageList').textContent = JSON.stringify(prop);
    console.log(prop);
  });
  var name = document.getElementById('message');
  var inputname = document.getElementById('inputname');
  inputname.addEventListener('click',function(){
    prop.id = name.value;   //nameを決定させる。
    console.log(prop);
  });
  var reset = document.getElementById('reset');
  reset.addEventListener('click',function(){
    name.value = '';
    prop.id = "";
    prop.command = [];
    console.log(prop);
  })
  var send = document.getElementById('send');
  send.addEventListener('click',function(){
    console.log(prop);
    if(prop.id === 0) return fales;
    socket.emit('message', JSON.stringify(prop));
  });
};
