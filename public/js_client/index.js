var prop = {
  "id":"",
  "command":[],
  "hitEvent":[{roll:90}],
  "color":""
};
function getButton(discriminate){
  if("go" in discriminate){
    return "前進";
  }
  if("roll" in discriminate){
    return (deg => {
      switch (deg) {
        case -10:
          return "少し左を向く (左へ10°回転)";
        case -90:
          return "左を向く (左へ90°回転)";
        case -135:
          return "大きく左を向く (左へ135°回転)"
        case 10:
          return "少し右を向く (右へ10°回転)";
        case 90:
          return "右を向く (右へ90°回転)";
        case 135:
          return "大きく右を向く (右へ135°回転)";
        case 180:
          return "後退 (180°回転)";
      }
    })(discriminate.roll);
  }
}
function addElement(){
  console.log(prop);
  // block.innerHTML = "";
}
function addCommand(){
  addElement();
  var commandList = document.getElementById('messageList');
  commandList.innerHTML = "";
  for(var i =0; i<prop.command.length; i++){
    var command = document.createElement("div");
    command.className = "block1";
    command.style.marginBottom = "20px";
    command.innerHTML = getButton(prop.command[i]);
    commandList.appendChild(command);
  }
}
function addEvent(){
  addElement();
  var hitEventList = document.getElementById('hitEventList');
  hitEventList.innerHTML = "";
  for(var i =0; i<prop.hitEvent.length; i++){
    var hitEvent = document.createElement("div");
    hitEvent.className = "block2";
    hitEvent.style.marginBottom = "20px";
    hitEvent.innerHTML = getButton(prop.hitEvent[i]);
    hitEventList.appendChild(hitEvent);
  }
}
window.onload = () => {
  var url = location.href;
  console.log(url + 'screen');
  console.log(url + '?color=red');
  console.log(url + '?color=aqua');
  console.log(url + '?color=fuchsia');
  console.log(url + '?color=lime');
  prop.color = decodeURIComponent(location.search.match(/color=(.*?)(&|$)/)[1]);
  var go = document.getElementById('go');
  go.addEventListener('click',() => {
    prop.command.push({go:10});
    addCommand();
  });
  var left10 = document.getElementById('left10');
  left10.addEventListener('click',() => {
    prop.command.push({roll:-10});
    addCommand();
  });
  var left90 = document.getElementById('left90');
  left90.addEventListener('click',() => {
    prop.command.push({roll:-90});
    addCommand();
  });
  var left135 = document.getElementById('left135');
  left135.addEventListener('click',() => {
    prop.command.push({roll:-135});
    addCommand();
  });
  var right10 = document.getElementById('right10');
  right10.addEventListener('click',() => {
    prop.command.push({roll:10});
    addCommand();
  });
  var right90 = document.getElementById('right90');
  right90.addEventListener('click',() => {
    prop.command.push({roll:90});
    addCommand();
  });
  var right135 = document.getElementById('right135');
  right135.addEventListener('click',() => {
    prop.command.push({roll:135});
    addCommand();
  });
  var back = document.getElementById('back');
  back.addEventListener('click',() => {
    prop.command.push({roll:180});
    addCommand();
  });
  var name = document.getElementById('message');
  var onereturn = document.getElementById('onereturn');
  onereturn.addEventListener('click', () => {
    prop.command.pop();
    addCommand();
  });
  var hitEventGo = document.getElementById('goEvent');
  hitEventGo.addEventListener('click',() => {
    prop.hitEvent.push({go:10});
    addEvent();
  });
  var hitEventLeft10 = document.getElementById('left10Event');
  hitEventLeft10.addEventListener('click',() => {
    prop.hitEvent.push({roll:-10});
    addEvent();
  });
  var hitEventLeft90 = document.getElementById('left90Event');
  hitEventLeft90.addEventListener('click',() => {
    prop.hitEvent.push({roll:-90});
    addEvent();
  });
  var hitEventLeft135 = document.getElementById('left135Event');
  hitEventLeft135.addEventListener('click',() => {
    prop.hitEvent.push({roll:-135});
    addEvent();
  });
  var hitEventRight10 = document.getElementById('right10Event');
  hitEventRight10.addEventListener('click',() => {
    prop.hitEvent.push({roll:10});
    addEvent();
  });
  var hitEventRight90 = document.getElementById('right90Event');
  hitEventRight90.addEventListener('click',() => {
    prop.hitEvent.push({roll:90});
    addEvent();
  });
  var hitEventRight135 = document.getElementById('right135Event');
  hitEventRight135.addEventListener('click',() => {
    prop.hitEvent.push({roll:135});
    addEvent();
  });
  var hitEventBack = document.getElementById('backEvent');
  hitEventBack.addEventListener('click',() => {
    prop.hitEvent.push({roll:180});
    addEvent();
  });
  var hitEventOneReturn = document.getElementById('onereturnEvent');
  hitEventOneReturn.addEventListener('click',() => {
    prop.hitEvent.pop();
    addEvent();
  });
  var reset = document.getElementById('reset');
  reset.addEventListener('click',() => {
    name.value = '';
    prop.id = "";
    prop.command = [];
    prop.hitEvent = [{roll:90}];
    addCommand();
    addEvent();
  })
  var send = document.getElementById('send');
  send.addEventListener('click',() => {
    prop.id = name.value;
    if(prop.command.length === 0 || prop.id === "" || prop.hitEvent.length === 0) {
      alert('入力されていない部分があります');
      return false;
    }
    console.log(prop);
    socket.emit('message', JSON.stringify(prop));
  });
};
