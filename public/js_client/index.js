const prop = {
  id: "",
  command: [],
  hitEvent: [],
  color: ""
};

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


const createBlock = className => command => {
  const el = document.createElement("div");
  el.className = className;
  el.style.marginBottom = "20px";
  el.innerHTML = getButton(command);
  return el;
};

function addElement(id, commands, className) {
  console.log(prop);
  const list = document.getElementById(id);
  list.innerHTML = "";
  commands.map(createBlock(className)).forEach(el => list.appendChild(el));
  list.scrollTop = list.scrollHeight;
}

function addCommand() {
  addElement('messageList', prop.command, "block1");
}

function addEvent() {
  addElement('hitEventList', prop.hitEvent, "block2");
}

window.onload = () => {
  let url = location.href;
  console.log(url + 'screen');
  ["red", "aqua", "fuchsia", "lime"].forEach((color, i) => {
    console.log(url + `?color=${color}&?id=${i + 1}`);
  });
  document.onclick = () => {
    if (!url.match("color")) alert("色を指定してください");
  };

  let name = document.getElementById('userID');
  let PlayerColor = location.search.match(/color=(.*?)(&|$)/);
  if (PlayerColor) {
    prop.color = decodeURIComponent(PlayerColor[1]);
    document.getElementById("teamcolor").style.background = prop.color;
  }

  const setEvent = (id, callback) => document.getElementById(id).addEventListener('click', callback);
  const generateCallback = command => () => {
    prop.command.push(command);
    addCommand();
  };
  const generateEventCallback = hitEvent => () => {
    prop.hitEvent.push(hitEvent);
    addEvent();
  };
  const setEvents = (id, value) => {
    setEvent(id, generateCallback(value));
    setEvent(id + 'Event', generateEventCallback(value));
  };

  setEvents('go', {go: 15});
  const setRollEvents = (id, deg) => setEvents(id, {roll: deg});
  setRollEvents('left15', -15);
  setRollEvents('left90', -90);
  setRollEvents('left135', -135);
  setRollEvents('right15', 15);
  setRollEvents('right90', 90);
  setRollEvents('right135', 135);
  setRollEvents('back', 180);
  setEvent('onereturn', () => {
    prop.command.pop();
    addCommand();
  });
  setEvent('onereturnEvent', () => {
    prop.hitEvent.pop();
    addEvent();
  });
  setEvent('reset', () => {
    name.value = '';
    prop.id = "";
    prop.command = [];
    prop.hitEvent = [];
    addCommand();
    addEvent();
  });
  const send = id => {
    prop.id = name.value;
    if (prop.command.length === 0 || prop.id === "") {
      alert('入力されていない部分があります');
      return false;
    }
    console.log(prop);
    socket.emit(id, JSON.stringify(prop));
  };
  let canvas;
  let canAdd = true;
  setEvent('send', () => {
    if (!canAdd) return;
    canAdd = false;
    setTimeout(() => canAdd = true, 5000);
    send('message');
  });
  setTimeout(() => {
    canvas = document.getElementById('iframe');
    canvas.src = url.replace(/\?.+/g, "screen/?id=" + socket.id);
  }, 1000);
  setEvent('subsend', () => send('demo' + socket.id));
};
