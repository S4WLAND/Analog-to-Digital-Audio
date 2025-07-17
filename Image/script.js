let currentWidth = 320;
let currentHeight = 240;
let colorDepthBits = 24;
let currentFPS = 30;
let frameData = [];
let compressionRatio = 20;

function generateRandomImage() {
    const canvas = document.getElementById('analogImageCanvas');
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, `hsl(${Math.random() * 360}, 70%, 60%)`);
    gradient.addColorStop(0.5, `hsl(${Math.random() * 360}, 70%, 50%)`);
    gradient.addColorStop(1, `hsl(${Math.random() * 360}, 70%, 40%)`);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < 5; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = 20 + Math.random() * 40;
        
        const radialGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        radialGradient.addColorStop(0, `hsla(${Math.random() * 360}, 80%, 70%, 0.8)`);
        radialGradient.addColorStop(1, `hsla(${Math.random() * 360}, 80%, 30%, 0.2)`);
        
        ctx.fillStyle = radialGradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function pixelizeImage() {
    const sourceCanvas = document.getElementById('analogImageCanvas');
    const sourceCtx = sourceCanvas.getContext('2d');
    const targetCanvas = document.getElementById('pixelCanvas');
    const targetCtx = targetCanvas.getContext('2d');
    
    const pixelWidth = targetCanvas.width / currentWidth;
    const pixelHeight = targetCanvas.height / currentHeight;
    
    targetCtx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
    frameData = [];
    
    for (let y = 0; y < currentHeight; y++) {
        const row = [];
        for (let x = 0; x < currentWidth; x++) {
            const sourceX = (x + 0.5) * (sourceCanvas.width / currentWidth);
            const sourceY = (y + 0.5) * (sourceCanvas.height / currentHeight);
            
            const imageData = sourceCtx.getImageData(sourceX, sourceY, 1, 1);
            const pixel = imageData.data;
            row.push({ r: pixel[0], g: pixel[1], b: pixel[2] });
            
            targetCtx.fillStyle = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
            targetCtx.fillRect(x * pixelWidth, y * pixelHeight, pixelWidth, pixelHeight);
        }
        frameData.push(row);
    }
    
    targetCtx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    targetCtx.lineWidth = 0.5;
    for (let x = 0; x <= currentWidth; x++) {
        targetCtx.beginPath();
        targetCtx.moveTo(x * pixelWidth, 0);
        targetCtx.lineTo(x * pixelWidth, targetCanvas.height);
        targetCtx.stroke();
    }
    for (let y = 0; y <= currentHeight; y++) {
        targetCtx.beginPath();
        targetCtx.moveTo(0, y * pixelHeight);
        targetCtx.lineTo(targetCanvas.width, y * pixelHeight);
        targetCtx.stroke();
    }
}

function quantizeColors() {
    const canvas = document.getElementById('colorQuantCanvas');
    const ctx = canvas.getContext('2d');
    const pixelWidth = canvas.width / currentWidth;
    const pixelHeight = canvas.height / currentHeight;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const levelsPerChannel = Math.pow(2, colorDepthBits / 3);
    const step = 255 / (levelsPerChannel - 1);
    
    for (let y = 0; y < currentHeight; y++) {
        for (let x = 0; x < currentWidth; x++) {
            const p = frameData[y][x];
            const quantR = Math.round(p.r / step) * step;
            const quantG = Math.round(p.g / step) * step;
            const quantB = Math.round(p.b / step) * step;
            ctx.fillStyle = `rgb(${quantR}, ${quantG}, ${quantB})`;
            ctx.fillRect(x * pixelWidth, y * pixelHeight, pixelWidth, pixelHeight);
        }
    }
    updateColorStrips();
}

function updateColorStrips() {
    const red = document.getElementById('redStrip');
    const green = document.getElementById('greenStrip');
    const blue = document.getElementById('blueStrip');
    const levels = Math.pow(2, colorDepthBits / 3);
    
    let rG = 'linear-gradient(to right, ';
    let gG = 'linear-gradient(to right, ';
    let bG = 'linear-gradient(to right, ';
    
    for (let i = 0; i < levels; i++) {
        const val = Math.round((i / (levels - 1)) * 255);
        const pct = (i / (levels - 1)) * 100;
        rG += `rgb(${val},0,0) ${pct}%, `;
        gG += `rgb(0,${val},0) ${pct}%, `;
        bG += `rgb(0,0,${val}) ${pct}%, `;
    }
    red.style.background   = rG.slice(0,-2) + ')';
    green.style.background = gG.slice(0,-2) + ')';
    blue.style.background  = bG.slice(0,-2) + ')';
}

function generateRawData() {
    const out = document.getElementById('rawData');
    let html = '';
    for (let y = 0; y < Math.min(5, currentHeight); y++) {
        for (let x = 0; x < Math.min(8, currentWidth); x++) {
            const p = frameData[y][x];
            html += `(${x},${y}): R=${p.r.toString().padStart(3)} G=${p.g.toString().padStart(3)} B=${p.b.toString().padStart(3)} | `;
        }
        html += '<br>';
    }
    if (currentWidth*currentHeight > 40) {
        html += `<br>... y ${(currentWidth*currentHeight)-40} píxeles más<br>`;
    }
    
    const bytesPer = colorDepthBits/8;
    const totalBytes = currentWidth*currentHeight*bytesPer;
    const bw = totalBytes * currentFPS;
    
    html += `<br><strong>Datos del frame:</strong><br>`;
    html += `• Píxeles: ${currentWidth}×${currentHeight} = ${currentWidth*currentHeight}<br>`;
    html += `• Bytes por píxel: ${bytesPer}<br>`;
    html += `• Tamaño total: ${(totalBytes/1024).toFixed(1)} KB<br>`;
    html += `• Ancho de banda: ${(bw/1024/1024).toFixed(1)} MB/s<br>`;
    
    out.innerHTML = html;
    document.getElementById('rawSize').textContent = `${(totalBytes/1024).toFixed(1)} KB`;
    document.getElementById('rawBandwidth').textContent = `${(bw/1024/1024).toFixed(1)} MB/s`;
}

function simulateCompression() {
    const totalBytes = currentWidth * currentHeight * (colorDepthBits/8);
    const h264 = totalBytes / (15 + Math.random()*20);
    const h265 = totalBytes / (25 + Math.random()*35);
    const vp   = totalBytes / (40 + Math.random()*40);
    
    document.getElementById('h264Size').textContent = `~${(h264/1024).toFixed(1)} KB/frame`;
    document.getElementById('h265Size').textContent = `~${(h265/1024).toFixed(1)} KB/frame`;
    document.getElementById('vpSize').textContent   = `~${(vp/1024).toFixed(1)} KB/frame`;
    
    const packetDisplay = document.getElementById('packetData');
    const pkSize = h264;
    const pkPerFrame = Math.ceil(pkSize/1400);
    let s = `<strong>Empaquetado RTP para videollamada:</strong><br>`;
    s += `• Codec: H.264<br>• Frame rate: ${currentFPS} FPS<br>`;
    s += `• Tamaño promedio frame: ${(pkSize/1024).toFixed(1)} KB<br>`;
    s += `• Paquetes p/frame: ${pkPerFrame}<br>`;
    s += `• Paquetes p/segundo: ${pkPerFrame*currentFPS}<br><br>`;
    for (let i=1; i<=3; i++){
        const ts = Math.floor(90000/currentFPS * i);
        const type = i===1?'I-Frame':(i%4===0?'P-Frame':'B-Frame');
        s += `Frame ${i} (${type}):<br>`;
        for (let p=1; p<=pkPerFrame; p++){
            const seq = (i-1)*pkPerFrame + p;
            const pay = Math.min(1400, pkSize - (p-1)*1400);
            s += `  Paquete #${seq}: [RTP Header][${pay.toFixed(0)}B payload]<br>`;
        }
        s += `  Timestamp: ${ts}<br><br>`;
    }
    packetDisplay.innerHTML = s;
}

function changeResolution() {
    const res = [
        {w:160,h:120},{w:320,h:240},{w:640,h:480},
        {w:1280,h:720},{w:1920,h:1080}
    ];
    const idx = res.findIndex(r=>r.w===currentWidth && r.h===currentHeight);
    const next = res[(idx+1)%res.length];
    currentWidth = next.w; currentHeight = next.h;
    document.getElementById('currentResolution').textContent = `${currentWidth}x${currentHeight}`;
    document.getElementById('totalPixels').textContent = (currentWidth*currentHeight).toLocaleString();
    updateAll();
}

function changeColorDepth() {
    const depths = [8,16,24,32];
    const idx = depths.indexOf(colorDepthBits);
    colorDepthBits = depths[(idx+1)%depths.length];
    document.getElementById('colorDepth').textContent = `${colorDepthBits} bits`;
    updateAll();
}

function changeFPS() {
    const opts = [15,24,30,60];
    const idx = opts.indexOf(currentFPS);
    currentFPS = opts[(idx+1)%opts.length];
    updateFPSMeter();
    updateAll();
}

function updateFPSMeter() {
    const latency = 20 + Math.random()*50;
    const bitrate = (currentWidth*currentHeight*colorDepthBits*currentFPS)/(1024*compressionRatio);
    document.getElementById('fpsMeter').textContent =
      `FPS: ${currentFPS} | Latencia: ${latency.toFixed(0)}ms | Bitrate: ${bitrate.toFixed(0)} kbps`;
}

function generateNewFrame(){ updateAll(); }

function updateAll(){
    generateRandomImage();
    pixelizeImage();
    quantizeColors();
    generateRawData();
    updateFPSMeter();
}

// Inicialización
updateAll();
simulateCompression();
