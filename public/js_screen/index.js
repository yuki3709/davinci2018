Field = function (e) {
  this.canvas = e;
  if (!this.canvas.getContext) throw new Error("contextが見つかりません");
  this.context = this.canvas.getContext('2d');
  this.context.globalCompositeOperation = "source-over";
  setInterval(() => this.run(), 33);
};
Field.prototype = {
  canvas: null,
  context: null,
  size: {
    width: 0,
    height: 0
  },
  circles: [],
  constructor: Field,
  discriminateCommand: function () {
    this.circles.forEach(circle => circle.discriminateCommand());
  },
  resize: function (parent) {
    this.size.width = this.canvas.width = parent.clientWidth;
    this.size.height = this.canvas.height = parent.clientHeight;
  },
  run: function () {
    this.circles.forEach(circle => circle.shadeDraw(this.context));
    this.discriminateCommand();
    this.circles.forEach(circle => circle.draw(this.context));
  }
};
const Circle = function (data, field) {
  const props = JSON.parse(data);
  this.color = "rgb(" + Array(3).fill(0).map(Math.random).map(x => x * 256).map(Math.floor).join(",") + ")";
  this.command = props.command;
  this.id = props.id;
  this.width = field.size.width;
  this.height = field.size.height;
  this.locX = Math.floor(Math.random() * this.width);
  this.locY = Math.floor(Math.random() * this.height);
};
Circle.prototype = {

  direction: 45,
  commandCount: 0,
  draw: function (context) {
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.locX, this.locY, 10, 0, Math.PI * 2.0, true);
    context.fill();
    context.fillStyle = 'white';
    context.fillText(this.id, this.locX - 5, this.locY)
  },
  shadeDraw: function (context) {
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.locX, this.locY, 10, 0, Math.PI * 2.0, true);
    context.fill();
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
    if (futureLocX - 10 < 0 || futureLocX + 10 > this.width) {
      distanceX *= -1;
      direction = 180 - direction;
    }
    if (futureLocY - 10 < 0 || futureLocY + 10 > this.height) {
      distanceY *= -1;
      direction *= -1;
    }
    this.direction = this.normalizeDirection(direction);
    this.locX += distanceX;
    this.locY += distanceY;
  },
  normalizeDirection: direction => (direction + 360) % 360,
  discriminateCommand: function () {
    var order = this.command[this.commandCount];
    this.commandCount = (this.commandCount + 1) % this.command.length;
    if (typeof order.roll !== "undefined") {
      this.roll(order.roll);
    }
    if (typeof order.go !== "undefined") {
      this.go(order.go);
    }
  }
};
window.onload = function () {
  let canvas = document.getElementById('tutorial');
  const field = new Field(canvas);
  socket.on('receiveMessage', function (d) {
    field.circles.push(new Circle(d, field));
  });
  let outputArea = document.getElementById('output-area');
  field.resize(outputArea);
};