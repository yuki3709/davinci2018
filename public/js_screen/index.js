Field = function (e) {
  this.canvas = e;
  if (!this.canvas.getContext) throw new Error("contextが見つかりません");
  this.context = this.canvas.getContext('2d');
  this.context.globalCompositeOperation = "source-over";
  setInterval(() => this.run(), 33);
  setInterval(() => this.getColor(this.context), 1000);
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
    black: 0
  },
  score: {
    red: 0,
    fuchsia: 0,
    lime: 0,
    aqua: 0,
    black: 0
  },
  num: {
    red: 0,
    fuchsia: 0,
    lime: 0,
    aqua: 0
  },
  imageData: [],
  circles: [],
  constructor: Field,
  checkNumber: function (circle) {
    this.num.red = 0;
    this.num.fuchsia = 0;
    this.num.lime = 0;
    this.num.aqua = 0;
    for (i = 0; i < this.circles.length; i++) {
      if (this.circles[i].color === "red") {
        this.num.red++;
      }
      else if (this.circles[i].color === "fuchsia") {
        this.num.fuchsia++;
      }
      else if (this.circles[i].color === "lime") {
        this.num.lime++;
      }
      else if (this.circles[i].color === "aqua") {
        this.num.aqua++;
      }
    }
    for (i = 0; i < this.circles.length; i++) {
      if (this.num.red > 4) {
        if (this.circles[i].color === "red") {
          this.circles[i].shadeDraw(this.context);
          this.circles.splice(i, 1);
          break;
        }
      }
      if (this.num.fuchsia > 4) {
        if (this.circles[i].color === "fuchsia") {
          this.circles[i].shadeDraw(this.context);
          this.circles.splice(i, 1);
          break;
        }
      }
      if (this.num.lime > 4) {
        if (this.circles[i].color === "lime") {
          this.circles[i].shadeDraw(this.context);
          this.circles.splice(i, 1);
          break;
        }
      }
      if (this.num.aqua > 4) {
        if (this.circles[i].color === "aqua") {
          this.circles[i].shadeDraw(this.context);
          this.circles.splice(i, 1);
          break;
        }
      }
    }
  },
  discriminateCommand: function () {
    this.circles.forEach(circle => circle.discriminateCommand(this.circles));
  },
  resize: function (parent) {
    this.canvas.width = parent.clientWidth;
    this.size.width = Math.floor(this.canvas.width * 0.7);
    this.size.height = this.canvas.height = parent.clientHeight;
  },
  run: function () {
    this.checkNumber();
    this.circles.forEach(circle => circle.shadeDraw(this.context));
    this.discriminateCommand();
    this.circles.forEach(circle => circle.draw(this.context));
    this.circles.forEach(circle => circle.effect(this.context));
    this.fillWhite(this.context);
  },
  getColor: function (context) {
    this.imageData = context.getImageData(0, 0, this.size.width, this.size.height);
    for (y = 0; y < this.size.height; y = y + 5) {
      for (x = 0; x < this.size.width; x = x + 5) {
        let index = (y * this.size.width + x) * 4;
        let red = this.imageData.data[index]; // R
        let green = this.imageData.data[index + 1]; // G
        let blue = this.imageData.data[index + 2]; // B
        if (red === 255 && green === 0 && blue === 0) {
          this.team.red++;
        }
        else if (red === 255 && green === 0 && blue === 255) {
          this.team.fuchsia++;
        }
        else if (red === 0 && green === 255 && blue === 0) {
          this.team.lime++;
        }
        else if (red === 0 && green === 255 && blue === 255) {
          this.team.aqua++;
        }
        else if (red === 0 && green === 0 && blue === 0) {
          this.team.black++;
        }
      }
    }
    this.displayRank(context)
  },
  displayRank: function (context) {
    let sumScore = this.team.red + this.team.fuchsia + this.team.lime + this.team.aqua + this.team.black;
    this.score.red = Math.ceil(this.team.red / sumScore * 100);
    this.score.fuchsia = Math.ceil(this.team.fuchsia / sumScore * 100);
    this.score.lime = Math.ceil(this.team.lime / sumScore * 100);
    this.score.aqua = Math.ceil(this.team.aqua / sumScore * 100);
    let total = this.score.red + this.score.fuchsia + this.score.lime + this.score.aqua;
    this.score.black = 100 - total;
    this.drawChart(context, this.score.red, this.score.fuchsia, this.score.lime, this.score.aqua, this.score.black);
    this.resetScreen(context, this.score.black);
    this.team.red = 0;
    this.team.fuchsia = 0;
    this.team.lime = 0;
    this.team.aqua = 0;
    this.team.black = 0;
    this.score.red = 0;
    this.score.fuchsia = 0;
    this.score.lime = 0;
    this.score.aqua = 0;
    this.score.black = 0;
  },
  drawChart: function (context, red, fuchsia, lime, aqua, black) {
    context.beginPath();
    context.fillStyle = "white";
    context.fillRect(this.size.width, 0, this.canvas.width - this.size.width, this.size.height);
    context.fillStyle = "black";
    context.font = "italic bold 20px sans-serif";
    context.fillText(red, this.size.width + 5, this.size.height / 100 + 75);
    context.fillText(fuchsia, this.size.width + 5, this.size.height / 5 + 75);
    context.fillText(lime, this.size.width + 5, this.size.height / 2.5 + 75);
    context.fillText(aqua, this.size.width + 5, this.size.height / 1.7 + 75);
    context.fillText("リ　　　あ", this.size.width + 55, this.size.height / 1.27 + 150 * 1 / 4);
    context.fillText("セ　　　と", this.size.width + 55, this.size.height / 1.27 + 150 * 2 / 4);
    context.fillText("ッ　　　少", this.size.width + 55, this.size.height / 1.27 + 150 * 3 / 4);
    context.fillText("ト　　　し", this.size.width + 55, this.size.height / 1.27 + 150 * 4 / 4);
    context.fillStyle = "red";
    context.fillRect(this.size.width + 50, this.size.height / 100, red * this.canvas.width * 0.3 / 100, 150);
    context.fillStyle = "fuchsia";
    context.fillRect(this.size.width + 50, this.size.height / 5, fuchsia * this.canvas.width * 0.3 / 100, 150);
    context.fillStyle = "lime";
    context.fillRect(this.size.width + 50, this.size.height / 2.5, lime * this.canvas.width * 0.3 / 100, 150);
    context.fillStyle = "aqua";
    context.fillRect(this.size.width + 50, this.size.height / 1.7, aqua * this.canvas.width * 0.3 / 100, 150);
    context.fillStyle = "black";
    context.fillRect(this.size.width + 50, this.size.height / 1.27, (black - 20) * this.canvas.width * 0.3 / 100, 150);
  },
  resetScreen: function (context, black) {
    if (black <= 20) {
      context.fillStyle = "white";
      context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      context.fillStyle = "black";
      context.fillRect(0, 0, this.size.width, this.canvas.height);
    }
  },
  fillWhite: function (context) {
    context.fillStyle = "white";
    context.fillRect(this.size.width - 50, 0, 50, this.canvas.height);
  }
};
const Circle = function (data, field, n) {
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
  let radius = 10;
  this.radius = (radius => {
    switch (this.id) {
      case "・ω・":
        return 50;
      case "˘ω˘":
        return 30;
      case "><":
        return 20;
      default:
        return radius;
    }
  })(this.radius);
  this.width = field.size.width;
  this.height = field.size.height;
  this.locX = Math.floor(Math.random() * (this.width - 100) + 50);
  this.locY = Math.floor(Math.random() * (this.height - 100) + 50);
  this.speed = 300 / this.radius;
  this.direction = Math.floor(Math.random() * 360);
  this.num = n;
  this.flag = 0;
  this.effectFlag = 0;
  this.checkCircle(field.circles);
};
Circle.prototype = {
  hitCommand: undefined,
  checkCircle: function (circles) {
    let out = true;
    while (out) {
      out = circles.some(circle => (circle.num !== this.num) && ((circle.radius + this.radius) ** 2 > (circle.locX - this.locX) ** 2 + (circle.locY - this.locY) ** 2));
      if (out) {
        this.locX = Math.floor(Math.random() * (this.width - 100) + 50);
        this.locY = Math.floor(Math.random() * (this.height - 100) + 50);
      }
    }
  },
  draw: function (context) {
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = 'white';
    context.arc(this.locX, this.locY, this.radius, 0, Math.PI * 2.0, true);
    context.stroke();
    context.lineWidth = 1;
    context.fillStyle = this.color;
    context.arc(this.locX, this.locY, this.radius, 0, Math.PI * 2.0, true);
    context.fill();
    let textLocX = this.locX - this.radius * 3 / 5 * Math.cos(this.direction * Math.PI / 180);
    let textLocY = this.locY - this.radius * 3 / 5 * Math.sin(this.direction * Math.PI / 180);
    context.fillStyle = 'black';
    context.font = "bold 16px Arial";
    context.fillText(this.id, textLocX - 12 + this.radius * Math.cos(this.direction * Math.PI / 180), textLocY + 6 + this.radius * Math.sin(this.direction * Math.PI / 180));
    context.fillStyle = 'white';
    context.fillText(this.id, textLocX - 13 + this.radius * Math.cos(this.direction * Math.PI / 180), textLocY + 8 + this.radius * Math.sin(this.direction * Math.PI / 180));
  },
  shadeDraw: function (context) {
    context.beginPath();
    context.lineWidth = 3;
    context.strokeStyle = this.color;
    context.arc(this.locX, this.locY, this.radius, 0, Math.PI * 2.0, true);
    context.stroke();
    context.lineWidth = 1;
    context.fillStyle = this.color;
    context.arc(this.locX, this.locY, this.radius, 0, Math.PI * 2.0, true);
    context.fill();
  },
  roll: function (direction) {
    this.direction = this.normalizeDirection(direction + this.direction);
  },
  go: function (distance, circles) {
    const radian = this.direction * Math.PI / 180;
    let flagX = 0;
    let flagY = 0;
    let distanceX = distance * Math.cos(radian);
    let distanceY = distance * Math.sin(radian);
    let futureLocX = this.locX + distanceX;
    let futureLocY = this.locY + distanceY;
    let direction = this.direction;
    this.check(circles, futureLocX, futureLocY);
    if (futureLocX <= - this.radius || futureLocX >= this.width - this.radius - 3 ||
      futureLocY <= - this.radius || futureLocY >= this.height + this.radius) {
      if (futureLocX <= - this.radius && flagX === 0) {
        this.locX = this.width - this.radius - 3;
        flagX++;
      }
      if (futureLocX >= this.width - this.radius - 3 && flagX === 0) {
        this.locX = - this.radius;
        flagX++;
      }
      if (futureLocY <= - this.radius && flagY === 0) {
        this.locY = this.height + this.radius;
        flagY++;
      }
      if (futureLocY >= this.height + this.radius && flagY === 0) {
        this.locY = - this.radius;
        flagY++;
      }
    } else {
      if (this.flag === 0) {
        this.direction = this.normalizeDirection(direction);
        this.locX += distanceX;
        this.locY += distanceY;
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
    for (i = 0; i < circles.length; i++) {
      if (circles[i].num !== this.num) {
        if ((circles[i].radius + this.radius) ** 2
          >= (circles[i].locX - futureLocX) ** 2
          + (circles[i].locY - futureLocY) ** 2) {
          this.hitCommand = this.hitEvent();
          this.flag++;
          this.effectFlag++;
        }
      }
    }
  },
  effect: function (context) {
    if (this.effectFlag !== 0) {
      context.fillStyle = 'white';
      context.font = "bold 18px Arial";
      context.fillText("いてっ！", this.locX, this.locY);
    }
    this.effectFlag = 0;
  }
};
window.onload = function () {
  let n = 0;
  let url = location.href;
  let index = url.replace(/screen/g, "");
  console.log(index);
  let canvas = document.getElementById('game');
  const field = new Field(canvas);
  socket.on('receiveMessage', function (d) {
    field.circles.push(new Circle(d, field, n));
    n++;
  });
  let outputArea = document.getElementById('output-area');
  field.resize(outputArea);
  field.context.fillStyle = "white";
  field.context.fillRect(field.size.width, 0, field.canvas.width * 0.3, field.size.height);
};