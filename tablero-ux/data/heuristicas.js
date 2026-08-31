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
    severidad: null,
    capturaUrl: "",
    explicacion: ""
  },
  {
    id: "correspondencia-mundo-real",
    nombre: "Correspondencia entre el sistema y el mundo real",
    definicion: "El sistema debe hablar el lenguaje de las personas usuarias, con palabras y conceptos familiares, siguiendo convenciones del mundo real.",
    severidad: null,
    capturaUrl: "",
    explicacion: ""
  },
  {
    id: "control-libertad-usuario",
    nombre: "Control y libertad del usuario",
    definicion: "Las personas usuarias necesitan una salida de emergencia clara para abandonar un estado no deseado, como deshacer y rehacer.",
    severidad: null,
    capturaUrl: "",
    explicacion: ""
  },
  {
    id: "consistencia-estandares",
    nombre: "Consistencia y estándares",
    definicion: "Las personas usuarias no deberían tener que preguntarse si distintas palabras, situaciones o acciones significan lo mismo. Hay que seguir las convenciones de la plataforma.",
    severidad: null,
    capturaUrl: "",
    explicacion: ""
  },
  {
    id: "prevencion-errores",
    nombre: "Prevención de errores",
    definicion: "Mejor que buenos mensajes de error es un diseño cuidadoso que prevenga que el problema ocurra en primer lugar.",
    severidad: null,
    capturaUrl: "",
    explicacion: ""
  },
  {
    id: "reconocer-antes-que-recordar",
    nombre: "Reconocer antes que recordar",
    definicion: "Hay que minimizar la carga de memoria dejando visibles objetos, acciones y opciones. No debería hacer falta recordar información de una parte a otra de la interfaz.",
    severidad: null,
    capturaUrl: "",
    explicacion: ""
  },
  {
    id: "flexibilidad-eficiencia",
    nombre: "Flexibilidad y eficiencia de uso",
    definicion: "Los aceleradores, invisibles para quien recién empieza, pueden agilizar la interacción para quien ya usa el sistema seguido, atendiendo a ambos perfiles.",
    severidad: null,
    capturaUrl: "",
    explicacion: ""
  },
  {
    id: "diseno-estetico-minimalista",
    nombre: "Diseño estético y minimalista",
    definicion: "Las interfaces no deben tener información irrelevante o que rara vez se necesita, porque compite con la información relevante.",
    severidad: null,
    capturaUrl: "",
    explicacion: ""
  },
  {
    id: "reconocer-diagnosticar-errores",
    nombre: "Ayudar a los usuarios a reconocer, diagnosticar y solucionar errores",
    definicion: "Los mensajes de error deben expresarse en lenguaje claro (sin códigos), indicar el problema con precisión y sugerir una solución.",
    severidad: null,
    capturaUrl: "",
    explicacion: ""
  },
  {
    id: "ayuda-documentacion",
    nombre: "Ayuda y documentación",
    definicion: "Aunque es mejor si el sistema no necesita documentación, puede ser necesario ofrecerla: fácil de buscar, centrada en la tarea de la persona usuaria y no muy extensa.",
    severidad: null,
    capturaUrl: "",
    explicacion: ""
  }
];
