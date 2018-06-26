const defaultProps = {
  locX: 200,
  locY: 150,
  direction: 45
};
const Bound = {};
Bound.Field = function (e) {
  this.canvas = e;
  if (!this.canvas.getContext) throw new Error("contextが見つかりません");
  this.context = this.canvas.getContext('2d');
  this.context.globalCompositeOperation = "source-over";
  setInterval(() => this.run(), 33);
};
const Circle = function (data) {
  const props = JSON.parse(data);
  this.commandCount = 0;
  this.command = props.command;
  this.id = props.id;
  this.locX = defaultProps.locX;
  this.locY = defaultProps.locY;
  this.direction = defaultProps.direction;
};
Bound.Field.prototype = {
  canvas: null,
  context: null,
  size: {
    width: 0,
    height: 0
  },
  constructor: Bound.Field,
  clear: function () {
    const context = this.context;
    if (!context) return;
    const size = this.size || {};
    context.fillStyle = "#000";
    context.fillRect(0, 0, size.width, size.height);
  },
  resize: function (parent) {
    this.size.width = this.canvas.width = parent.clientWidth;
    this.size.height = this.canvas.height = parent.clientHeight;
  },
  run: function () {
    this.clear();
    discriminateCommand();
    circles.forEach(circle => circle.draw(context));
  }
};
Circle.prototype = {
  draw: function (context) {
    context.beginPath();
    context.fillStyle = '#3399FF';
    context.arc(this.locX, this.locY, 10, 0, Math.PI * 2.0, true);
    context.fill();
    context.fillStyle = 'white';
    context.fillText(this.id, this.locX - 5, this.locY)
  },
  roll: function (direction) {
    this.direction = this.normalizeDirection(direction + this.direction)
  },
  go: function (distance) {
    const radian = this.direction * Math.PI / 180;
    let distanceX = distance * Math.cos(radian);
    let distanceY = distance * Math.sin(radian);
    let futureLocX = this.locX + distanceX;
    let futureLocY = this.locY + distanceY;
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
  },
  normalizeDirection: function (direction) {
    (direction + 360) % 360
  },
  discriminateCommand: function () {
    var order = this.command[this.commandCount];
    this.commandCount = (this.commandCount + 1) % this.command.length;
    var { speedX, speedY } = this;
    if (order.roll) {
      this.roll(45);
    }
    if (order.go) {
      this.go(5);
    }
  }
};
let circles = [];
function discriminateCommand() {
  circles.forEach(function (circle) {
    circle.discriminateCommand();
  });
}
window.onload = function () {
  let canvas = document.getElementById('tutorial');
  socket.on('receiveMessage', function (d) {
    circles.push(new Circle(data));
  });
  const field = new Bound.Field(canvas);
  let outputArea = this.document.getElementById('output-area');
  field.resize(outputArea);
};