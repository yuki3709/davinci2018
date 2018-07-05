var prop = {
  "id":"",
	"command":[],
  "hitEvent":[{roll:90}],
  "color":""
};

window.onload = () => {
  var go = document.getElementById('go');
  go.addEventListener('click',() => {
    prop.command.push({go:10});
    document.getElementById('messageList').textContent = JSON.stringify(prop);
    console.log(prop);
  });
  var roll = document.getElementById('roll');
  roll.addEventListener('click',() => {
    prop.command.push({roll:90});
    document.getElementById('messageList').textContent = JSON.stringify(prop);
    console.log(prop);
  });
  var name = document.getElementById('message');
  var inputname = document.getElementById('inputname');
  inputname.addEventListener('click',() => {
    prop.id = name.value;   //nameを決定させる。
    document.getElementById('messageList').textContent = JSON.stringify(prop);
    console.log(prop);
  });
  var reset = document.getElementById('reset');
  reset.addEventListener('click',() => {
    name.value = '';
    prop.id = "";
    prop.command = [];
    document.getElementById('messageList').textContent = JSON.stringify(prop);
    console.log(prop);
  })
  var send = document.getElementById('send');
  send.addEventListener('click',() => {
    if(prop.command === 0) return fales;
    document.getElementById('messageList').textContent = JSON.stringify(prop);
    console.log(prop);
    socket.emit('message', JSON.stringify(prop));
  });
};
