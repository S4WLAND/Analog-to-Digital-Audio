# Demonstration: Analog-to-Digital Audio & Image

> Interactive sandbox illustrating the classic A/D pipeline—sampling, quantization, and VoIP-style packetization—in vanilla JS and Canvas.

---

## 🏗 Project structure

```
.
├── index.html       # Markup
├── style.css        # Styles
├── script.js        # Logic
├── images/          # Image assets (diagrams, screenshots, etc.)
│   ├── waveform.png
│   └── pipeline.png
└── README.md        # This file
```

---

## 🚀 Quick start

```bash
# Clone the repository and launch
git clone https://github.com/S4WLAND/Analog-to-Digital-Audio-Image.git
cd Analog-to-Digital-Audio-Image
open index.html      # or use: npx serve . (or your preferred static server)
```

---

## 🎨 Live demos

* **Audio demo**: [https://audio-analog-digital.netlify.app/](https://audio-analog-digital.netlify.app/)
* **Image demo**: [https://image-analog-digital.netlify.app/](https://image-analog-digital.netlify.app/)

---

## 📷 Screenshots

Place your screenshots in the `images/` folder and reference them in Markdown. For example:

```markdown
![Screenshot description](images/example-screenshot.png)
```

Examples included:

* `images/screenshot1.png` — Main interface view.
* `images/screenshot2.png` — Waveform visualization example.

---

## ⚙️ Tweak guide

| Setting             | Location / variable        | Default       | Notes                             |
| ------------------- | -------------------------- | ------------- | --------------------------------- |
| Base frequency      | `script.js` → `frequency`  | 440 Hz        | Any audible test frequency        |
| Sample-rate presets | `changeSampleRate()` array | 8000–44100 Hz | Add or remove presets as needed   |
| Bit-depth presets   | `changeBitDepth()` array   | 8 / 16 / 24   | Higher depth → finer quantization |
| Styles / theme      | `style.css`                | —             | Adjust colors, spacing, and fonts |

---

## 🧩 How it works (short version)

1. **Analog waveform** – Sine wave rendered via Canvas.
2. **Sampling** – Fixed points per frame, stored in `currentSamples`.
3. **Quantization** – Rounds to nearest level based on `bitDepth`.
4. **Digital dump** – First 20 quantized samples in decimal/hex.
5. **Packetization** – 20 ms chunks mimicking RTP audio packets.

*No external libraries or transpilers—ideal for demos, labs, and presentations.*

---

## 👐 Contributing

PRs welcome for:

* Optimizing sampling and quantization loops
* Alternative visualizations (PCM bars, FFT overlays)
* UI translations
* Updating or adding assets in `images/`

---

## 📄 License

MIT

**Author**: StifhBL
**Live demos**: [Audio](https://audio-analog-digital.netlify.app/) • [Image](https://image-analog-digital.netlify.app/)
