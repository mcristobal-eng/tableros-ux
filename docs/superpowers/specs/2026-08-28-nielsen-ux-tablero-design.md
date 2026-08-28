# Tablero de Heurísticas de Nielsen — Central de Pasajes

## Contexto

El repo `tableros-ux` ya contiene `leyes-ux/`, un tablero estático que evalúa Central de Pasajes
(centraldepasajes.com.ar) contra 14 leyes de UX. Este es el segundo tablero del repo: evalúa la
misma app contra las **10 heurísticas de usabilidad de Nielsen**, usando la escala de severidad
real de Nielsen (0-4) en vez del esquema cumple/no cumple/parcial planteado inicialmente.

Ambos tableros son herramientas para que el equipo complete su propia evaluación manual —
arrancan con el contenido de referencia (nombre, definición) pre-cargado y los campos de
evaluación en blanco, siguiendo el mismo patrón que `leyes-ux/data/leyes.js` (estado inicial
`"pendiente"`, sin capturas ni explicación).

Las 3 capturas de pantalla compartidas durante el diseño son solo de referencia visual de la app
(pantalla de búsqueda de pasajes, pantalla de ayuda/FAQ con CTA de WhatsApp, barra de navegación
inferior) — no se usan como contenido pre-cargado en el tablero.

## Alcance

Página estática de un solo archivo (`index.html` con HTML + CSS + JS inline, sin frameworks ni
build step), sin backend ni persistencia — el estado vive en memoria de la página y se pierde al
recargar. Carpeta hermana de `leyes-ux/` en el mismo repo, con su propio Root Directory al
deployar en Vercel.

## Estructura de archivos

```
nielsen-ux/
  index.html      # HTML + CSS + JS en un solo archivo
  README.md       # qué es, cómo completarlo, cómo deployar (mismo rol que el de leyes-ux)
```

## Las 10 heurísticas (fijas, pre-cargadas con nombre + definición corta)

1. Visibilidad del estado del sistema
2. Correspondencia entre el sistema y el mundo real
3. Control y libertad del usuario
4. Consistencia y estándares
5. Prevención de errores
6. Reconocer antes que recordar
7. Flexibilidad y eficiencia de uso
8. Diseño estético y minimalista
9. Ayudar a los usuarios a reconocer, diagnosticar y solucionar errores
10. Ayuda y documentación

## Modelo de datos por tarjeta

- **id**: slug de la heurística (ej. `"visibilidad-estado"`).
- **nombre**: nombre de la heurística — editable in situ (contenteditable), pre-cargado.
- **definicion**: definición corta — editable in situ, pre-cargada.
- **severidad**: `null` (Sin evaluar) | `0` | `1` | `2` | `3` | `4`.
  - Selector de pastillas clickeables (no dropdown), una por cada valor 0-4 más el estado inicial
    "Sin evaluar".
  - Colores: 0 verde, 1 amarillo claro, 2 amarillo/naranja, 3 naranja, 4 rojo, sin evaluar = gris.
  - Etiquetas: 0 "No es un problema", 1 "Cosmético", 2 "Menor", 3 "Mayor", 4 "Catástrofe de
    usabilidad".
- **capturaDataUrl**: `""` inicialmente. Se completa subiendo un archivo (`<input type="file">`)
  o pegando una imagen desde el portapapeles (evento `paste` sobre la tarjeta) — ambos casos
  convierten la imagen a data URL y la muestran como preview dentro de la tarjeta. Sin
  persistencia: al recargar la página se pierde.
- **explicacion**: textarea libre, vacío inicialmente. Qué pasa, por qué rompe o cumple la
  heurística, impacto en la persona usuaria.

Todo el estado vive en un array/objeto en memoria de `index.html`; no hay `localStorage` ni
backend.

## Layout y diseño visual

- Header simple: título del tablero, breve intro, y un resumen en vivo de conteo por severidad
  (ej. "3 catástrofes · 2 mayores · ...", recalculado con JS cada vez que cambia una severidad).
- Grid de 10 tarjetas, responsive: 3 columnas en desktop, 2 en tablet, 1 columna en mobile.
- Tipografía: fuente sans-serif del sistema, buena jerarquía (nombre de heurística destacado,
  definición en texto secundario).
- Sin dependencias externas (sin CDN, sin frameworks) — coherente con el pedido de "sin
  frameworks".

## Fuera de alcance

- Persistencia de datos (`localStorage`, backend, exportar/importar) — explícitamente no pedida.
- Contenido real de evaluación (severidad/captura/explicación) — el equipo lo completa después,
  igual que en `leyes-ux`.
- Autenticación, multi-usuario, o sincronización entre dispositivos.
