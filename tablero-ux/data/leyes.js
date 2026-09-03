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
    estado: "cumple",
    capturaUrl: "capturas/fitts.png",
    explicacion: "El CTA inferior y los asientos táctiles del mapa de butacas tienen un tamaño generoso y están anclados en la zona inferior, dentro del alcance del pulgar."
  },
  {
    id: "von-restorff",
    categoria: "Percepción y jerarquía visual",
    nombre: "Efecto Von Restorff",
    queDice: "El elemento que se diferencia del resto es el que mejor se recuerda.",
    preguntaGuia: "¿La acción principal (CTA primario) se distingue con claridad del resto de los elementos?",
    estado: "cumple",
    capturaUrl: "capturas/von-restorff.png",
    explicacion: "El botón \"BUSCAR PASAJES\" en turquesa resalta claramente contra el header violeta y el fondo gris del formulario, sin competir con otro elemento de ese color."
  },
  {
    id: "estetica-usabilidad",
    categoria: "Percepción y jerarquía visual",
    nombre: "Efecto Estética-Usabilidad",
    queDice: "Un diseño lindo se percibe como más usable, aunque no lo sea.",
    preguntaGuia: "¿La estética general está \"comprando\" tolerancia a fricciones reales de uso?",
    estado: "rompe",
    capturaUrl: "capturas/estetica-usabilidad.png",
    explicacion: "El resto de la app tiene ilustraciones prolijas y una paleta consistente, pero al tocar \"Términos y condiciones\" en el checkout se abre un bloque de texto legal denso sin jerarquía visual, justo en el punto donde hay que aceptar para poder pagar."
  },

  // DECISIÓN Y CARGA COGNITIVA
  {
    id: "hick",
    categoria: "Decisión y carga cognitiva",
    nombre: "Ley de Hick",
    queDice: "Más opciones y complejidad = más tiempo para decidir.",
    preguntaGuia: "¿Los menús y formularios están simplificados? ¿Se usa progressive disclosure?",
    estado: "cumple",
    capturaUrl: "capturas/hick.png",
    explicacion: "El formulario de búsqueda inicial pide solo 4 datos (origen, destino, fechas, pasajeros) y usa \"Vuelta (Opcional)\" para no forzar decisiones innecesarias."
  },
  {
    id: "miller",
    categoria: "Decisión y carga cognitiva",
    nombre: "Ley de Miller",
    queDice: "La memoria de trabajo retiene solo 7 (± 2) elementos.",
    preguntaGuia: "¿La información está agrupada en bloques (chunks) manejables?",
    estado: "cumple",
    capturaUrl: "capturas/miller.png",
    explicacion: "Cada tarjeta de resultado agrupa la información en bloques claros (empresa/precio, disponibilidad y tipo de butaca, horarios) en vez de mostrar todo en una lista continua."
  },
  {
    id: "occam",
    categoria: "Decisión y carga cognitiva",
    nombre: "Navaja de Occam",
    queDice: "Entre dos soluciones igual de efectivas, gana la más simple.",
    preguntaGuia: "¿Hay elementos que podrían eliminarse sin perder función?",
    estado: "rompe",
    capturaUrl: "capturas/occam.png",
    explicacion: "Los Términos y Condiciones reproducen artículos legales completos (como el ARTÍCULO 4° con sus incisos a, b y c sobre representantes legales) cuando un resumen con link a la versión completa cumpliría la misma función."
  },
  {
    id: "tesler",
    categoria: "Decisión y carga cognitiva",
    nombre: "Ley de Tesler",
    queDice: "La complejidad no desaparece: se desplaza del sistema al usuario.",
    preguntaGuia: "¿Quién absorbe la complejidad de la tarea: el diseño o la persona usuaria?",
    estado: "cumple",
    capturaUrl: "capturas/tesler.png",
    explicacion: "En el mapa de asientos, el precio de cada butaca se resuelve con un color directamente sobre el asiento, así la persona no cruza manualmente una tabla de precios aparte."
  },

  // MEMORIA Y MOTIVACIÓN
  {
    id: "peak-end",
    categoria: "Memoria y motivación",
    nombre: "Regla Peak-End",
    queDice: "Se recuerda el pico emocional y el final de la experiencia, no el promedio.",
    preguntaGuia: "¿Cómo es el cierre del flujo (confirmación, error, pantalla de éxito)?",
    estado: "cumple",
    capturaUrl: "capturas/peak-end.png",
    explicacion: "El onboarding cierra con una ilustración de valijas y un mensaje tranquilizador sobre el pago y el envío de los pasajes por email, dejando una sensación positiva de cierre."
  },
  {
    id: "zeigarnik",
    categoria: "Memoria y motivación",
    nombre: "Efecto Zeigarnik",
    queDice: "Lo incompleto o interrumpido se recuerda mejor que lo terminado.",
    preguntaGuia: "¿Hay señales claras de progreso o tareas pendientes que inviten a volver?",
    estado: "cumple",
    capturaUrl: "capturas/zeigarnik.png",
    explicacion: "Los puntos de paginación del onboarding (5 puntos, uno resaltado) muestran cuántos pasos faltan, generando la sensación de una tarea inconclusa que invita a seguir tocando \"Continuar\"."
  },
  {
    id: "gradiente-meta",
    categoria: "Memoria y motivación",
    nombre: "Efecto Gradiente de Meta",
    queDice: "La motivación aumenta cuanto más cerca se está de la meta.",
    preguntaGuia: "¿Se usan barras de progreso, pasos numerados o avance regalado?",
    estado: "rompe",
    capturaUrl: "capturas/gradiente-meta.png",
    explicacion: "Fuera del onboarding, el flujo real de compra (buscar → resultados ida → resultados vuelta → asientos → datos → pago) no muestra ningún indicador de paso o progreso."
  },

  // CONSISTENCIA Y ROBUSTEZ
  {
    id: "jakob",
    categoria: "Consistencia y robustez",
    nombre: "Ley de Jakob",
    queDice: "Los usuarios esperan que un producto funcione como los que ya conocen.",
    preguntaGuia: "¿Sigue las convenciones de su categoría o plataforma, o exige aprender un patrón nuevo?",
    estado: "cumple",
    capturaUrl: "capturas/jakob.png",
    explicacion: "El selector de fecha usa el patrón de calendario nativo de iOS, algo que cualquier persona que use apps de viajes o calendario ya conoce, sin interacciones nuevas que aprender."
  },
  {
    id: "postel",
    categoria: "Consistencia y robustez",
    nombre: "Ley de Postel",
    queDice: "Ser flexible en lo que se recibe, preciso en lo que se envía.",
    preguntaGuia: "¿Los formularios toleran variaciones razonables de formato de entrada?",
    estado: "rompe",
    capturaUrl: "capturas/postel.jpg",
    explicacion: "Al escribir \"curusu cuatia\" (sin tildes y con un error de tipeo) en el buscador de origen, la lista de sugerencias queda completamente vacía, sin ninguna coincidencia aproximada."
  },
  {
    id: "doherty",
    categoria: "Consistencia y robustez",
    nombre: "Umbral de Doherty",
    queDice: "Responder en menos de 400 ms mantiene la productividad y la atención.",
    preguntaGuia: "¿Hay feedback inmediato ante cada acción (loading, skeleton, estado de carga)?",
    estado: "cumple",
    capturaUrl: "capturas/doherty.png",
    explicacion: "Al confirmar la compra aparece de inmediato una animación de carga sobre el resumen de precios, dejando claro que la acción se está procesando en vez de dejar la pantalla congelada."
  },

  // PRIORIZACIÓN
  {
    id: "pareto",
    categoria: "Priorización",
    nombre: "Principio de Pareto",
    queDice: "En muchos sistemas, el 80% del efecto proviene del 20% de las causas.",
    preguntaGuia: "¿El diseño prioriza visual y funcionalmente las tareas más usadas por la mayoría?",
    estado: "cumple",
    capturaUrl: "capturas/pareto.png",
    explicacion: "La pantalla de inicio dedica casi toda la pantalla al buscador de pasajes (la tarea que hace la mayoría), mientras que funciones secundarias como Promos, Devolver o Ayuda quedan relegadas a la barra de pestañas inferior."
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
