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
    console.log(prop);
  });
  var roll = document.getElementById('roll');
  roll.addEventListener('click',() => {
    prop.command.push({roll:90});
    console.log(prop);
  });
  var name = document.getElementById('message');
  var inputname = document.getElementById('inputname');
  inputname.addEventListener('click',() => {
    prop.id = name.value;   //nameを決定させる。
    console.log(prop);
  });
  var onereturn = document.getElementById('onereturn');
  onereturn.addEventListener('click', () => {
    prop.command.pop();
    console.log(prop);
  });
  var hitEventGo = document.getElementById('goEvent');
  go.addEventListener('click',() => {
    prop.hitEvent.push({go:10});
    console.log(prop);
  });
  var hitEventRoll = document.getElementById('rollEvent');
  go.addEventListener('click',() => {
    prop.hitEvent.push({roll:90});
    console.log(prop);
  });
  var hitEventOneReturn = document.getElementById('onereturnEvent');
  go.addEventListener('click',() => {
    prop.hitEvent.pop();
    console.log(prop);
  });
  var reset = document.getElementById('reset');
  reset.addEventListener('click',() => {
    name.value = '';
    prop.id = "";
    prop.command = [];
    prop.hitEvent = [{roll:90}];
    console.log(prop);
  })
  var send = document.getElementById('send');
  send.addEventListener('click',() => {
    if(prop.command === 0) return fales;
    console.log(prop);
    socket.emit('message', JSON.stringify(prop));
  });
  document.getElementById('messageList').textContent = JSON.stringify(prop);
  document.getElementById('hitEventList').textContent = prop.hitEventList;
};
