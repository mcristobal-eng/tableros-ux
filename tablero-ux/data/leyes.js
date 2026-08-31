// Datos del Tablero de Leyes UX
// Cada objeto representa una ley de UX evaluada sobre Central de Pasajes (centraldepasajes.com.ar)
//
// Campos:
// - id: identificador único de la ley
// - categoria: una de las 5 categorías del tablero
// - nombre: nombre de la ley o efecto
// - queDice: enunciado breve de la ley
// - preguntaGuia: pregunta que orienta el análisis sobre el producto
// - estado: "cumple" | "rompe" | "pendiente"
// - capturaUrl: URL o ruta de la captura de pantalla que ilustra el hallazgo (vacío por ahora)
// - explicacion: análisis del hallazgo sobre el producto (vacío por ahora)

const LEYES = [
  // PERCEPCIÓN Y JERARQUÍA VISUAL
  {
    id: "fitts",
    categoria: "Percepción y jerarquía visual",
    nombre: "Ley de Fitts",
    queDice: "El tiempo para alcanzar un objetivo depende de su tamaño y de la distancia al mismo.",
    preguntaGuia: "¿Los botones o CTAs de uso frecuente son grandes y están cerca (pulgar en mobile, cursor en desktop)?",
    estado: "pendiente",
    capturaUrl: "",
    explicacion: ""
  },
  {
    id: "von-restorff",
    categoria: "Percepción y jerarquía visual",
    nombre: "Efecto Von Restorff",
    queDice: "El elemento que se diferencia del resto es el que mejor se recuerda.",
    preguntaGuia: "¿La acción principal (CTA primario) se distingue con claridad del resto de los elementos?",
    estado: "pendiente",
    capturaUrl: "",
    explicacion: ""
  },
  {
    id: "estetica-usabilidad",
    categoria: "Percepción y jerarquía visual",
    nombre: "Efecto Estética-Usabilidad",
    queDice: "Un diseño lindo se percibe como más usable, aunque no lo sea.",
    preguntaGuia: "¿La estética general está \"comprando\" tolerancia a fricciones reales de uso?",
    estado: "pendiente",
    capturaUrl: "",
    explicacion: ""
  },

  // DECISIÓN Y CARGA COGNITIVA
  {
    id: "hick",
    categoria: "Decisión y carga cognitiva",
    nombre: "Ley de Hick",
    queDice: "Más opciones y complejidad = más tiempo para decidir.",
    preguntaGuia: "¿Los menús y formularios están simplificados? ¿Se usa progressive disclosure?",
    estado: "pendiente",
    capturaUrl: "",
    explicacion: ""
  },
  {
    id: "miller",
    categoria: "Decisión y carga cognitiva",
    nombre: "Ley de Miller",
    queDice: "La memoria de trabajo retiene solo 7 (± 2) elementos.",
    preguntaGuia: "¿La información está agrupada en bloques (chunks) manejables?",
    estado: "pendiente",
    capturaUrl: "",
    explicacion: ""
  },
  {
    id: "occam",
    categoria: "Decisión y carga cognitiva",
    nombre: "Navaja de Occam",
    queDice: "Entre dos soluciones igual de efectivas, gana la más simple.",
    preguntaGuia: "¿Hay elementos que podrían eliminarse sin perder función?",
    estado: "pendiente",
    capturaUrl: "",
    explicacion: ""
  },
  {
    id: "tesler",
    categoria: "Decisión y carga cognitiva",
    nombre: "Ley de Tesler",
    queDice: "La complejidad no desaparece: se desplaza del sistema al usuario.",
    preguntaGuia: "¿Quién absorbe la complejidad de la tarea: el diseño o la persona usuaria?",
    estado: "pendiente",
    capturaUrl: "",
    explicacion: ""
  },

  // MEMORIA Y MOTIVACIÓN
  {
    id: "peak-end",
    categoria: "Memoria y motivación",
    nombre: "Regla Peak-End",
    queDice: "Se recuerda el pico emocional y el final de la experiencia, no el promedio.",
    preguntaGuia: "¿Cómo es el cierre del flujo (confirmación, error, pantalla de éxito)?",
    estado: "pendiente",
    capturaUrl: "",
    explicacion: ""
  },
  {
    id: "zeigarnik",
    categoria: "Memoria y motivación",
    nombre: "Efecto Zeigarnik",
    queDice: "Lo incompleto o interrumpido se recuerda mejor que lo terminado.",
    preguntaGuia: "¿Hay señales claras de progreso o tareas pendientes que inviten a volver?",
    estado: "pendiente",
    capturaUrl: "",
    explicacion: ""
  },
  {
    id: "gradiente-meta",
    categoria: "Memoria y motivación",
    nombre: "Efecto Gradiente de Meta",
    queDice: "La motivación aumenta cuanto más cerca se está de la meta.",
    preguntaGuia: "¿Se usan barras de progreso, pasos numerados o avance regalado?",
    estado: "pendiente",
    capturaUrl: "",
    explicacion: ""
  },

  // CONSISTENCIA Y ROBUSTEZ
  {
    id: "jakob",
    categoria: "Consistencia y robustez",
    nombre: "Ley de Jakob",
    queDice: "Los usuarios esperan que un producto funcione como los que ya conocen.",
    preguntaGuia: "¿Sigue las convenciones de su categoría o plataforma, o exige aprender un patrón nuevo?",
    estado: "pendiente",
    capturaUrl: "",
    explicacion: ""
  },
  {
    id: "postel",
    categoria: "Consistencia y robustez",
    nombre: "Ley de Postel",
    queDice: "Ser flexible en lo que se recibe, preciso en lo que se envía.",
    preguntaGuia: "¿Los formularios toleran variaciones razonables de formato de entrada?",
    estado: "pendiente",
    capturaUrl: "",
    explicacion: ""
  },
  {
    id: "doherty",
    categoria: "Consistencia y robustez",
    nombre: "Umbral de Doherty",
    queDice: "Responder en menos de 400 ms mantiene la productividad y la atención.",
    preguntaGuia: "¿Hay feedback inmediato ante cada acción (loading, skeleton, estado de carga)?",
    estado: "pendiente",
    capturaUrl: "",
    explicacion: ""
  },

  // PRIORIZACIÓN
  {
    id: "pareto",
    categoria: "Priorización",
    nombre: "Principio de Pareto",
    queDice: "En muchos sistemas, el 80% del efecto proviene del 20% de las causas.",
    preguntaGuia: "¿El diseño prioriza visual y funcionalmente las tareas más usadas por la mayoría?",
    estado: "pendiente",
    capturaUrl: "",
    explicacion: ""
  }
];

// Orden y metadatos de las categorías, tal como deben aparecer en el tablero
const CATEGORIAS = [
  "Percepción y jerarquía visual",
  "Decisión y carga cognitiva",
  "Memoria y motivación",
  "Consistencia y robustez",
  "Priorización"
];
