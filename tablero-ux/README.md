# Tablero UX — Central de Pasajes

Documento de evaluación navegable de **Central de Pasajes** (centraldepasajes.com.ar), con dos
vistas alternadas por tabs:

- **Leyes UX**: 14 leyes y principios clásicos de UX, agrupados en 5 categorías.
- **Heurísticas de Nielsen**: las 10 heurísticas de usabilidad, con severidad 0-4.

Sitio estático, sin frameworks ni build step. Reemplaza a los tableros separados `leyes-ux/` y
`nielsen-ux/` (ahora unificados acá en un solo proyecto de Vercel).

## Estructura

```
tablero-ux/
  index.html          # página principal (header, tabs, dos vistas)
  css/styles.css       # estilos compartidos por ambas vistas
  js/main.js            # renderiza ambas vistas y maneja el cambio de tab
  data/leyes.js          # las 14 leyes, agrupadas en 5 categorías
  data/heuristicas.js    # las 10 heurísticas de Nielsen
```

## Cómo completar el contenido

Cada tarjeta (de leyes o de heurísticas) se completa editando su archivo de datos — no hay
edición desde el navegador, el contenido tiene que quedar commiteado para que persista.

**`data/leyes.js`** — por cada ley:
- `estado`: `"cumple"` | `"rompe"` | `"pendiente"`
- `capturaUrl`: ruta o URL de la captura de pantalla (dejar `""` si todavía no hay)
- `explicacion`: 1-2 frases respondiendo la pregunta guía de esa ley

**`data/heuristicas.js`** — por cada heurística:
- `severidad`: `null` (sin evaluar) | `0` | `1` | `2` | `3` | `4` (escala real de Nielsen: 0 = no
  es un problema, 4 = catástrofe de usabilidad)
- `capturaUrl`: ruta o URL de la captura de pantalla (dejar `""` si todavía no hay)
- `explicacion`: qué pasa, por qué rompe o cumple la heurística, y qué impacto tiene en la
  persona usuaria

Para las capturas, lo más simple es agregar las imágenes a una carpeta dentro de `tablero-ux/`
(por ejemplo `tablero-ux/capturas/`) y referenciarlas con ruta relativa, ej.
`"capturas/fitts.png"`.

Los cambios se reflejan al recargar `index.html`, no hace falta build. Una vez commiteado y
pusheado, Vercel redeploya solo.

## Previsualizar en local

```bash
cd tablero-ux
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Desplegar en Vercel

El sitio vive en una subcarpeta del repo compartido, así que el proyecto de Vercel tiene que
apuntar el **Root Directory** a `tablero-ux/`. No hace falta configurar build command ni output
directory: es un sitio estático (raíz del proyecto = `tablero-ux/index.html`).
