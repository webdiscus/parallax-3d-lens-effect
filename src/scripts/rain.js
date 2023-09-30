const random = (min, max) => Math.floor(Math.random() * max) + min;

function RainDrop(context, { x, y, size, thickness, velocity, opacity }) {
  this.x = x;
  this.y = y;
  this.endY = size;
  this.velocity = velocity;
  this.opacity = opacity;

  this.draw = function () {
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x, this.y - this.endY);
    context.lineWidth = thickness;
    context.strokeStyle = 'rgba(255, 255, 255, ' + this.opacity + ')';
    context.stroke();
  };

  this.update = function () {
    const canvasBottom = window.innerHeight + 100;
    this.y = this.y >= canvasBottom ? this.endY - 100 : this.y + this.velocity;
    this.draw();
  };
}

class Rain {
  drops = [];

  constructor({ size = [2, 10], thickness = [1, 2], speed = [2, 20], amount = 140 } = {}) {
    const [sizeMin, sizeMax] = size;
    const [speedMin, speedMax] = speed;
    const [thicknessMin, thicknessMax] = thickness;

    this.#initCanvas();

    for (let i = 0; i < amount; i++) {
      this.drops.push(
        new RainDrop(this.context, {
          x: random(1, window.innerWidth),
          y: Math.random() * -500,
          size: random(sizeMin, sizeMax),
          thickness: random(thicknessMin, thicknessMax - 1) + random(1, 9) / 10,
          velocity: random(speedMin, speedMax),
          opacity: Math.random() * 0.55,
        })
      );
    }
  }

  #initCanvas() {
    const canvas = document.querySelector('canvas.rain');
    this.context = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  animate() {
    const animateRain = () => {
      requestAnimationFrame(animateRain);
      this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < this.drops.length; i++) {
        this.drops[i].update();
      }
    };

    animateRain();
  }
}

export default Rain;
