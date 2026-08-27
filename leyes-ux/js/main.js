(function () {
  "use strict";

  const ESTADO_LABEL = {
    cumple: "Cumple",
    rompe: "Rompe",
    pendiente: "Pendiente"
  };

  function slugify(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function crearBadge(estado) {
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.dataset.estado = estado;

    const dot = document.createElement("span");
    dot.className = "badge__dot";
    badge.appendChild(dot);

    badge.appendChild(document.createTextNode(ESTADO_LABEL[estado] || "Pendiente"));
    return badge;
  }

  function crearCaptura(ley) {
    const wrap = document.createElement("div");
    wrap.className = "ley-card__captura";

    if (ley.capturaUrl) {
      const img = document.createElement("img");
      img.src = ley.capturaUrl;
      img.alt = "Captura de pantalla: " + ley.nombre + " en Central de Pasajes";
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

  function crearCard(ley) {
    const card = document.createElement("article");
    card.className = "ley-card";
    card.id = "ley-" + ley.id;

    const top = document.createElement("div");
    top.className = "ley-card__top";

    const nombre = document.createElement("h3");
    nombre.className = "ley-card__nombre";
    nombre.textContent = ley.nombre;

    top.appendChild(nombre);
    top.appendChild(crearBadge(ley.estado));
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

    card.appendChild(crearCaptura(ley));

    const explicacion = document.createElement("div");
    explicacion.className = "ley-card__explicacion";
    if (ley.explicacion) {
      explicacion.innerHTML = "<strong>Análisis</strong>";
      const texto = document.createElement("span");
      texto.textContent = ley.explicacion;
      explicacion.appendChild(texto);
    } else {
      explicacion.classList.add("ley-card__explicacion--vacia");
      explicacion.textContent = "Todavía sin analizar";
    }
    card.appendChild(explicacion);

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

  function renderResumen(leyes) {
    const contenedor = document.getElementById("resumen-estados");
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

  function renderContenido(categoriasOrdenadas, leyesPorCategoria) {
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
      grid.className = "leyes-grid";
      leyes.forEach((ley) => grid.appendChild(crearCard(ley)));
      seccion.appendChild(grid);

      contenedor.appendChild(seccion);
    });
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

  function init() {
    if (typeof LEYES === "undefined" || typeof CATEGORIAS === "undefined") {
      console.error("No se encontraron los datos de leyes (data/leyes.js).");
      return;
    }

    const leyesPorCategoria = agruparPorCategoria(LEYES);

    renderResumen(LEYES);
    renderNav(CATEGORIAS, leyesPorCategoria);
    renderContenido(CATEGORIAS, leyesPorCategoria);
    activarNavAlScroll(CATEGORIAS);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
