var prop = {
  "id":"",
  "command":[],
  "hitEvent":[{roll:90}],
  "color":""
};

window.onload = () => {
  console.log('https://davinch-sahara.herokuapp.com/?color=red');
  console.log('https://davinch-sahara.herokuapp.com/?color=aqua');
  console.log('https://davinch-sahara.herokuapp.com/?color=fuchsia');
  console.log('https://davinch-sahara.herokuapp.com/?color=lime');
  function GetQueryString()
  {
    var result = {};
    if( 1 < window.location.search.length )
    {
        // 最初の1文字 (?記号) を除いた文字列を取得する
        var query = window.location.search.substring( 1 ).sprit('&');
        for( var i = 0; i < query.length; i++ )
        {
          // パラメータ名とパラメータ値に分割する
          var element = query[ i ].split( '=' );

          var paramName = decodeURIComponent( element[ 0 ] );
          var paramValue = decodeURIComponent( element[ 1 ] );
          // パラメータ名をキーとして連想配列に追加する
          result[ paramName ] = paramValue;
        }
    }
    return result;
  };
  prop.color = GetQueryString()
  var go = document.getElementById('go');
  go.addEventListener('click',() => {
    prop.command.push({go:10});
    document.getElementById('messageList').textContent = JSON.stringify(prop.command);
    console.log(prop);
  });
  var left = document.getElementById('left');
  left.addEventListener('click',() => {
    prop.command.push({roll:-45});
    document.getElementById('messageList').textContent = JSON.stringify(prop.command);
    console.log(prop);
  });
  var right = document.getElementById('right');
  right.addEventListener('click',() => {
    prop.command.push({roll:45});
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
  var hitEventLeft = document.getElementById('leftEvent');
  hitEventLeft.addEventListener('click',() => {
    prop.hitEvent.push({roll:-45});
    document.getElementById('hitEventList').textContent = JSON.stringify(prop.hitEvent);
    console.log(prop);
  });
  var hitEventRight = document.getElementById('rightEvent');
  hitEventRight.addEventListener('click',() => {
    prop.hitEvent.push({roll:45});
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
    if(prop.command === 0 || prop.id === "") return fales;
    console.log(prop);
    socket.emit('message', JSON.stringify(prop));
  });
  document.getElementById('messageList').textContent = JSON.stringify(prop.command);
  document.getElementById('hitEventList').textContent = JSON.stringify(prop.hitEvent);
};
