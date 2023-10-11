const random = (min, max) => Math.floor(Math.random() * max) + min;

/**
 * @typedef {[min: Number, max: Number]} Range
 */

/**
 * The single drop of the 'rain effect'.
 */
class RainDrop {
  /**
   * @param { CanvasRenderingContext2D} context
   * @param {Number} x
   * @param {Number} y
   * @param {Number} size
   * @param {Number} thickness
   * @param {Number} velocity
   * @param {Number} opacity
   */
  constructor(context, { x, y, size, thickness, velocity, opacity }) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.endY = size;
    this.thickness = thickness;
    this.velocity = velocity;
    this.opacity = opacity;
  }

  draw() {
    const { context, x, y, endY, thickness, opacity } = this;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, y - endY);
    context.lineWidth = thickness;
    context.strokeStyle = 'rgba(255, 255, 255, ' + opacity + ')';
    context.stroke();
  }

  update() {
    const canvasBottom = window.innerHeight + 100;
    this.y = this.y >= canvasBottom ? this.endY - 100 : this.y + this.velocity;
    this.draw();
  }
}

/**
 * The 'rain effect' in the background.
 */
class Rain {
  drops = [];

  /**
   * @param {Range} size The range of drop size.
   * @param {Range} thickness The range of drop thickness.
   * @param {Range} speed The range of drop speed.
   * @param {Number} amount Amount of drops.
   */
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
