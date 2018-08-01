Field = function (e, c, d) {
  this.canvas = e;
  this.canvas2 = c;
  if (!this.canvas.getContext) throw new Error("contextが見つかりません");
  this.context = this.canvas.getContext('2d');
  this.context.globalCompositeOperation = "source-over";
  this.context2 = this.canvas2.getContext('2d');
  this.context2.globalCompositeOperation = "source-over";
  setInterval(() => this.run(), 33);
  if (!d) setInterval(() => this.getColor(this.context, this.context2), 1000);
  if (!!d) setInterval(() => this.resetScreen(this.context, this.context2), 1000);
};
Field.prototype = {
  canvas: null,
  canvas2: null,
  context: null,
  context2: null,
  size: {
    width: 0,
    height: 0
  },
  imageData: [],
  circles: [],
  constructor: Field,
  checkNumber: function (color) {
    const count = this.circles.filter(circle => circle.color === color).length;
    if (count <= 4) return;
    this.circles.some((circle, i) => {
      if (circle.color === color) {
        circle.shadeDraw(this.context);
        this.circles.splice(i, 1);
        return true;
      }
    });
  },
  discriminateCommand: function () {
    this.circles.forEach(circle => circle.discriminateCommand(this.circles));
  },
  resize: function (parent, d) {
    this.canvas.width = Math.floor(parent.clientWidth * 0.7);
    this.canvas2.width = Math.floor(parent.clientWidth * 0.3);
    if (!!d) this.canvas.width = parent.clientWidth;
    this.size.width = this.canvas.width;
    this.size.height = this.canvas.height = this.canvas2.height = parent.clientHeight;
  },
  run: function () {
    this.circles.forEach(circle => circle.shadeDraw(this.context));
    this.discriminateCommand();
    this.circles.forEach(circle => circle.draw(this.context));
    this.circles.forEach(circle => circle.effect(this.context));
    // this.fillWhite(this.context);
  },
  getColor: function (context, context2) {
    this.imageData = context.getImageData(0, 0, this.size.width, this.size.height);
    const colors = [];
    for (let y = 0; y < this.size.height; y = y + 5) {
      for (let x = 0; x < this.size.width; x = x + 5) {
        const index = (y * this.size.width + x) * 4;
        const r = this.imageData.data[index]; // R
        const g = this.imageData.data[index + 1]; // G
        const b = this.imageData.data[index + 2]; // B
        colors.push({ r: r, g: g, b: b });
      }
    }
    const createFilter = (r, g, b) => c => c.r === r && c.g === g && c.b === b;
    const red = colors.filter(createFilter(255, 0, 0)).length;
    const fuchsia = colors.filter(createFilter(255, 0, 255)).length;
    const lime = colors.filter(createFilter(0, 255, 0)).length;
    const aqua = colors.filter(createFilter(0, 255, 255)).length;
    const black = colors.filter(createFilter(0, 0, 0)).length;
    const team = {
      red: red,
      fuchsia: fuchsia,
      lime: lime,
      aqua: aqua,
      black: black
    };
    this.displayRank(context, context2, team);
  },
  displayRank: function (context, context2, team) {
    const score = {
      red: 0,
      fuchsia: 0,
      lime: 0,
      aqua: 0,
      black: 0
    };
    const { red, fuchsia, lime, aqua, black } = team;
    let sumScore = red + fuchsia + lime + aqua + black;
    score.red = Math.ceil(red / sumScore * 100);
    score.fuchsia = Math.ceil(fuchsia / sumScore * 100);
    score.lime = Math.ceil(lime / sumScore * 100);
    score.aqua = Math.ceil(aqua / sumScore * 100);
    let total = score.red + score.fuchsia + score.lime + score.aqua;
    score.black = 100 - total;
    this.drawChart(context2, score);
    this.resetScreen(context, score.black);
  },
  drawChart: function (context, score) {
    const { red, fuchsia, lime, aqua, black } = score;
    const width = this.canvas2.width;
    const height = this.size.height;
    context.beginPath();
    context.fillStyle = "white";
    context.fillRect(0, 0, this.canvas2.width, height);
    context.fillStyle = "black";
    context.font = "italic bold 20px sans-serif";
    context.fillText(red, 60, height / 100 + height / 12);
    context.fillText(fuchsia, 60, height / 5 + height / 12);
    context.fillText(lime, 60, height / 2.5 + height / 12);
    context.fillText(aqua, 60, height / 1.7 + height / 12);
    context.fillText("リ　　　あ", 110, height / 1.27 + height / 6 * 1 / 5);
    context.fillText("セ　　　と", 110, height / 1.27 + height / 6 * 2 / 5);
    context.fillText("ッ　　　少", 110, height / 1.27 + height / 6 * 3 / 5);
    context.fillText("ト　　　し", 110, height / 1.27 + height / 6 * 4 / 5);
    context.fillStyle = "red";
    context.fillRect(105, height / 100, red * width * 0.7 / 100, height / 6);
    context.fillStyle = "fuchsia";
    context.fillRect(105, height / 5, fuchsia * width * 0.7 / 100, height / 6);
    context.fillStyle = "lime";
    context.fillRect(105, height / 2.5, lime * width * 0.7 / 100, height / 6);
    context.fillStyle = "aqua";
    context.fillRect(105, height / 1.7, aqua * width * 0.7 / 100, height / 6);
    context.fillStyle = "black";
    context.fillRect(105, height / 1.27, (black - 20) * width * 0.7 / 100, height / 6);
  },
  resetScreen: function (context, black) {
    if (black <= 20) {
      // context.fillStyle = "white";
      // context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      context.fillStyle = "black";
      context.fillRect(0, 0, this.size.width, this.canvas.height);
    }
    document.onkeydown = (e) => {
      if (e.key === "r") {
        context.fillStyle = "black";
        context.fillRect(0, 0, this.size.width, this.canvas.height);
      }
    };
  },
  fillWhite: function (context) {
    context.fillStyle = "white";
    context.fillRect(this.size.width, 0, 55, this.canvas.height);
  },
  addCircle: function (circle) {
    this.circles.push(circle);
    this.checkNumber(circle.color);
  }
};
const Circle = function (data, field) {
  const props = JSON.parse(data);
  this.color = props.color;
  this.command = (function* () {
    while (true) for (const i in props.command) yield props.command[i];
  })();
  this.hitEvent = function* () {
    for (const hit of props.hitEvent) yield hit;
  };
  this.command.go = 10;
  this.id = props.id;
  let speed = 1;
  this.width = field.size.width;
  this.height = field.size.height;
  this.speed = (speed => {
    switch (this.id) {
      case "・ω・":
        return 1;
      case "˘ω˘":
        return 3;
      case "><":
        return 5;
      default:
        return speed;
    }
  })(this.speed);
  this.locX = Math.floor(Math.random() * (this.width - 100) + 50);
  this.locY = Math.floor(Math.random() * (this.height - 100) + 50);
  this.radius = this.width / this.speed / 20;
  this.direction = Math.floor(Math.random() * 360);
  this.flag = 0;
  this.effectFlag = 0;
  this.checkCircle(field.circles);
};
Circle.prototype = {
  hitCommand: undefined,
  checkCircle: function (circles) {
    let out = true;
    while (out) {
      out = circles.some(circle => (circle !== this) && ((circle.radius + this.radius) ** 2 > (circle.locX - this.locX) ** 2 + (circle.locY - this.locY) ** 2));
      if (out) {
        this.locX = Math.floor(Math.random() * (this.width - 100) + 50);
        this.locY = Math.floor(Math.random() * (this.height - 100) + 50);
      }
    }
  },
  draw: function (context) {
    for (ix = -1; ix < 2; ix++) {
      for (iy = -1; iy < 2; iy++) {
        context.beginPath();
        context.lineWidth = 2;
        context.strokeStyle = 'white';
        context.arc(this.locX + ix * this.width, this.locY + iy * this.height, this.radius, 0, Math.PI * 2.0, true);
        context.stroke();
        context.lineWidth = 1;
        context.fillStyle = this.color;
        context.arc(this.locX + ix * this.width, this.locY + iy * this.height, this.radius, 0, Math.PI * 2.0, true);
        context.fill();
        let textLocX = this.locX + ix * this.width - this.radius * 3 / 5 * Math.cos(this.direction * Math.PI / 180);
        let textLocY = this.locY + iy * this.height - this.radius * 3 / 5 * Math.sin(this.direction * Math.PI / 180);
        context.fillStyle = 'black';
        context.font = "bold 10px Arial";
        context.fillText(this.id, textLocX - 6 + this.radius * Math.cos(this.direction * Math.PI / 180), textLocY + 6 + this.radius * Math.sin(this.direction * Math.PI / 180));
        context.fillStyle = 'white';
        context.fillText(this.id, textLocX - 7 + this.radius * Math.cos(this.direction * Math.PI / 180), textLocY + 7 + this.radius * Math.sin(this.direction * Math.PI / 180));
      }
    }
  },
  shadeDraw: function (context) {
    for (ix = -1; ix < 2; ix++) {
      for (iy = -1; iy < 2; iy++) {
        context.beginPath();
        context.lineWidth = 3;
        context.strokeStyle = this.color;
        context.arc(this.locX + ix * this.width, this.locY + iy * this.height, this.radius, 0, Math.PI * 2.0, true);
        context.stroke();
        context.lineWidth = 1;
        context.fillStyle = this.color;
        context.arc(this.locX + ix * this.width, this.locY + iy * this.height, this.radius, 0, Math.PI * 2.0, true);
        context.fill();
      }
    }
  },
  roll: function (direction) {
    this.direction = this.normalizeDirection(direction + this.direction);
  },
  go: function (distance, circles) {
    const radian = this.direction * Math.PI / 180;
    let distanceX = distance * Math.cos(radian);
    let distanceY = distance * Math.sin(radian);
    let futureLocX = this.locX + distanceX;
    let futureLocY = this.locY + distanceY;
    let direction = this.direction;
    futureLocX %= this.width;
    futureLocY %= this.height;
    if (futureLocX < 0) {
      futureLocX = this.width + futureLocX;
    }
    if (futureLocY < 0) {
      futureLocY = this.height + futureLocY;
    }
    this.check(circles, futureLocX, futureLocY);
    if (this.flag === 0) {
      this.direction = this.normalizeDirection(direction);
      this.locX += distanceX;
      this.locY += distanceY;
      this.locX %= this.width;
      this.locY %= this.height;
      if (this.locX < -this.radius) {
        this.locX = this.width + this.locX;
      }
      if (this.locY < -this.radius) {
        this.locY = this.height + this.locY;
      }
    }
    this.flag = 0;
  },
  normalizeDirection: direction => (direction + 360) % 360,
  discriminateCommand: function (circles) {
    let order;
    if (this.hitCommand !== undefined) {
      order = this.hitCommand.next().value;
    } else {
      order = this.command.next().value;
    }
    if (typeof order === "undefined") {
      order = this.command.next().value;
    }
    if (typeof order.roll !== "undefined") {
      this.roll(order.roll);
    }
    if (typeof order.go !== "undefined") {
      this.go(this.speed, circles);
    }
  },
  check: function (circles, futureLocX, futureLocY) {
    for (ix = -1; ix < 2; ix++) {
      for (iy = -1; iy < 2; iy++) {
        for (i = 0; i < circles.length; i++) {
          if (circles[i] !== this) {
            if ((circles[i].radius + this.radius) ** 2
              >= (circles[i].locX + ix * this.width - futureLocX) ** 2
              + (circles[i].locY + iy * this.height - futureLocY) ** 2) {
              this.hitCommand = this.hitEvent();
              this.flag++;
              this.effectFlag++;
            }
          }
        }
      }
    }
  },
  effect: function (context) {
    for (ix = -1; ix < 2; ix++) {
      for (iy = -1; iy < 2; iy++) {
        if (this.effectFlag !== 0) {
          context.fillStyle = 'white';
          context.font = "bold 18px Arial";
          context.fillText("いてっ！", this.locX + ix * this.width + this.radius, this.locY + iy * this.height + this.radius);
        }
      }
    }
    this.effectFlag = 0;
  }
};
window.onload = function () {
  let url = location.href;
  let index = url.replace(/screen/g, "");
  console.log(index);
  let canvas = document.getElementById('game');
  let canvas2 = document.getElementById('chart');
  const idMatches = location.search.match(/id=(.*?)(&|$)/);
  const field = new Field(canvas, canvas2, idMatches);
  const receive = d => field.addCircle(new Circle(d, field));
  if (idMatches) {
    const id = decodeURIComponent(idMatches[1]);
    socket.on('receive' + id, receive);
  } else {
    socket.on('receiveMessage', receive);
  }
  let outputArea = document.getElementById('output-area');
  field.resize(outputArea, idMatches);
  field.context.fillStyle = "white";
  field.context.fillRect(field.size.width, 0, field.canvas.width * 0.3, field.size.height);
};