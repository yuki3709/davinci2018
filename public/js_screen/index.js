var defaultProps = {
    speedX: 5.0,
    speedY: 5.0,
    locX: 200,
    locY: 150
}
function Circles(props) {
    this.commandCount = 0;
    this.command = props.command;
    this.id = props.id;
    this.speedX = defaultProps.speedX;
    this.speedY = defaultProps.speedY;
    this.locX = defaultProps.locX;
    this.locY = defaultProps.locY;
}
var circle = [];

function draw() {
    context.globalCompositeOperation = "source-over";
    context.fillStyle = "rgb(8,8,12)";
    context.fillRect(0, 0, 2000, 900);
    circle.forEach(function (circle) {
        var order = circle.command[circle.commandCount];
        var { speedX, speedY } = circle;
        if (order.roll) {
            if (speedX == 0) {
                if (speedY < 0) circle.speedX = defaultProps.speedX;
                else if (speedY > 0) circle.speedX = defaultProps.speedX * -1;
            }
            else if (speedX > 0) {
                if (speedY > 0) circle.speedX = 0;
                else if (speedY == 0) circle.speedY = defaultProps.speedY;
                else circle.speedY = 0;
            }
            else {
                if (speedY < 0) circle.speedX = 0;
                else if (speedY == 0) circle.speedY = defaultProps.speedY * -1;
                else circle.speedY = 0;
            }
        }
        //位置を更新

        if (order.go) {
            circle.locX += circle.speedX;
            circle.locY += circle.speedY;

            if (circle.locX - 10 < 0 || circle.locX + 10 > 2000) {
                circle.speedX *= -1;
            }

            if (circle.locY - 10 < 0 || circle.locY + 10 > 900) {
                circle.speedY *= -1;
            }
        }
        circle.commandCount = (circle.commandCount + 1) % circle.command.length;
    });


    //更新した座標で円を描く


    circle.forEach(function (circle) {
        context.beginPath();
        context.fillStyle = '#3399FF';
        context.arc(circle.locX, circle.locY, 10, 0, Math.PI * 2.0, true);
        context.fill();
        context.fillStyle = 'white';
        context.fillText(circle.id, circle.locX - 5, circle.locY)
    });
}

function init() {
    var canvas = document.getElementById('tutorial');
    socket.on('receiveMessage', function (d) {
        var data = JSON.parse(JSON.parse(d).text); // 文字列→JSON
        circle.push(new Circles(data));
        console.log(data);
    });
    if (canvas.getContext) {
        context = canvas.getContext('2d');
        setInterval(draw, 33);
    }
}

window.onload = function () {
    init();
};