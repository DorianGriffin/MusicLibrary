const audio = document.getElementById('audio');
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');

// Create an audio context and connect the audio element to it
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const source = audioContext.createMediaElementSource(audio);
source.connect(audioContext.destination);

// Create an analyser node
const analyser = audioContext.createAnalyser();
source.connect(analyser);

// Set the FFT size (affects the number of frequency bins)
analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Set up the canvas
const WIDTH = canvas.width;
const HEIGHT = canvas.height
function draw() {
  analyser.getByteFrequencyData(dataArray);

  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  const barWidth = (WIDTH / bufferLength) * 2.5;
  let barHeight;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i] / 2;

    ctx.fillStyle = `rgb(50, ${barHeight + 100}, 50)`;
    ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

    x += barWidth + 1;
  }
  requestAnimationFrame(draw);
}

audio.addEventListener('play', () => {
 audioContext.resume().then(() => {
   audio.play();
   draw();
 });
});
