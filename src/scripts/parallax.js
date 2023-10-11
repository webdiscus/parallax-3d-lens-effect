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

  document.addEventListener('mousemove', (event) => {
    // calculate transformation values
    const rotateX = (event.clientY - window.innerHeight / 2) * smoothMove;
    const rotateY = ((event.clientX - window.innerWidth / 2) * -smoothMove) / 2;

    // set CSS variables
    root.style.setProperty('--rotate-x', `${rotateX}deg`);
    root.style.setProperty('--rotate-y', `${rotateY}deg`);
  });
};

module.exports = parallax;
