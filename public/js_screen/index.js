
function Circle(speedX, speedY, locX, locY) {
    this.speedX = speedX;
    this.speedY = speedY;
    this.locX = locX;
    this.locY = locY;
}
var ordernum = 0;
var circle = [];
var circle0 = [];
circle[0] = new Circle(3.0, 4.0, 200, 150);
circle[1] = new Circle(-4.0, -3.0, 100, 50);
circle0[0] = new Circle(3.0, 4.0, 200, 150);
var order = ['go', 'go', 'roll', 'go'];



function draw() {
    context.globalCompositeOperation = "source-over";
    context.fillStyle = "rgb(8,8,12)";
    context.fillRect(0, 0, 400, 300);
    //context.globalCompositeOperation = "lighter";
    //document.write(order[ordernum]);
    if (order[ordernum] == 'roll') {

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
    context.fillStyle = '#3399FF';
    for (i = 0; i < circle.length; i++) {
        context.arc(circle[i].locX, circle[i].locY, 4, 0, Math.PI * 2.0, true);
    }

    context.fill();

    ordernum = (ordernum + 1) % order.length;
    //document.write(ordernum);
}



function init() {
    var canvas = document.getElementById('tutorial');
    if (canvas.getContext) {
        context = canvas.getContext('2d');
        setInterval(draw, 33);
    }
}

<canvas id="tutorial" width="400" height="300"></canvas>
