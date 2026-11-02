// Actividades de la Semana 6 (SD2). Sin servidor: cada estudiante practica en su celular con autocorrección
// y los equipos A–D compiten en la pantalla del salón (el profesor suma los puntos en el marcador).
// Tipos: quiz · tf · classify (tarjetas a categorías) · order (ordenar) · scale (termómetro, sin respuesta correcta).
// En "order", "o" ya viene desordenado y "a" es el orden correcto (índices de "o").

const TERMO = ['Arquitectura de software', 'Vistas 4+1', 'Modelo C4', 'Diseño OO y patrones'];

export const ACTIVIDADES = [
  { id: 'a1', n: 1, nombre: 'Arquitecto por un día', momento: 'inicio', min: 8, color: '#FF8A3D', preguntas: [
    { id: 'a1q1', type: 'quiz', t: 30, q: '¿Cuál definición describe mejor la arquitectura de software?',
      o: ['Las estructuras necesarias para razonar sobre el sistema: elementos, relaciones y sus propiedades', 'El diagrama de clases completo del sistema', 'La elección del lenguaje y del framework', 'La carpeta src con todos sus paquetes'],
      a: 0, e: 'Bass, Clements y Kazman: "el conjunto de estructuras necesarias para razonar sobre el sistema, que comprenden elementos de software, relaciones entre ellos y propiedades de ambos". ISO/IEC/IEEE 42010 la define como los conceptos o propiedades fundamentales de un sistema.' },
    { id: 'a1q2', type: 'classify', t: 60, q: '¿Decisión de arquitectura o de diseño detallado?', bins: ['Arquitectura', 'Diseño detallado'],
      o: ['Monolito modular en lugar de microservicios', 'Email como record que valida su formato', 'Cada módulo depende solo de core-module', 'Usar un for o un stream para filtrar', 'Memoria por defecto y MySQL opcional', 'Nombre del método isActive()', 'Entre módulos solo viajan UUID y records'],
      a: [0, 1, 0, 1, 0, 1, 0], e: 'Regla práctica: es arquitectura si cuesta mucho cambiarla, afecta a varios módulos o equipos, o decide un atributo de calidad (mantenibilidad, rendimiento, despliegue). El resto es diseño detallado.' },
    { id: 'a1q3', type: 'quiz', t: 25, q: 'El equipo B quiere llamar directo a una clase interna de user-module. ¿Qué regla rompe?',
      o: ['D-00: entre módulos solo se usan los contratos de core-module', 'GitHub Flow', 'La Definition of Done', 'Ninguna: es más rápido'],
      a: 0, e: 'La decisión D-00 pone los contratos (UserService, CatalogService…) en core-module. Saltarse el contrato acopla los módulos y rompe la regla "cada módulo depende solo de core".' },
    { id: 'a1q4', type: 'scale', t: 40, q: 'Termómetro: ¿qué tan seguro te sientes con cada tema de hoy?', o: TERMO, lo: 'nada', hi: 'podría explicarlo' },
  ] },
  { id: 'a2', n: 2, nombre: '¿Qué vista es?', momento: 'antes del receso', min: 12, color: '#C6F33A', preguntas: [
    { id: 'a2q1', type: 'classify', t: 90, q: 'Lleva cada artefacto del capstone a su vista del modelo 4+1', bins: ['Lógica', 'Procesos', 'Desarrollo', 'Física', 'Escenarios'],
      o: ['Diagrama de clases User, Order, Product', 'BackgroundTasks: el caso de uso corre fuera del hilo de JavaFX', 'Los 7 proyectos Maven y sus dependencias', 'docker-compose.yml con MySQL en el puerto 3306',
        'Un pedido de punta a punta: carrito → pago → entrega', 'Dos repartidores intentan tomar el mismo pedido a la vez', 'Paquetes domain / application / infrastructure', 'El pipeline de GitLab CI en un runner'],
      a: [0, 1, 2, 3, 4, 1, 2, 3], e: 'Lógica = abstracciones del dominio. Procesos = concurrencia y comunicación en ejecución. Desarrollo = organización del código. Física = dónde corre cada cosa. Escenarios = casos de uso que atraviesan las cuatro.' },
    { id: 'a2q2', type: 'quiz', t: 25, q: '¿Por qué el modelo se llama "4+1"?',
      o: ['Los escenarios (+1) atraviesan las otras cuatro vistas y sirven para validarlas', 'Hay cuatro vistas obligatorias y una opcional de código', 'Son cuatro diagramas UML más uno de despliegue', 'Kruchten agregó una vista de seguridad en 2005'],
      a: 0, e: 'Kruchten (1995): las cuatro vistas se organizan y se validan con unos pocos escenarios importantes; por eso el "+1" es, a propósito, redundante con las demás.' },
    { id: 'a2q3', type: 'quiz', t: 20, q: '¿A quién le interesa más la vista de desarrollo?',
      o: ['A los usuarios finales', 'A los desarrolladores y a quien gestiona el proyecto', 'Al administrador de la red', 'Solo al arquitecto'],
      a: 1, e: 'La vista de desarrollo (módulos, capas, dependencias de compilación) es para desarrolladores y gestores: reutilización, reparto de trabajo entre equipos y portabilidad.' },
    { id: 'a2q4', type: 'tf', t: 15, q: 'Las cinco vistas del 4+1 tienen que dibujarse obligatoriamente en UML.', o: ['Verdadero', 'Falso'],
      a: 1, e: 'Falso. Kruchten propone una notación por vista, pero el modelo es independiente de la notación. Se puede usar UML, C4 o diagramas de Archify, siempre que cada vista responda a sus interesados.' },
  ] },
  { id: 'a3', n: 3, nombre: 'Zoom C4', momento: 'después del receso', min: 5, color: '#6EA8FF', preguntas: [
    { id: 'a3q1', type: 'order', t: 30, q: 'Ordena los niveles del modelo C4, de lo general a lo detallado', o: ['Componentes', 'Código', 'Contexto del sistema', 'Contenedores'],
      a: [2, 3, 0, 1], e: 'Contexto → Contenedores → Componentes → Código: cada nivel hace zoom sobre un elemento del nivel anterior, como un mapa.' },
    { id: 'a3q2', type: 'classify', t: 60, q: '¿Qué abstracción C4 es cada elemento del Delivery System?', bins: ['Persona', 'Sistema', 'Contenedor', 'Componente', 'Código'],
      o: ['Repartidor', 'Pasarela de pagos', 'Aplicación JavaFX delivery-system', 'Base de datos MySQL', 'order-module', 'User.java', 'Delivery System'],
      a: [0, 1, 2, 2, 3, 4, 1], e: 'Contenedor = algo que se ejecuta o guarda datos (la app JavaFX, MySQL). Un módulo Maven dentro de la app es componente. Un contenedor C4 no es un contenedor de Docker.' },
  ] },
  { id: 'a4', n: 4, nombre: 'Patrón detective', momento: 'antes de terminar', min: 5, color: '#B78CFF', preguntas: [
    { id: 'a4q1', type: 'classify', t: 60, q: '¿Qué patrón resuelve cada olor de diseño de user-module?', bins: ['Builder', 'Factory', 'Observer'],
      o: ['Un método restore con 9 parámetros, varios String', 'La regla "correo único" copiada en tres casos de uso', 'El caso de uso llama a correo, auditoría y entregas', 'Para una prueba hay que pasar null en cuatro parámetros', 'Cada interesado nuevo obliga a modificar UpdateUserUseCase', 'Crear los usuarios de prueba con ids fijos en un solo lugar'],
      a: [0, 1, 2, 0, 2, 1], e: 'Builder: construcción legible paso a paso. Factory: un solo lugar sabe crear objetos válidos. Observer: el que publica no conoce a quienes escuchan.' },
    { id: 'a4q2', type: 'quiz', t: 25, q: 'Con Observer, si pagos quiere enterarse de que se desactivó un usuario, ¿qué cambias?',
      o: ['UpdateUserUseCase y su constructor', 'Nada del caso de uso: creas un listener y lo suscribes', 'El agregado User', 'El contrato UserService'],
      a: 1, e: 'Principio abierto/cerrado: el caso de uso queda cerrado a cambios y abierto a extensión con nuevos listeners.' },
    { id: 'a4q3', type: 'quiz', t: 20, q: 'UpdateUserUseCase depende de UserRepositoryPort y no de MySQL. ¿Qué principio SOLID es?',
      o: ['Responsabilidad única', 'Abierto/cerrado', 'Sustitución de Liskov', 'Inversión de dependencias'],
      a: 3, e: 'Inversión de dependencias: lo de alto nivel (casos de uso) y lo de bajo nivel (adaptadores) dependen de una abstracción, el puerto.' },
    { id: 'a4q4', type: 'scale', t: 40, q: 'Termómetro final: ¿y ahora qué tan seguro te sientes?', o: TERMO, lo: 'nada', hi: 'podría explicarlo', compare: 'a1q4' },
  ] },
];
export const ACTIVIDAD = Object.fromEntries(ACTIVIDADES.map((a) => [a.id, a]));
export const LETRAS = ['A', 'B', 'C', 'D', 'E'];
export const EQUIPOS = [
  { id: 'A', nombre: 'Equipo A', modulo: 'delivery-module', color: '#FF8A3D' },
  { id: 'B', nombre: 'Equipo B', modulo: 'order-module', color: '#6EA8FF' },
  { id: 'C', nombre: 'Equipo C', modulo: 'catalog-module', color: '#C6F33A' },
  { id: 'D', nombre: 'Equipo D', modulo: 'payment-module', color: '#B78CFF' },
];
export const TIPO = { quiz: 'Quiz', tf: 'Verdadero o falso', classify: 'Clasifica', order: 'Ordena', scale: 'Termómetro' };

/** Puntaje 0..100 de una respuesta (null en el termómetro). */
export function puntaje(q, r) {
  if (q.type === 'scale') return null;
  if (r == null) return 0;
  if (q.type === 'classify') return Math.round((100 * q.a.reduce((s, b, i) => s + (r[i] === b ? 1 : 0), 0)) / q.a.length);
  if (q.type === 'order') return Array.isArray(r) && r.every((v, i) => v === q.a[i]) ? 100 : 0;
  return r === q.a ? 100 : 0;
}
