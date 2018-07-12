Field = function (e) {
  this.canvas = e;
  if (!this.canvas.getContext) throw new Error("contextが見つかりません");
  this.context = this.canvas.getContext('2d');
  this.context.globalCompositeOperation = "source-over";
  setInterval(() => this.run(), 33);
  setInterval(() => this.getColor(this.context), 20000);
  setInterval(() => this.displayRank(), 20000);
};
Field.prototype = {
  canvas: null,
  context: null,
  size: {
    width: 0,
    height: 0
  },
  team: {
    red: 0,
    fuchsia: 0,
    lime: 0,
    aqua: 0,
  },
  score: {
    red: 0,
    fuchsia: 0,
    lime: 0,
    aqua: 0
  },
  imageData: [],
  circles: [],
  constructor: Field,
  discriminateCommand: function () {
    this.circles.forEach(circle => circle.discriminateCommand());
  },
  resize: function (parent) {
    this.size.width = this.canvas.width = parent.clientWidth * 0.7;
    this.size.height = this.canvas.height = parent.clientHeight;
  },
  run: function () {
    this.circles.forEach(circle => circle.shadeDraw(this.context));
    this.discriminateCommand();
    this.circles.forEach(circle => circle.draw(this.context));
  },
  getColor: function (context) {
    this.imageData = context.getImageData(0, 0, this.size.width, this.size.height);
    for (y = 0; y < this.size.height; y = y + (this.size.height / 5)) {
      for (x = 0; x < this.size.width; x = x + (this.size.width / 5)) {
        let index = (y * this.size.width + x) * 4;
        let red = this.imageData.data[index]; // R
        let green = this.imageData.data[index + 1]; // G
        let blue = this.imageData.data[index + 2]; // B
        if (red === 255 && green === 0 && blue === 0) {
          this.team.red++;
        }
        if (red === 255 && green === 0 && blue === 255) {
          this.team.fuchsia++;
        }
        if (red === 0 && green === 255 && blue === 0) {
          this.team.lime++;
        }
        if (red === 0 && green === 255 && blue === 255) {
          this.team.aqua++;
        }
        // if (red === 0 && green === 0 && blue === 0) {
        //   this.team.black++;
        // }
      }
    }
  },
  displayRank: function () {
    let sumScore = this.team.red + this.team.fuchsia + this.team.lime + this.team.aqua;
    this.score.red = Math.floor(this.team.red / sumScore * 100);
    this.score.fuchsia = Math.floor(this.team.fuchsia / sumScore * 100);
    this.score.lime = Math.floor(this.team.lime / sumScore * 100);
    this.score.aqua = Math.floor(this.team.aqua / sumScore * 100);
    console.log(this.score);
    this.score.red = 0;
    this.score.fuchsia = 0;
    this.score.lime = 0;
    this.score.aqua = 0;
    this.team.red = 0;
    this.team.fuchsia = 0;
    this.team.lime = 0;
    this.team.aqua = 0;
    // this.team.black = 0;
  }
};
const Circle = function (data, field) {
  const props = JSON.parse(data);
  this.color = props.color;
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
  let canvas = document.getElementById('game');
  const field = new Field(canvas);
  socket.on('receiveMessage', function (d) {
    field.circles.push(new Circle(d, field));
  });
  let outputArea = document.getElementById('output-area');
  field.resize(outputArea);
};