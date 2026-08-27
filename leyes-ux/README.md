# Tablero de Leyes UX

Documento de evaluación navegable de **Central de Pasajes** (centraldepasajes.com.ar) contra 14 leyes y principios de UX, agrupados en 5 categorías. Sitio estático, sin frameworks ni build step.

Vive en la subcarpeta `leyes-ux/` del repo compartido [`tableros-ux`](https://github.com/mcristobal-eng/tableros-ux), junto a otros tableros del equipo.

## Estructura

```
leyes-ux/
  index.html         # página principal
  css/styles.css      # estilos
  js/main.js          # renderizado de nav y cards a partir de data/leyes.js
  data/leyes.js       # las 14 leyes, agrupadas en 5 categorías (contenido a completar)
```

## Cómo completar el contenido

Editá `data/leyes.js`. Cada ley tiene:

- `estado`: `"cumple"` | `"rompe"` | `"pendiente"`
- `capturaUrl`: ruta o URL de la captura de pantalla (dejar `""` si todavía no hay)
- `explicacion`: análisis del hallazgo sobre el producto (dejar `""` si todavía no hay)

Los cambios se reflejan directo al recargar `index.html`, no hace falta build.

## Previsualizar en local

```bash
cd leyes-ux
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Desplegar en Vercel

Como el sitio vive en una subcarpeta del repo compartido, al crear el proyecto en Vercel hay que apuntar el **Root Directory** a `leyes-ux/`. No hace falta configurar build command ni output directory: Vercel lo reconoce como sitio estático (raíz del proyecto = `leyes-ux/index.html`).
