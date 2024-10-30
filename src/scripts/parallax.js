/**
 * Enable parallax effect.
 *
 * @param {Number} smoothMove The smoothness of parallax movement.
 *  The higher the value the movement becomes sharper.
 *  The lower the value the movement becomes smoother.
 */
const parallax = function ({ smoothMove = 1 }) {
  const root = document.documentElement;
  smoothMove /= 100;
  const touchSmoothMove = smoothMove * 3;

  const setCSSProperties = ({ x, y, smoothMove }) => {
    // calculate transformation values
    const rotateX = (y - window.innerHeight / 2) * smoothMove;
    const rotateY = ((x - window.innerWidth / 2) * -smoothMove) / 2;

    // set CSS variables
    root.style.setProperty('--rotate-x', `${rotateX}deg`);
    root.style.setProperty('--rotate-y', `${rotateY}deg`);
  };

  // desktop
  document.addEventListener('mousemove', (event) => {
    setCSSProperties({
      x: event.clientX,
      y: event.clientY,
      smoothMove,
    });
  });

  // mobile
  document.addEventListener('touchmove', (event) => {
    setCSSProperties({
      x: event.pageX,
      y: event.pageY,
      smoothMove: touchSmoothMove,
    });
  });
};

module.exports = parallax;
