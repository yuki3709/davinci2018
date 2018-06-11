function Circles(speedX, speedY, locX, locY) {
    this.speedX = speedX;
    this.speedY = speedY;
    this.locX = locX;
    this.locY = locY;
}
var ordernum = 0;
var circle = [];
var circle0 = [];
var order = [];
var pnum = 0;
var playername;

circle[0] = new Circles(3.0, 4.0, 200, 150);
circle[1] = new Circles(-4.0, -3.0, 100, 50);
circle0[0] = new Circles(3.0, 4.0, 200, 150);


function draw() {
    context.globalCompositeOperation = "source-over";
    context.fillStyle = "rgb(8,8,12)";
    context.fillRect(0, 0, 400, 300);
    if (order[ordernum].roll) {
        if (circle[0].speedX == 0 && circle[0].speedY > 0) {
            circle[0].speedX = circle0[0].speedX;
        }
        else if (circle[0].speedX > 0 && circle[0].speedY > 0) {
            circle[0].speedY = 0;
        }
        else if (circle[0].speedX > 0 && circle[0].speedY == 0) {
            circle[0].speedY = circle0[0].speedY * -1;
        }
        else if (circle[0].speedX > 0 && circle[0].speedY < 0) {
            circle[0].speedX = 0;
        }
        else if (circle[0].speedX == 0 && circle[0].speedY < 0) {
            circle[0].speedX = circle0[0].speedX * -1;
        }
        else if (circle[0].speedX < 0 && circle[0].speedY < 0) {
            circle[0].speedY = 0;
        }
        else if (circle[0].speedX < 0 && circle[0].speedY == 0) {
            circle[0].speedY = circle0[0].speedY;
        }
        else if (circle[0].speedX < 0 && circle[0].speedY > 0) {
            circle[0].speedX = 0;
        }
    }
    //位置を更新

    for (i = 0; i < circle.length; i++) {

        circle[i].locX += circle[i].speedX;
        circle[i].locY += circle[i].speedY;

        if (circle[i].locX < 0 || circle[i].locX > 400) {
            circle[i].speedX *= -1;
        }

        if (circle[i].locY < 0 || circle[i].locY > 300) {
            circle[i].speedY *= -1;
        }
    }


    //更新した座標で円を描く

    context.beginPath();
    circle.forEach(function (circle) {
        context.fillStyle = '#3399FF';
        context.arc(circle.locX, circle.locY, 10, 0, Math.PI * 2.0, true);
        context.fill();
        context.fillStyle = 'black';
        context.fillText(playername, circle.locX - 5, circle.locY - 5)
        context.fill();
    });
    context.fill();
    ordernum = (ordernum + 1) % order.length;
}

function init() {
    var canvas = document.getElementById('tutorial');
    var message = document.getElementById('message');
    socket.on('receiveMessage', function (d) {
        var data = JSON.parse(JSON.parse(d).text); // 文字列→JSON
        console.log(data);
        var e = document.createElement('p');
        e.innerText = data.id;
        message.appendChild(e);
        order = data.command;
        playername = data.id;

    });
    if (canvas.getContext) {
        context = canvas.getContext('2d');
        setInterval(draw, 33);
    }
}

window.onload = function () {
    init();
};