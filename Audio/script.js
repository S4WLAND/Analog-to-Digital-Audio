let frequency = 440; // Hz (nota La)
let sampleRate = 8000;
let bitDepth = 16;
let currentSamples = [];

function drawAnalogWave() {
  const canvas = document.getElementById('analogCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#007bff';
  ctx.lineWidth = 2;
  ctx.beginPath();

  const amplitude = 80;
  const centerY = canvas.height / 2;

  for (let x = 0; x < canvas.width; x++) {
    const t = x / canvas.width * 4; // 4 períodos
    const y = centerY + amplitude * Math.sin(2 * Math.PI * frequency * t / 1000);
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function drawSamplingWave() {
  const canvas = document.getElementById('samplingCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Señal original tenue
  ctx.strokeStyle = '#cccccc';
  ctx.lineWidth = 1;
  ctx.beginPath();

  const amplitude = 80;
  const centerY = canvas.height / 2;
  for (let x = 0; x < canvas.width; x++) {
    const t = x / canvas.width * 4;
    const y = centerY + amplitude * Math.sin(2 * Math.PI * frequency * t / 1000);
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Puntos de muestreo
  ctx.fillStyle = '#ff0000';
  const samples = 40;
  currentSamples = [];
  for (let i = 0; i < samples; i++) {
    const x = (i / samples) * canvas.width;
    const value = amplitude * Math.sin(2 * Math.PI * frequency * (i / samples) * 4 / 1000);
    const y = centerY + value;
    currentSamples.push(value);

    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fill();

    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function drawQuantization() {
  const canvas = document.getElementById('quantizationCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const amplitude = 80;
  const centerY = canvas.height / 2;
  const quantLevels = Math.pow(2, bitDepth);
  const step = (2 * amplitude) / quantLevels;

  // Niveles de cuantización
  ctx.strokeStyle = '#eeeeee';
  ctx.lineWidth = 1;
  for (let i = 0; i < quantLevels; i += quantLevels / 16) {
    const y = centerY - amplitude + i * step;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Dibujar muestras cuantizadas
  ctx.fillStyle = '#00aa00';
  ctx.strokeStyle = '#00aa00';
  for (let i = 0; i < currentSamples.length; i++) {
    const x = (i / currentSamples.length) * canvas.width;
    const originalY = centerY + currentSamples[i];
    const quantizedValue = Math.round(currentSamples[i] / step) * step;
    const quantizedY = centerY + quantizedValue;

    ctx.beginPath();
    ctx.arc(x, quantizedY, 4, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x, originalY);
    ctx.lineTo(x, quantizedY);
    ctx.stroke();
  }
}

function generateDigitalData() {
  const dataDisplay = document.getElementById('digitalData');
  let output = '';

  for (let i = 0; i < Math.min(currentSamples.length, 20); i++) {
    const maxValue = Math.pow(2, bitDepth - 1) - 1;
    const digitalValue = Math.round((currentSamples[i] / 80) * maxValue);
    output += `Muestra ${i + 1}: ${digitalValue.toString().padStart(6)} (${digitalValue.toString(16).padStart(4, '0').toUpperCase()}h)<br>`;
  }
  if (currentSamples.length > 20) {
    output += `... y ${currentSamples.length - 20} muestras más<br>`;
  }
  dataDisplay.innerHTML = output;
}

function generateNewWave() {
  frequency = 220 + Math.random() * 880;
  drawAll();
}

function changeSampleRate() {
  const rates = [8000, 16000, 22050, 44100];
  sampleRate = rates[(rates.indexOf(sampleRate) + 1) % rates.length];
  document.getElementById('sampleRate').textContent = sampleRate + ' Hz';
  document.getElementById('pointsPerSecond').textContent = sampleRate;
  drawAll();
}

function changeBitDepth() {
  const depths = [8, 16, 24];
  bitDepth = depths[(depths.indexOf(bitDepth) + 1) % depths.length];
  document.getElementById('bitDepth').textContent = bitDepth + ' bits';
  drawAll();
}

function simulatePacketization() {
  const packetDisplay = document.getElementById('packetData');
  const samplesPerPacket = Math.floor(sampleRate * 0.02);
  const packetsPerSecond = 50;

  let output = `<strong>Configuración de empaquetado:</strong><br>`;
  output += `• Duración del paquete: 20ms<br>`;
  output += `• Muestras por paquete: ${samplesPerPacket}<br>`;
  output += `• Paquetes por segundo: ${packetsPerSecond}<br><br>`;
  output += `<strong>Ejemplo de paquetes:</strong><br>`;

  for (let i = 1; i <= 5; i++) {
    output += `Paquete #${i}:<br>`;
    output += `  Header: [Seq:${i}, Time:${i * 20}ms, Dest:192.168.1.100]<br>`;
    output += `  Payload: [${samplesPerPacket} muestras de audio]<br>`;
    output += `  Tamaño: ~${samplesPerPacket * (bitDepth / 8) + 12} bytes<br><br>`;
  }

  packetDisplay.innerHTML = output;
}

function drawAll() {
  drawAnalogWave();
  drawSamplingWave();
  drawQuantization();
  generateDigitalData();
}

// Inicializar
drawAll();
