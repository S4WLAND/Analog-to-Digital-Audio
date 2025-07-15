# Demonstration: Analog to Digital Audio

> Interactive sandbox that walks through the classic A/D pipeline—sampling, quantization, and VoIP‑style packetisation—rendered in vanilla JS + Canvas.

---

## 🏗  Project layout

```
.
├── index.html   # markup
├── styles.css   # styles
└── script.js    # logic
```

Everything is static—no build step.

---

## 🚀 Quick start

```bash
git clone https://github.com/<your‑fork>/analog-digital-audio.git
cd analog-digital-audio
open index.html        # or serve with any static server
```

Or just open the live demo.

---

## ⚙️ Tweak guide

| Setting              | Location / variable               | Default | Notes                                   |
| -------------------- | --------------------------------- | ------- | --------------------------------------- |
| Base frequency       | `script.js` → `frequency`         | 440 Hz  | Any audible frequency works             |
| Sample‑rate presets  | `changeSampleRate()` array        | 8–44 k  | Add / remove as needed                  |
| Bit‑depth presets    | `changeBitDepth()` array          | 8/16/24 | Higher depth ⇒ finer quantisation       |
| Styles / theme       | `styles.css`                      | —       | Pure CSS—tweak colours, spacing, fonts  |

---

## 🧩 How it works (short version)

1. **Analog waveform** – sine rendered via Canvas.  
2. **Sampling** – fixed points per frame; stored in `currentSamples`.  
3. **Quantization** – rounds to nearest level based on `bitDepth`.  
4. **Digital dump** – first 20 quantised samples in dec/hex.  
5. **Packetisation** – naive 20 ms chunks mimicking RTP audio packets.

No external libs, no transpilers—suitable for slides, labs, or quick demos.

---

## 👐 Contributing

PRs welcome for:

* Performance tweaks in sampling / quantisation loops  
* Alternative visualisations (PCM bars, FFT overlay)  
* Language translations for the UI

---

## 📄 License

MIT

---

**Author**   : StifhBL  
**Live demo**: <https://audio-analog-digital.netlify.app/>
