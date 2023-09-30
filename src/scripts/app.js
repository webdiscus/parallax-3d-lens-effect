import Rain from './rain';

const rain = new Rain();
rain.animate();

document.addEventListener('mousemove', (e) => {
  const rotateX = (e.clientY - window.innerHeight / 2) * 0.01;
  const rotateY = (e.clientX - window.innerWidth / 2) * -0.005;
  Object.assign(document.documentElement, {
    style: `--rotate-x: ${rotateX}deg;--rotate-y: ${rotateY}deg;`,
  });
});
