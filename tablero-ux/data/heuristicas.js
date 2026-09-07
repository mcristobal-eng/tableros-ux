// Datos del Tablero de Heurísticas de Nielsen
// Cada objeto representa una heurística evaluada sobre Central de Pasajes (centraldepasajes.com.ar)
//
// Campos:
// - id: identificador único de la heurística
// - nombre: nombre de la heurística (una de las 10 de Nielsen)
// - definicion: definición corta de la heurística
// - severidad: null (sin evaluar) | 0 | 1 | 2 | 3 | 4 — escala real de severidad de Nielsen
//   (0 = no es un problema, 1 = cosmético, 2 = menor, 3 = mayor, 4 = catástrofe de usabilidad)
// - capturaUrl: URL o ruta de la captura de pantalla que ilustra el hallazgo (vacío por ahora)
// - explicacion: qué pasa, por qué rompe o cumple la heurística, y qué impacto tiene en la
//   persona usuaria (vacío por ahora)

const HEURISTICAS = [
  {
    id: "visibilidad-estado",
    nombre: "Visibilidad del estado del sistema",
    definicion: "El sistema siempre debe mantener informadas a las personas usuarias sobre lo que está pasando, con feedback apropiado y en tiempo razonable.",
    severidad: 0,
    capturaUrl: "capturas/visibilidad-estado.png",
    explicacion: "Al confirmar la compra aparece de inmediato una animación de carga sobre el resumen de precios, dejando claro que la acción se está procesando."
  },
  {
    id: "correspondencia-mundo-real",
    nombre: "Correspondencia entre el sistema y el mundo real",
    definicion: "El sistema debe hablar el lenguaje de las personas usuarias, con palabras y conceptos familiares, siguiendo convenciones del mundo real.",
    severidad: 0,
    capturaUrl: "capturas/correspondencia-mundo-real.png",
    explicacion: "La disposición visual de las butacas en el mapa de asientos replica la distribución real del micro (Planta Baja/Alta, filas, pasillo central)."
  },
  {
    id: "control-libertad-usuario",
    nombre: "Control y libertad del usuario",
    definicion: "Las personas usuarias necesitan una salida de emergencia clara para abandonar un estado no deseado, como deshacer y rehacer.",
    severidad: 0,
    capturaUrl: "capturas/control-libertad.png",
    explicacion: "Al redirigir a Mercado Pago, la persona puede cancelar con el botón X o elegir no abrir la app externa; en toda la app hay flecha de retroceso para volver atrás."
  },
  {
    id: "consistencia-estandares",
    nombre: "Consistencia y estándares",
    definicion: "Las personas usuarias no deberían tener que preguntarse si distintas palabras, situaciones o acciones significan lo mismo. Hay que seguir las convenciones de la plataforma.",
    severidad: 0,
    capturaUrl: "capturas/consistencia-estandares.png",
    explicacion: "La barra de pestañas inferior (Buscar, Mis Viajes, Promos, Devolver, Ayuda) y la paleta de colores se mantienen iguales en todas las pantallas."
  },
  {
    id: "prevencion-errores",
    nombre: "Prevención de errores",
    definicion: "Mejor que buenos mensajes de error es un diseño cuidadoso que prevenga que el problema ocurra en primer lugar.",
    severidad: 0,
    capturaUrl: "capturas/prevencion-errores.png",
    explicacion: "Antes de perder los asientos seleccionados al volver atrás, la app pregunta \"¿Estás seguro?\", previniendo una pérdida de datos accidental."
  },
  {
    id: "reconocer-antes-que-recordar",
    nombre: "Reconocer antes que recordar",
    definicion: "Hay que minimizar la carga de memoria dejando visibles objetos, acciones y opciones. No debería hacer falta recordar información de una parte a otra de la interfaz.",
    severidad: 2,
    capturaUrl: "capturas/reconocer-recordar.png",
    explicacion: "Cuando el texto no coincide exactamente con una ciudad (\"curusu cuatia\"), no aparece ninguna sugerencia aproximada ni se recupera la lista de \"Destinos frecuentes\" — obliga a recordar la ortografía exacta en vez de reconocerla."
  },
  {
    id: "flexibilidad-eficiencia",
    nombre: "Flexibilidad y eficiencia de uso",
    definicion: "Los aceleradores, invisibles para quien recién empieza, pueden agilizar la interacción para quien ya usa el sistema seguido, atendiendo a ambos perfiles.",
    severidad: 0,
    capturaUrl: "capturas/flexibilidad-eficiencia.png",
    explicacion: "El buscador de origen ofrece \"Destinos frecuentes\" como acceso rápido para quienes ya usaron la app, sin estorbar a quien la usa por primera vez."
  },
  {
    id: "diseno-estetico-minimalista",
    nombre: "Diseño estético y minimalista",
    definicion: "Las interfaces no deben tener información irrelevante o que rara vez se necesita, porque compite con la información relevante.",
    severidad: 1,
    capturaUrl: "capturas/diseno-estetico.png",
    explicacion: "La pantalla de Promos muestra varios banners de descuentos superpuestos visualmente, sin agrupación clara, compitiendo por la atención."
  },
  {
    id: "reconocer-diagnosticar-errores",
    nombre: "Ayudar a los usuarios a reconocer, diagnosticar y solucionar errores",
    definicion: "Los mensajes de error deben expresarse en lenguaje claro (sin códigos), indicar el problema con precisión y sugerir una solución.",
    severidad: 2,
    capturaUrl: "capturas/reconocer-diagnosticar-errores.png",
    explicacion: "La alerta \"Por favor, ingresá un número de DNI válido\" ubica el campo (el header se pone rojo) pero no aclara qué formato espera ni por qué el número no es válido."
  },
  {
    id: "ayuda-documentacion",
    nombre: "Ayuda y documentación",
    definicion: "Aunque es mejor si el sistema no necesita documentación, puede ser necesario ofrecerla: fácil de buscar, centrada en la tarea de la persona usuaria y no muy extensa.",
    severidad: 0,
    capturaUrl: "capturas/ayuda-documentacion.png",
    explicacion: "La pantalla de Ayuda ofrece una lista de temas frecuentes y contacto directo por WhatsApp, fácil de encontrar desde la barra inferior."
  }
];
