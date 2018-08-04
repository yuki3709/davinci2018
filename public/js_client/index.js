let prop = {
  id: "",
  command: [],
  hitEvent: [],
  color: ""
};
let tmpCommand = prop.command;

function getButton(discriminate) {
  if ("go" in discriminate) {
    return "前進";
  }
  if ("roll" in discriminate) {
    return (deg => {
      switch (deg) {
        case -15:
          return "少し左を向く (左へ15°回転)";
        case -90:
          return "左を向く (左へ90°回転)";
        case -135:
          return "大きく左を向く (左へ135°回転)";
        case 15:
          return "少し右を向く (右へ15°回転)";
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

function addElement() {
  console.log(prop);
}

function addCommand() {
  addElement();
  let commandList = document.getElementById('messageList');
  commandList.innerHTML = "";
  for (let i = 0; i < prop.command.length; i++) {
    let command = document.createElement("div");
    command.className = "block1";
    command.style.marginBottom = "20px";
    command.innerHTML = getButton(prop.command[i]);
    commandList.appendChild(command);
    commandList.scrollTop = commandList.scrollHeight;
  }
}

function addEvent() {
  addElement();
  let hitEventList = document.getElementById('hitEventList');
  hitEventList.innerHTML = "";
  for (let i = 0; i < prop.hitEvent.length; i++) {
    let hitEvent = document.createElement("div");
    hitEvent.className = "block2";
    hitEvent.style.marginBottom = "20px";
    hitEvent.innerHTML = getButton(prop.hitEvent[i]);
    hitEventList.appendChild(hitEvent);
    hitEventList.scrollTop = hitEventList.scrollHeight;
  }
}

window.onload = () => {
  let url = location.href;
  console.log(url + 'screen');
  console.log(url + '?color=red&?id=1');
  console.log(url + '?color=aqua&?id=2');
  console.log(url + '?color=fuchsia&?id=3');
  console.log(url + '?color=lime&?id=4');
  document.onclick = () => {
    if (!url.match("color")) alert("色を指定してください");
  }
  let canvas = document.getElementById('iframe');
  canvas.src = url.replace(/\?color=(.+)\&/g, "screen/")
  let name = document.getElementById('userID');
  let PlayerColor = location.search.match(/color=(.*?)(&|$)/);
  if (PlayerColor) {
    prop.color = decodeURIComponent(PlayerColor[1]);
    teamcolor = document.getElementById("teamcolor");
    teamcolor.style.background = prop.color;
  }

  const setEvent = (id, callback) => document.getElementById(id).addEventListener('click', callback);
  const generateCallback = command => () => {
    tmpCommand.push(command);
    addCommand();
  };
  const generateRollCallback = roll => generateCallback({roll: roll});
  setEvent('go', generateCallback({go: 15}));
  setEvent('left15', generateRollCallback(-15));
  setEvent('left90', generateRollCallback(-90));
  setEvent('left135', generateRollCallback(-135));
  setEvent('right15', generateRollCallback(15));
  setEvent('right90', generateRollCallback(90));
  setEvent('right135', generateRollCallback(135));
  setEvent('back', generateRollCallback(180));
  setEvent('onereturn', () => {
    tmpCommand.pop();
    addCommand();
  });
  const generateEventCallback = hitEvent => () => {
    prop.hitEvent.push(hitEvent);
    addEvent();
  };
  const generateEventRollCallback = deg => generateEventCallback({roll: deg});
  setEvent('goEvent', generateEventCallback({go: 15}));
  setEvent('left15Event', generateEventRollCallback(-15));
  setEvent('left90Event', generateEventRollCallback(-90));
  setEvent('left135Event', generateEventRollCallback(-135));
  setEvent('right15Event', generateEventRollCallback(15));
  setEvent('right90Event', generateEventRollCallback(90));
  setEvent('right135Event', generateEventRollCallback(135));
  setEvent('backEvent', generateEventRollCallback(180));
  setEvent('onereturnEvent', () => {
    prop.hitEvent.pop();
    addEvent();
  });
  setEvent('reset', () => {
    name.value = '';
    prop.id = "";
    prop.command.length = 0;
    prop.hitEvent = [];
    addCommand();
    addEvent();
  });
  const id = (() => {
    const idMatches = location.search.match(/id=(.+)(&|$)/);
    if (idMatches) {
      return decodeURIComponent(idMatches[1]);
    }
  })();
  const send = id => () => {
    prop.id = name.value;
    if (prop.command.length === 0 || prop.id === "") {
      alert('入力されていない部分があります');
      return false;
    }
    console.log(prop);
    socket.emit(id, JSON.stringify(prop));
  };
  let canAdd = true;
  setEvent('send', ()=>{
    if (!canAdd) return;
    canAdd = false;
    setTimeout(() => canAdd = true, 5000);
    send('message')();
  });
  setEvent('subsend', send('demo' + id));
};
