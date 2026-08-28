# Tablero de Heurísticas de Nielsen

Tablero de evaluación heurística de **Central de Pasajes** (centraldepasajes.com.ar) contra las
10 heurísticas de usabilidad de Nielsen, con severidad 0-4. Sitio estático de un solo archivo,
sin frameworks ni build step.

Vive en la subcarpeta `nielsen-ux/` del repo compartido
[`tableros-ux`](https://github.com/mcristobal-eng/tableros-ux), junto a otros tableros del equipo
(por ejemplo `leyes-ux/`).

## Estructura

```
nielsen-ux/
  index.html   # HTML + CSS + JS en un solo archivo
```

## Cómo completar el contenido

Abrí `index.html` en el navegador y completá cada tarjeta directo en la página:

- **Nombre / definición**: son editables (click y escribir) por si querés ajustar la redacción.
- **Severidad**: elegí una pastilla del 0 al 4 (escala real de Nielsen: 0 = no es un problema,
  4 = catástrofe de usabilidad).
- **Captura**: click en el recuadro para subir un archivo, o pegá una imagen del portapapeles
  (Ctrl+V) con la tarjeta enfocada.
- **Explicación**: qué pasa, por qué rompe o cumple la heurística, y qué impacto tiene en la
  persona usuaria.

Todo el estado vive en memoria de la página: **se pierde al recargar**. No hay backend ni
`localStorage` — si querés conservar una evaluación, sacá captura de pantalla del tablero
completo o copiá el texto a otro lado antes de cerrar la pestaña.

## Previsualizar en local

```bash
cd nielsen-ux
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Desplegar en Vercel

Como el sitio vive en una subcarpeta del repo compartido, al crear el proyecto en Vercel hay que
apuntar el **Root Directory** a `nielsen-ux/`. No hace falta configurar build command ni output
directory: Vercel lo reconoce como sitio estático (raíz del proyecto = `nielsen-ux/index.html`).
