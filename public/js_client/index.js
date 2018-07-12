var prop = {
  "id":"",
  "command":[],
  "hitEvent":[{roll:90}],
  "color":""
};

window.onload = () => {
  var url = location.href;
  console.log(url + '?color=red');
  console.log(url + '?color=aqua');
  console.log(url + '?color=fuchsia');
  console.log(url + '?color=lime');
  prop.color = decodeURIComponent(location.search.match(/color=(.*?)(&|$)/)[1]);
  var go = document.getElementById('go');
  go.addEventListener('click',() => {
    prop.command.push({go:10});
    document.getElementById('messageList').textContent = JSON.stringify(prop.command);
    console.log(prop);
  });
  var left45 = document.getElementById('left45');
  left45.addEventListener('click',() => {
    prop.command.push({roll:-45});
    document.getElementById('messageList').textContent = JSON.stringify(prop.command);
    console.log(prop);
  });
  var left90 = document.getElementById('left90');
  left90.addEventListener('click',() => {
    prop.command.push({roll:-90});
    document.getElementById('messageList').textContent = JSON.stringify(prop.command);
    console.log(prop);
  });
  var left135 = document.getElementById('left135');
  left135.addEventListener('click',() => {
    prop.command.push({roll:-135});
    document.getElementById('messageList').textContent = JSON.stringify(prop.command);
    console.log(prop);
  });
  var right45 = document.getElementById('right45');
  right45.addEventListener('click',() => {
    prop.command.push({roll:45});
    document.getElementById('messageList').textContent = JSON.stringify(prop.command);
    console.log(prop);
  });
  var right90 = document.getElementById('right90');
  right90.addEventListener('click',() => {
    prop.command.push({roll:90});
    document.getElementById('messageList').textContent = JSON.stringify(prop.command);
    console.log(prop);
  });
  var right135 = document.getElementById('right135');
  right135.addEventListener('click',() => {
    prop.command.push({roll:135});
    document.getElementById('messageList').textContent = JSON.stringify(prop.command);
    console.log(prop);
  });
  var back = document.getElementById('back');
  back.addEventListener('click',() => {
    prop.command.push({roll:180});
    document.getElementById('messageList').textContent = JSON.stringify(prop.command);
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
    document.getElementById('messageList').textContent = JSON.stringify(prop.command);
    console.log(prop);
  });
  var hitEventGo = document.getElementById('goEvent');
  hitEventGo.addEventListener('click',() => {
    prop.hitEvent.push({go:10});
    document.getElementById('hitEventList').textContent = JSON.stringify(prop.hitEvent);
    console.log(prop);
  });
  var hitEventLeft45 = document.getElementById('left45Event');
  hitEventLeft45.addEventListener('click',() => {
    prop.hitEvent.push({roll:-45});
    document.getElementById('hitEventList').textContent = JSON.stringify(prop.hitEvent);
    console.log(prop);
  });
  var hitEventLeft90 = document.getElementById('left90Event');
  hitEventLeft90.addEventListener('click',() => {
    prop.hitEvent.push({roll:-90});
    document.getElementById('hitEventList').textContent = JSON.stringify(prop.hitEvent);
    console.log(prop);
  });
  var hitEventLeft135 = document.getElementById('left135Event');
  hitEventLeft135.addEventListener('click',() => {
    prop.hitEvent.push({roll:-135});
    document.getElementById('hitEventList').textContent = JSON.stringify(prop.hitEvent);
    console.log(prop);
  });
  var hitEventRight45 = document.getElementById('right45Event');
  hitEventRight45.addEventListener('click',() => {
    prop.hitEvent.push({roll:45});
    document.getElementById('hitEventList').textContent = JSON.stringify(prop.hitEvent);
    console.log(prop);
  });
  var hitEventRight90 = document.getElementById('right90Event');
  hitEventRight90.addEventListener('click',() => {
    prop.hitEvent.push({roll:90});
    document.getElementById('hitEventList').textContent = JSON.stringify(prop.hitEvent);
    console.log(prop);
  });
  var hitEventRight135 = document.getElementById('right135Event');
  hitEventRight135.addEventListener('click',() => {
    prop.hitEvent.push({roll:135});
    document.getElementById('hitEventList').textContent = JSON.stringify(prop.hitEvent);
    console.log(prop);
  });
  var hitEventBack = document.getElementById('backEvent');
  hitEventBack.addEventListener('click',() => {
    prop.hitEvent.push({roll:180});
    document.getElementById('hitEventList').textContent = JSON.stringify(prop.hitEvent);
    console.log(prop);
  });
  var hitEventOneReturn = document.getElementById('onereturnEvent');
  hitEventOneReturn.addEventListener('click',() => {
    prop.hitEvent.pop();
    document.getElementById('hitEventList').textContent = JSON.stringify(prop.hitEvent);
    console.log(prop);
  });
  var reset = document.getElementById('reset');
  reset.addEventListener('click',() => {
    name.value = '';
    prop.id = "";
    prop.command = [];
    prop.hitEvent = [{roll:90}];
    document.getElementById('messageList').textContent = JSON.stringify(prop.command);
    document.getElementById('hitEventList').textContent = JSON.stringify(prop.hitEvent);
    console.log(prop);
  })
  var send = document.getElementById('send');
  send.addEventListener('click',() => {
    if(prop.command.length === 0 || prop.id === "" || prop.hitEvent.length === 0) {
      alert('入力されていない部分があります');
      return false;
    }
    console.log(prop);
    socket.emit('message', JSON.stringify(prop));
  });
  document.getElementById('messageList').textContent = JSON.stringify(prop.command);
  document.getElementById('hitEventList').textContent = JSON.stringify(prop.hitEvent);
};
