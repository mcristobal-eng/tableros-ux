# Tablero de Heurísticas de Nielsen — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir `nielsen-ux/index.html`, un tablero estático de un solo archivo (sin frameworks, sin backend) que evalúa Central de Pasajes contra las 10 heurísticas de Nielsen, con severidad 0-4, carga de captura y explicación editables.

**Architecture:** Página HTML única con `<style>` y `<script>` inline. Estado en memoria (array JS), sin `localStorage` ni backend. Render por JS a partir de un array de datos con las 10 heurísticas pre-cargadas (nombre + definición) y campos de evaluación vacíos (`severidad: null`, `capturaDataUrl: ""`, `explicacion: ""`).

**Tech Stack:** HTML5, CSS3 (Grid/Flexbox), JavaScript vanilla (ES6+). Sin dependencias externas.

---

Este proyecto no tiene infraestructura de tests automatizados (igual que `leyes-ux/`, su tablero hermano). La verificación es manual: abrir el archivo en el navegador y comprobar cada interacción, tarea por tarea.

## Task 1: Esqueleto HTML + CSS base

**Files:**
- Create: `nielsen-ux/index.html`

- [ ] **Step 1: Crear el archivo con el esqueleto HTML y los estilos base**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tablero de Heurísticas de Nielsen — Central de Pasajes</title>
  <meta
    name="description"
    content="Evaluación heurística de Central de Pasajes (centraldepasajes.com.ar) contra las 10 heurísticas de usabilidad de Nielsen, con severidad 0-4."
  />
  <style>
    :root {
      --bg: #f5f6f8;
      --card-bg: #ffffff;
      --text: #1c1f26;
      --text-secondary: #5a6170;
      --border: #e2e4e9;
      --accent: #4653d6;

      --sev-pendiente: #9aa0ac;
      --sev-0: #2e9e4f;
      --sev-1: #d8c93a;
      --sev-2: #e6a819;
      --sev-3: #e07a1f;
      --sev-4: #d63b3b;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.5;
    }

    .site-header {
      background: var(--card-bg);
      border-bottom: 1px solid var(--border);
      padding: 2rem 1.5rem;
    }

    .site-header__inner {
      max-width: 1200px;
      margin: 0 auto;
    }

    .site-header__eyebrow {
      display: inline-block;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 0.5rem;
    }

    .site-header h1 {
      margin: 0 0 0.75rem;
      font-size: 1.6rem;
    }

    .site-header p {
      margin: 0 0 1rem;
      color: var(--text-secondary);
      max-width: 70ch;
    }

    .resumen-severidad {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .resumen-severidad__chip {
      font-size: 0.8rem;
      font-weight: 600;
      padding: 0.25rem 0.6rem;
      border-radius: 999px;
      color: #fff;
    }

    main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1.5rem;
    }

    .grid-heuristicas {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.25rem;
    }

    @media (max-width: 1000px) {
      .grid-heuristicas { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 640px) {
      .grid-heuristicas { grid-template-columns: 1fr; }
    }

    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-left: 6px solid var(--sev-pendiente);
      border-radius: 10px;
      padding: 1.1rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      transition: border-left-color 0.15s ease;
    }

    .card__numero {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--text-secondary);
    }

    .card__nombre {
      font-size: 1.05rem;
      font-weight: 700;
      outline: none;
      border-radius: 4px;
      padding: 0.1rem 0.2rem;
      margin: -0.1rem -0.2rem;
    }

    .card__nombre:focus,
    .card__definicion:focus,
    .card__explicacion:focus {
      background: #f0f1fb;
    }

    .card__definicion {
      font-size: 0.85rem;
      color: var(--text-secondary);
      outline: none;
      border-radius: 4px;
      padding: 0.1rem 0.2rem;
      margin: -0.1rem -0.2rem;
    }

    .card__severidad {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
    }

    .pastilla-severidad {
      font-size: 0.72rem;
      font-weight: 600;
      border: 1px solid var(--border);
      background: #fff;
      color: var(--text-secondary);
      padding: 0.3rem 0.55rem;
      border-radius: 999px;
      cursor: pointer;
    }

    .pastilla-severidad[data-activa="true"] {
      color: #fff;
      border-color: transparent;
    }

    .pastilla-severidad[data-sev="pendiente"][data-activa="true"] { background: var(--sev-pendiente); }
    .pastilla-severidad[data-sev="0"][data-activa="true"] { background: var(--sev-0); }
    .pastilla-severidad[data-sev="1"][data-activa="true"] { background: var(--sev-1); color: #43411a; }
    .pastilla-severidad[data-sev="2"][data-activa="true"] { background: var(--sev-2); }
    .pastilla-severidad[data-sev="3"][data-activa="true"] { background: var(--sev-3); }
    .pastilla-severidad[data-sev="4"][data-activa="true"] { background: var(--sev-4); }

    .card__captura {
      border: 2px dashed var(--border);
      border-radius: 8px;
      min-height: 90px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 0.78rem;
      color: var(--text-secondary);
      padding: 0.5rem;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .card__captura img {
      max-width: 100%;
      max-height: 220px;
      display: block;
      border-radius: 6px;
    }

    .card__captura input[type="file"] {
      display: none;
    }

    .card__captura-quitar {
      position: absolute;
      top: 6px;
      right: 6px;
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
      border: none;
      border-radius: 6px;
      font-size: 0.7rem;
      padding: 0.2rem 0.5rem;
      cursor: pointer;
    }

    .card__explicacion {
      width: 100%;
      min-height: 80px;
      resize: vertical;
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 0.5rem;
      font-family: inherit;
      font-size: 0.85rem;
    }

    .site-footer {
      text-align: center;
      color: var(--text-secondary);
      font-size: 0.8rem;
      padding: 2rem 1rem 3rem;
    }
  </style>
</head>
<body>
  <header class="site-header">
    <div class="site-header__inner">
      <span class="site-header__eyebrow">Tablero de Heurísticas de Nielsen</span>
      <h1>Evaluación heurística de Central de Pasajes</h1>
      <p>
        Este tablero evalúa
        <a href="https://centraldepasajes.com.ar" target="_blank" rel="noopener noreferrer">
          Central de Pasajes (centraldepasajes.com.ar)
        </a>
        contra las 10 heurísticas de usabilidad de Nielsen. Cada tarjeta registra la severidad
        del hallazgo (escala 0-4), una captura de pantalla y una explicación del impacto en la
        persona usuaria.
      </p>
      <div class="resumen-severidad" id="resumen-severidad"></div>
    </div>
  </header>

  <main>
    <div class="grid-heuristicas" id="grid-heuristicas"></div>
  </main>

  <footer class="site-footer">
    Tablero de Heurísticas de Nielsen · Evaluación de Central de Pasajes (centraldepasajes.com.ar)
  </footer>
</body>
</html>
```

- [ ] **Step 2: Verificar que carga en el navegador**

Abrir `nielsen-ux/index.html` directo con doble click (o `start nielsen-ux/index.html` en PowerShell).
Esperado: se ve el header con título e intro; el `<main>` está vacío (todavía no hay JS).

- [ ] **Step 3: Commit**

```bash
git add nielsen-ux/index.html
git commit -m "Agregar esqueleto HTML y estilos del tablero de heuristicas de Nielsen"
```

---

## Task 2: Datos de las 10 heurísticas + render de tarjetas

**Files:**
- Modify: `nielsen-ux/index.html` (agregar `<script>` antes de `</body>`)

- [ ] **Step 1: Agregar el array de datos y la función de render**

Insertar antes del cierre `</body>`:

```html
  <script>
    const SEVERIDADES = [
      { valor: null, etiqueta: "Sin evaluar", dataSev: "pendiente" },
      { valor: 0, etiqueta: "0 · No es un problema", dataSev: "0" },
      { valor: 1, etiqueta: "1 · Cosmético", dataSev: "1" },
      { valor: 2, etiqueta: "2 · Menor", dataSev: "2" },
      { valor: 3, etiqueta: "3 · Mayor", dataSev: "3" },
      { valor: 4, etiqueta: "4 · Catástrofe", dataSev: "4" },
    ];

    const HEURISTICAS = [
      {
        id: "visibilidad-estado",
        nombre: "Visibilidad del estado del sistema",
        definicion: "El sistema siempre debe mantener informadas a las personas usuarias sobre lo que está pasando, con feedback apropiado y en tiempo razonable.",
        severidad: null,
        capturaDataUrl: "",
        explicacion: "",
      },
      {
        id: "correspondencia-mundo-real",
        nombre: "Correspondencia entre el sistema y el mundo real",
        definicion: "El sistema debe hablar el lenguaje de las personas usuarias, con palabras y conceptos familiares, siguiendo convenciones del mundo real.",
        severidad: null,
        capturaDataUrl: "",
        explicacion: "",
      },
      {
        id: "control-libertad-usuario",
        nombre: "Control y libertad del usuario",
        definicion: "Las personas usuarias necesitan una salida de emergencia clara para abandonar un estado no deseado, como deshacer y rehacer.",
        severidad: null,
        capturaDataUrl: "",
        explicacion: "",
      },
      {
        id: "consistencia-estandares",
        nombre: "Consistencia y estándares",
        definicion: "Las personas usuarias no deberían tener que preguntarse si distintas palabras, situaciones o acciones significan lo mismo. Hay que seguir las convenciones de la plataforma.",
        severidad: null,
        capturaDataUrl: "",
        explicacion: "",
      },
      {
        id: "prevencion-errores",
        nombre: "Prevención de errores",
        definicion: "Mejor que buenos mensajes de error es un diseño cuidadoso que prevenga que el problema ocurra en primer lugar.",
        severidad: null,
        capturaDataUrl: "",
        explicacion: "",
      },
      {
        id: "reconocer-antes-que-recordar",
        nombre: "Reconocer antes que recordar",
        definicion: "Hay que minimizar la carga de memoria dejando visibles objetos, acciones y opciones. No debería hacer falta recordar información de una parte a otra de la interfaz.",
        severidad: null,
        capturaDataUrl: "",
        explicacion: "",
      },
      {
        id: "flexibilidad-eficiencia",
        nombre: "Flexibilidad y eficiencia de uso",
        definicion: "Los aceleradores, invisibles para quien recién empieza, pueden agilizar la interacción para quien ya usa el sistema seguido, atendiendo a ambos perfiles.",
        severidad: null,
        capturaDataUrl: "",
        explicacion: "",
      },
      {
        id: "diseno-estetico-minimalista",
        nombre: "Diseño estético y minimalista",
        definicion: "Las interfaces no deben tener información irrelevante o que rara vez se necesita, porque compite con la información relevante.",
        severidad: null,
        capturaDataUrl: "",
        explicacion: "",
      },
      {
        id: "reconocer-diagnosticar-errores",
        nombre: "Ayudar a los usuarios a reconocer, diagnosticar y solucionar errores",
        definicion: "Los mensajes de error deben expresarse en lenguaje claro (sin códigos), indicar el problema con precisión y sugerir una solución.",
        severidad: null,
        capturaDataUrl: "",
        explicacion: "",
      },
      {
        id: "ayuda-documentacion",
        nombre: "Ayuda y documentación",
        definicion: "Aunque es mejor si el sistema no necesita documentación, puede ser necesario ofrecerla: fácil de buscar, centrada en la tarea de la persona usuaria y no muy extensa.",
        severidad: null,
        capturaDataUrl: "",
        explicacion: "",
      },
    ];

    const grid = document.getElementById("grid-heuristicas");

    function crearTarjeta(heuristica, indice) {
      const card = document.createElement("article");
      card.className = "card";
      card.dataset.id = heuristica.id;

      card.innerHTML = `
        <span class="card__numero">Heurística ${indice + 1} de 10</span>
        <div class="card__nombre" contenteditable="true">${heuristica.nombre}</div>
        <div class="card__definicion" contenteditable="true">${heuristica.definicion}</div>
        <div class="card__severidad"></div>
        <div class="card__captura">
          <input type="file" accept="image/*" />
          <span class="card__captura-texto">Click para subir o Ctrl+V para pegar una captura</span>
        </div>
        <textarea class="card__explicacion" placeholder="Qué pasa, por qué rompe o cumple la heurística, y qué impacto tiene en la persona usuaria."></textarea>
      `;

      grid.appendChild(card);
      return card;
    }

    HEURISTICAS.forEach(crearTarjeta);
  </script>
```

- [ ] **Step 2: Verificar en el navegador**

Recargar `nielsen-ux/index.html`.
Esperado: aparecen 10 tarjetas en grid, cada una con número, nombre y definición editables (contenteditable), una zona de captura vacía y un textarea de explicación. La severidad todavía no se ve (la pintamos en el Task 3).

- [ ] **Step 3: Commit**

```bash
git add nielsen-ux/index.html
git commit -m "Agregar datos de las 10 heuristicas de Nielsen y render de tarjetas"
```

---

## Task 3: Selector de severidad (pastillas 0-4) + resumen en el header

**Files:**
- Modify: `nielsen-ux/index.html` (dentro del `<script>` del Task 2)

- [ ] **Step 1: Agregar la función que pinta las pastillas de severidad y actualiza el borde de la tarjeta**

Insertar dentro del `<script>`, antes de `HEURISTICAS.forEach(crearTarjeta);`:

```js
    const coloresBorde = {
      pendiente: "var(--sev-pendiente)",
      "0": "var(--sev-0)",
      "1": "var(--sev-1)",
      "2": "var(--sev-2)",
      "3": "var(--sev-3)",
      "4": "var(--sev-4)",
    };

    function renderSeveridad(card, heuristica) {
      const contenedor = card.querySelector(".card__severidad");
      contenedor.innerHTML = "";

      SEVERIDADES.forEach((opcion) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "pastilla-severidad";
        btn.textContent = opcion.etiqueta;
        btn.dataset.sev = opcion.dataSev;

        const activa = heuristica.severidad === opcion.valor;
        btn.dataset.activa = activa ? "true" : "false";

        btn.addEventListener("click", () => {
          heuristica.severidad = opcion.valor;
          renderSeveridad(card, heuristica);
          card.style.borderLeftColor = coloresBorde[opcion.dataSev];
          actualizarResumen();
        });

        contenedor.appendChild(btn);
      });
    }

    function actualizarResumen() {
      const resumen = document.getElementById("resumen-severidad");
      const conteos = { pendiente: 0, "0": 0, "1": 0, "2": 0, "3": 0, "4": 0 };

      HEURISTICAS.forEach((h) => {
        const clave = h.severidad === null ? "pendiente" : String(h.severidad);
        conteos[clave] += 1;
      });

      const etiquetas = {
        pendiente: "Sin evaluar",
        "0": "Sin problema",
        "1": "Cosmético",
        "2": "Menor",
        "3": "Mayor",
        "4": "Catástrofe",
      };

      resumen.innerHTML = Object.keys(conteos)
        .filter((clave) => conteos[clave] > 0)
        .map(
          (clave) =>
            `<span class="resumen-severidad__chip" style="background:${coloresBorde[clave]}">${conteos[clave]} ${etiquetas[clave]}</span>`
        )
        .join("");
    }
```

- [ ] **Step 2: Llamar a `renderSeveridad` y `actualizarResumen` al crear cada tarjeta**

Modificar `crearTarjeta` para que, después de `grid.appendChild(card);`, quede así:

```js
      grid.appendChild(card);
      renderSeveridad(card, heuristica);
      return card;
```

Y después de `HEURISTICAS.forEach(crearTarjeta);`, agregar:

```js
    actualizarResumen();
```

- [ ] **Step 3: Verificar en el navegador**

Recargar. Esperado: cada tarjeta muestra 6 pastillas ("Sin evaluar" activa por defecto, gris). Al hacer click en una pastilla de severidad (ej. "4 · Catástrofe"), esa pastilla se pinta roja y queda activa, el borde izquierdo de la tarjeta cambia a rojo, y en el header aparece un chip "1 Catástrofe". Probar con varias tarjetas y confirmar que el resumen suma bien.

- [ ] **Step 4: Commit**

```bash
git add nielsen-ux/index.html
git commit -m "Agregar selector de severidad 0-4 y resumen en vivo del header"
```

---

## Task 4: Carga de captura (archivo o pegado) y edición de explicación

**Files:**
- Modify: `nielsen-ux/index.html` (dentro del `<script>`)

- [ ] **Step 1: Agregar la función que muestra la imagen en la tarjeta**

Insertar en el `<script>`, junto a las otras funciones:

```js
    function mostrarCaptura(card, heuristica) {
      const zona = card.querySelector(".card__captura");
      if (!heuristica.capturaDataUrl) return;

      zona.innerHTML = `
        <img src="${heuristica.capturaDataUrl}" alt="Captura de ${heuristica.nombre}" />
        <button type="button" class="card__captura-quitar">Quitar</button>
      `;

      zona.querySelector(".card__captura-quitar").addEventListener("click", (evento) => {
        evento.stopPropagation();
        heuristica.capturaDataUrl = "";
        zona.innerHTML = `
          <input type="file" accept="image/*" />
          <span class="card__captura-texto">Click para subir o Ctrl+V para pegar una captura</span>
        `;
        conectarInputArchivo(card, heuristica);
      });
    }

    function cargarImagen(card, heuristica, archivo) {
      const lector = new FileReader();
      lector.onload = () => {
        heuristica.capturaDataUrl = lector.result;
        mostrarCaptura(card, heuristica);
      };
      lector.readAsDataURL(archivo);
    }

    function conectarInputArchivo(card, heuristica) {
      const zona = card.querySelector(".card__captura");
      const input = zona.querySelector('input[type="file"]');

      zona.addEventListener("click", () => input.click());

      input.addEventListener("change", () => {
        if (input.files[0]) cargarImagen(card, heuristica, input.files[0]);
      });

      card.addEventListener("paste", (evento) => {
        const item = Array.from(evento.clipboardData.items).find((i) => i.type.startsWith("image/"));
        if (item) cargarImagen(card, heuristica, item.getAsFile());
      });
    }
```

- [ ] **Step 2: Conectar la explicación (textarea) al estado**

Agregar también:

```js
    function conectarExplicacion(card, heuristica) {
      const textarea = card.querySelector(".card__explicacion");
      textarea.addEventListener("input", () => {
        heuristica.explicacion = textarea.value;
      });
    }
```

- [ ] **Step 3: Enganchar todo en `crearTarjeta`**

`crearTarjeta` queda así (reemplazar la versión del Task 2):

```js
    function crearTarjeta(heuristica, indice) {
      const card = document.createElement("article");
      card.className = "card";
      card.dataset.id = heuristica.id;
      card.setAttribute("tabindex", "0");

      card.innerHTML = `
        <span class="card__numero">Heurística ${indice + 1} de 10</span>
        <div class="card__nombre" contenteditable="true">${heuristica.nombre}</div>
        <div class="card__definicion" contenteditable="true">${heuristica.definicion}</div>
        <div class="card__severidad"></div>
        <div class="card__captura">
          <input type="file" accept="image/*" />
          <span class="card__captura-texto">Click para subir o Ctrl+V para pegar una captura</span>
        </div>
        <textarea class="card__explicacion" placeholder="Qué pasa, por qué rompe o cumple la heurística, y qué impacto tiene en la persona usuaria."></textarea>
      `;

      grid.appendChild(card);
      renderSeveridad(card, heuristica);
      conectarInputArchivo(card, heuristica);
      conectarExplicacion(card, heuristica);
      return card;
    }
```

Nota: `tabindex="0"` en la tarjeta hace que el evento `paste` funcione también cuando la tarjeta tiene foco sin haber clickeado el textarea.

- [ ] **Step 4: Verificar en el navegador**

Recargar. Probar en una tarjeta: click en la zona de captura → seleccionar una imagen del disco → debe mostrarse el preview con botón "Quitar". Probar "Quitar" y confirmar que vuelve al estado vacío. Probar copiar una imagen al portapapeles (ej. con la tecla Impr Pant) y pegar (Ctrl+V) con el foco en la tarjeta → debe mostrarse igual. Escribir texto en el textarea de explicación y confirmar que no tira errores en la consola del navegador (F12).

- [ ] **Step 5: Commit**

```bash
git add nielsen-ux/index.html
git commit -m "Agregar carga de captura por archivo o portapapeles y edicion de explicacion"
```

---

## Task 5: README del tablero

**Files:**
- Create: `nielsen-ux/README.md`

- [ ] **Step 1: Crear el README siguiendo el mismo formato que `leyes-ux/README.md`**

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
git add nielsen-ux/README.md
git commit -m "Agregar README del tablero de heuristicas de Nielsen"
```

---

## Task 6: Verificación manual final y push

**Files:** ninguno (checklist + comandos git)

- [ ] **Step 1: Checklist de verificación manual completa**

Abrir `nielsen-ux/index.html` en el navegador y confirmar:
- Las 10 heurísticas aparecen, en el orden de la spec (Visibilidad del estado del sistema →
  Ayuda y documentación).
- Cambiar severidad en 3-4 tarjetas distintas (incluyendo 0 y 4) y ver que el resumen del header
  suma correctamente y que se puede volver a "Sin evaluar".
- Subir una captura en una tarjeta y pegar una captura en otra; confirmar preview y botón
  "Quitar" en ambos casos.
- Escribir en definición, nombre y explicación de una tarjeta y confirmar que el texto se
  mantiene visualmente (no hace falta que persista al recargar: eso es esperado).
- Reducir el ancho de la ventana (o abrir DevTools en modo responsive) y confirmar que el grid
  pasa a 2 columnas y luego a 1 columna sin overflow horizontal.
- Abrir la consola del navegador (F12) durante todo lo anterior y confirmar que no hay errores en
  rojo.

- [ ] **Step 2: Push a GitHub**

```bash
git push origin leyes-ux
```

Esperado: push exitoso a `origin/leyes-ux` (la branch actual del repo).

---

## Task 7: Deploy en Vercel

**Bloqueado por una decisión del usuario** — ver la nota al final del plan. Este repo no tiene
Vercel CLI instalado ni un proyecto `.vercel/` linkeado, así que el deploy no se puede hacer de
punta a punta sin uno de estos dos caminos:

**Opción A — Vercel Dashboard (sin credenciales, lo hace el usuario):**
1. Entrar a https://vercel.com/manuel-cristobals-projects
2. "Add New" → "Project" → importar el repo `mcristobal-eng/tableros-ux` (o, si ya existe un
   proyecto para `leyes-ux/` apuntando a este repo, crear un proyecto nuevo separado para
   `nielsen-ux/`, porque cada Root Directory distinto necesita su propio proyecto de Vercel).
3. En "Root Directory", elegir `nielsen-ux`.
4. Framework Preset: "Other" (sitio estático, sin build command ni output directory).
5. Deploy.

**Opción B — Vercel CLI no interactivo (requiere que el usuario provea un token):**
1. El usuario genera un token en https://vercel.com/account/tokens.
2. Correr (sin commitear el token a ningún lado):
   ```bash
   npx vercel@latest link --token=$VERCEL_TOKEN --project tableros-ux-nielsen --yes
   npx vercel@latest --token=$VERCEL_TOKEN --prod --yes
   ```
3. Ajustar el Root Directory a `nielsen-ux` en el proyecto creado (vía dashboard, si `link` no lo
   pide).
