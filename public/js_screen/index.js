const defaultProps = {
  locX: 200,
  locY: 150,
  direction: 45
};
const Bound = {};
Bound.Field = e => {
  const self = this;
  this.canvas = e;
  if (!this.canvas.getContext) throw new Error("contextが見つかりません");
  this.context = this.canvas.getContext('2d');
  this.context.globalCompositeOperation = "source-over";
  setInterval(self.run, 33);
};
const Circle = data => {
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
  clear: () => {
    const context = this.context;
    if (!context) return;
    const size = this.size || {};
    context.fillStyle = "#000";
    context.fillRect(0, 0, size.width, size.height);
  },
  resize: parent => {
    this.size.width = this.canvas.width = parent.clientWidth;
    this.size.height = this.canvas.height = parent.clientHeight;
  },
  run: () => {
    this.clear();
    discriminateCommand();
    circles.forEach(circle => circle.draw(context));
  }
};
Circle.prototype = {
  draw: context => {
    context.beginPath();
    context.fillStyle = '#3399FF';
    context.arc(this.locX, this.locY, 10, 0, Math.PI * 2.0, true);
    context.fill();
    context.fillStyle = 'white';
    context.fillText(this.id, this.locX - 5, this.locY)
  },
  roll: direction => this.direction = this.normalizeDirection(direction + this.direction),
  go: distance => {
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
  },
  normalizeDirection: direction => (direction + 360) % 360,
  discriminateCommand: () => {
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
const discriminateCommand = () => circles.forEach(circle => circle.discriminateCommand());
window.onload = () => {
  var canvas = document.getElementById('tutorial');
  socket.on('receiveMessage', d => circles.push(new Circle(d)));
  const field = new Bound.Field(canvas);
};