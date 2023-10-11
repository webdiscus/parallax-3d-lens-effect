import Rain from './rain';
import parallax from './parallax';

// the 'rain effect' in the background
const rain = new Rain({});
rain.animate();

// enable parallax
parallax({ smoothMove: 1 });
