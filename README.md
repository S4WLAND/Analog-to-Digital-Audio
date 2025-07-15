# Demonstration: Analog to Digital Audio

**Autor:** StifhBL  
**Fecha:** 2025-07-15

---

## Descripción
Proyecto de demostración interactiva que ilustra el proceso de conversión de una señal de audio analógica a digital, incluyendo:
1. Señal analógica original  
2. Muestreo (sampling)  
3. Cuantización  
4. Generación de datos digitales  
5. Empaquetado para VoIP

---

## Estructura del proyecto

```
/
├── index.html       # Marcado HTML principal
├── styles.css       # Estilos y diseño
└── script.js        # Lógica de dibujo y simulación
```

---

## Cómo ejecutar

1. **Clona o descarga** este repositorio.  
2. Abre `index.html` en tu navegador favorito.  
3. ¡Listo! Podrás interactuar con los botones para generar nuevas ondas, cambiar parámetros y simular el empaquetado de audio digital.

---

## Tecnologías
- **HTML5**: Estructura semántica  
- **CSS3**: Estilos responsivos y BEM ligero  
- **JavaScript (ES6+)**: Canvas API para gráficos y lógica de simulación

---

## Personalización
- **Frecuencia base**: modifica `frequency` en `script.js`  
- **Frecuencia de muestreo**: cambia los valores dentro de la función `changeSampleRate()`  
- **Resolución (bit depth)**: ajusta el arreglo `depths` en `changeBitDepth()`

---

## Despliegue
Este proyecto es estático, por lo que puedes:
- Hospedarlo en GitHub Pages  
- Subirlo a Netlify o Vercel  
- Servirlo desde cualquier CDN o servidor estático  

---

> ¡Explora, experimenta y aprende! 🎶
