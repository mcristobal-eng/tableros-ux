(function () {
  "use strict";

  const ESTADO_LABEL = {
    cumple: "Cumple",
    rompe: "Rompe",
    pendiente: "Pendiente"
  };

  const SEVERIDAD_LABEL = {
    pendiente: "Sin evaluar",
    "0": "0 · Sin problema",
    "1": "1 · Cosmético",
    "2": "2 · Menor",
    "3": "3 · Mayor",
    "4": "4 · Catástrofe"
  };

  function slugify(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function claveSeveridad(severidad) {
    return severidad === null || severidad === undefined ? "pendiente" : String(severidad);
  }

  function crearBadgeEstado(estado) {
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.dataset.estado = estado;

    const dot = document.createElement("span");
    dot.className = "badge__dot";
    badge.appendChild(dot);

    badge.appendChild(document.createTextNode(ESTADO_LABEL[estado] || "Pendiente"));
    return badge;
  }

  function crearBadgeSeveridad(severidad) {
    const clave = claveSeveridad(severidad);
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.dataset.severidad = clave;

    const dot = document.createElement("span");
    dot.className = "badge__dot";
    badge.appendChild(dot);

    badge.appendChild(document.createTextNode(SEVERIDAD_LABEL[clave]));
    return badge;
  }

  function crearCaptura(capturaUrl, nombre) {
    const wrap = document.createElement("div");
    wrap.className = "ley-card__captura";

    if (capturaUrl) {
      const img = document.createElement("img");
      img.src = capturaUrl;
      img.alt = "Captura de pantalla: " + nombre + " en Central de Pasajes";
      img.loading = "lazy";
      wrap.appendChild(img);
    } else {
      const placeholder = document.createElement("div");
      placeholder.className = "ley-card__captura-placeholder";
      placeholder.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="5" width="18" height="14" rx="2"></rect>
          <circle cx="8.5" cy="10" r="1.5"></circle>
          <path d="M21 16l-5.5-5.5L9 17"></path>
        </svg>
        <span>Sin captura todavía</span>
      `;
      wrap.appendChild(placeholder);
    }

    return wrap;
  }

  function crearExplicacion(explicacion) {
    const explicacionEl = document.createElement("div");
    explicacionEl.className = "ley-card__explicacion";

    if (explicacion) {
      explicacionEl.innerHTML = "<strong>Análisis</strong>";
      const texto = document.createElement("span");
      texto.textContent = explicacion;
      explicacionEl.appendChild(texto);
    } else {
      explicacionEl.classList.add("ley-card__explicacion--vacia");
      explicacionEl.textContent = "Todavía sin analizar";
    }

    return explicacionEl;
  }

  function crearCardLey(ley) {
    const card = document.createElement("article");
    card.className = "ley-card";
    card.id = "ley-" + ley.id;

    const top = document.createElement("div");
    top.className = "ley-card__top";

    const nombre = document.createElement("h3");
    nombre.className = "ley-card__nombre";
    nombre.textContent = ley.nombre;

    top.appendChild(nombre);
    top.appendChild(crearBadgeEstado(ley.estado));
    card.appendChild(top);

    const queDice = document.createElement("p");
    queDice.className = "ley-card__que-dice";
    queDice.textContent = "“" + ley.queDice + "”";
    card.appendChild(queDice);

    const pregunta = document.createElement("p");
    pregunta.className = "ley-card__pregunta";
    pregunta.innerHTML = "<strong>Pregunta guía</strong>";
    pregunta.appendChild(document.createTextNode(ley.preguntaGuia));
    card.appendChild(pregunta);

    card.appendChild(crearCaptura(ley.capturaUrl, ley.nombre));
    card.appendChild(crearExplicacion(ley.explicacion));

    return card;
  }

  function crearCardHeuristica(heuristica) {
    const card = document.createElement("article");
    card.className = "ley-card";
    card.id = "heuristica-" + heuristica.id;

    const top = document.createElement("div");
    top.className = "ley-card__top";

    const nombre = document.createElement("h3");
    nombre.className = "ley-card__nombre";
    nombre.textContent = heuristica.nombre;

    top.appendChild(nombre);
    top.appendChild(crearBadgeSeveridad(heuristica.severidad));
    card.appendChild(top);

    const definicion = document.createElement("p");
    definicion.className = "ley-card__que-dice";
    definicion.textContent = heuristica.definicion;
    card.appendChild(definicion);

    card.appendChild(crearCaptura(heuristica.capturaUrl, heuristica.nombre));
    card.appendChild(crearExplicacion(heuristica.explicacion));

    return card;
  }

  function agruparPorCategoria(leyes) {
    const mapa = new Map();
    leyes.forEach((ley) => {
      if (!mapa.has(ley.categoria)) {
        mapa.set(ley.categoria, []);
      }
      mapa.get(ley.categoria).push(ley);
    });
    return mapa;
  }

  function renderResumenLeyes(leyes) {
    const contenedor = document.getElementById("resumen-leyes");
    if (!contenedor) return;

    const conteo = { cumple: 0, rompe: 0, pendiente: 0 };
    leyes.forEach((ley) => {
      conteo[ley.estado] = (conteo[ley.estado] || 0) + 1;
    });

    Object.keys(ESTADO_LABEL).forEach((estado) => {
      const pill = document.createElement("span");
      pill.className = "summary-pill";
      pill.dataset.estado = estado;

      const dot = document.createElement("span");
      dot.className = "summary-pill__dot";
      pill.appendChild(dot);

      pill.appendChild(
        document.createTextNode(`${conteo[estado] || 0} ${ESTADO_LABEL[estado]}`)
      );
      contenedor.appendChild(pill);
    });
  }

  function renderResumenHeuristicas(heuristicas) {
    const contenedor = document.getElementById("resumen-heuristicas");
    if (!contenedor) return;

    const conteo = { pendiente: 0, "0": 0, "1": 0, "2": 0, "3": 0, "4": 0 };
    heuristicas.forEach((h) => {
      const clave = claveSeveridad(h.severidad);
      conteo[clave] += 1;
    });

    Object.keys(SEVERIDAD_LABEL).forEach((clave) => {
      const pill = document.createElement("span");
      pill.className = "summary-pill";
      pill.dataset.severidad = clave;

      const dot = document.createElement("span");
      dot.className = "summary-pill__dot";
      pill.appendChild(dot);

      pill.appendChild(
        document.createTextNode(`${conteo[clave] || 0} ${SEVERIDAD_LABEL[clave]}`)
      );
      contenedor.appendChild(pill);
    });
  }

  function renderNav(categoriasOrdenadas, leyesPorCategoria) {
    const nav = document.getElementById("nav-categorias-lista");
    if (!nav) return;

    categoriasOrdenadas.forEach((categoria) => {
      const leyes = leyesPorCategoria.get(categoria) || [];
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#" + slugify(categoria);
      a.appendChild(document.createTextNode(categoria));

      const count = document.createElement("span");
      count.className = "nav-count";
      count.textContent = String(leyes.length);
      a.appendChild(count);

      li.appendChild(a);
      nav.appendChild(li);
    });
  }

  function renderContenidoLeyes(categoriasOrdenadas, leyesPorCategoria) {
    const contenedor = document.getElementById("contenido-leyes");
    if (!contenedor) return;

    categoriasOrdenadas.forEach((categoria, index) => {
      const leyes = leyesPorCategoria.get(categoria) || [];

      const seccion = document.createElement("section");
      seccion.className = "categoria-seccion";
      seccion.id = slugify(categoria);

      const header = document.createElement("div");
      header.className = "categoria-seccion__header";

      const indexEl = document.createElement("span");
      indexEl.className = "categoria-index";
      indexEl.textContent = String(index + 1).padStart(2, "0");

      const h2 = document.createElement("h2");
      h2.textContent = categoria;

      header.appendChild(indexEl);
      header.appendChild(h2);
      seccion.appendChild(header);

      const grid = document.createElement("div");
      grid.className = "tarjetas-grid";
      leyes.forEach((ley) => grid.appendChild(crearCardLey(ley)));
      seccion.appendChild(grid);

      contenedor.appendChild(seccion);
    });
  }

  function renderContenidoHeuristicas(heuristicas) {
    const contenedor = document.getElementById("contenido-heuristicas");
    if (!contenedor) return;

    const grid = document.createElement("div");
    grid.className = "tarjetas-grid";
    heuristicas.forEach((h) => grid.appendChild(crearCardHeuristica(h)));
    contenedor.appendChild(grid);
  }

  function activarNavAlScroll(categoriasOrdenadas) {
    const links = Array.from(document.querySelectorAll(".nav-categorias a"));
    if (!links.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          links.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
          });
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    categoriasOrdenadas.forEach((categoria) => {
      const seccion = document.getElementById(slugify(categoria));
      if (seccion) observer.observe(seccion);
    });
  }

  function initTabs() {
    const botones = Array.from(document.querySelectorAll(".tabs__btn"));
    const paneles = {
      leyes: document.getElementById("vista-leyes"),
      heuristicas: document.getElementById("vista-heuristicas")
    };
    const resumenes = {
      leyes: document.getElementById("resumen-leyes"),
      heuristicas: document.getElementById("resumen-heuristicas")
    };

    function activar(vista) {
      botones.forEach((btn) => {
        btn.classList.toggle("is-active", btn.dataset.vista === vista);
      });

      Object.keys(paneles).forEach((clave) => {
        if (paneles[clave]) paneles[clave].hidden = clave !== vista;
        if (resumenes[clave]) resumenes[clave].hidden = clave !== vista;
      });

      history.replaceState(null, "", "#" + vista);
    }

    botones.forEach((btn) => {
      btn.addEventListener("click", () => activar(btn.dataset.vista));
    });

    activar(location.hash === "#heuristicas" ? "heuristicas" : "leyes");
  }

  function init() {
    if (typeof LEYES === "undefined" || typeof CATEGORIAS === "undefined") {
      console.error("No se encontraron los datos de leyes (data/leyes.js).");
    } else {
      const leyesPorCategoria = agruparPorCategoria(LEYES);
      renderResumenLeyes(LEYES);
      renderNav(CATEGORIAS, leyesPorCategoria);
      renderContenidoLeyes(CATEGORIAS, leyesPorCategoria);
      activarNavAlScroll(CATEGORIAS);
    }

    if (typeof HEURISTICAS === "undefined") {
      console.error("No se encontraron los datos de heurísticas (data/heuristicas.js).");
    } else {
      renderResumenHeuristicas(HEURISTICAS);
      renderContenidoHeuristicas(HEURISTICAS);
    }

    initTabs();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
