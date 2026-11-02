// Mapa C4 del Delivery System con zoom: cada vista es un nivel del modelo C4.
// Doble clic en un elemento con "entra" baja al siguiente nivel; "Subir" vuelve al anterior.

export const ELEMENTOS = {
  // ── Nivel 1 · personas y sistemas ──
  cliente: { label: 'Cliente', sub: 'persona · CUSTOMER', tipo: 'persona', tema: 't3', desc: 'Arma su carrito, paga y sigue su pedido. En el código es el rol CUSTOMER de UserRole.' },
  comercio: { label: 'Comercio', sub: 'persona · MERCHANT', tipo: 'persona', tema: 't3', desc: 'Publica su catálogo y marca los pedidos como "Listo para entrega" (decisión D-08).' },
  repartidor: { label: 'Repartidor', sub: 'persona · COURIER', tipo: 'persona', tema: 't3', desc: 'Toma pedidos listos en exclusiva y confirma la entrega con un código (D-02).' },
  admin: { label: 'Administrador', sub: 'persona · ADMIN', tipo: 'persona', tema: 't3', desc: 'Gestiona usuarios y comercios. Es quien usa las pantallas de user-module.' },
  sistema: { label: 'Delivery System', sub: 'doble clic: ver contenedores', tipo: 'sistema', tema: 't3', entra: 'v2',
    desc: 'El sistema de software completo. En el nivel 1 es una sola caja: no importa la tecnología, solo quién lo usa y con qué sistemas habla.' },
  pasarela: { label: 'Pasarela de pagos', sub: 'externo · simulada', tipo: 'externo', tema: 't3', desc: 'En el capstone los pagos son simulados por payment-module, pero en C4 se dibuja como sistema externo.' },
  correo: { label: 'Servicio de correo', sub: 'externo · futuro', tipo: 'externo', tema: 't5', desc: 'Mejora futura: avisar al usuario. En el ejercicio de patrones se simula con EmailNotifier y un listener.' },
  // ── Nivel 2 · contenedores ──
  app: { label: 'Aplicación de escritorio', sub: 'Java 25 · Spring Boot · JavaFX', tipo: 'contenedor', tema: 't3', entra: 'v3',
    desc: 'Un solo ejecutable (delivery-system) que arma todos los módulos: un monolito modular. Ejemplo de contenedor C4: una aplicación JavaFX.' },
  memoria: { label: 'Almacén en memoria', sub: 'perfil memory · predeterminado', tipo: 'datos', tema: 't2', desc: 'Datos en mapas en RAM. Es el perfil por defecto: ./mvnw javafx:run -Pmemory.' },
  mysql: { label: 'MySQL 8.4', sub: 'perfil jpa · Docker Compose', tipo: 'datos', tema: 't2', desc: 'Base de datos opcional. Corre en un contenedor de Docker, pero eso es la vista física: en C4 es un contenedor de datos.' },
  // ── Nivel 3 · componentes de la aplicación ──
  shell: { label: 'delivery-system', sub: 'arranque Spring + JavaFX', tipo: 'componente', tema: 't2', desc: 'Ensambla los módulos y abre la ventana principal. En la vista de desarrollo es el proyecto Maven ejecutable.' },
  core: { label: 'core-module', sub: 'contratos · fallbacks · UI base', tipo: 'componente', tema: 't1',
    desc: 'Kernel compartido. Contiene los contratos entre módulos (D-00) y, si un módulo no implementa el suyo, registra un fallback con un WARN.' },
  user: { label: 'user-module', sub: 'doble clic: ver su interior', tipo: 'componente', tema: 't3', entra: 'v4', desc: 'Módulo de referencia del practitioner: CRUD completo con arquitectura hexagonal. Implementa UserService.' },
  catalog: { label: 'catalog-module', sub: 'comercios y catálogo · equipo C', tipo: 'componente', tema: 't3', desc: 'Implementa CatalogService: productos, disponibilidad y stock (D-09).' },
  order: { label: 'order-module', sub: 'carrito y pedidos · equipo B', tipo: 'componente', tema: 't3', desc: 'Implementa OrderService y usa CatalogService, PaymentService y UserService.' },
  payment: { label: 'payment-module', sub: 'pagos · equipo D', tipo: 'componente', tema: 't3', desc: 'Implementa PaymentService: cobra con el último método registrado (D-04).' },
  delivery: { label: 'delivery-module', sub: 'entregas · equipo A', tipo: 'componente', tema: 't3', desc: 'Usa OrderService para tomar pedidos listos y avanzar estados (D-01, D-02).' },
  // ── Nivel 3 · dentro de user-module ──
  otros: { label: 'Otros módulos', sub: 'order, delivery, catalog…', tipo: 'externo', tema: 't3', desc: 'No conocen las clases de user-module: solo el contrato UserService de core-module.' },
  u_ui: { label: 'Controladores JavaFX', sub: 'adaptador de entrada', tipo: 'componente', tema: 't4', desc: 'CreateUserController, EditUserController y ListUsersController: traducen la pantalla a comandos.' },
  u_contract: { label: 'UserServiceAdapter', sub: 'adaptador de entrada', tipo: 'componente', tema: 't4', desc: 'Implementa el contrato UserService y traduce los roles por nombre (UserRole del core → UserRole del dominio).' },
  u_uc: { label: 'Casos de uso', sub: 'Create · Update · List · Delete · Check', tipo: 'componente', tema: 't5', desc: 'Un requerimiento funcional = un caso de uso. UpdateUserUseCase es el que el ejercicio refactoriza con Observer.' },
  u_ports: { label: 'Puertos', sub: 'commands · UserRepositoryPort', tipo: 'componente', tema: 't4', desc: 'Interfaces que define la aplicación. Inversión de dependencias: la infraestructura depende de ellas, no al revés.' },
  d_dominio: { label: 'Dominio', sub: 'doble clic: ver el código', tipo: 'componente', tema: 't4', entra: 'v5', desc: 'User, Email, UserId, UserRole y UserStatus. Sin Spring ni JavaFX.' },
  u_mem: { label: 'InMemoryUserRepositoryAdapter', sub: 'adaptador de salida', tipo: 'componente', tema: 't4', desc: 'Implementa UserRepositoryPort con un mapa en memoria.' },
  u_jpa: { label: 'UserPersistenceAdapter', sub: 'adaptador de salida · JPA', tipo: 'componente', tema: 't4', desc: 'Implementa el mismo puerto con JPA y un mapper entidad ↔ dominio.' },
  // ── Nivel 4 · código ──
  c_user: { label: 'User', sub: 'clase · raíz del agregado', tipo: 'codigo', tema: 't5', desc: 'Sin setters: cambia solo por comportamiento (deactivate, changeRole). restore() con 9 parámetros es el olor que resuelve el Builder.' },
  c_base: { label: 'BaseModel<ID>', sub: 'clase abstracta · core', tipo: 'codigo', tema: 't4', desc: 'Herencia: id, createdAt, updatedAt e igualdad por id para todos los agregados.' },
  c_email: { label: 'Email', sub: 'record · objeto valor', tipo: 'codigo', tema: 't4', desc: 'Encapsulamiento: valida el formato y normaliza a minúsculas en el constructor.' },
  c_id: { label: 'UserId', sub: 'record', tipo: 'codigo', tema: 't4', desc: 'Envuelve un UUID: evita confundir el id de un usuario con el de un pedido.' },
  c_role: { label: 'UserRole', sub: 'enum', tipo: 'codigo', tema: 't4', desc: 'CUSTOMER, COURIER, ADMIN, MERCHANT.' },
  c_status: { label: 'UserStatus', sub: 'enum', tipo: 'codigo', tema: 't4', desc: 'ACTIVE o INACTIVE.' },
  c_uc: { label: 'CreateUserUseCase', sub: 'clase · implementa UseCase', tipo: 'codigo', tema: 't5', desc: 'Polimorfismo: implementa UseCase<CreateUserCommand, UUID>. La Factory le quita la lógica de creación.' },
  c_port: { label: 'UserRepositoryPort', sub: 'interfaz', tipo: 'codigo', tema: 't4', desc: 'Abstracción de la persistencia: extiende CrudRepositoryPort y agrega existsByEmail.' },
};

export const ABSTRACCION = { persona: 'Persona', externo: 'Sistema de software (externo)', sistema: 'Sistema de software', contenedor: 'Contenedor', componente: 'Componente', datos: 'Contenedor (datos)', codigo: 'Código' };

const P = ['cliente', 'comercio', 'repartidor', 'admin'];
export const VISTAS = [
  { id: 'v1', nivel: 1, titulo: 'Contexto', diagrama: 'c4-contexto', padre: null,
    nota: '¿Quién usa el sistema y con qué otros sistemas habla? Sin tecnología.',
    nodos: { cliente: [-420, -210], comercio: [-420, -70], repartidor: [-420, 70], admin: [-420, 210], sistema: [0, 0], pasarela: [420, -90], correo: [420, 90] },
    cajas: [],
    aristas: [['cliente', 'sistema', 'pide y paga'], ['comercio', 'sistema', 'publica catálogo'], ['repartidor', 'sistema', 'entrega'], ['admin', 'sistema', 'gestiona usuarios'],
      ['sistema', 'pasarela', 'cobra'], ['sistema', 'correo', 'avisa', true]] },
  { id: 'v2', nivel: 2, titulo: 'Contenedores', diagrama: 'c4-contenedores', padre: 'v1',
    nota: 'Lo que se ejecuta o guarda datos. Un contenedor C4 no es un contenedor de Docker.',
    nodos: { cliente: [-520, -210], comercio: [-520, -70], repartidor: [-520, 70], admin: [-520, 210], app: [-80, 0], memoria: [300, -120], mysql: [300, 120], pasarela: [660, -90], correo: [660, 90] },
    cajas: [{ label: 'Delivery System', miembros: ['app', 'memoria', 'mysql'] }],
    aristas: [...P.map((p) => [p, 'app', 'GUI JavaFX']), ['app', 'memoria', 'lee y escribe'], ['app', 'mysql', 'JPA :3306', true], ['app', 'pasarela', 'cobra'], ['app', 'correo', 'avisa', true]] },
  { id: 'v3', nivel: 3, titulo: 'Componentes', diagrama: 'c4-componentes', padre: 'v2',
    nota: 'Cada módulo Maven es un componente. Todos dependen solo de core-module.',
    nodos: { cliente: [-640, 200], comercio: [-640, 30], repartidor: [-640, 370], admin: [-640, -140], shell: [0, -320], user: [-300, -140], catalog: [-300, 30], order: [-300, 200], core: [0, 30],
      payment: [300, -140], delivery: [300, 200], memoria: [620, -40], mysql: [620, 120], pasarela: [620, -260] },
    cajas: [{ label: 'Aplicación de escritorio', miembros: ['shell', 'user', 'catalog', 'order', 'core', 'payment', 'delivery'] }],
    aristas: [['admin', 'user', 'usuarios'], ['comercio', 'catalog', 'catálogo'], ['cliente', 'order', 'carrito'], ['repartidor', 'delivery', 'entregas'],
      ['shell', 'core', 'ensambla'], ['user', 'core', 'implementa UserService'], ['catalog', 'core', 'CatalogService'], ['order', 'core', 'OrderService'], ['payment', 'core', 'PaymentService'],
      ['delivery', 'core', 'usa OrderService'], ['core', 'memoria', 'CrudRepositoryPort'], ['core', 'mysql', 'JPA', true], ['payment', 'pasarela', 'cobra']] },
  { id: 'v4', nivel: 3, titulo: 'user-module', diagrama: 'c4-user-module', padre: 'v3',
    nota: 'Arquitectura hexagonal: adaptadores en el borde, casos de uso y puertos en medio, dominio al centro.',
    nodos: { admin: [-640, -170], otros: [-640, 110], u_ui: [-330, -170], u_contract: [-330, 110], u_uc: [-20, -30], u_ports: [-20, 200], d_dominio: [300, -30],
      u_mem: [-200, 400], u_jpa: [160, 400], memoria: [-520, 400], mysql: [480, 400] },
    cajas: [{ label: 'Adaptadores de entrada', miembros: ['u_ui', 'u_contract'] }, { label: 'Aplicación', miembros: ['u_uc', 'u_ports'] },
      { label: 'Dominio', miembros: ['d_dominio'] }, { label: 'Adaptadores de salida', miembros: ['u_mem', 'u_jpa'] }],
    aristas: [['admin', 'u_ui', 'pantallas'], ['otros', 'u_contract', 'isActiveWithRole'], ['u_ui', 'u_uc', 'commands'], ['u_contract', 'u_uc', 'CheckUserAccessQuery'],
      ['u_uc', 'd_dominio', 'reglas'], ['u_uc', 'u_ports', 'save · findById'], ['u_mem', 'u_ports', 'implementa', true], ['u_jpa', 'u_ports', 'implementa', true],
      ['u_mem', 'memoria', 'Map'], ['u_jpa', 'mysql', 'JPA']] },
  { id: 'v5', nivel: 4, titulo: 'Código', diagrama: 'c4-codigo', padre: 'v4',
    nota: 'Clases reales de user-module. Opcional en C4: se dibuja solo para lo importante o se genera desde el IDE.',
    nodos: { c_base: [0, -240], c_user: [0, 0], c_uc: [-380, -60], c_port: [380, -60], c_email: [-330, 200], c_id: [-110, 250], c_role: [110, 250], c_status: [330, 200] },
    cajas: [],
    aristas: [['c_user', 'c_base', 'extends'], ['c_uc', 'c_user', 'register(…)'], ['c_uc', 'c_port', 'usa'], ['c_user', 'c_email', ''], ['c_user', 'c_id', 'id'],
      ['c_user', 'c_role', ''], ['c_user', 'c_status', '']] },
];
export const VISTA = Object.fromEntries(VISTAS.map((v) => [v.id, v]));
