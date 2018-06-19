var defaultProps = {
  speedX: 5.0,
  speedY: 5.0,
  locX: 200,
  locY: 150
};
let context;
const Circle = function (props) {
  this.commandCount = 0;
  this.command = props.command;
  this.id = props.id;
  this.speedX = defaultProps.speedX;
  this.speedY = defaultProps.speedY;
  this.locX = defaultProps.locX;
  this.locY = defaultProps.locY;
};
Circle.prototype.draw = function (context) {
  context.beginPath();
  context.fillStyle = '#3399FF';
  context.arc(this.locX, this.locY, 10, 0, Math.PI * 2.0, true);
  context.fill();
  context.fillStyle = 'white';
  context.fillText(this.id, this.locX - 5, this.locY)
};
Circle.prototype.discriminateCommand = function () {
  var order = this.command[this.commandCount];
  this.commandCount = (this.commandCount + 1) % this.command.length;
  var { speedX, speedY } = this;
  if (order.roll) {
    if (speedX == 0) {
      if (speedY < 0) {
        this.speedX = defaultProps.speedX;
      } else if (speedY > 0) {
        this.speedX = defaultProps.speedX * -1;
      }
    } else if (speedY == 0) {
      if (speedX > 0) {
        this.speedY = defaultProps.speedY;
      } if (speedX < 0) {
        this.speedY = defaultProps.speedY * -1;
      }
    } else if (speedY > 0) {
      if (speedX != 0) {
        this.speedY = 0;
      }
    } else if (speedY < 0) {
      if (speedX != 0) {
        this.speedX = 0;
      }
    }
  }
  if (order.go) {
    var futureLocX = this.locX + this.speedX;
    var futureLocY = this.locY + this.speedY;
    if (futureLocX - 10 < 0 || futureLocX + 10 > 2000) {
      this.speedX *= -1;
    }
    if (futureLocY - 10 < 0 || futureLocY + 10 > 900) {
      this.speedY *= -1;
    }
    this.locX += this.speedX;
    this.locY += this.speedY;
  }
};
let circles = [];
function draw() {
  context.globalCompositeOperation = "source-over";
  context.fillStyle = "rgb(8,8,12)";
  context.fillRect(0, 0, 2000, 900);
}
function discriminateCommand() {
  circles.forEach(function (circle) {
    circle.discriminateCommand();
  });
}
function run() {
  draw();
  discriminateCommand();
  circles.forEach(function (circle) {
    circle.draw(context);
  });
}
window.onload = function () {
  var canvas = document.getElementById('tutorial');
  socket.on('receiveMessage', function (d) {
    var data = JSON.parse(d); // 文字列→JSON
    circles.push(new Circle(data));
  });
  if (canvas.getContext) {
    context = canvas.getContext('2d');
    setInterval(run, 33);
  }
};