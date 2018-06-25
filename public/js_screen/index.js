const defaultProps = {
  locX: 200,
  locY: 150,
  direction: 45
};
const Bound = {};
Bound.Field = function (e) {
  this.init(e);
};
let context;
const Circle = function (props) {
  this.commandCount = 0;
  this.command = props.command;
  this.id = props.id;
  this.locX = defaultProps.locX;
  this.locY = defaultProps.locY;
  this.direction = defaultProps.direction;
};

Circle.prototype.draw = function (context) {
  context.beginPath();
  context.fillStyle = '#3399FF';
  context.arc(this.locX, this.locY, 10, 0, Math.PI * 2.0, true);
  context.fill();
  context.fillStyle = 'white';
  context.fillText(this.id, this.locX - 5, this.locY)
};
Circle.prototype.roll = function (direction) {
  this.direction = this.normalizeDirection(direction + this.direction);
};
Circle.prototype.go = function (distance) {
  const radian = this.direction * Math.PI / 180;
  let distanceX = distance * Math.cos(radian);
  let distanceY = distance * Math.sin(radian);
  var futureLocX = this.locX + distanceX;
  var futureLocY = this.locY + distanceY;
  let direction = this.direction;
  if (futureLocX - 10 < 0 || futureLocX + 10 > 2000) {
    distanceX *= -1;
    direction = 180 - direction;
  }
  if (futureLocY - 10 < 0 || futureLocY + 10 > 900) {
    distanceY *= -1;
    direction *= -1;
  }
  this.direction = this.normalizeDirection(direction);
  this.locX += distanceX;
  this.locY += distanceY;
};
Circle.prototype.normalizeDirection = function (direction) {
  return (direction + 360) % 360;
};
Circle.prototype.discriminateCommand = function () {
  var order = this.command[this.commandCount];
  this.commandCount = (this.commandCount + 1) % this.command.length;
  var { speedX, speedY } = this;
  if (order.roll) {
    this.roll(45);
  }
  if (order.go) {
    this.go(5);
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